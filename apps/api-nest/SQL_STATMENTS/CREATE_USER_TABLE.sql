CREATE TABLE public.users (
                            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                            email VARCHAR(255) UNIQUE NOT NULL,
                            name VARCHAR(255) NOT NULL,
                            auth0_user_id VARCHAR(255) NULL,
                            role roles_enum NOT NULL, -- Uses ENUM type
                            is_deleted BOOLEAN DEFAULT FALSE,
                            is_email_verified BOOLEAN DEFAULT FALSE,
                            tenant_id UUID NOT NULL,
                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                            CONSTRAINT fk_tenant FOREIGN KEY (tenant_id) REFERENCES public.tenants(id) ON DELETE CASCADE
);

ALTER TABLE public.users
  ADD CONSTRAINT unique_auth0_user_id UNIQUE (auth0_user_id);
