CREATE TABLE public.ghl_website_previews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  headline TEXT,
  description TEXT,
  cta_label TEXT DEFAULT 'Book a Call',
  cta_url TEXT DEFAULT '/book-now',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.ghl_website_previews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active GHL previews are publicly viewable"
ON public.ghl_website_previews
FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage GHL previews"
ON public.ghl_website_previews
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_ghl_website_previews_updated_at
BEFORE UPDATE ON public.ghl_website_previews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();