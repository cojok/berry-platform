-- Create 'warehouse' table
CREATE TABLE public.warehouse
(
  id         UUID PRIMARY KEY      DEFAULT uuid_generate_v4(),
  tenant_id  UUID         NOT NULL,
  company_id UUID         NOT NULL,
  name       VARCHAR(255) NOT NULL,
  location   VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT now(),
  CONSTRAINT unique_tenant_warehouse_name UNIQUE (tenant_id, name),
  CONSTRAINT fk_warehouse_tenant FOREIGN KEY (tenant_id)
    REFERENCES public.tenants (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_warehouse_company FOREIGN KEY (company_id)
    REFERENCES public.companies (id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add indexes
CREATE INDEX idx_warehouse_tenant_id ON public.warehouse (tenant_id);
CREATE INDEX idx_warehouse_company_id ON public.warehouse (company_id);
CREATE INDEX idx_warehouse_name ON public.warehouse (name);
CREATE INDEX idx_warehouse_deleted ON public.warehouse (is_deleted);


-- Alter table to add 'deleted_at' column with NULLABLE values
ALTER TABLE public.warehouse
  ADD COLUMN deleted_at TIMESTAMPTZ DEFAULT NULL;
