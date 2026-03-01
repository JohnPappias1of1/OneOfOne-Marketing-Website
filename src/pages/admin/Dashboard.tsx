import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Users, CalendarDays, MessageSquare, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ leads: 0, appointments: 0, chats: 0, qualified: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [leads, appointments, chats] = await Promise.all([
        supabase.from("leads").select("id, status", { count: "exact" }),
        supabase.from("appointments").select("id", { count: "exact" }),
        supabase.from("chat_sessions").select("id, qualified", { count: "exact" }),
      ]);

      const qualifiedCount = (leads.data || []).filter((l) => l.status === "qualified" || l.status === "won").length;

      setStats({
        leads: leads.count || 0,
        appointments: appointments.count || 0,
        chats: chats.count || 0,
        qualified: qualifiedCount,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leads", value: stats.leads, icon: Users, color: "text-primary" },
    { label: "Appointments", value: stats.appointments, icon: CalendarDays, color: "text-primary" },
    { label: "Chat Sessions", value: stats.chats, icon: MessageSquare, color: "text-primary" },
    { label: "Qualified Leads", value: stats.qualified, icon: TrendingUp, color: "text-primary" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome to your CRM overview.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div key={card.label} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{card.label}</span>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="font-display text-3xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
