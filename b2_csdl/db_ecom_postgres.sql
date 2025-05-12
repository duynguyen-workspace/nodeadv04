-- -------------------------------------------------------------
-- TablePlus 6.4.4(604)
--
-- https://tableplus.com/
--
-- Database: db_ecom
-- Generation Time: 2025-05-12 22:04:07.6800
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."customers";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS customers_customer_id_seq;

-- Table Definition
CREATE TABLE "public"."customers" (
    "customer_id" int4 NOT NULL DEFAULT nextval('customers_customer_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "email" varchar(255),
    "phone" varchar(20),
    PRIMARY KEY ("customer_id")
);

DROP TABLE IF EXISTS "public"."orders";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS orders_order_id_seq;

-- Table Definition
CREATE TABLE "public"."orders" (
    "order_id" int4 NOT NULL DEFAULT nextval('orders_order_id_seq'::regclass),
    "customer_id" int4 NOT NULL,
    "product_id" int4 NOT NULL,
    "order_date" date NOT NULL,
    "quantity" int4 NOT NULL,
    PRIMARY KEY ("order_id")
);

DROP TABLE IF EXISTS "public"."products";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS products_id_seq;

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    "name" varchar(255) NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "manufacturer" varchar(255),
    "attributes" jsonb,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."customers" ("customer_id", "name", "email", "phone") VALUES
(1, 'Nguyen Van A', 'a.nguyen@example.com', '0909123456'),
(2, 'Tran Thi B', 'b.tran@example.com', '0909234567'),
(3, 'Le Van C', 'c.le@example.com', '0911122334'),
(4, 'Pham Thi D', 'd.pham@example.com', '0911987654'),
(5, 'Hoang Van E', 'e.hoang@example.com', '0933445566');

INSERT INTO "public"."orders" ("order_id", "customer_id", "product_id", "order_date", "quantity") VALUES
(1, 1, 1, '2024-04-01', 1),
(2, 2, 3, '2024-04-02', 2),
(3, 3, 5, '2024-04-05', 1),
(4, 4, 2, '2024-04-07', 1),
(5, 5, 4, '2024-04-09', 3);

INSERT INTO "public"."products" ("id", "name", "price", "manufacturer", "attributes") VALUES
(1, 'iPhone 15', 999.99, 'Apple', '{"color": "black", "storage": "128GB"}'),
(2, 'Galaxy S23', 849.99, 'Samsung', '{"color": "silver", "storage": "256GB"}'),
(3, 'MacBook Air M2', 1199.00, 'Apple', '{"ram": "8GB", "size": "13-inch"}'),
(4, 'Dell XPS 13', 1099.00, 'Dell', '{"cpu": "i7", "ram": "16GB"}'),
(5, 'AirPods Pro', 249.00, 'Apple', '{"version": "2nd Gen", "noise_canceling": true}'),
(6, 'product abc', 189.00, 'Apple', NULL),
(7, 'product abc', 189.00, 'Apple', NULL);



-- Indices
CREATE UNIQUE INDEX customers_email_key ON public.customers USING btree (email);
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("product_id") REFERENCES "public"."products"("id");
ALTER TABLE "public"."orders" ADD FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("customer_id");
