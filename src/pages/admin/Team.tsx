import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Loader2, Trash2 } from "lucide-react";

type TeamMember = {
  user_id: string;
  role: string;
  email: string | null;
  full_name: string | null;
};

export default function AdminTeam() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchMembers = async () => {
    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role");

    if (!roles) return;

    const userIds = roles.map((r) => r.user_id);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, email, full_name")
      .in("id", userIds);

    const merged = roles.map((r) => {
      const profile = profiles?.find((p) => p.id === r.user_id);
      return {
        user_id: r.user_id,
        role: r.role,
        email: profile?.email || null,
        full_name: profile?.full_name || null,
      };
    });

    setMembers(merged);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const addAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user via edge function
      const { data, error } = await supabase.functions.invoke("create-admin", {
        body: { email, password, fullName },
      });

      if (error) throw error;

      toast({ title: "Admin added", description: `${email} has been added as an admin.` });
      setEmail("");
      setPassword("");
      setFullName("");
      fetchMembers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add admin",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-1">Manage admin access</p>
        </div>

        {/* Add Admin Form */}
        <div className="glass-card p-6 max-w-lg">
          <h2 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Add New Admin
          </h2>
          <form onSubmit={addAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
                minLength={6}
              />
            </div>
            <Button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add Admin"
              )}
            </Button>
          </form>
        </div>

        {/* Current Admins */}
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-display font-semibold">Current Admins</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-sm font-medium text-muted-foreground p-4">Name</th>
                <th className="text-left text-sm font-medium text-muted-foreground p-4">Email</th>
                <th className="text-left text-sm font-medium text-muted-foreground p-4">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.user_id} className="border-b border-border/50">
                  <td className="p-4 font-medium">{m.full_name || "—"}</td>
                  <td className="p-4 text-muted-foreground">{m.email || "—"}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                      {m.role}
                    </span>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-muted-foreground">
                    No team members found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
