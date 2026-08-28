-- ==============================================================================
-- MEDICAL OS — SAAS MÉDICAL MULTI-TENANT (MAROC)
-- POLITIQUES DE SÉCURITÉ ROW LEVEL SECURITY (RLS) SUPABASE / POSTGRESQL
-- Tables cibles : patients, consultations, prescriptions
-- Auteur : Wolf Digital (Propriétaire de la plateforme)
-- Conformité : Isolation Multi-Tenant Stricte · Loi 09-08 (CNDP) · Secret Médical
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. EXTENSIONS & FONCTIONS UTILITAIRES DE SÉCURITÉ
-- ------------------------------------------------------------------------------

-- Activer l'extension pgcrypto pour UUIDs sécurisés
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table de correspondance utilisateurs / organisations
-- Permet de lier chaque auth.users à son organisation et à son rôle
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY', 'SUPER_ADMIN_TECH')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour accélérer les requêtes RLS
CREATE INDEX IF NOT EXISTS idx_users_org_id ON public.users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_auth_lookup ON public.users(id, organization_id, role, is_active);

-- Fonction SECURITY DEFINER pour récupérer l'organization_id de l'utilisateur authentifié
-- Évite de faire confiance aux valeurs envoyées par le client frontend
CREATE OR REPLACE FUNCTION public.get_auth_user_organization_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT organization_id
    FROM public.users
    WHERE id = auth.uid()
      AND is_active = TRUE
    LIMIT 1;
$$;

-- Fonction SECURITY DEFINER pour récupérer le rôle de l'utilisateur authentifié
CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS VARCHAR(50)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role
    FROM public.users
    WHERE id = auth.uid()
      AND is_active = TRUE
    LIMIT 1;
$$;

-- Fonction pour vérifier si l'utilisateur est médecin dans son organisation
CREATE OR REPLACE FUNCTION public.is_doctor_in_org(target_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = auth.uid()
          AND organization_id = target_org_id
          AND role IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE')
          AND is_active = TRUE
    );
$$;

-- Fonction pour vérifier si l'utilisateur est membre actif de l'organisation
CREATE OR REPLACE FUNCTION public.is_org_member(target_org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.users
        WHERE id = auth.uid()
          AND organization_id = target_org_id
          AND is_active = TRUE
          AND role != 'SUPER_ADMIN_TECH' -- Zéro accès clinique pour le Super Admin technique
    );
$$;

-- ------------------------------------------------------------------------------
-- 2. DÉFINITION DES TABLES MULTI-TENANT (patients, consultations, prescriptions)
-- ------------------------------------------------------------------------------

-- Table: PATIENTS
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,
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

-- Table: CONSULTATIONS
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.users(id),
    consultation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reason TEXT NOT NULL,
    symptoms TEXT,
    diagnosis TEXT,
    treatment_plan TEXT,
    clinical_notes TEXT,
    private_doctor_notes TEXT, -- Notes confidentielles réservées aux médecins
    vitals JSONB DEFAULT '{}'::JSONB,
    tarif_consultation NUMERIC(10, 2) DEFAULT 250.00,
    statut_paiement VARCHAR(30) DEFAULT 'PAYE' CHECK (statut_paiement IN ('PAYE', 'IMPAYE', 'TIERS_PAYANT_AMO')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: PRESCRIPTIONS (Ordonnances)
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL,
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

-- Index pour les performances multi-tenant
CREATE INDEX IF NOT EXISTS idx_patients_org_id ON public.patients(organization_id);
CREATE INDEX IF NOT EXISTS idx_consultations_org_id ON public.consultations(organization_id);
CREATE INDEX IF NOT EXISTS idx_consultations_patient_id ON public.consultations(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_org_id ON public.prescriptions(organization_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON public.prescriptions(patient_id);

-- ------------------------------------------------------------------------------
-- 3. ACTIVATION OBLIGATOIRE DU ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;

-- Forcer le RLS même pour les propriétaires de table (Defense in Depth)
ALTER TABLE public.patients FORCE ROW LEVEL SECURITY;
ALTER TABLE public.consultations FORCE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions FORCE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 4. POLITIQUES RLS : TABLE 'PATIENTS'
-- ------------------------------------------------------------------------------

-- Suppression préalable d'anciennes règles éventuelles
DROP POLICY IF EXISTS "rls_patients_select" ON public.patients;
DROP POLICY IF EXISTS "rls_patients_insert" ON public.patients;
DROP POLICY IF EXISTS "rls_patients_update" ON public.patients;
DROP POLICY IF EXISTS "rls_patients_delete" ON public.patients;

-- [SELECT] Tout membre actif du cabinet (Médecin ou Secrétaire) peut lire les patients de SON cabinet
CREATE POLICY "rls_patients_select"
ON public.patients
FOR SELECT
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
);

-- [INSERT] Médecins et Secrétaires peuvent enregistrer un nouveau patient dans LEUR cabinet
CREATE POLICY "rls_patients_insert"
ON public.patients
FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
);

-- [UPDATE] Médecins et Secrétaires peuvent mettre à jour les coordonnées des patients de LEUR cabinet
CREATE POLICY "rls_patients_update"
ON public.patients
FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
)
WITH CHECK (
    organization_id = public.get_auth_user_organization_id()
);

