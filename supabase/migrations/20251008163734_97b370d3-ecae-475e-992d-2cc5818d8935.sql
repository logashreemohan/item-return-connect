-- 🔹 Enable UUID extension (needed for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 🔹 Lost Items Table
CREATE TABLE IF NOT EXISTS public.lost_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date_lost DATE NOT NULL,
  contact_info TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 🔹 Found Items Table
CREATE TABLE IF NOT EXISTS public.found_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date_found DATE NOT NULL,
  contact_info TEXT NOT NULL,
  image_url TEXT,
  status TEXT DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ✅ Grant access to authenticated users
ALTER TABLE public.lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.found_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert lost items"
  ON public.lost_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert found items"
  ON public.found_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ✅ Allow reading all active items
CREATE POLICY "Anyone can view active lost items"
  ON public.lost_items FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Anyone can view active found items"
  ON public.found_items FOR SELECT
  TO authenticated
  USING (status = 'active');

-- 🔄 Force Supabase to reload schema
NOTIFY pgrst, 'reload schema';
