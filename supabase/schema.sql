-- ==============================================================================
-- MEDICAL OS — SAAS MÉDICAL MULTI-TENANT (MAROC)
-- SCHÉMA DE BASE DE DONNÉES COMPLET & RLS POLICIES (SUPABASE / POSTGRESQL)
-- Isolation stricte par cabinet (organization_id) · 3 000 MAD / an / cabinet
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ORGANIZATIONS (Cabinets médicaux)
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    doctor_owner_name VARCHAR(255) NOT NULL,
    speciality VARCHAR(150) NOT NULL DEFAULT 'Médecine Générale',
    inpe VARCHAR(50),
    cnom VARCHAR(50),
    ice VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Casablanca',
    address TEXT,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subscription_plan VARCHAR(50) DEFAULT 'MEDICAL_OS_PRO',
    subscription_status VARCHAR(50) DEFAULT 'ACTIVE' CHECK (subscription_status IN ('TRIAL', 'ACTIVE', 'PAST_DUE', 'SUSPENDED', 'CANCELLED', 'EXPIRED')),
    subscription_price_mad NUMERIC(10, 2) DEFAULT 3000.00,
    subscription_start DATE NOT NULL DEFAULT CURRENT_DATE,
    subscription_end DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '1 year'),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. USERS (Comptes rattachés aux cabinets)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY', 'SUPER_ADMIN_TECH')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. PATIENTS
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    cin VARCHAR(30),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('M', 'F')),
    phone VARCHAR(30),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100) DEFAULT 'Casablanca',
    emergency_contact VARCHAR(255),
    blood_group VARCHAR(10),
    insurance_amo_type VARCHAR(50) DEFAULT 'AMO CNSS',
    insurance_amo_number VARCHAR(100),
    allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
    medical_history JSONB DEFAULT '{}'::JSONB,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. CONSULTATIONS
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.users(id),
    consultation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reason TEXT NOT NULL,
    symptoms TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    clinical_notes TEXT,
    private_doctor_notes TEXT,
    vitals JSONB DEFAULT '{}'::JSONB,
    tarif_consultation NUMERIC(10, 2) DEFAULT 250.00,
    statut_paiement VARCHAR(30) DEFAULT 'PAYE' CHECK (statut_paiement IN ('PAYE', 'IMPAYE', 'TIERS_PAYANT_AMO')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. PRESCRIPTIONS
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.users(id),
    consultation_id UUID REFERENCES public.consultations(id) ON DELETE SET NULL,
    prescription_date DATE NOT NULL DEFAULT CURRENT_DATE,
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    instructions TEXT,
    electronic_signature TEXT,
    qr_code_hash VARCHAR(255),
    is_delivered BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. AUDIT LOGS (Inviolable)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id),
    user_name VARCHAR(255) NOT NULL,
    user_role VARCHAR(50) NOT NULL,
    action_type VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255),
    details TEXT NOT NULL,
    ip_address VARCHAR(45) NOT NULL DEFAULT '196.200.180.45',
    hash_signature VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- FONCTIONS RLS & POLITIQUES DE SÉCURITÉ
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_auth_user_organization_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT organization_id FROM public.users WHERE id = auth.uid() AND is_active = TRUE LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS VARCHAR(50) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT role FROM public.users WHERE id = auth.uid() AND is_active = TRUE LIMIT 1;
$$;

-- ACTIVER LE RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.patients FORCE ROW LEVEL SECURITY;
ALTER TABLE public.consultations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs FORCE ROW LEVEL SECURITY;

-- POLITIQUES PATIENTS
CREATE POLICY "rls_patients_select" ON public.patients FOR SELECT TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY'));

CREATE POLICY "rls_patients_insert" ON public.patients FOR INSERT TO authenticated
WITH CHECK (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY'));

CREATE POLICY "rls_patients_update" ON public.patients FOR UPDATE TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY'))
WITH CHECK (organization_id = public.get_auth_user_organization_id());

CREATE POLICY "rls_patients_delete" ON public.patients FOR DELETE TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() = 'DOCTOR_OWNER');

-- POLITIQUES CONSULTATIONS
CREATE POLICY "rls_consultations_select" ON public.consultations FOR SELECT TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND (public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE') OR public.get_auth_user_role() = 'SECRETARY'));

CREATE POLICY "rls_consultations_insert" ON public.consultations FOR INSERT TO authenticated
WITH CHECK (organization_id = public.get_auth_user_organization_id() AND doctor_id = auth.uid() AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE'));

CREATE POLICY "rls_consultations_update" ON public.consultations FOR UPDATE TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND (doctor_id = auth.uid() OR public.get_auth_user_role() = 'DOCTOR_OWNER'))
WITH CHECK (organization_id = public.get_auth_user_organization_id());

CREATE POLICY "rls_consultations_delete" ON public.consultations FOR DELETE TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() = 'DOCTOR_OWNER');

-- POLITIQUES PRESCRIPTIONS
CREATE POLICY "rls_prescriptions_select" ON public.prescriptions FOR SELECT TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY'));

CREATE POLICY "rls_prescriptions_insert" ON public.prescriptions FOR INSERT TO authenticated
WITH CHECK (organization_id = public.get_auth_user_organization_id() AND doctor_id = auth.uid() AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE'));

CREATE POLICY "rls_prescriptions_update" ON public.prescriptions FOR UPDATE TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND (doctor_id = auth.uid() OR public.get_auth_user_role() = 'DOCTOR_OWNER'))
WITH CHECK (organization_id = public.get_auth_user_organization_id());

CREATE POLICY "rls_prescriptions_delete" ON public.prescriptions FOR DELETE TO authenticated
USING (organization_id = public.get_auth_user_organization_id() AND public.get_auth_user_role() = 'DOCTOR_OWNER');
