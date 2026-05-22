CREATE TABLE "commodity_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"land_type_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "land_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_type_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"industry" varchar,
	"description" varchar,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_dosages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"commodity_type_id" uuid NOT NULL,
	"product_brand_id" uuid NOT NULL,
	"dosage" real,
	"unit" varchar,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "province_commodities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"province_id" uuid NOT NULL,
	"commodity_type_id" uuid NOT NULL,
	"area" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "province_lands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"province_id" uuid NOT NULL,
	"land_type_id" uuid NOT NULL,
	"area" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "province_potentials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"province_id" uuid NOT NULL,
	"product_brand_id" uuid NOT NULL,
	"potential" real,
	"description" varchar,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "provinces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(3) NOT NULL,
	"name" varchar NOT NULL,
	"area" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "provinces_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "regencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(5) NOT NULL,
	"province_id" uuid NOT NULL,
	"name" varchar NOT NULL,
	"area" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "regencies_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "regency_commodities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"regency_id" uuid NOT NULL,
	"commodity_type_id" uuid NOT NULL,
	"area" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "regency_lands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"regency_id" uuid NOT NULL,
	"land_type_id" uuid NOT NULL,
	"area" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "regency_potentials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"regency_id" uuid NOT NULL,
	"product_brand_id" uuid NOT NULL,
	"potential" real,
	"description" varchar,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "daily_sales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"product_brand_id" uuid NOT NULL,
	"realization" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sales_realizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_date" date NOT NULL,
	"product_brand_id" uuid NOT NULL,
	"realization_daily" real,
	"month" varchar,
	"realization_monthly" real,
	"rkap_monthly" real,
	"realizaton_ytd" real,
	"rkap_ytd" real,
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"rkap_yearly" real,
	"realization_last_year" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stall_product_brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"stall_id" uuid NOT NULL,
	"product_brand_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stalls" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar,
	"regency_id" uuid NOT NULL,
	"province_id" uuid NOT NULL,
	"latitude" real,
	"longitude" real,
	"owner" varchar,
	"no_telp" varchar,
	"criteria" varchar(1),
	"year" varchar DEFAULT EXTRACT(YEAR FROM CURRENT_DATE)::text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "commodity_types" ADD CONSTRAINT "commodity_types_land_type_id_land_types_id_fk" FOREIGN KEY ("land_type_id") REFERENCES "public"."land_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_brands" ADD CONSTRAINT "product_brands_product_type_id_product_types_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "public"."product_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_dosages" ADD CONSTRAINT "product_dosages_commodity_type_id_commodity_types_id_fk" FOREIGN KEY ("commodity_type_id") REFERENCES "public"."commodity_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_dosages" ADD CONSTRAINT "product_dosages_product_brand_id_product_brands_id_fk" FOREIGN KEY ("product_brand_id") REFERENCES "public"."product_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_commodities" ADD CONSTRAINT "province_commodities_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_commodities" ADD CONSTRAINT "province_commodities_commodity_type_id_commodity_types_id_fk" FOREIGN KEY ("commodity_type_id") REFERENCES "public"."commodity_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_lands" ADD CONSTRAINT "province_lands_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_lands" ADD CONSTRAINT "province_lands_land_type_id_land_types_id_fk" FOREIGN KEY ("land_type_id") REFERENCES "public"."land_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_potentials" ADD CONSTRAINT "province_potentials_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "province_potentials" ADD CONSTRAINT "province_potentials_product_brand_id_product_brands_id_fk" FOREIGN KEY ("product_brand_id") REFERENCES "public"."product_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regencies" ADD CONSTRAINT "regencies_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regency_commodities" ADD CONSTRAINT "regency_commodities_regency_id_regencies_id_fk" FOREIGN KEY ("regency_id") REFERENCES "public"."regencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regency_commodities" ADD CONSTRAINT "regency_commodities_commodity_type_id_commodity_types_id_fk" FOREIGN KEY ("commodity_type_id") REFERENCES "public"."commodity_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regency_lands" ADD CONSTRAINT "regency_lands_regency_id_regencies_id_fk" FOREIGN KEY ("regency_id") REFERENCES "public"."regencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regency_lands" ADD CONSTRAINT "regency_lands_land_type_id_land_types_id_fk" FOREIGN KEY ("land_type_id") REFERENCES "public"."land_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regency_potentials" ADD CONSTRAINT "regency_potentials_regency_id_regencies_id_fk" FOREIGN KEY ("regency_id") REFERENCES "public"."regencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "regency_potentials" ADD CONSTRAINT "regency_potentials_product_brand_id_product_brands_id_fk" FOREIGN KEY ("product_brand_id") REFERENCES "public"."product_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_sales" ADD CONSTRAINT "daily_sales_product_brand_id_product_brands_id_fk" FOREIGN KEY ("product_brand_id") REFERENCES "public"."product_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sales_realizations" ADD CONSTRAINT "sales_realizations_product_brand_id_product_brands_id_fk" FOREIGN KEY ("product_brand_id") REFERENCES "public"."product_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stall_product_brands" ADD CONSTRAINT "stall_product_brands_stall_id_stalls_id_fk" FOREIGN KEY ("stall_id") REFERENCES "public"."stalls"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stall_product_brands" ADD CONSTRAINT "stall_product_brands_product_brand_id_product_brands_id_fk" FOREIGN KEY ("product_brand_id") REFERENCES "public"."product_brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stalls" ADD CONSTRAINT "stalls_regency_id_regencies_id_fk" FOREIGN KEY ("regency_id") REFERENCES "public"."regencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stalls" ADD CONSTRAINT "stalls_province_id_provinces_id_fk" FOREIGN KEY ("province_id") REFERENCES "public"."provinces"("id") ON DELETE no action ON UPDATE no action;