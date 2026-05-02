CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.website_previews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT NOT NULL,
  loom_url TEXT NOT NULL,
  headline TEXT,
  description TEXT,
  cta_label TEXT DEFAULT 'Book a Call',
  cta_url TEXT DEFAULT '/book-now',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_website_previews_slug ON public.website_previews(slug);

ALTER TABLE public.website_previews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active previews are publicly viewable"
ON public.website_previews FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage previews"
ON public.website_previews FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_website_previews_updated_at
BEFORE UPDATE ON public.website_previews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();