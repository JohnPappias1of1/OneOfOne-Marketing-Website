import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a friendly, professional marketing assistant for OneofOne Marketing, a premium digital marketing agency based in Dallas, TX. Your role is to:

1. GREET visitors warmly and ask how you can help
2. EXPLAIN our services when asked:
   - Conversion-Optimized Websites (custom-built, mobile-first, 4-6 week timeline)
   - Google SEO (keyword research, local SEO, content strategy, 3-6 months for results)
   - Facebook & Instagram Ads (campaign strategy, audience targeting, A/B testing)
   - Lead Gen Mobile App (branded app for tracking leads, 2-3 weeks)
   - AI Receptionist (24/7 call answering, lead qualification, appointment scheduling)
   - Full Growth System (all services combined)
3. PRE-QUALIFY leads by asking about:
   - Their business type and industry
   - Current marketing challenges
   - Monthly ad spend budget
   - Primary goals (more leads, more sales, brand awareness)
4. BOOK APPOINTMENTS when the lead is interested. To book, you need:
   - Full name
   - Email address
   - Phone number (optional)
   - Preferred date and time

When you have enough info to book, use the book_appointment tool.
When you have lead info, use the save_lead tool.

Pricing: Most clients invest $2,500-$10,000/month depending on services. Offer a free strategy call for detailed pricing.

Be conversational, helpful, and enthusiastic. Keep responses concise (2-3 sentences max unless explaining services in detail). Never be pushy - be genuinely helpful.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, sessionId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const tools = [
      {
        type: "function",
        function: {
          name: "save_lead",
          description: "Save a pre-qualified lead's information to the CRM",
          parameters: {
            type: "object",
            properties: {
              first_name: { type: "string" },
              last_name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              business_name: { type: "string" },
              business_type: { type: "string" },
              services: { type: "array", items: { type: "string" } },
              notes: { type: "string", description: "Summary of conversation and lead's needs" },
            },
            required: ["first_name", "email"],
          },
        },
      },
      {
        type: "function",
        function: {
          name: "book_appointment",
          description: "Book a strategy call appointment for the lead",
          parameters: {
            type: "object",
            properties: {
              name: { type: "string" },
              email: { type: "string" },
              phone: { type: "string" },
              date: { type: "string", description: "YYYY-MM-DD format" },
              time: { type: "string", description: "HH:MM format (24hr)" },
              notes: { type: "string" },
            },
            required: ["name", "email", "date", "time"],
          },
        },
      },
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        tools,
        stream: false,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const data = await response.json();
    const choice = data.choices?.[0];
    let assistantMessage = choice?.message?.content || "";
    let toolResults: any[] = [];

    // Handle tool calls
    if (choice?.message?.tool_calls) {
      for (const toolCall of choice.message.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments);
        
        if (toolCall.function.name === "save_lead") {
          const { error } = await supabase.from("leads").insert({
            first_name: args.first_name,
            last_name: args.last_name || null,
            email: args.email,
            phone: args.phone || null,
            business_name: args.business_name || null,
            business_type: args.business_type || null,
            services: args.services || [],
            notes: args.notes || null,
            source: "chatbot",
            status: "new",
          });

          toolResults.push({
            tool_call_id: toolCall.id,
            result: error ? "Failed to save lead" : "Lead saved successfully",
          });
        }

        if (toolCall.function.name === "book_appointment") {
          // First save/find the lead
          const { data: leadData } = await supabase
            .from("leads")
            .select("id")
            .eq("email", args.email)
            .maybeSingle();

          let leadId = leadData?.id || null;

          if (!leadId) {
            const nameParts = args.name.split(" ");
            const { data: newLead } = await supabase.from("leads").insert({
              first_name: nameParts[0] || args.name,
              last_name: nameParts.slice(1).join(" ") || null,
              email: args.email,
              phone: args.phone || null,
              source: "chatbot",
              status: "new",
            }).select("id").single();
            leadId = newLead?.id || null;
          }

          const { error } = await supabase.from("appointments").insert({
            lead_id: leadId,
            lead_name: args.name,
            lead_email: args.email,
            lead_phone: args.phone || null,
            appointment_date: args.date,
            appointment_time: args.time,
            duration_minutes: 30,
            notes: args.notes || null,
            status: "scheduled",
          });

          toolResults.push({
            tool_call_id: toolCall.id,
            result: error ? "Failed to book appointment" : `Appointment booked for ${args.date} at ${args.time}`,
          });
        }
      }

      // If there were tool calls, get a follow-up response
      if (toolResults.length > 0) {
        const followUpMessages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
          choice.message,
          ...toolResults.map((tr) => ({
            role: "tool",
            tool_call_id: tr.tool_call_id,
            content: tr.result,
          })),
        ];

        const followUp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: followUpMessages,
            stream: false,
          }),
        });

        if (followUp.ok) {
          const followUpData = await followUp.json();
          assistantMessage = followUpData.choices?.[0]?.message?.content || assistantMessage;
        }
      }
    }

    // Save chat session
    if (sessionId) {
      const allMessages = [...messages, { role: "assistant", content: assistantMessage }];
      await supabase.from("chat_sessions").upsert({
        id: sessionId,
        messages: allMessages,
        qualified: toolResults.length > 0,
        updated_at: new Date().toISOString(),
      });
    }

    return new Response(JSON.stringify({ message: assistantMessage, toolResults }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chatbot error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
