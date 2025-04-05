-- Migration to create the stock_items table
CREATE TABLE public.stock_items
(
  id               UUID PRIMARY KEY      DEFAULT uuid_generate_v4(), -- Primary UUID identifier for the stock item
  tenant_id        UUID         NOT NULL,                            -- Foreign key to the tenant table
  company_id       UUID         NOT NULL,                            -- Foreign key to the company table
  name             VARCHAR(255) NOT NULL,                            -- Name of the stock item
  description      TEXT         NOT NULL,                            -- Description of the stock item
  sku              VARCHAR(100) NOT NULL UNIQUE,                     -- Unique Stock Keeping Unit (SKU)
  quantity         INT          NOT NULL,                            -- Quantity of stock
  minimum_quantity INT          NOT NULL,                            -- Minimum stock level
  is_deleted       BOOLEAN      NOT NULL DEFAULT FALSE,              -- Flag indicating if the stock item is deleted
  created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),              -- Timestamp of creation
  updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),              -- Timestamp of last update

  -- Unique constraint for tenant_id and name pair
  CONSTRAINT uq_stock_items_tenant_name UNIQUE (tenant_id, name),

  -- Foreign key constraint to tenant table
  CONSTRAINT fk_stockitem_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  -- Foreign key constraint to company table
  CONSTRAINT fk_stockitem_company FOREIGN KEY (company_id) REFERENCES public.company (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Indexes for faster querying
CREATE INDEX idx_stockitem_tenant_id ON public.stock_items (tenant_id);
CREATE INDEX idx_stockitem_company_id ON public.stock_items (company_id);
CREATE INDEX idx_stockitem_name ON public.stock_items (name);
CREATE INDEX idx_stockitem_deleted ON public.stock_items (is_deleted);

-- Junction table for stock_items and warehouses (Many-to-Many relationship)
CREATE TABLE public.stock_item_warehouse
(
  stock_item_id UUID NOT NULL,              -- Reference to stock_items
  warehouse_id  UUID NOT NULL,              -- Reference to warehouses

  -- Foreign key constraints
  CONSTRAINT fk_stock_item_warehouse_stockitem FOREIGN KEY (stock_item_id)
    REFERENCES public.stock_items (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_stock_item_warehouse_warehouse FOREIGN KEY (warehouse_id)
    REFERENCES public.warehouse (id) ON DELETE CASCADE ON UPDATE CASCADE,

  PRIMARY KEY (stock_item_id, warehouse_id) -- Composite primary key
);
