// SQL Script Definition for Supabase Row Level Security (RLS)
export const SUPABASE_RLS_SQL_CONTENT = `-- ==============================================================================
-- MEDICAL OS — SAAS MÉDICAL MULTI-TENANT (MAROC)
-- POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS) SUPABASE / POSTGRESQL
-- Tables cibles : patients, consultations, prescriptions
-- Isolation stricte par cabinet (organization_id) · Loi 09-08 (CNDP) · Secret Médical
-- ==============================================================================

-- 1. FONCTIONS DE SÉCURITÉ SERVER-SIDE (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.get_auth_user_organization_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT organization_id FROM public.users WHERE id = auth.uid() AND is_active = TRUE LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS VARCHAR(50) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
    SELECT role FROM public.users WHERE id = auth.uid() AND is_active = TRUE LIMIT 1;
$$;

-- 2. ACTIVATION STRICTE DU ROW LEVEL SECURITY
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.patients FORCE ROW LEVEL SECURITY;
ALTER TABLE public.consultations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions FORCE ROW LEVEL SECURITY;

-- 3. POLITIQUES RLS : TABLE 'PATIENTS'
DROP POLICY IF EXISTS "rls_patients_select" ON public.patients;
CREATE POLICY "rls_patients_select" ON public.patients FOR SELECT TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
);

DROP POLICY IF EXISTS "rls_patients_insert" ON public.patients;
CREATE POLICY "rls_patients_insert" ON public.patients FOR INSERT TO authenticated
WITH CHECK (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
);

DROP POLICY IF EXISTS "rls_patients_update" ON public.patients;
CREATE POLICY "rls_patients_update" ON public.patients FOR UPDATE TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
)
WITH CHECK (organization_id = public.get_auth_user_organization_id());

DROP POLICY IF EXISTS "rls_patients_delete" ON public.patients;
CREATE POLICY "rls_patients_delete" ON public.patients FOR DELETE TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() = 'DOCTOR_OWNER'
);

-- 4. POLITIQUES RLS : TABLE 'CONSULTATIONS'
DROP POLICY IF EXISTS "rls_consultations_select" ON public.consultations;
CREATE POLICY "rls_consultations_select" ON public.consultations FOR SELECT TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND (public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE') OR public.get_auth_user_role() = 'SECRETARY')
);

DROP POLICY IF EXISTS "rls_consultations_insert" ON public.consultations;
CREATE POLICY "rls_consultations_insert" ON public.consultations FOR INSERT TO authenticated
WITH CHECK (
    organization_id = public.get_auth_user_organization_id() 
    AND doctor_id = auth.uid() 
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE')
);

DROP POLICY IF EXISTS "rls_consultations_update" ON public.consultations FOR UPDATE TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND (doctor_id = auth.uid() OR public.get_auth_user_role() = 'DOCTOR_OWNER')
)
WITH CHECK (organization_id = public.get_auth_user_organization_id());

DROP POLICY IF EXISTS "rls_consultations_delete" ON public.consultations;
CREATE POLICY "rls_consultations_delete" ON public.consultations FOR DELETE TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() = 'DOCTOR_OWNER'
);

-- 5. POLITIQUES RLS : TABLE 'PRESCRIPTIONS' (ORDONNANCES)
DROP POLICY IF EXISTS "rls_prescriptions_select" ON public.prescriptions;
CREATE POLICY "rls_prescriptions_select" ON public.prescriptions FOR SELECT TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
);

DROP POLICY IF EXISTS "rls_prescriptions_insert" ON public.prescriptions;
CREATE POLICY "rls_prescriptions_insert" ON public.prescriptions FOR INSERT TO authenticated
WITH CHECK (
    organization_id = public.get_auth_user_organization_id() 
    AND doctor_id = auth.uid() 
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE')
);

DROP POLICY IF EXISTS "rls_prescriptions_update" ON public.prescriptions FOR UPDATE TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND (doctor_id = auth.uid() OR public.get_auth_user_role() = 'DOCTOR_OWNER')
)
WITH CHECK (organization_id = public.get_auth_user_organization_id());

DROP POLICY IF EXISTS "rls_prescriptions_delete" ON public.prescriptions;
CREATE POLICY "rls_prescriptions_delete" ON public.prescriptions FOR DELETE TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id() 
    AND public.get_auth_user_role() = 'DOCTOR_OWNER'
);

-- 6. DÉCLENCHEURS TRIGGER : ENFORCE ORGANIZATION_ID AUTOMATIQUE
CREATE OR REPLACE FUNCTION public.enforce_organization_id_trigger()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
    NEW.organization_id := public.get_auth_user_organization_id();
    IF NEW.organization_id IS NULL THEN
        RAISE EXCEPTION 'Action non autorisée: Utilisateur non rattaché à une organisation active.';
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_org_patients ON public.patients;
CREATE TRIGGER trg_enforce_org_patients BEFORE INSERT ON public.patients
FOR EACH ROW EXECUTE FUNCTION public.enforce_organization_id_trigger();

DROP TRIGGER IF EXISTS trg_enforce_org_consultations ON public.consultations;
CREATE TRIGGER trg_enforce_org_consultations BEFORE INSERT ON public.consultations
FOR EACH ROW EXECUTE FUNCTION public.enforce_organization_id_trigger();

DROP TRIGGER IF EXISTS trg_enforce_org_prescriptions ON public.prescriptions;
CREATE TRIGGER trg_enforce_org_prescriptions BEFORE INSERT ON public.prescriptions
FOR EACH ROW EXECUTE FUNCTION public.enforce_organization_id_trigger();
`;
