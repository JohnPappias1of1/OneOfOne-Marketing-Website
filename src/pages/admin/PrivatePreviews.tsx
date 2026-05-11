import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, Globe, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Preview = {
  id: string;
  slug: string;
  client_name: string;
  preview_url: string;
  headline: string | null;
  description: string | null;
  is_active: boolean;
};

export default function AdminPrivatePreviews() {
  const [items, setItems] = useState<Preview[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("ghl_website_previews")
        .select("id, slug, client_name, preview_url, headline, description, is_active")
        .eq("is_private", true)
        .order("created_at", { ascending: false });
      setItems((data as Preview[]) || []);
      setLoading(false);
    })();
  }, []);

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/site-preview/${slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Private link copied", description: url });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold flex items-center gap-2">
            <Lock className="w-6 h-6 text-primary" /> Private Previews
          </h1>
          <p className="text-muted-foreground">
            Internal gallery — these are hidden from the public Our Work page. Share links 1-on-1 with prospects.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/admin/ghl-previews">Manage all previews <ArrowRight className="w-4 h-4 ml-2" /></Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass-card p-6 h-64 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">No private previews yet</h3>
          <p className="text-muted-foreground mb-6">
            Mark a preview as "Private" in GHL Previews to send it 1-on-1 without showing it on the public site.
          </p>
          <Button asChild><Link to="/admin/ghl-previews">Go to GHL Previews</Link></Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <div
              key={p.id}
              className="glass-card p-6 group hover:border-primary/50 transition-all flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                {!p.is_active && (
                  <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                {p.client_name}
              </p>
              {p.headline && (
                <h3 className="font-display text-xl font-bold mb-3">{p.headline}</h3>
              )}
              {p.description && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{p.description}</p>
              )}
              <p className="text-xs text-muted-foreground/80 truncate mb-4">/site-preview/{p.slug}</p>
              <div className="mt-auto flex gap-2">
                <Button size="sm" className="flex-1" onClick={() => copyLink(p.slug)}>
                  <Copy className="w-4 h-4 mr-2" /> Copy link
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={`/site-preview/${p.slug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
