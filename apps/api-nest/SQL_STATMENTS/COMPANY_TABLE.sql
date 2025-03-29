CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.company (
                              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                              name VARCHAR(255) NOT NULL,
                              address VARCHAR(255),
                              email VARCHAR(255),
                              phone VARCHAR(50),
                              tax_id VARCHAR(100),
                              tenant_id UUID NOT NULL,
                              is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
                              is_owner BOOLEAN NOT NULL DEFAULT FALSE,
                              is_admin_user_created BOOLEAN NOT NULL DEFAULT FALSE,
                              created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
                              updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

                              CONSTRAINT fk_company_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Indexes
CREATE INDEX idx_company_name ON public.company (name);
CREATE INDEX idx_company_tenant_id ON public.company (tenant_id);
CREATE INDEX idx_company_deleted ON public.company (is_deleted);
