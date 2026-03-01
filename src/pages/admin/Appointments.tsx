import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays } from "lucide-react";

type Appointment = {
  id: string;
  lead_name: string;
  lead_email: string;
  lead_phone: string | null;
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: string;
  notes: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  scheduled: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-primary/20 text-primary border-primary/30",
  cancelled: "bg-destructive/20 text-destructive border-destructive/30",
  no_show: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const appointmentStatuses = ["scheduled", "confirmed", "completed", "cancelled", "no_show"];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", { ascending: true });
    setAppointments((data as Appointment[]) || []);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("appointments").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    toast({ title: "Appointment updated" });
    fetchAppointments();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-1">{appointments.length} total appointments</p>
        </div>

        {appointments.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No appointments yet. They'll appear here when leads book through the chatbot.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map((apt) => (
              <div key={apt.id} className="glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-lg">{apt.lead_name}</h3>
                    <p className="text-sm text-muted-foreground">{apt.lead_email} {apt.lead_phone ? `• ${apt.lead_phone}` : ""}</p>
                    <p className="text-sm mt-1">
                      <span className="text-primary font-medium">
                        {new Date(apt.appointment_date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                      </span>
                      {" at "}
                      <span className="font-medium">{apt.appointment_time}</span>
                      <span className="text-muted-foreground"> ({apt.duration_minutes} min)</span>
                    </p>
                    {apt.notes && <p className="text-sm text-muted-foreground mt-1">{apt.notes}</p>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {appointmentStatuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(apt.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          apt.status === s
                            ? statusColors[s]
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {s.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
