import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Search, ChevronDown } from "lucide-react";

type Lead = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  business_name: string | null;
  business_type: string | null;
  services: string[];
  status: string;
  source: string | null;
  admin_notes: string | null;
  notes: string | null;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  qualified: "bg-green-500/20 text-green-400 border-green-500/30",
  proposal: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  won: "bg-primary/20 text-primary border-primary/30",
  lost: "bg-destructive/20 text-destructive border-destructive/30",
};

const statuses = ["new", "contacted", "qualified", "proposal", "won", "lost"];

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const { toast } = useToast();

  const fetchLeads = async () => {
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (filterStatus !== "all") query = query.eq("status", filterStatus);
    const { data } = await query;
    setLeads((data as Lead[]) || []);
  };

  useEffect(() => {
    fetchLeads();
  }, [filterStatus]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    toast({ title: "Status updated" });
    fetchLeads();
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status });
  };

  const saveNotes = async () => {
    if (!selectedLead) return;
    await supabase.from("leads").update({ admin_notes: adminNotes, updated_at: new Date().toISOString() }).eq("id", selectedLead.id);
    toast({ title: "Notes saved" });
    fetchLeads();
  };

  const filtered = leads.filter(
    (l) =>
      l.first_name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.business_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Leads</h1>
            <p className="text-muted-foreground mt-1">{leads.length} total leads</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10 w-64"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input w-40"
            >
              <option value="all">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground p-4">Name</th>
                  <th className="text-left text-sm font-medium text-muted-foreground p-4">Email</th>
                  <th className="text-left text-sm font-medium text-muted-foreground p-4">Business</th>
                  <th className="text-left text-sm font-medium text-muted-foreground p-4">Status</th>
                  <th className="text-left text-sm font-medium text-muted-foreground p-4">Source</th>
                  <th className="text-left text-sm font-medium text-muted-foreground p-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setAdminNotes(lead.admin_notes || "");
                    }}
                    className="border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-medium">{lead.first_name} {lead.last_name || ""}</td>
                    <td className="p-4 text-muted-foreground">{lead.email}</td>
                    <td className="p-4 text-muted-foreground">{lead.business_name || "—"}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[lead.status] || ""}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">{lead.source || "website"}</td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-muted-foreground">
                      No leads found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {selectedLead?.first_name} {selectedLead?.last_name || ""}
            </DialogTitle>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedLead.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Business</p>
                  <p className="font-medium">{selectedLead.business_name || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{selectedLead.business_type || "—"}</p>
                </div>
              </div>

              {selectedLead.services && selectedLead.services.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Services Interested In</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.services.map((s) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Lead's Notes</p>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedLead.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedLead.status === s
                          ? statusColors[s]
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Admin Notes</p>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                  className="form-input resize-none"
                  placeholder="Add internal notes about this lead..."
                />
                <Button onClick={saveNotes} className="btn-primary mt-2" size="sm">
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
