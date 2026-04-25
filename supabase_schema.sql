-- 1. Create Custom Enums for Portal Types and Escrow Status
CREATE TYPE portal_type AS ENUM ('MARKET', 'TRAVEL', 'FOOD', 'REALTY', 'EDUCATION', 'TRANSFER', 'HOBBY');
CREATE TYPE escrow_status AS ENUM ('PENDING', 'HELD', 'RELEASED', 'REFUNDED');

-- 2. Create 'profiles' table
-- Using UUID as primary key, linked to Supabase Auth.uid()
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY,
    pi_uid TEXT UNIQUE NOT NULL,
    nickname TEXT,
    mng_balance FLOAT8 DEFAULT 0 NOT NULL,
    pi_balance FLOAT8 DEFAULT 0 NOT NULL,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create 'orders' table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    portal_type portal_type NOT NULL,
    total_pi FLOAT8 DEFAULT 0 NOT NULL,
    total_mng FLOAT8 DEFAULT 0 NOT NULL,
    status escrow_status DEFAULT 'PENDING' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Optional: Add metadata for item tracking as requested in Prisma context
    market_product_id TEXT,
    travel_booking_id TEXT,
    education_course_id TEXT
);

-- 3.1 Create 'point_logs' table for ledger tracking
CREATE TABLE public.point_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    amount FLOAT8 NOT NULL,
    currency TEXT NOT NULL, -- 'PI' or 'MNG'
    portal portal_type NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- 5. Set up RLS Policies for 'profiles'
-- Allow users to view only their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Allow users to update only their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 6. Set up RLS Policies for 'orders'
-- Allow users to view only their own orders
CREATE POLICY "Users can view own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = buyer_id);

-- Allow users to create orders
CREATE POLICY "Users can create own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = buyer_id);

-- 7. Enable Realtime for the 'profiles' table
-- This allows the frontend to listen for balance changes instantly via Supabase Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- 7.1 Set up RLS for 'point_logs'
ALTER TABLE public.point_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own logs" ON public.point_logs
FOR SELECT USING (auth.uid() = user_id);

-- 8. Helper Trigger for updated_at on profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- 9. Stored Procedure for Atomic Hybrid Payment (ACID Transaction)
CREATE OR REPLACE FUNCTION public.process_hybrid_payment(
    p_user_id UUID,
    p_pi_amount FLOAT8,
    p_mng_amount FLOAT8,
    p_product_id TEXT,
    p_portal portal_type
) RETURNS JSONB AS $$
DECLARE
    v_pi_bal FLOAT8;
    v_mng_bal FLOAT8;
    v_order_id UUID;
BEGIN
    -- 1. Fetch and Lock profile for update (Prevents race conditions)
    SELECT pi_balance, mng_balance INTO v_pi_bal, v_mng_bal
    FROM public.profiles WHERE id = p_user_id FOR UPDATE;

    -- 2. Validation
    IF v_pi_bal < p_pi_amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'Insufficient Pi balance');
    END IF;
    
    IF v_mng_bal < p_mng_amount THEN
        RETURN jsonb_build_object('success', false, 'error', 'Insufficient MNG balance');
    END IF;

    -- 3. Balance Deduction
    UPDATE public.profiles 
    SET pi_balance = pi_balance - p_pi_amount,
        mng_balance = mng_balance - p_mng_amount
    WHERE id = p_user_id;

    -- 4. Order Creation (HELD for Escrow)
    INSERT INTO public.orders (buyer_id, portal_type, total_pi, total_mng, status, market_product_id)
    VALUES (p_user_id, p_portal, p_pi_amount, p_mng_amount, 'HELD', p_product_id)
    RETURNING id INTO v_order_id;

    -- 5. Ledger Logging (Two entries if hybrid)
    IF p_pi_amount > 0 THEN
        INSERT INTO public.point_logs (user_id, amount, currency, portal, description)
        VALUES (p_user_id, -p_pi_amount, 'PI', p_portal, 'Hybrid payment portion (Pi)');
    END IF;

    IF p_mng_amount > 0 THEN
        INSERT INTO public.point_logs (user_id, amount, currency, portal, description)
        VALUES (p_user_id, -p_mng_amount, 'MNG', p_portal, 'Hybrid payment portion (MNG)');
    END IF;

    RETURN jsonb_build_object('success', true, 'order_id', v_order_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: Ensure that your Supabase Auth setup is configured to map users to the 'profiles' table 
-- typically via a database trigger on the 'auth.users' table.