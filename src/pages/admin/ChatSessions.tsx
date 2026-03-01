import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ChatSession = {
  id: string;
  lead_id: string | null;
  messages: any[];
  qualified: boolean;
  created_at: string;
};

export default function AdminChatSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selected, setSelected] = useState<ChatSession | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("chat_sessions")
        .select("*")
        .order("created_at", { ascending: false });
      setSessions((data as ChatSession[]) || []);
    };
    fetch();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Chat Sessions</h1>
          <p className="text-muted-foreground mt-1">{sessions.length} conversations</p>
        </div>

        {sessions.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No chat sessions yet.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {sessions.map((session) => {
              const msgs = Array.isArray(session.messages) ? session.messages : [];
              const lastMsg = msgs[msgs.length - 1];
              return (
                <div
                  key={session.id}
                  onClick={() => setSelected(session)}
                  className="glass-card p-4 cursor-pointer hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-sm">
                          {msgs.length} messages
                          <span className="text-muted-foreground ml-2">
                            {new Date(session.created_at).toLocaleString()}
                          </span>
                        </p>
                        {lastMsg && (
                          <p className="text-xs text-muted-foreground truncate max-w-md">
                            {lastMsg.content?.substring(0, 80)}...
                          </p>
                        )}
                      </div>
                    </div>
                    {session.qualified ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">Chat Transcript</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3">
              {(Array.isArray(selected.messages) ? selected.messages : []).map((msg: any, i: number) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg text-sm ${
                    msg.role === "user"
                      ? "bg-primary/10 ml-8"
                      : "bg-muted mr-8"
                  }`}
                >
                  <p className="text-xs text-muted-foreground mb-1 font-medium">
                    {msg.role === "user" ? "Visitor" : "Bot"}
                  </p>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
