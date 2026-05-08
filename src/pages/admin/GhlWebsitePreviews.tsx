import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, Pencil, Trash2, Plus, ExternalLink } from "lucide-react";

type Preview = {
  id: string;
  slug: string;
  client_name: string;
  preview_url: string;
  headline: string | null;
  description: string | null;
  cta_label: string | null;
  cta_url: string | null;
  cta_business_name: string | null;
  notification_service: string | null;
  is_active: boolean;
  created_at: string;
};

const empty = {
  slug: "",
  client_name: "",
  preview_url: "",
  headline: "",
  description: "",
  cta_label: "See how this would work for [Business Name]",
  cta_url: "/book-now",
  cta_business_name: "",
  notification_service: "roof inspection",
  is_active: true,
};

export default function AdminGhlWebsitePreviews() {
  const [items, setItems] = useState<Preview[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Preview | null>(null);
  const [form, setForm] = useState(empty);
  const { toast } = useToast();

  const fetchItems = async () => {
    const { data } = await supabase
      .from("ghl_website_previews")
      .select("*")
      .order("created_at", { ascending: false });
    setItems((data as Preview[]) || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (p: Preview) => {
    setEditing(p);
    setForm({
      slug: p.slug,
      client_name: p.client_name,
      preview_url: p.preview_url,
      headline: p.headline || "",
      description: p.description || "",
      cta_label: p.cta_label || "See how this would work for [Business Name]",
      cta_url: p.cta_url || "/book-now",
      cta_business_name: p.cta_business_name || "",
      notification_service: p.notification_service || "roof inspection",
      is_active: p.is_active,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.slug || !form.client_name || !form.preview_url) {
      toast({ title: "Slug, client name, and Preview URL are required", variant: "destructive" });
      return;
    }
    if (!/^https?:\/\//.test(form.preview_url)) {
      toast({ title: "Preview URL must start with http:// or https://", variant: "destructive" });
      return;
    }
    const slug = form.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-");
    const payload = { ...form, slug };
    const { error } = editing
      ? await supabase.from("ghl_website_previews").update(payload).eq("id", editing.id)
      : await supabase.from("ghl_website_previews").insert(payload);
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Preview updated" : "Preview created" });
    setOpen(false);
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this preview?")) return;
    await supabase.from("ghl_website_previews").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchItems();
  };

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/site-preview/${slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link copied", description: url });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">GHL Website Previews</h1>
          <p className="text-muted-foreground">Send embedded GHL/external website previews at /site-preview/&lt;slug&gt;</p>
        </div>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />New Preview</Button>
      </div>

      <div className="grid gap-4">
        {items.length === 0 && (
          <div className="text-muted-foreground text-center py-12">No previews yet. Click "New Preview" to create one.</div>
        )}
        {items.map((p) => (
          <div key={p.id} className="glass-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{p.client_name}</h3>
                {!p.is_active && <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">Inactive</span>}
              </div>
              <p className="text-sm text-muted-foreground truncate">/site-preview/{p.slug}</p>
              <p className="text-xs text-muted-foreground truncate mt-1">{p.preview_url}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button size="sm" variant="outline" onClick={() => copyLink(p.slug)}><Copy className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" asChild>
                <a href={`/site-preview/${p.slug}`} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4" /></a>
              </Button>
              <Button size="sm" variant="outline" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => remove(p.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Preview" : "New GHL Website Preview"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Slug *</Label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="acme-co" />
              <p className="text-xs text-muted-foreground mt-1">Final URL: /site-preview/{form.slug || "your-slug"}</p>
            </div>
            <div>
              <Label>Client Name *</Label>
              <Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} placeholder="Acme Co." />
            </div>
            <div>
              <Label>Preview URL *</Label>
              <Input value={form.preview_url} onChange={(e) => setForm({ ...form, preview_url: e.target.value })} placeholder="https://oneofonesystemsweb.vibepreview.com/" />
              <p className="text-xs text-muted-foreground mt-1">Full URL of the GHL/external site to embed.</p>
            </div>
            <div>
              <Label>Headline (optional)</Label>
              <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} placeholder="Your New Website Preview" />
            </div>
            <div>
              <Label>Description (optional)</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Business Name (for CTA)</Label>
              <Input
                value={form.cta_business_name}
                onChange={(e) => setForm({ ...form, cta_business_name: e.target.value })}
                placeholder="Acme Roofing"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Replaces [Business Name] in the CTA. Leave empty to fall back to the client name.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>CTA Label</Label>
                <Input value={form.cta_label} onChange={(e) => setForm({ ...form, cta_label: e.target.value })} />
                <p className="text-xs text-muted-foreground mt-1">Use [Business Name] as a placeholder.</p>
              </div>
              <div>
                <Label>CTA URL</Label>
                <Input value={form.cta_url} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} placeholder="/book-now" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <Label>Active (publicly visible)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editing ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
