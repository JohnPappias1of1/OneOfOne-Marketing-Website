ALTER TABLE public.ghl_website_previews
ADD COLUMN IF NOT EXISTS is_private boolean NOT NULL DEFAULT false;