-- [DELETE] Seul le Médecin Titulaire (DOCTOR_OWNER) peut archiver/supprimer un patient de son cabinet
CREATE POLICY "rls_patients_delete"
ON public.patients
FOR DELETE
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() = 'DOCTOR_OWNER'
);

-- ------------------------------------------------------------------------------
-- 5. POLITIQUES RLS : TABLE 'CONSULTATIONS'
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "rls_consultations_select" ON public.consultations;
DROP POLICY IF EXISTS "rls_consultations_insert" ON public.consultations;
DROP POLICY IF EXISTS "rls_consultations_update" ON public.consultations;
DROP POLICY IF EXISTS "rls_consultations_delete" ON public.consultations;

-- [SELECT] Les consultations sont visibles uniquement par le personnel médical du cabinet
-- Note : Si une secrétaire consulte, les vues applicatives masquent private_doctor_notes
CREATE POLICY "rls_consultations_select"
ON public.consultations
FOR SELECT
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND (
        -- Les médecins ont accès complet
        public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE')
        -- La secrétaire a accès aux métadonnées administratives (date, paiement, statut)
        OR public.get_auth_user_role() = 'SECRETARY'
    )
);

-- [INSERT] Seuls les Médecins peuvent créer une consultation médicale
CREATE POLICY "rls_consultations_insert"
ON public.consultations
FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_auth_user_organization_id()
    AND doctor_id = auth.uid()
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE')
);

-- [UPDATE] Seul le Médecin auteur ou titulaire peut modifier une consultation de son cabinet
CREATE POLICY "rls_consultations_update"
ON public.consultations
FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND (
        doctor_id = auth.uid()
        OR public.get_auth_user_role() = 'DOCTOR_OWNER'
    )
)
WITH CHECK (
    organization_id = public.get_auth_user_organization_id()
);

-- [DELETE] Seul le Médecin Titulaire peut supprimer une consultation de son cabinet
CREATE POLICY "rls_consultations_delete"
ON public.consultations
FOR DELETE
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() = 'DOCTOR_OWNER'
);

-- ------------------------------------------------------------------------------
-- 6. POLITIQUES RLS : TABLE 'PRESCRIPTIONS' (ORDONNANCES)
-- ------------------------------------------------------------------------------

DROP POLICY IF EXISTS "rls_prescriptions_select" ON public.prescriptions;
DROP POLICY IF EXISTS "rls_prescriptions_insert" ON public.prescriptions;
DROP POLICY IF EXISTS "rls_prescriptions_update" ON public.prescriptions;
DROP POLICY IF EXISTS "rls_prescriptions_delete" ON public.prescriptions;

-- [SELECT] Les ordonnances sont accessibles aux médecins et secrétaires (pour impression) de l'organisation
CREATE POLICY "rls_prescriptions_select"
ON public.prescriptions
FOR SELECT
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE', 'SECRETARY')
);

-- [INSERT] Seuls les Médecins peuvent prescrire une ordonnance
CREATE POLICY "rls_prescriptions_insert"
ON public.prescriptions
FOR INSERT
TO authenticated
WITH CHECK (
    organization_id = public.get_auth_user_organization_id()
    AND doctor_id = auth.uid()
    AND public.get_auth_user_role() IN ('DOCTOR_OWNER', 'DOCTOR_ASSOCIATE')
);

-- [UPDATE] Seul le Médecin prescripteur ou titulaire peut modifier l'ordonnance
CREATE POLICY "rls_prescriptions_update"
ON public.prescriptions
FOR UPDATE
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND (
        doctor_id = auth.uid()
        OR public.get_auth_user_role() = 'DOCTOR_OWNER'
    )
)
WITH CHECK (
    organization_id = public.get_auth_user_organization_id()
);

-- [DELETE] Seul le Médecin Titulaire peut supprimer une ordonnance
CREATE POLICY "rls_prescriptions_delete"
ON public.prescriptions
FOR DELETE
TO authenticated
USING (
    organization_id = public.get_auth_user_organization_id()
    AND public.get_auth_user_role() = 'DOCTOR_OWNER'
);

-- ------------------------------------------------------------------------------
-- 7. TRIGGER DE SÉCURITÉ : AUTO-AFFECTATION DE L'ORGANIZATION_ID
-- ------------------------------------------------------------------------------
-- Empêche toute tentative d'injection d'un organization_id tiers lors d'un INSERT

CREATE OR REPLACE FUNCTION public.enforce_organization_id_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    NEW.organization_id := public.get_auth_user_organization_id();
    IF NEW.organization_id IS NULL THEN
        RAISE EXCEPTION 'Action non autorisée: Utilisateur non rattaché à une organisation active.';
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_org_patients ON public.patients;
CREATE TRIGGER trg_enforce_org_patients
BEFORE INSERT ON public.patients
FOR EACH ROW
EXECUTE FUNCTION public.enforce_organization_id_trigger();

DROP TRIGGER IF EXISTS trg_enforce_org_consultations ON public.consultations;
CREATE TRIGGER trg_enforce_org_consultations
BEFORE INSERT ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.enforce_organization_id_trigger();

DROP TRIGGER IF EXISTS trg_enforce_org_prescriptions ON public.prescriptions;
CREATE TRIGGER trg_enforce_org_prescriptions
BEFORE INSERT ON public.prescriptions
FOR EACH ROW
EXECUTE FUNCTION public.enforce_organization_id_trigger();
