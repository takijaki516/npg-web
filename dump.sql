--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP EVENT TRIGGER IF EXISTS "pgrst_drop_watch";
DROP EVENT TRIGGER IF EXISTS "pgrst_ddl_watch";
DROP EVENT TRIGGER IF EXISTS "issue_pg_net_access";
DROP EVENT TRIGGER IF EXISTS "issue_pg_graphql_access";
DROP EVENT TRIGGER IF EXISTS "issue_pg_cron_access";
DROP EVENT TRIGGER IF EXISTS "issue_graphql_placeholder";
DROP PUBLICATION IF EXISTS "supabase_realtime";
DROP POLICY IF EXISTS "profiles_update_own_data" ON "public"."profiles";
DROP POLICY IF EXISTS "profiles_get_own_data" ON "public"."profiles";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."user_goals";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."meals";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."llm_daily_exercies";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."health_info";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."foods";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."each_weights_exercises_set_info";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."each_weights_exercises";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."daily_weights_exercises";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."daily_intakes";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."daily_cardio_exercises";
DROP POLICY IF EXISTS "Enable users to view their own data only" ON "public"."chats";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."user_goals";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."meals";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."health_info";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."foods";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."each_weights_exercises_set_info";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."each_weights_exercises";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."daily_weights_exercises";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."daily_intakes";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."daily_cardio_exercises";
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "public"."chats";
DROP POLICY IF EXISTS "Enable insert for owner users only" ON "public"."llm_daily_exercies";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads_parts" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_parts_upload_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads_parts" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_parts_bucket_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_bucket_id_fkey";
ALTER TABLE IF EXISTS ONLY "storage"."objects" DROP CONSTRAINT IF EXISTS "objects_bucketId_fkey";
ALTER TABLE IF EXISTS ONLY "public"."daily_weights_exercises" DROP CONSTRAINT IF EXISTS "weights_exercises_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."user_goals" DROP CONSTRAINT IF EXISTS "user_goals_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."profiles" DROP CONSTRAINT IF EXISTS "profiles_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."messages" DROP CONSTRAINT IF EXISTS "messages_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."messages" DROP CONSTRAINT IF EXISTS "messages_chat_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."meals" DROP CONSTRAINT IF EXISTS "meals_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."health_info" DROP CONSTRAINT IF EXISTS "health_info_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."foods" DROP CONSTRAINT IF EXISTS "foods_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."foods" DROP CONSTRAINT IF EXISTS "foods_meal_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."llm_daily_exercies" DROP CONSTRAINT IF EXISTS "exercises_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."each_weights_exercises" DROP CONSTRAINT IF EXISTS "each_weights_exercises_weights_exercises_fkey";
ALTER TABLE IF EXISTS ONLY "public"."each_weights_exercises" DROP CONSTRAINT IF EXISTS "each_weights_exercises_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."each_weights_exercises_set_info" DROP CONSTRAINT IF EXISTS "each_weights_exercises_set_info_weights_exercises_fkey";
ALTER TABLE IF EXISTS ONLY "public"."each_weights_exercises_set_info" DROP CONSTRAINT IF EXISTS "each_weights_exercises_set_info_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."daily_intakes" DROP CONSTRAINT IF EXISTS "daily_intakes_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."chats" DROP CONSTRAINT IF EXISTS "chats_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "public"."daily_cardio_exercises" DROP CONSTRAINT IF EXISTS "cardio_exercises_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."sso_domains" DROP CONSTRAINT IF EXISTS "sso_domains_sso_provider_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."sessions" DROP CONSTRAINT IF EXISTS "sessions_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_relay_states" DROP CONSTRAINT IF EXISTS "saml_relay_states_sso_provider_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_relay_states" DROP CONSTRAINT IF EXISTS "saml_relay_states_flow_state_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_providers" DROP CONSTRAINT IF EXISTS "saml_providers_sso_provider_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_session_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."one_time_tokens" DROP CONSTRAINT IF EXISTS "one_time_tokens_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_factors" DROP CONSTRAINT IF EXISTS "mfa_factors_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_challenges" DROP CONSTRAINT IF EXISTS "mfa_challenges_auth_factor_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_amr_claims" DROP CONSTRAINT IF EXISTS "mfa_amr_claims_session_id_fkey";
ALTER TABLE IF EXISTS ONLY "auth"."identities" DROP CONSTRAINT IF EXISTS "identities_user_id_fkey";
ALTER TABLE IF EXISTS ONLY "_realtime"."extensions" DROP CONSTRAINT IF EXISTS "extensions_tenant_external_id_fkey";
DROP TRIGGER IF EXISTS "update_objects_updated_at" ON "storage"."objects";
DROP TRIGGER IF EXISTS "tr_check_filters" ON "realtime"."subscription";
DROP TRIGGER IF EXISTS "on_auth_user_created" ON "auth"."users";
DROP INDEX IF EXISTS "supabase_functions"."supabase_functions_hooks_request_id_idx";
DROP INDEX IF EXISTS "supabase_functions"."supabase_functions_hooks_h_table_id_h_name_idx";
DROP INDEX IF EXISTS "storage"."name_prefix_search";
DROP INDEX IF EXISTS "storage"."idx_objects_bucket_id_name";
DROP INDEX IF EXISTS "storage"."idx_multipart_uploads_list";
DROP INDEX IF EXISTS "storage"."bucketid_objname";
DROP INDEX IF EXISTS "storage"."bname";
DROP INDEX IF EXISTS "realtime"."subscription_subscription_id_entity_filters_key";
DROP INDEX IF EXISTS "realtime"."ix_realtime_subscription_entity";
DROP INDEX IF EXISTS "auth"."users_is_anonymous_idx";
DROP INDEX IF EXISTS "auth"."users_instance_id_idx";
DROP INDEX IF EXISTS "auth"."users_instance_id_email_idx";
DROP INDEX IF EXISTS "auth"."users_email_partial_key";
DROP INDEX IF EXISTS "auth"."user_id_created_at_idx";
DROP INDEX IF EXISTS "auth"."unique_phone_factor_per_user";
DROP INDEX IF EXISTS "auth"."sso_providers_resource_id_idx";
DROP INDEX IF EXISTS "auth"."sso_domains_sso_provider_id_idx";
DROP INDEX IF EXISTS "auth"."sso_domains_domain_idx";
DROP INDEX IF EXISTS "auth"."sessions_user_id_idx";
DROP INDEX IF EXISTS "auth"."sessions_not_after_idx";
DROP INDEX IF EXISTS "auth"."saml_relay_states_sso_provider_id_idx";
DROP INDEX IF EXISTS "auth"."saml_relay_states_for_email_idx";
DROP INDEX IF EXISTS "auth"."saml_relay_states_created_at_idx";
DROP INDEX IF EXISTS "auth"."saml_providers_sso_provider_id_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_updated_at_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_session_id_revoked_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_parent_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_instance_id_user_id_idx";
DROP INDEX IF EXISTS "auth"."refresh_tokens_instance_id_idx";
DROP INDEX IF EXISTS "auth"."recovery_token_idx";
DROP INDEX IF EXISTS "auth"."reauthentication_token_idx";
DROP INDEX IF EXISTS "auth"."one_time_tokens_user_id_token_type_key";
DROP INDEX IF EXISTS "auth"."one_time_tokens_token_hash_hash_idx";
DROP INDEX IF EXISTS "auth"."one_time_tokens_relates_to_hash_idx";
DROP INDEX IF EXISTS "auth"."mfa_factors_user_id_idx";
DROP INDEX IF EXISTS "auth"."mfa_factors_user_friendly_name_unique";
DROP INDEX IF EXISTS "auth"."mfa_challenge_created_at_idx";
DROP INDEX IF EXISTS "auth"."idx_user_id_auth_method";
DROP INDEX IF EXISTS "auth"."idx_auth_code";
DROP INDEX IF EXISTS "auth"."identities_user_id_idx";
DROP INDEX IF EXISTS "auth"."identities_email_idx";
DROP INDEX IF EXISTS "auth"."flow_state_created_at_idx";
DROP INDEX IF EXISTS "auth"."factor_id_created_at_idx";
DROP INDEX IF EXISTS "auth"."email_change_token_new_idx";
DROP INDEX IF EXISTS "auth"."email_change_token_current_idx";
DROP INDEX IF EXISTS "auth"."confirmation_token_idx";
DROP INDEX IF EXISTS "auth"."audit_logs_instance_id_idx";
DROP INDEX IF EXISTS "_realtime"."tenants_external_id_index";
DROP INDEX IF EXISTS "_realtime"."extensions_tenant_external_id_type_index";
DROP INDEX IF EXISTS "_realtime"."extensions_tenant_external_id_index";
ALTER TABLE IF EXISTS ONLY "supabase_functions"."migrations" DROP CONSTRAINT IF EXISTS "migrations_pkey";
ALTER TABLE IF EXISTS ONLY "supabase_functions"."hooks" DROP CONSTRAINT IF EXISTS "hooks_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."s3_multipart_uploads_parts" DROP CONSTRAINT IF EXISTS "s3_multipart_uploads_parts_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."objects" DROP CONSTRAINT IF EXISTS "objects_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."migrations" DROP CONSTRAINT IF EXISTS "migrations_pkey";
ALTER TABLE IF EXISTS ONLY "storage"."migrations" DROP CONSTRAINT IF EXISTS "migrations_name_key";
ALTER TABLE IF EXISTS ONLY "storage"."buckets" DROP CONSTRAINT IF EXISTS "buckets_pkey";
ALTER TABLE IF EXISTS ONLY "realtime"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "realtime"."subscription" DROP CONSTRAINT IF EXISTS "pk_subscription";
ALTER TABLE IF EXISTS ONLY "realtime"."messages" DROP CONSTRAINT IF EXISTS "messages_pkey";
ALTER TABLE IF EXISTS ONLY "public"."daily_weights_exercises" DROP CONSTRAINT IF EXISTS "weights_exercises_pkey";
ALTER TABLE IF EXISTS ONLY "public"."user_goals" DROP CONSTRAINT IF EXISTS "user_goals_user_email_key";
ALTER TABLE IF EXISTS ONLY "public"."user_goals" DROP CONSTRAINT IF EXISTS "user_goals_pkey";
ALTER TABLE IF EXISTS ONLY "public"."profiles" DROP CONSTRAINT IF EXISTS "profiles_user_id_key";
ALTER TABLE IF EXISTS ONLY "public"."profiles" DROP CONSTRAINT IF EXISTS "profiles_pkey";
ALTER TABLE IF EXISTS ONLY "public"."profiles" DROP CONSTRAINT IF EXISTS "profiles_email_key";
ALTER TABLE IF EXISTS ONLY "public"."messages" DROP CONSTRAINT IF EXISTS "messages_pkey";
ALTER TABLE IF EXISTS ONLY "public"."messages" DROP CONSTRAINT IF EXISTS "messages_message_id_key";
ALTER TABLE IF EXISTS ONLY "public"."meals" DROP CONSTRAINT IF EXISTS "meals_pkey";
ALTER TABLE IF EXISTS ONLY "public"."health_info" DROP CONSTRAINT IF EXISTS "health_info_pkey";
ALTER TABLE IF EXISTS ONLY "public"."foods" DROP CONSTRAINT IF EXISTS "foods_pkey";
ALTER TABLE IF EXISTS ONLY "public"."llm_daily_exercies" DROP CONSTRAINT IF EXISTS "exercise_pkey";
ALTER TABLE IF EXISTS ONLY "public"."each_weights_exercises_set_info" DROP CONSTRAINT IF EXISTS "each_weights_exercises_set_info_pkey";
ALTER TABLE IF EXISTS ONLY "public"."each_weights_exercises" DROP CONSTRAINT IF EXISTS "each_weights_exercises_pkey";
ALTER TABLE IF EXISTS ONLY "public"."daily_intakes" DROP CONSTRAINT IF EXISTS "daily_intakes_pkey";
ALTER TABLE IF EXISTS ONLY "public"."chats" DROP CONSTRAINT IF EXISTS "chats_pkey";
ALTER TABLE IF EXISTS ONLY "public"."chats" DROP CONSTRAINT IF EXISTS "chats_chat_id_key";
ALTER TABLE IF EXISTS ONLY "public"."daily_cardio_exercises" DROP CONSTRAINT IF EXISTS "cardio_exercises_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."users" DROP CONSTRAINT IF EXISTS "users_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."users" DROP CONSTRAINT IF EXISTS "users_phone_key";
ALTER TABLE IF EXISTS ONLY "auth"."sso_providers" DROP CONSTRAINT IF EXISTS "sso_providers_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."sso_domains" DROP CONSTRAINT IF EXISTS "sso_domains_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."sessions" DROP CONSTRAINT IF EXISTS "sessions_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_relay_states" DROP CONSTRAINT IF EXISTS "saml_relay_states_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_providers" DROP CONSTRAINT IF EXISTS "saml_providers_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."saml_providers" DROP CONSTRAINT IF EXISTS "saml_providers_entity_id_key";
ALTER TABLE IF EXISTS ONLY "auth"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_token_unique";
ALTER TABLE IF EXISTS ONLY "auth"."refresh_tokens" DROP CONSTRAINT IF EXISTS "refresh_tokens_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."one_time_tokens" DROP CONSTRAINT IF EXISTS "one_time_tokens_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_factors" DROP CONSTRAINT IF EXISTS "mfa_factors_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_factors" DROP CONSTRAINT IF EXISTS "mfa_factors_last_challenged_at_key";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_challenges" DROP CONSTRAINT IF EXISTS "mfa_challenges_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_amr_claims" DROP CONSTRAINT IF EXISTS "mfa_amr_claims_session_id_authentication_method_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."instances" DROP CONSTRAINT IF EXISTS "instances_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."identities" DROP CONSTRAINT IF EXISTS "identities_provider_id_provider_unique";
ALTER TABLE IF EXISTS ONLY "auth"."identities" DROP CONSTRAINT IF EXISTS "identities_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."flow_state" DROP CONSTRAINT IF EXISTS "flow_state_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."audit_log_entries" DROP CONSTRAINT IF EXISTS "audit_log_entries_pkey";
ALTER TABLE IF EXISTS ONLY "auth"."mfa_amr_claims" DROP CONSTRAINT IF EXISTS "amr_id_pk";
ALTER TABLE IF EXISTS ONLY "_realtime"."tenants" DROP CONSTRAINT IF EXISTS "tenants_pkey";
ALTER TABLE IF EXISTS ONLY "_realtime"."schema_migrations" DROP CONSTRAINT IF EXISTS "schema_migrations_pkey";
ALTER TABLE IF EXISTS ONLY "_realtime"."extensions" DROP CONSTRAINT IF EXISTS "extensions_pkey";
ALTER TABLE IF EXISTS "supabase_functions"."hooks" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE IF EXISTS "auth"."refresh_tokens" ALTER COLUMN "id" DROP DEFAULT;
DROP VIEW IF EXISTS "vault"."decrypted_secrets";
DROP TABLE IF EXISTS "supabase_functions"."migrations";
DROP SEQUENCE IF EXISTS "supabase_functions"."hooks_id_seq";
DROP TABLE IF EXISTS "supabase_functions"."hooks";
DROP TABLE IF EXISTS "storage"."s3_multipart_uploads_parts";
DROP TABLE IF EXISTS "storage"."s3_multipart_uploads";
DROP TABLE IF EXISTS "storage"."objects";
DROP TABLE IF EXISTS "storage"."migrations";
DROP TABLE IF EXISTS "storage"."buckets";
DROP TABLE IF EXISTS "realtime"."subscription";
DROP TABLE IF EXISTS "realtime"."schema_migrations";
DROP TABLE IF EXISTS "realtime"."messages";
DROP TABLE IF EXISTS "public"."user_goals";
DROP TABLE IF EXISTS "public"."profiles";
DROP TABLE IF EXISTS "public"."messages";
DROP TABLE IF EXISTS "public"."meals";
DROP TABLE IF EXISTS "public"."llm_daily_exercies";
DROP TABLE IF EXISTS "public"."health_info";
DROP TABLE IF EXISTS "public"."foods";
DROP TABLE IF EXISTS "public"."each_weights_exercises_set_info";
DROP TABLE IF EXISTS "public"."each_weights_exercises";
DROP TABLE IF EXISTS "public"."daily_weights_exercises";
DROP TABLE IF EXISTS "public"."daily_intakes";
DROP TABLE IF EXISTS "public"."daily_cardio_exercises";
DROP TABLE IF EXISTS "public"."chats";
DROP TABLE IF EXISTS "auth"."users";
DROP TABLE IF EXISTS "auth"."sso_providers";
DROP TABLE IF EXISTS "auth"."sso_domains";
DROP TABLE IF EXISTS "auth"."sessions";
DROP TABLE IF EXISTS "auth"."schema_migrations";
DROP TABLE IF EXISTS "auth"."saml_relay_states";
DROP TABLE IF EXISTS "auth"."saml_providers";
DROP SEQUENCE IF EXISTS "auth"."refresh_tokens_id_seq";
DROP TABLE IF EXISTS "auth"."refresh_tokens";
DROP TABLE IF EXISTS "auth"."one_time_tokens";
DROP TABLE IF EXISTS "auth"."mfa_factors";
DROP TABLE IF EXISTS "auth"."mfa_challenges";
DROP TABLE IF EXISTS "auth"."mfa_amr_claims";
DROP TABLE IF EXISTS "auth"."instances";
DROP TABLE IF EXISTS "auth"."identities";
DROP TABLE IF EXISTS "auth"."flow_state";
DROP TABLE IF EXISTS "auth"."audit_log_entries";
DROP TABLE IF EXISTS "_realtime"."tenants";
DROP TABLE IF EXISTS "_realtime"."schema_migrations";
DROP TABLE IF EXISTS "_realtime"."extensions";
DROP FUNCTION IF EXISTS "vault"."secrets_encrypt_secret_secret"();
DROP FUNCTION IF EXISTS "supabase_functions"."http_request"();
DROP FUNCTION IF EXISTS "storage"."update_updated_at_column"();
DROP FUNCTION IF EXISTS "storage"."search"("prefix" "text", "bucketname" "text", "limits" integer, "levels" integer, "offsets" integer, "search" "text", "sortcolumn" "text", "sortorder" "text");
DROP FUNCTION IF EXISTS "storage"."operation"();
DROP FUNCTION IF EXISTS "storage"."list_objects_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer, "start_after" "text", "next_token" "text");
DROP FUNCTION IF EXISTS "storage"."list_multipart_uploads_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer, "next_key_token" "text", "next_upload_token" "text");
DROP FUNCTION IF EXISTS "storage"."get_size_by_bucket"();
DROP FUNCTION IF EXISTS "storage"."foldername"("name" "text");
DROP FUNCTION IF EXISTS "storage"."filename"("name" "text");
DROP FUNCTION IF EXISTS "storage"."extension"("name" "text");
DROP FUNCTION IF EXISTS "storage"."can_insert_object"("bucketid" "text", "name" "text", "owner" "uuid", "metadata" "jsonb");
DROP FUNCTION IF EXISTS "realtime"."topic"();
DROP FUNCTION IF EXISTS "realtime"."to_regrole"("role_name" "text");
DROP FUNCTION IF EXISTS "realtime"."subscription_check_filters"();
DROP FUNCTION IF EXISTS "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean);
DROP FUNCTION IF EXISTS "realtime"."quote_wal2json"("entity" "regclass");
DROP FUNCTION IF EXISTS "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer);
DROP FUNCTION IF EXISTS "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]);
DROP FUNCTION IF EXISTS "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text");
DROP FUNCTION IF EXISTS "realtime"."cast"("val" "text", "type_" "regtype");
DROP FUNCTION IF EXISTS "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]);
DROP FUNCTION IF EXISTS "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text");
DROP FUNCTION IF EXISTS "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer);
DROP FUNCTION IF EXISTS "public"."handle_new_user"();
DROP FUNCTION IF EXISTS "public"."add_meals"("body" "json");
DROP FUNCTION IF EXISTS "public"."add_daily_workouts"("body" "json");
DROP FUNCTION IF EXISTS "pgbouncer"."get_auth"("p_usename" "text");
DROP FUNCTION IF EXISTS "extensions"."set_graphql_placeholder"();
DROP FUNCTION IF EXISTS "extensions"."pgrst_drop_watch"();
DROP FUNCTION IF EXISTS "extensions"."pgrst_ddl_watch"();
DROP FUNCTION IF EXISTS "extensions"."grant_pg_net_access"();
DROP FUNCTION IF EXISTS "extensions"."grant_pg_graphql_access"();
DROP FUNCTION IF EXISTS "extensions"."grant_pg_cron_access"();
DROP FUNCTION IF EXISTS "auth"."uid"();
DROP FUNCTION IF EXISTS "auth"."role"();
DROP FUNCTION IF EXISTS "auth"."jwt"();
DROP FUNCTION IF EXISTS "auth"."email"();
DROP TYPE IF EXISTS "realtime"."wal_rls";
DROP TYPE IF EXISTS "realtime"."wal_column";
DROP TYPE IF EXISTS "realtime"."user_defined_filter";
DROP TYPE IF EXISTS "realtime"."equality_op";
DROP TYPE IF EXISTS "realtime"."action";
DROP TYPE IF EXISTS "auth"."one_time_token_type";
DROP TYPE IF EXISTS "auth"."factor_type";
DROP TYPE IF EXISTS "auth"."factor_status";
DROP TYPE IF EXISTS "auth"."code_challenge_method";
DROP TYPE IF EXISTS "auth"."aal_level";
DROP EXTENSION IF EXISTS "vector";
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP EXTENSION IF EXISTS "supabase_vault";
DROP EXTENSION IF EXISTS "pgjwt";
DROP EXTENSION IF EXISTS "pgcrypto";
DROP EXTENSION IF EXISTS "pg_stat_statements";
DROP EXTENSION IF EXISTS "pg_graphql";
DROP SCHEMA IF EXISTS "vault";
DROP SCHEMA IF EXISTS "supabase_functions";
DROP SCHEMA IF EXISTS "storage";
DROP SCHEMA IF EXISTS "realtime";
DROP EXTENSION IF EXISTS "pgsodium";
DROP SCHEMA IF EXISTS "pgsodium";
DROP SCHEMA IF EXISTS "pgbouncer";
DROP EXTENSION IF EXISTS "pg_net";
DROP SCHEMA IF EXISTS "graphql_public";
DROP SCHEMA IF EXISTS "graphql";
DROP SCHEMA IF EXISTS "extensions";
DROP SCHEMA IF EXISTS "auth";
DROP SCHEMA IF EXISTS "_realtime";
--
-- Name: _realtime; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "_realtime";


ALTER SCHEMA "_realtime" OWNER TO "postgres";

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "auth";


ALTER SCHEMA "auth" OWNER TO "supabase_admin";

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA "extensions";


ALTER SCHEMA "extensions" OWNER TO "postgres";

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "graphql";


ALTER SCHEMA "graphql" OWNER TO "supabase_admin";

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "graphql_public";


ALTER SCHEMA "graphql_public" OWNER TO "supabase_admin";

--
-- Name: pg_net; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "pg_net"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "pg_net" IS 'Async HTTP';


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA "pgbouncer";


ALTER SCHEMA "pgbouncer" OWNER TO "pgbouncer";

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "pgsodium";


ALTER SCHEMA "pgsodium" OWNER TO "supabase_admin";

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";


--
-- Name: EXTENSION "pgsodium"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "pgsodium" IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: SCHEMA "public"; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA "public" IS 'standard public schema';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "realtime";


ALTER SCHEMA "realtime" OWNER TO "supabase_admin";

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "storage";


ALTER SCHEMA "storage" OWNER TO "supabase_admin";

--
-- Name: supabase_functions; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "supabase_functions";


ALTER SCHEMA "supabase_functions" OWNER TO "supabase_admin";

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA "vault";


ALTER SCHEMA "vault" OWNER TO "supabase_admin";

--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";


--
-- Name: EXTENSION "pg_graphql"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "pg_graphql" IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "pg_stat_statements"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "pg_stat_statements" IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "pgcrypto"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "pgcrypto" IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "pgjwt"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "pgjwt" IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";


--
-- Name: EXTENSION "supabase_vault"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "supabase_vault" IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: vector; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "vector" WITH SCHEMA "extensions";


--
-- Name: EXTENSION "vector"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "vector" IS 'vector data type and ivfflat and hnsw access methods';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE "auth"."aal_level" AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE "auth"."aal_level" OWNER TO "supabase_auth_admin";

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE "auth"."code_challenge_method" AS ENUM (
    's256',
    'plain'
);


ALTER TYPE "auth"."code_challenge_method" OWNER TO "supabase_auth_admin";

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE "auth"."factor_status" AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE "auth"."factor_status" OWNER TO "supabase_auth_admin";

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE "auth"."factor_type" AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE "auth"."factor_type" OWNER TO "supabase_auth_admin";

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE "auth"."one_time_token_type" AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE "auth"."one_time_token_type" OWNER TO "supabase_auth_admin";

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE "realtime"."action" AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE "realtime"."action" OWNER TO "supabase_admin";

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE "realtime"."equality_op" AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE "realtime"."equality_op" OWNER TO "supabase_admin";

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE "realtime"."user_defined_filter" AS (
	"column_name" "text",
	"op" "realtime"."equality_op",
	"value" "text"
);


ALTER TYPE "realtime"."user_defined_filter" OWNER TO "supabase_admin";

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE "realtime"."wal_column" AS (
	"name" "text",
	"type_name" "text",
	"type_oid" "oid",
	"value" "jsonb",
	"is_pkey" boolean,
	"is_selectable" boolean
);


ALTER TYPE "realtime"."wal_column" OWNER TO "supabase_admin";

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE "realtime"."wal_rls" AS (
	"wal" "jsonb",
	"is_rls_enabled" boolean,
	"subscription_ids" "uuid"[],
	"errors" "text"[]
);


ALTER TYPE "realtime"."wal_rls" OWNER TO "supabase_admin";

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION "auth"."email"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION "auth"."email"() OWNER TO "supabase_auth_admin";

--
-- Name: FUNCTION "email"(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION "auth"."email"() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION "auth"."jwt"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION "auth"."jwt"() OWNER TO "supabase_auth_admin";

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION "auth"."role"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION "auth"."role"() OWNER TO "supabase_auth_admin";

--
-- Name: FUNCTION "role"(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION "auth"."role"() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION "auth"."uid"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION "auth"."uid"() OWNER TO "supabase_auth_admin";

--
-- Name: FUNCTION "uid"(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION "auth"."uid"() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION "extensions"."grant_pg_cron_access"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION "extensions"."grant_pg_cron_access"() OWNER TO "postgres";

--
-- Name: FUNCTION "grant_pg_cron_access"(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION "extensions"."grant_pg_cron_access"() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION "extensions"."grant_pg_graphql_access"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION "extensions"."grant_pg_graphql_access"() OWNER TO "supabase_admin";

--
-- Name: FUNCTION "grant_pg_graphql_access"(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION "extensions"."grant_pg_graphql_access"() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: postgres
--

CREATE FUNCTION "extensions"."grant_pg_net_access"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

    ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
    ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

    REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
    REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

    GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
  END IF;
END;
$$;


ALTER FUNCTION "extensions"."grant_pg_net_access"() OWNER TO "postgres";

--
-- Name: FUNCTION "grant_pg_net_access"(); Type: COMMENT; Schema: extensions; Owner: postgres
--

COMMENT ON FUNCTION "extensions"."grant_pg_net_access"() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION "extensions"."pgrst_ddl_watch"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION "extensions"."pgrst_ddl_watch"() OWNER TO "supabase_admin";

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION "extensions"."pgrst_drop_watch"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION "extensions"."pgrst_drop_watch"() OWNER TO "supabase_admin";

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION "extensions"."set_graphql_placeholder"() RETURNS "event_trigger"
    LANGUAGE "plpgsql"
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION "extensions"."set_graphql_placeholder"() OWNER TO "supabase_admin";

--
-- Name: FUNCTION "set_graphql_placeholder"(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION "extensions"."set_graphql_placeholder"() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth("text"); Type: FUNCTION; Schema: pgbouncer; Owner: postgres
--

CREATE FUNCTION "pgbouncer"."get_auth"("p_usename" "text") RETURNS TABLE("username" "text", "password" "text")
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
    RAISE WARNING 'PgBouncer auth request: %', p_usename;

    RETURN QUERY
    SELECT usename::TEXT, passwd::TEXT FROM pg_catalog.pg_shadow
    WHERE usename = p_usename;
END;
$$;


ALTER FUNCTION "pgbouncer"."get_auth"("p_usename" "text") OWNER TO "postgres";

--
-- Name: add_daily_workouts("json"); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION "public"."add_daily_workouts"("body" "json") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
declare
  start_time timestamptz;
  user_email varchar(255);
  user_id uuid;
  inserted_daily_weights_exercise uuid;
  each_weights json; -- Define a variable to hold each JSON object from the array
  each_weights_id uuid;
  workout_name text;
  body_part text;
  set_info json; -- Define a variable to hold each JSON object from the nested array
  set_number int4;
  reps int4;
  kg int4;
begin
  -- extract
  start_time := (body->>'start_time')::timestamptz;
  user_email := (body->>'user_email')::varchar(255);
  user_id := (body->>'user_id')::uuid;

  -- insert
  insert into daily_weights_exercises (start_time, user_email, user_id)
  values (start_time, user_email, user_id)
  returning id into inserted_daily_weights_exercise;

  -- Loop through the 'weights_workouts' array
  for each_weights in select json_array_elements(body->'weights_workouts')
  loop
    workout_name := (each_weights->>'workout_name')::text;
    body_part := (each_weights->>'body_part')::text;

    insert into each_weights_exercises(user_email, user_id, weights_exercises_id, workout_name, body_part)
    values (user_email, user_id, inserted_daily_weights_exercise, workout_name, body_part)
    returning id into each_weights_id;

    -- Loop through the 'weights_workouts_sets' array within each 'weights_workouts' object
    for set_info in select json_array_elements(each_weights->'weights_workouts_sets')
    loop
      set_number := (set_info->>'set_number')::int4;
      reps := (set_info->>'reps')::int4;
      kg := (set_info->>'kg')::int4;

      insert into each_weights_exercises_set_info(user_email, user_id, each_weights_exercises_id, reps, kg, set_number)
      values (user_email, user_id, each_weights_id, reps, kg, set_number);
    end loop;
  end loop;
end;
$$;


ALTER FUNCTION "public"."add_daily_workouts"("body" "json") OWNER TO "postgres";

--
-- Name: add_meals("json"); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION "public"."add_meals"("body" "json") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
declare
  user_email varchar(255);
  user_id uuid;

  meal_time timestamptz;
  total_calories float4;
  total_carbohydrate float4;
  total_fat float4;
  total_protein float4;

  inserted_meal_id uuid;
  food json;

  food_name text;
  pic_url text;
  calories float4;
  protein float4;
  fat float4;
  carbohydrate float4;
begin
  -- extract
  user_email := (body->>'user_email')::varchar(255);
  user_id := (body->>'user_id')::uuid;
  meal_time := (body->>'meal_time')::timestamptz;
  total_calories := (body->>'total_calories')::float4;
  total_carbohydrate := (body->>'total_carbohydrate')::float4;
  total_fat := (body->>'total_fat')::float4;
  total_protein := (body->>'total_protein')::float4;

  -- insert
  insert into meals (user_email, user_id, meal_time, total_calories, total_carbohydrate, total_fat, total_protein)
  values (user_email, user_id, meal_time, total_calories, total_carbohydrate, total_fat, total_protein)
  returning id into inserted_meal_id;

  -- Loop through the 'weights_workouts' array
  for food in select json_array_elements(body->'foods')
  loop
    food_name := (food->>'food_name')::text;
    pic_url := (food->>'pic_url')::text; -- when casting null to text, null remains null
    calories := (food->>'calories')::float4;
    protein := (food->>'protein')::float4;
    fat := (food->>'fat')::float4;
    carbohydrate := (food->>'carbohydrate')::float4;

    insert into foods(user_email, user_id, meal_id, food_name, pic_url, calories, protein, fat, carbohydrate)
    values (user_email, user_id, inserted_meal_id, food_name, pic_url, calories, protein, fat, carbohydrate);
  end loop;
end;
$$;


ALTER FUNCTION "public"."add_meals"("body" "json") OWNER TO "postgres";

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (user_id, username, user_email)
  values (new.id, split_part(new.email, '@', 1), new.email);
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

--
-- Name: apply_rls("jsonb", integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer DEFAULT (1024 * 1024)) RETURNS SETOF "realtime"."wal_rls"
    LANGUAGE "plpgsql"
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) OWNER TO "supabase_admin";

--
-- Name: broadcast_changes("text", "text", "text", "text", "text", "record", "record", "text"); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text" DEFAULT 'ROW'::"text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text") OWNER TO "supabase_admin";

--
-- Name: build_prepared_statement_sql("text", "regclass", "realtime"."wal_column"[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) RETURNS "text"
    LANGUAGE "sql"
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) OWNER TO "supabase_admin";

--
-- Name: cast("text", "regtype"); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") RETURNS "jsonb"
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") OWNER TO "supabase_admin";

--
-- Name: check_equality_op("realtime"."equality_op", "regtype", "text", "text"); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") RETURNS boolean
    LANGUAGE "plpgsql" IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") OWNER TO "supabase_admin";

--
-- Name: is_visible_through_filters("realtime"."wal_column"[], "realtime"."user_defined_filter"[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) RETURNS boolean
    LANGUAGE "sql" IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) OWNER TO "supabase_admin";

--
-- Name: list_changes("name", "name", integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) RETURNS SETOF "realtime"."wal_rls"
    LANGUAGE "sql"
    SET "log_min_messages" TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) OWNER TO "supabase_admin";

--
-- Name: quote_wal2json("regclass"); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."quote_wal2json"("entity" "regclass") RETURNS "text"
    LANGUAGE "sql" IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION "realtime"."quote_wal2json"("entity" "regclass") OWNER TO "supabase_admin";

--
-- Name: send("jsonb", "text", "text", boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean DEFAULT true) RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
  partition_name text;
BEGIN
  partition_name := 'messages_' || to_char(NOW(), 'YYYY_MM_DD');

  IF NOT EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'realtime'
    AND c.relname = partition_name
  ) THEN
    EXECUTE format(
      'CREATE TABLE realtime.%I PARTITION OF realtime.messages FOR VALUES FROM (%L) TO (%L)',
      partition_name,
      NOW(),
      (NOW() + interval '1 day')::timestamp
    );
  END IF;

  INSERT INTO realtime.messages (payload, event, topic, private, extension)
  VALUES (payload, event, topic, private, 'broadcast');
END;
$$;


ALTER FUNCTION "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean) OWNER TO "supabase_admin";

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."subscription_check_filters"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION "realtime"."subscription_check_filters"() OWNER TO "supabase_admin";

--
-- Name: to_regrole("text"); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION "realtime"."to_regrole"("role_name" "text") RETURNS "regrole"
    LANGUAGE "sql" IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION "realtime"."to_regrole"("role_name" "text") OWNER TO "supabase_admin";

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION "realtime"."topic"() RETURNS "text"
    LANGUAGE "sql" STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION "realtime"."topic"() OWNER TO "supabase_realtime_admin";

--
-- Name: can_insert_object("text", "text", "uuid", "jsonb"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."can_insert_object"("bucketid" "text", "name" "text", "owner" "uuid", "metadata" "jsonb") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION "storage"."can_insert_object"("bucketid" "text", "name" "text", "owner" "uuid", "metadata" "jsonb") OWNER TO "supabase_storage_admin";

--
-- Name: extension("text"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."extension"("name" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION "storage"."extension"("name" "text") OWNER TO "supabase_storage_admin";

--
-- Name: filename("text"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."filename"("name" "text") RETURNS "text"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION "storage"."filename"("name" "text") OWNER TO "supabase_storage_admin";

--
-- Name: foldername("text"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."foldername"("name" "text") RETURNS "text"[]
    LANGUAGE "plpgsql"
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION "storage"."foldername"("name" "text") OWNER TO "supabase_storage_admin";

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."get_size_by_bucket"() RETURNS TABLE("size" bigint, "bucket_id" "text")
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION "storage"."get_size_by_bucket"() OWNER TO "supabase_storage_admin";

--
-- Name: list_multipart_uploads_with_delimiter("text", "text", "text", integer, "text", "text"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."list_multipart_uploads_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer DEFAULT 100, "next_key_token" "text" DEFAULT ''::"text", "next_upload_token" "text" DEFAULT ''::"text") RETURNS TABLE("key" "text", "id" "text", "created_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION "storage"."list_multipart_uploads_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer, "next_key_token" "text", "next_upload_token" "text") OWNER TO "supabase_storage_admin";

--
-- Name: list_objects_with_delimiter("text", "text", "text", integer, "text", "text"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."list_objects_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer DEFAULT 100, "start_after" "text" DEFAULT ''::"text", "next_token" "text" DEFAULT ''::"text") RETURNS TABLE("name" "text", "id" "uuid", "metadata" "jsonb", "updated_at" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION "storage"."list_objects_with_delimiter"("bucket_id" "text", "prefix_param" "text", "delimiter_param" "text", "max_keys" integer, "start_after" "text", "next_token" "text") OWNER TO "supabase_storage_admin";

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."operation"() RETURNS "text"
    LANGUAGE "plpgsql" STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION "storage"."operation"() OWNER TO "supabase_storage_admin";

--
-- Name: search("text", "text", integer, integer, integer, "text", "text", "text"); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."search"("prefix" "text", "bucketname" "text", "limits" integer DEFAULT 100, "levels" integer DEFAULT 1, "offsets" integer DEFAULT 0, "search" "text" DEFAULT ''::"text", "sortcolumn" "text" DEFAULT 'name'::"text", "sortorder" "text" DEFAULT 'asc'::"text") RETURNS TABLE("name" "text", "id" "uuid", "updated_at" timestamp with time zone, "created_at" timestamp with time zone, "last_accessed_at" timestamp with time zone, "metadata" "jsonb")
    LANGUAGE "plpgsql" STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION "storage"."search"("prefix" "text", "bucketname" "text", "limits" integer, "levels" integer, "offsets" integer, "search" "text", "sortcolumn" "text", "sortorder" "text") OWNER TO "supabase_storage_admin";

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION "storage"."update_updated_at_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION "storage"."update_updated_at_column"() OWNER TO "supabase_storage_admin";

--
-- Name: http_request(); Type: FUNCTION; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE FUNCTION "supabase_functions"."http_request"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'supabase_functions'
    AS $$
  DECLARE
    request_id bigint;
    payload jsonb;
    url text := TG_ARGV[0]::text;
    method text := TG_ARGV[1]::text;
    headers jsonb DEFAULT '{}'::jsonb;
    params jsonb DEFAULT '{}'::jsonb;
    timeout_ms integer DEFAULT 1000;
  BEGIN
    IF url IS NULL OR url = 'null' THEN
      RAISE EXCEPTION 'url argument is missing';
    END IF;

    IF method IS NULL OR method = 'null' THEN
      RAISE EXCEPTION 'method argument is missing';
    END IF;

    IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
      headers = '{"Content-Type": "application/json"}'::jsonb;
    ELSE
      headers = TG_ARGV[2]::jsonb;
    END IF;

    IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
      params = '{}'::jsonb;
    ELSE
      params = TG_ARGV[3]::jsonb;
    END IF;

    IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
      timeout_ms = 1000;
    ELSE
      timeout_ms = TG_ARGV[4]::integer;
    END IF;

    CASE
      WHEN method = 'GET' THEN
        SELECT http_get INTO request_id FROM net.http_get(
          url,
          params,
          headers,
          timeout_ms
        );
      WHEN method = 'POST' THEN
        payload = jsonb_build_object(
          'old_record', OLD,
          'record', NEW,
          'type', TG_OP,
          'table', TG_TABLE_NAME,
          'schema', TG_TABLE_SCHEMA
        );

        SELECT http_post INTO request_id FROM net.http_post(
          url,
          payload,
          params,
          headers,
          timeout_ms
        );
      ELSE
        RAISE EXCEPTION 'method argument % is invalid', method;
    END CASE;

    INSERT INTO supabase_functions.hooks
      (hook_table_id, hook_name, request_id)
    VALUES
      (TG_RELID, TG_NAME, request_id);

    RETURN NEW;
  END
$$;


ALTER FUNCTION "supabase_functions"."http_request"() OWNER TO "supabase_functions_admin";

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION "vault"."secrets_encrypt_secret_secret"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION "vault"."secrets_encrypt_secret_secret"() OWNER TO "supabase_admin";

SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: extensions; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE "_realtime"."extensions" (
    "id" "uuid" NOT NULL,
    "type" "text",
    "settings" "jsonb",
    "tenant_external_id" "text",
    "inserted_at" timestamp(0) without time zone NOT NULL,
    "updated_at" timestamp(0) without time zone NOT NULL
);


ALTER TABLE "_realtime"."extensions" OWNER TO "supabase_admin";

--
-- Name: schema_migrations; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE "_realtime"."schema_migrations" (
    "version" bigint NOT NULL,
    "inserted_at" timestamp(0) without time zone
);


ALTER TABLE "_realtime"."schema_migrations" OWNER TO "supabase_admin";

--
-- Name: tenants; Type: TABLE; Schema: _realtime; Owner: supabase_admin
--

CREATE TABLE "_realtime"."tenants" (
    "id" "uuid" NOT NULL,
    "name" "text",
    "external_id" "text",
    "jwt_secret" "text",
    "max_concurrent_users" integer DEFAULT 200 NOT NULL,
    "inserted_at" timestamp(0) without time zone NOT NULL,
    "updated_at" timestamp(0) without time zone NOT NULL,
    "max_events_per_second" integer DEFAULT 100 NOT NULL,
    "postgres_cdc_default" "text" DEFAULT 'postgres_cdc_rls'::"text",
    "max_bytes_per_second" integer DEFAULT 100000 NOT NULL,
    "max_channels_per_client" integer DEFAULT 100 NOT NULL,
    "max_joins_per_second" integer DEFAULT 500 NOT NULL,
    "suspend" boolean DEFAULT false,
    "jwt_jwks" "jsonb",
    "notify_private_alpha" boolean DEFAULT false,
    "private_only" boolean DEFAULT false NOT NULL
);


ALTER TABLE "_realtime"."tenants" OWNER TO "supabase_admin";

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."audit_log_entries" (
    "instance_id" "uuid",
    "id" "uuid" NOT NULL,
    "payload" "json",
    "created_at" timestamp with time zone,
    "ip_address" character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE "auth"."audit_log_entries" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "audit_log_entries"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."audit_log_entries" IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."flow_state" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid",
    "auth_code" "text" NOT NULL,
    "code_challenge_method" "auth"."code_challenge_method" NOT NULL,
    "code_challenge" "text" NOT NULL,
    "provider_type" "text" NOT NULL,
    "provider_access_token" "text",
    "provider_refresh_token" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "authentication_method" "text" NOT NULL,
    "auth_code_issued_at" timestamp with time zone
);


ALTER TABLE "auth"."flow_state" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "flow_state"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."flow_state" IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."identities" (
    "provider_id" "text" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "identity_data" "jsonb" NOT NULL,
    "provider" "text" NOT NULL,
    "last_sign_in_at" timestamp with time zone,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "email" "text" GENERATED ALWAYS AS ("lower"(("identity_data" ->> 'email'::"text"))) STORED,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "auth"."identities" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "identities"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."identities" IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN "identities"."email"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN "auth"."identities"."email" IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."instances" (
    "id" "uuid" NOT NULL,
    "uuid" "uuid",
    "raw_base_config" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


ALTER TABLE "auth"."instances" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "instances"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."instances" IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."mfa_amr_claims" (
    "session_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "authentication_method" "text" NOT NULL,
    "id" "uuid" NOT NULL
);


ALTER TABLE "auth"."mfa_amr_claims" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "mfa_amr_claims"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."mfa_amr_claims" IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."mfa_challenges" (
    "id" "uuid" NOT NULL,
    "factor_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "verified_at" timestamp with time zone,
    "ip_address" "inet" NOT NULL,
    "otp_code" "text",
    "web_authn_session_data" "jsonb"
);


ALTER TABLE "auth"."mfa_challenges" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "mfa_challenges"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."mfa_challenges" IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."mfa_factors" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "friendly_name" "text",
    "factor_type" "auth"."factor_type" NOT NULL,
    "status" "auth"."factor_status" NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    "updated_at" timestamp with time zone NOT NULL,
    "secret" "text",
    "phone" "text",
    "last_challenged_at" timestamp with time zone,
    "web_authn_credential" "jsonb",
    "web_authn_aaguid" "uuid"
);


ALTER TABLE "auth"."mfa_factors" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "mfa_factors"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."mfa_factors" IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."one_time_tokens" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "token_type" "auth"."one_time_token_type" NOT NULL,
    "token_hash" "text" NOT NULL,
    "relates_to" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "one_time_tokens_token_hash_check" CHECK (("char_length"("token_hash") > 0))
);


ALTER TABLE "auth"."one_time_tokens" OWNER TO "supabase_auth_admin";

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."refresh_tokens" (
    "instance_id" "uuid",
    "id" bigint NOT NULL,
    "token" character varying(255),
    "user_id" character varying(255),
    "revoked" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "parent" character varying(255),
    "session_id" "uuid"
);


ALTER TABLE "auth"."refresh_tokens" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "refresh_tokens"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."refresh_tokens" IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE "auth"."refresh_tokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "auth"."refresh_tokens_id_seq" OWNER TO "supabase_auth_admin";

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE "auth"."refresh_tokens_id_seq" OWNED BY "auth"."refresh_tokens"."id";


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."saml_providers" (
    "id" "uuid" NOT NULL,
    "sso_provider_id" "uuid" NOT NULL,
    "entity_id" "text" NOT NULL,
    "metadata_xml" "text" NOT NULL,
    "metadata_url" "text",
    "attribute_mapping" "jsonb",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "name_id_format" "text",
    CONSTRAINT "entity_id not empty" CHECK (("char_length"("entity_id") > 0)),
    CONSTRAINT "metadata_url not empty" CHECK ((("metadata_url" = NULL::"text") OR ("char_length"("metadata_url") > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK (("char_length"("metadata_xml") > 0))
);


ALTER TABLE "auth"."saml_providers" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "saml_providers"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."saml_providers" IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."saml_relay_states" (
    "id" "uuid" NOT NULL,
    "sso_provider_id" "uuid" NOT NULL,
    "request_id" "text" NOT NULL,
    "for_email" "text",
    "redirect_to" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "flow_state_id" "uuid",
    CONSTRAINT "request_id not empty" CHECK (("char_length"("request_id") > 0))
);


ALTER TABLE "auth"."saml_relay_states" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "saml_relay_states"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."saml_relay_states" IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."schema_migrations" (
    "version" character varying(255) NOT NULL
);


ALTER TABLE "auth"."schema_migrations" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "schema_migrations"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."schema_migrations" IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."sessions" (
    "id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "factor_id" "uuid",
    "aal" "auth"."aal_level",
    "not_after" timestamp with time zone,
    "refreshed_at" timestamp without time zone,
    "user_agent" "text",
    "ip" "inet",
    "tag" "text"
);


ALTER TABLE "auth"."sessions" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "sessions"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."sessions" IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN "sessions"."not_after"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN "auth"."sessions"."not_after" IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."sso_domains" (
    "id" "uuid" NOT NULL,
    "sso_provider_id" "uuid" NOT NULL,
    "domain" "text" NOT NULL,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK (("char_length"("domain") > 0))
);


ALTER TABLE "auth"."sso_domains" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "sso_domains"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."sso_domains" IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."sso_providers" (
    "id" "uuid" NOT NULL,
    "resource_id" "text",
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK ((("resource_id" = NULL::"text") OR ("char_length"("resource_id") > 0)))
);


ALTER TABLE "auth"."sso_providers" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "sso_providers"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."sso_providers" IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN "sso_providers"."resource_id"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN "auth"."sso_providers"."resource_id" IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE "auth"."users" (
    "instance_id" "uuid",
    "id" "uuid" NOT NULL,
    "aud" character varying(255),
    "role" character varying(255),
    "email" character varying(255),
    "encrypted_password" character varying(255),
    "email_confirmed_at" timestamp with time zone,
    "invited_at" timestamp with time zone,
    "confirmation_token" character varying(255),
    "confirmation_sent_at" timestamp with time zone,
    "recovery_token" character varying(255),
    "recovery_sent_at" timestamp with time zone,
    "email_change_token_new" character varying(255),
    "email_change" character varying(255),
    "email_change_sent_at" timestamp with time zone,
    "last_sign_in_at" timestamp with time zone,
    "raw_app_meta_data" "jsonb",
    "raw_user_meta_data" "jsonb",
    "is_super_admin" boolean,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone,
    "phone" "text" DEFAULT NULL::character varying,
    "phone_confirmed_at" timestamp with time zone,
    "phone_change" "text" DEFAULT ''::character varying,
    "phone_change_token" character varying(255) DEFAULT ''::character varying,
    "phone_change_sent_at" timestamp with time zone,
    "confirmed_at" timestamp with time zone GENERATED ALWAYS AS (LEAST("email_confirmed_at", "phone_confirmed_at")) STORED,
    "email_change_token_current" character varying(255) DEFAULT ''::character varying,
    "email_change_confirm_status" smallint DEFAULT 0,
    "banned_until" timestamp with time zone,
    "reauthentication_token" character varying(255) DEFAULT ''::character varying,
    "reauthentication_sent_at" timestamp with time zone,
    "is_sso_user" boolean DEFAULT false NOT NULL,
    "deleted_at" timestamp with time zone,
    "is_anonymous" boolean DEFAULT false NOT NULL,
    CONSTRAINT "users_email_change_confirm_status_check" CHECK ((("email_change_confirm_status" >= 0) AND ("email_change_confirm_status" <= 2)))
);


ALTER TABLE "auth"."users" OWNER TO "supabase_auth_admin";

--
-- Name: TABLE "users"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE "auth"."users" IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN "users"."is_sso_user"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN "auth"."users"."is_sso_user" IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."chats" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_email" character varying NOT NULL,
    "user_id" "uuid",
    "chat_id" "uuid" NOT NULL
);


ALTER TABLE "public"."chats" OWNER TO "postgres";

--
-- Name: daily_cardio_exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."daily_cardio_exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "start_time" timestamp with time zone NOT NULL,
    "end_time" timestamp with time zone NOT NULL,
    "duration_minutes" integer NOT NULL,
    "user_email" character varying(255) NOT NULL,
    "user_id" "uuid",
    "cardio_name" "text" NOT NULL
);


ALTER TABLE "public"."daily_cardio_exercises" OWNER TO "postgres";

--
-- Name: daily_intakes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."daily_intakes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "user_email" character varying NOT NULL,
    "intake_calories_kcal" double precision DEFAULT '0'::double precision NOT NULL,
    "intake_carbohydrate_g" double precision DEFAULT '0'::double precision NOT NULL,
    "intake_protein_g" double precision DEFAULT '0'::double precision NOT NULL,
    "intake_fat_g" double precision DEFAULT '0'::double precision NOT NULL,
    "goal_calories_kcal" double precision DEFAULT '0'::double precision NOT NULL,
    "goal_carbohydrate_g" double precision DEFAULT '0'::double precision NOT NULL,
    "goal_protein_g" double precision DEFAULT '0'::double precision NOT NULL,
    "goal_fat_g" double precision DEFAULT '0'::double precision NOT NULL,
    "date" timestamp with time zone NOT NULL,
    "llm_description" "text" DEFAULT ''::"text" NOT NULL
);


ALTER TABLE "public"."daily_intakes" OWNER TO "postgres";

--
-- Name: daily_weights_exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."daily_weights_exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "start_time" timestamp with time zone NOT NULL,
    "end_time" timestamp with time zone,
    "user_email" character varying(255) NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."daily_weights_exercises" OWNER TO "postgres";

--
-- Name: each_weights_exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."each_weights_exercises" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_email" character varying(255) NOT NULL,
    "user_id" "uuid",
    "weights_exercises_id" "uuid" NOT NULL,
    "workout_name" "text" NOT NULL,
    "body_part" "text" NOT NULL
);


ALTER TABLE "public"."each_weights_exercises" OWNER TO "postgres";

--
-- Name: each_weights_exercises_set_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."each_weights_exercises_set_info" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_email" character varying(255) NOT NULL,
    "user_id" "uuid",
    "each_weights_exercises_id" "uuid" NOT NULL,
    "reps" integer NOT NULL,
    "kg" integer NOT NULL,
    "set_number" integer NOT NULL
);


ALTER TABLE "public"."each_weights_exercises_set_info" OWNER TO "postgres";

--
-- Name: foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."foods" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "meal_id" "uuid" NOT NULL,
    "user_email" character varying NOT NULL,
    "user_id" "uuid",
    "calories" real,
    "food_name" "text",
    "pic_url" "text",
    "protein" real,
    "fat" real,
    "carbohydrate" real
);


ALTER TABLE "public"."foods" OWNER TO "postgres";

--
-- Name: TABLE "foods"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."foods" IS 'food makes up a meal';


--
-- Name: health_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."health_info" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_email" character varying NOT NULL,
    "user_id" "uuid",
    "measured_date" timestamp with time zone NOT NULL,
    "height_cm" double precision NOT NULL,
    "weight_kg" double precision NOT NULL,
    "body_fat_mass_kg" double precision,
    "skeletal_muscle_mass_kg" double precision,
    "age" smallint NOT NULL
);


ALTER TABLE "public"."health_info" OWNER TO "postgres";

--
-- Name: TABLE "health_info"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."health_info" IS 'user''s health info for specific day';


--
-- Name: llm_daily_exercies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."llm_daily_exercies" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_email" character varying(255) NOT NULL,
    "exercise_detail" "json"[],
    "user_id" "uuid",
    "exercise_date" timestamp with time zone NOT NULL
);


ALTER TABLE "public"."llm_daily_exercies" OWNER TO "postgres";

--
-- Name: TABLE "llm_daily_exercies"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."llm_daily_exercies" IS 'this is table for llm to reference (kind of memory)';


--
-- Name: meals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."meals" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "meal_time" timestamp with time zone NOT NULL,
    "user_email" character varying NOT NULL,
    "user_id" "uuid",
    "total_calories" real,
    "total_carbohydrate" real,
    "total_fat" real,
    "total_protein" real
);


ALTER TABLE "public"."meals" OWNER TO "postgres";

--
-- Name: TABLE "meals"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."meals" IS 'one meal, consist of foods';


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."messages" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_email" character varying NOT NULL,
    "user_id" "uuid",
    "chat_id" "uuid" NOT NULL,
    "message_id" "uuid" NOT NULL
);


ALTER TABLE "public"."messages" OWNER TO "postgres";

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"(),
    "username" "text",
    "main_image" "text",
    "user_email" character varying(255) DEFAULT ''::character varying NOT NULL,
    "timezone" "text" DEFAULT 'Asia/Seoul'::"text" NOT NULL,
    "language" "text" DEFAULT '''ko''::text'::"text" NOT NULL
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";

--
-- Name: TABLE "profiles"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE "public"."profiles" IS 'user profiles';


--
-- Name: user_goals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "public"."user_goals" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid",
    "user_email" character varying NOT NULL,
    "weight_kg" double precision,
    "body_fat_mass_kg" double precision,
    "skeletal_muscle_mass_kg" double precision,
    "goal_description" "text"
);


ALTER TABLE "public"."user_goals" OWNER TO "postgres";

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE "realtime"."messages" (
    "topic" "text" NOT NULL,
    "extension" "text" NOT NULL,
    "payload" "jsonb",
    "event" "text",
    "private" boolean DEFAULT false,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "inserted_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
)
PARTITION BY RANGE ("inserted_at");


ALTER TABLE "realtime"."messages" OWNER TO "supabase_realtime_admin";

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE "realtime"."schema_migrations" (
    "version" bigint NOT NULL,
    "inserted_at" timestamp(0) without time zone
);


ALTER TABLE "realtime"."schema_migrations" OWNER TO "supabase_admin";

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE "realtime"."subscription" (
    "id" bigint NOT NULL,
    "subscription_id" "uuid" NOT NULL,
    "entity" "regclass" NOT NULL,
    "filters" "realtime"."user_defined_filter"[] DEFAULT '{}'::"realtime"."user_defined_filter"[] NOT NULL,
    "claims" "jsonb" NOT NULL,
    "claims_role" "regrole" GENERATED ALWAYS AS ("realtime"."to_regrole"(("claims" ->> 'role'::"text"))) STORED NOT NULL,
    "created_at" timestamp without time zone DEFAULT "timezone"('utc'::"text", "now"()) NOT NULL
);


ALTER TABLE "realtime"."subscription" OWNER TO "supabase_admin";

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE "realtime"."subscription" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "realtime"."subscription_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE "storage"."buckets" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "owner" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "public" boolean DEFAULT false,
    "avif_autodetection" boolean DEFAULT false,
    "file_size_limit" bigint,
    "allowed_mime_types" "text"[],
    "owner_id" "text"
);


ALTER TABLE "storage"."buckets" OWNER TO "supabase_storage_admin";

--
-- Name: COLUMN "buckets"."owner"; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN "storage"."buckets"."owner" IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE "storage"."migrations" (
    "id" integer NOT NULL,
    "name" character varying(100) NOT NULL,
    "hash" character varying(40) NOT NULL,
    "executed_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE "storage"."migrations" OWNER TO "supabase_storage_admin";

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE "storage"."objects" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "bucket_id" "text",
    "name" "text",
    "owner" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "last_accessed_at" timestamp with time zone DEFAULT "now"(),
    "metadata" "jsonb",
    "path_tokens" "text"[] GENERATED ALWAYS AS ("string_to_array"("name", '/'::"text")) STORED,
    "version" "text",
    "owner_id" "text",
    "user_metadata" "jsonb"
);


ALTER TABLE "storage"."objects" OWNER TO "supabase_storage_admin";

--
-- Name: COLUMN "objects"."owner"; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN "storage"."objects"."owner" IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE "storage"."s3_multipart_uploads" (
    "id" "text" NOT NULL,
    "in_progress_size" bigint DEFAULT 0 NOT NULL,
    "upload_signature" "text" NOT NULL,
    "bucket_id" "text" NOT NULL,
    "key" "text" NOT NULL COLLATE "pg_catalog"."C",
    "version" "text" NOT NULL,
    "owner_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_metadata" "jsonb"
);


ALTER TABLE "storage"."s3_multipart_uploads" OWNER TO "supabase_storage_admin";

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE "storage"."s3_multipart_uploads_parts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "upload_id" "text" NOT NULL,
    "size" bigint DEFAULT 0 NOT NULL,
    "part_number" integer NOT NULL,
    "bucket_id" "text" NOT NULL,
    "key" "text" NOT NULL COLLATE "pg_catalog"."C",
    "etag" "text" NOT NULL,
    "owner_id" "text",
    "version" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "storage"."s3_multipart_uploads_parts" OWNER TO "supabase_storage_admin";

--
-- Name: hooks; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE "supabase_functions"."hooks" (
    "id" bigint NOT NULL,
    "hook_table_id" integer NOT NULL,
    "hook_name" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "request_id" bigint
);


ALTER TABLE "supabase_functions"."hooks" OWNER TO "supabase_functions_admin";

--
-- Name: TABLE "hooks"; Type: COMMENT; Schema: supabase_functions; Owner: supabase_functions_admin
--

COMMENT ON TABLE "supabase_functions"."hooks" IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';


--
-- Name: hooks_id_seq; Type: SEQUENCE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE SEQUENCE "supabase_functions"."hooks_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "supabase_functions"."hooks_id_seq" OWNER TO "supabase_functions_admin";

--
-- Name: hooks_id_seq; Type: SEQUENCE OWNED BY; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER SEQUENCE "supabase_functions"."hooks_id_seq" OWNED BY "supabase_functions"."hooks"."id";


--
-- Name: migrations; Type: TABLE; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE TABLE "supabase_functions"."migrations" (
    "version" "text" NOT NULL,
    "inserted_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "supabase_functions"."migrations" OWNER TO "supabase_functions_admin";

--
-- Name: decrypted_secrets; Type: VIEW; Schema: vault; Owner: supabase_admin
--

CREATE VIEW "vault"."decrypted_secrets" AS
 SELECT "secrets"."id",
    "secrets"."name",
    "secrets"."description",
    "secrets"."secret",
        CASE
            WHEN ("secrets"."secret" IS NULL) THEN NULL::"text"
            ELSE
            CASE
                WHEN ("secrets"."key_id" IS NULL) THEN NULL::"text"
                ELSE "convert_from"("pgsodium"."crypto_aead_det_decrypt"("decode"("secrets"."secret", 'base64'::"text"), "convert_to"((((("secrets"."id")::"text" || "secrets"."description") || ("secrets"."created_at")::"text") || ("secrets"."updated_at")::"text"), 'utf8'::"name"), "secrets"."key_id", "secrets"."nonce"), 'utf8'::"name")
            END
        END AS "decrypted_secret",
    "secrets"."key_id",
    "secrets"."nonce",
    "secrets"."created_at",
    "secrets"."updated_at"
   FROM "vault"."secrets";


ALTER TABLE "vault"."decrypted_secrets" OWNER TO "supabase_admin";

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."refresh_tokens" ALTER COLUMN "id" SET DEFAULT "nextval"('"auth"."refresh_tokens_id_seq"'::"regclass");


--
-- Name: hooks id; Type: DEFAULT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY "supabase_functions"."hooks" ALTER COLUMN "id" SET DEFAULT "nextval"('"supabase_functions"."hooks_id_seq"'::"regclass");


--
-- Data for Name: extensions; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY "_realtime"."extensions" ("id", "type", "settings", "tenant_external_id", "inserted_at", "updated_at") FROM stdin;
c0d97425-fc3f-47df-9d3c-38fdb822bb27	postgres_cdc_rls	{"region": "us-east-1", "db_host": "W0I5KtpVQ1ehAP7V/Pw8tg==", "db_name": "sWBpZNdjggEPTQVlI52Zfw==", "db_port": "+enMDFi1J/3IrrquHHwUmA==", "db_user": "uxbEq/zz8DXVD53TOI1zmw==", "slot_name": "supabase_realtime_replication_slot", "db_password": "sWBpZNdjggEPTQVlI52Zfw==", "publication": "supabase_realtime", "ssl_enforced": false, "poll_interval_ms": 100, "poll_max_changes": 100, "poll_max_record_bytes": 1048576}	realtime-dev	2024-12-19 04:02:18	2024-12-19 04:02:18
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY "_realtime"."schema_migrations" ("version", "inserted_at") FROM stdin;
20210706140551	2024-12-05 04:27:24
20220329161857	2024-12-05 04:27:24
20220410212326	2024-12-05 04:27:24
20220506102948	2024-12-05 04:27:24
20220527210857	2024-12-05 04:27:24
20220815211129	2024-12-05 04:27:24
20220815215024	2024-12-05 04:27:24
20220818141501	2024-12-05 04:27:24
20221018173709	2024-12-05 04:27:24
20221102172703	2024-12-05 04:27:24
20221223010058	2024-12-05 04:27:24
20230110180046	2024-12-05 04:27:24
20230810220907	2024-12-05 04:27:24
20230810220924	2024-12-05 04:27:24
20231024094642	2024-12-05 04:27:24
20240306114423	2024-12-05 04:27:24
20240418082835	2024-12-05 04:27:24
20240625211759	2024-12-05 04:27:24
20240704172020	2024-12-05 04:27:24
20240902173232	2024-12-05 04:27:24
20241106103258	2024-12-05 04:27:24
\.


--
-- Data for Name: tenants; Type: TABLE DATA; Schema: _realtime; Owner: supabase_admin
--

COPY "_realtime"."tenants" ("id", "name", "external_id", "jwt_secret", "max_concurrent_users", "inserted_at", "updated_at", "max_events_per_second", "postgres_cdc_default", "max_bytes_per_second", "max_channels_per_client", "max_joins_per_second", "suspend", "jwt_jwks", "notify_private_alpha", "private_only") FROM stdin;
38eae67b-fe05-4e15-8667-e2a2bea4c297	realtime-dev	realtime-dev	iNjicxc4+llvc9wovDvqymwfnj9teWMlyOIbJ8Fh6j2WNU8CIJ2ZgjR6MUIKqSmeDmvpsKLsZ9jgXJmQPpwL8w==	200	2024-12-19 04:02:18	2024-12-19 04:02:18	100	postgres_cdc_rls	100000	100	100	f	{"keys": [{"k": "c3VwZXItc2VjcmV0LWp3dC10b2tlbi13aXRoLWF0LWxlYXN0LTMyLWNoYXJhY3RlcnMtbG9uZw", "kty": "oct"}]}	t	f
\.


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") FROM stdin;
00000000-0000-0000-0000-000000000000	56b0b158-111a-4237-93d0-e5ff88a2442a	{"action":"user_signedup","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2024-12-05 05:38:05.317128+00	
00000000-0000-0000-0000-000000000000	79cc6cd1-d10f-40f5-9a79-ef6d787f67a7	{"action":"login","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-05 05:38:05.320689+00	
00000000-0000-0000-0000-000000000000	0627ee51-3c6d-4517-b80a-42bae2b3a811	{"action":"token_refreshed","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-05 06:38:56.0733+00	
00000000-0000-0000-0000-000000000000	5b43c55f-f83f-4318-9302-203e09f6c175	{"action":"token_revoked","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-05 06:38:56.073993+00	
00000000-0000-0000-0000-000000000000	5bf007a7-26b6-427f-b3e8-c3ffc41b8596	{"action":"token_refreshed","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-05 09:14:09.099278+00	
00000000-0000-0000-0000-000000000000	2876c868-6db1-4c84-82a3-73b186f0e3b0	{"action":"token_revoked","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-05 09:14:09.100545+00	
00000000-0000-0000-0000-000000000000	83eabbaf-0564-45aa-8601-7a45f9068e77	{"action":"token_refreshed","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-06 05:47:42.663051+00	
00000000-0000-0000-0000-000000000000	609f2561-c792-46f8-8078-8cab4dc69abd	{"action":"token_revoked","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-06 05:47:42.664871+00	
00000000-0000-0000-0000-000000000000	777f57c1-78fc-4b12-824a-590e580baaac	{"action":"token_refreshed","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-06 06:48:11.966373+00	
00000000-0000-0000-0000-000000000000	5e9d6846-dcd4-4ca4-900a-5a1ad4adbc1e	{"action":"token_revoked","actor_id":"d2e3a4f7-dfa4-46cf-9e82-5488929e3599","actor_username":"test1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-06 06:48:11.968027+00	
00000000-0000-0000-0000-000000000000	a188dae1-18db-4057-8f9e-a087a9dd0746	{"action":"user_signedup","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2024-12-06 07:21:35.043378+00	
00000000-0000-0000-0000-000000000000	a496a150-17b5-4b3a-9bf6-48447fcf735a	{"action":"login","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-06 07:21:35.045445+00	
00000000-0000-0000-0000-000000000000	5ad7fbdf-c2dd-461a-a0bc-edec57dfc9d3	{"action":"token_refreshed","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-06 08:23:40.220129+00	
00000000-0000-0000-0000-000000000000	5210eecb-a8d9-4d70-a7b3-13077793fb9d	{"action":"token_revoked","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-06 08:23:40.221183+00	
00000000-0000-0000-0000-000000000000	07c50d00-94ff-4288-b4da-a27afa29e430	{"action":"login","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-06 08:48:27.01272+00	
00000000-0000-0000-0000-000000000000	5109aacf-5b7b-4f67-9e52-a67058a10d31	{"action":"token_refreshed","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 08:35:12.965575+00	
00000000-0000-0000-0000-000000000000	8d3e0223-9d03-481d-b4ea-ba71a27d1ca3	{"action":"token_revoked","actor_id":"ed53c16c-be61-4454-9e7c-cc00a103c71a","actor_username":"user2@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 08:35:12.966487+00	
00000000-0000-0000-0000-000000000000	ac62d835-9d15-4d0f-a5ba-29a3d3a1a977	{"action":"user_signedup","actor_id":"eeb4025a-4cea-4eaa-97e8-c7247e62186f","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2024-12-07 08:38:52.351972+00	
00000000-0000-0000-0000-000000000000	a7b81376-33bc-472e-88e4-a6b45dda6da3	{"action":"user_signedup","actor_id":"6efd3bf5-1976-4f97-88c1-7b91d28de202","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2024-12-07 11:01:33.429763+00	
00000000-0000-0000-0000-000000000000	7873f2e3-aaed-4d79-b3cc-b76ca6a3d869	{"action":"login","actor_id":"6efd3bf5-1976-4f97-88c1-7b91d28de202","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2024-12-07 11:05:57.099242+00	
00000000-0000-0000-0000-000000000000	8ac0c1e5-9408-4c0a-b471-28a3303215d4	{"action":"user_signedup","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"google"}}	2024-12-07 11:08:18.611048+00	
00000000-0000-0000-0000-000000000000	be3055a4-213d-4620-b858-a074747ebc2e	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2024-12-07 11:29:13.446619+00	
00000000-0000-0000-0000-000000000000	c0e9ca20-9958-4e73-9124-794d3f3505f8	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2024-12-07 11:57:03.269694+00	
00000000-0000-0000-0000-000000000000	47a8485d-e1db-4d1d-bd72-6049a6b1e86e	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2024-12-07 11:57:03.644113+00	
00000000-0000-0000-0000-000000000000	464dfe47-6f7a-41ce-9d1a-c36d3b348c14	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2024-12-07 12:44:57.473045+00	
00000000-0000-0000-0000-000000000000	c7876ef5-98b3-44b4-bc3e-21582a8624e1	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2024-12-07 12:44:57.670768+00	
00000000-0000-0000-0000-000000000000	e056f23a-15f3-413b-9d54-d22cd2f974a8	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"google"}}	2024-12-07 12:55:35.246168+00	
00000000-0000-0000-0000-000000000000	604eb034-c156-455b-b140-f1cd6fab2295	{"action":"login","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider_type":"google"}}	2024-12-07 12:55:35.407758+00	
00000000-0000-0000-0000-000000000000	b97c7ac5-37bd-4777-8b69-40959ea35f7f	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 14:01:57.964705+00	
00000000-0000-0000-0000-000000000000	e40b1060-a435-42c5-93e4-c84ed7897f61	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 14:01:57.96543+00	
00000000-0000-0000-0000-000000000000	a1b5aebc-07a7-4da5-9174-41aebf83a221	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 17:43:27.553961+00	
00000000-0000-0000-0000-000000000000	3ef3e8fa-9c49-4388-a85c-41ec477c999b	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 17:43:27.554894+00	
00000000-0000-0000-0000-000000000000	e093cc4b-49e6-4f00-8189-4744fd08bc73	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 18:44:42.183505+00	
00000000-0000-0000-0000-000000000000	eb89b984-cc3a-4398-95c6-5783f6b11003	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 18:44:42.183969+00	
00000000-0000-0000-0000-000000000000	990af8a2-2543-4557-9b17-a8bc68f6eddb	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 20:04:33.569908+00	
00000000-0000-0000-0000-000000000000	92da7fc4-6303-4b64-afb5-e7ded0efb623	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 20:04:33.571793+00	
00000000-0000-0000-0000-000000000000	4ad43fdc-43d1-45a3-923b-5a7e6d574478	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 03:55:32.741412+00	
00000000-0000-0000-0000-000000000000	55c9bd21-53b6-48e7-8620-dcafef63dcfe	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 03:55:32.742362+00	
00000000-0000-0000-0000-000000000000	64febd4a-ab50-4716-bef7-baad2dd4a223	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 11:10:07.120935+00	
00000000-0000-0000-0000-000000000000	7955e3b6-cf73-4f74-b90f-39e8d629463c	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 11:10:07.122114+00	
00000000-0000-0000-0000-000000000000	befb3fe4-d444-44b2-8259-5f6f575dd09d	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 13:32:41.0732+00	
00000000-0000-0000-0000-000000000000	7e345d1a-5435-4fa7-b52d-365481707a3c	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 13:32:41.07377+00	
00000000-0000-0000-0000-000000000000	01c4f5cc-5ce8-4a4e-84e5-548ee234a683	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 21:23:46.751592+00	
00000000-0000-0000-0000-000000000000	cb6000a9-2e8b-48e9-ba17-092988c7376f	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 21:23:46.754842+00	
00000000-0000-0000-0000-000000000000	99e0a8a3-a521-4ca1-a1d8-eca453f375c0	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 22:25:05.812035+00	
00000000-0000-0000-0000-000000000000	d4abf6a8-62bd-48db-b46d-6101c4ed5ada	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-07 22:25:05.812566+00	
00000000-0000-0000-0000-000000000000	968b9b00-ef2c-42cc-a3e4-c36c54791b28	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 05:24:09.839027+00	
00000000-0000-0000-0000-000000000000	abf3501c-ceed-4d0d-861c-88fa07f548a5	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 05:24:09.839944+00	
00000000-0000-0000-0000-000000000000	e3187464-1817-40a5-bd50-041742d1ea1d	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 09:38:48.587964+00	
00000000-0000-0000-0000-000000000000	ac1e1372-b18a-4d7c-9e95-0a47f178a239	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 09:38:48.588819+00	
00000000-0000-0000-0000-000000000000	67683d6d-7a6d-4aaa-b743-1041ae90e3a3	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 12:27:29.190106+00	
00000000-0000-0000-0000-000000000000	f8f6ee5b-ff4f-46ad-8fa0-08d32da6f303	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 12:27:29.191241+00	
00000000-0000-0000-0000-000000000000	114fc055-8110-4dbc-90d7-f819e302ce51	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 13:46:52.179366+00	
00000000-0000-0000-0000-000000000000	25482e98-9ec2-4281-9812-c78af6c6b2ff	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 13:46:52.181361+00	
00000000-0000-0000-0000-000000000000	d3f49643-80cf-4cfd-862f-8e3e15339c51	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 14:47:20.98934+00	
00000000-0000-0000-0000-000000000000	59b3af06-1878-46be-a44c-327e89c78590	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 14:47:20.994876+00	
00000000-0000-0000-0000-000000000000	d06f0f49-d1f8-472d-b333-c015a6c9d4a6	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 15:54:54.39989+00	
00000000-0000-0000-0000-000000000000	2cb48472-a526-4e00-9d40-374d1533e9e9	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 15:54:54.405832+00	
00000000-0000-0000-0000-000000000000	36451d6a-fccf-4641-8eff-d7ca5904aded	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 16:53:25.240389+00	
00000000-0000-0000-0000-000000000000	753e50bf-1432-416d-8144-0ed992122f77	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-08 16:53:25.241822+00	
00000000-0000-0000-0000-000000000000	5e0bb39d-1774-46a8-9a5b-0264686f27a9	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 04:32:30.993037+00	
00000000-0000-0000-0000-000000000000	242db459-f64b-4f47-8a0f-42c8d97b79b7	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 04:32:30.994839+00	
00000000-0000-0000-0000-000000000000	c9bf3389-3eac-4664-bb69-22e75d298560	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 06:03:40.668175+00	
00000000-0000-0000-0000-000000000000	4a0dd26d-d3a4-4f6f-908c-b52dd8e7ee63	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 06:03:40.668856+00	
00000000-0000-0000-0000-000000000000	b36f2574-e16c-4d35-824b-e4f4a6472096	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 08:22:05.268257+00	
00000000-0000-0000-0000-000000000000	1deaa8b8-84bf-4043-85a5-03513aa70aee	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 08:22:05.269409+00	
00000000-0000-0000-0000-000000000000	9f5c9747-417f-4f52-8491-033821fea07a	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 14:40:52.86143+00	
00000000-0000-0000-0000-000000000000	0be9bb2f-1618-4563-9399-2c76a31d1394	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 14:40:52.862209+00	
00000000-0000-0000-0000-000000000000	76992ea2-45eb-4ccc-a21f-c83c81c0eba8	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 16:28:57.055636+00	
00000000-0000-0000-0000-000000000000	67fe436a-bbf8-4d9d-88bb-1de135ce5cfd	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 16:28:57.056516+00	
00000000-0000-0000-0000-000000000000	0f9c92a0-be83-4a7a-a1b7-93a514b7894f	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:30:48.809247+00	
00000000-0000-0000-0000-000000000000	f40610fe-a3bf-49bf-90d3-abdcb7bb8f7b	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:30:48.810381+00	
00000000-0000-0000-0000-000000000000	11b1d000-94c7-43ce-918c-3761604215bc	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:30:48.825539+00	
00000000-0000-0000-0000-000000000000	8125074a-66f3-49f1-b37b-bda1cf69771b	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:34:34.556388+00	
00000000-0000-0000-0000-000000000000	1bba2ab0-1e4b-4ed7-8709-3d7d3a73fba7	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:34:36.671006+00	
00000000-0000-0000-0000-000000000000	0995f430-3624-4c9f-89d0-127ec13a8edf	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:34:40.141222+00	
00000000-0000-0000-0000-000000000000	a99d8d82-8bb2-4008-8023-d8fedfaa9240	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:35:47.252752+00	
00000000-0000-0000-0000-000000000000	2da5cbd8-176a-46ec-808b-7f6869b769fe	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 17:35:58.805075+00	
00000000-0000-0000-0000-000000000000	2c3e43ab-c75c-400e-a32b-df29a0464da4	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 18:34:04.394446+00	
00000000-0000-0000-0000-000000000000	7502a049-0755-4ecc-b097-ad188d4108eb	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 18:34:04.395697+00	
00000000-0000-0000-0000-000000000000	317c4069-e73e-46b6-b51d-bd40136f1717	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 20:38:39.343443+00	
00000000-0000-0000-0000-000000000000	bbbe89a7-b71b-4c2c-a674-02bb807e4f52	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 20:38:39.345174+00	
00000000-0000-0000-0000-000000000000	717ef2d4-7f3a-4575-a35c-7e2da2b31541	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 21:51:02.620638+00	
00000000-0000-0000-0000-000000000000	c4322056-35c3-42dc-991a-2cb300c162f7	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 21:51:02.621264+00	
00000000-0000-0000-0000-000000000000	221acc0e-f2ec-4177-a948-4212ac1f8309	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 22:56:16.092265+00	
00000000-0000-0000-0000-000000000000	e85804a7-9491-4199-877d-1b854ccc71ea	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-09 22:56:16.093112+00	
00000000-0000-0000-0000-000000000000	80da0e24-ed0e-474a-a030-1da7fd69c828	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 08:35:19.481164+00	
00000000-0000-0000-0000-000000000000	7f7dfa8d-3e75-4f55-99ce-035afcf7b478	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 08:35:19.482766+00	
00000000-0000-0000-0000-000000000000	dad247b5-e489-400c-b276-7bf2ceb8858f	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 10:41:20.811781+00	
00000000-0000-0000-0000-000000000000	6f8c5e06-997c-413a-b999-7802b8920740	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 10:41:20.813103+00	
00000000-0000-0000-0000-000000000000	495caac2-8529-4a6b-b40f-0d46c2c96732	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 11:48:40.494966+00	
00000000-0000-0000-0000-000000000000	719f25ba-cf34-4ec6-ada7-5b689d4a9ec2	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 11:48:40.495716+00	
00000000-0000-0000-0000-000000000000	4e7f09b7-b66a-44ec-bff6-ba8f2a99b5e9	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 13:30:00.697838+00	
00000000-0000-0000-0000-000000000000	6b755c6d-3cde-491f-9277-d3046bb0c120	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 13:30:00.706334+00	
00000000-0000-0000-0000-000000000000	fde883b6-4b4c-40b3-8256-9418abe35340	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 16:02:49.718219+00	
00000000-0000-0000-0000-000000000000	9a9dfec3-cfc3-4052-bd69-a203141c2f78	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 16:02:49.718638+00	
00000000-0000-0000-0000-000000000000	4f26b87e-6728-4493-93f5-1d47bd4c0dd8	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 17:45:00.625891+00	
00000000-0000-0000-0000-000000000000	b8fc0297-88d3-4fe1-add7-b8b484526dca	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 17:45:00.626813+00	
00000000-0000-0000-0000-000000000000	853f8ed0-5420-4903-801a-5ada074f948f	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 20:59:00.777661+00	
00000000-0000-0000-0000-000000000000	a5aae765-28fb-4441-9eda-a6e5e9820940	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 20:59:00.778597+00	
00000000-0000-0000-0000-000000000000	f8c6e178-ff32-4703-a439-76fc99acdf98	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 22:57:17.352858+00	
00000000-0000-0000-0000-000000000000	84ffea9d-66ed-46bc-95df-c1db5977d3f7	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-10 22:57:17.353526+00	
00000000-0000-0000-0000-000000000000	f0620974-c162-46f9-a3c7-ccfc8c38cbd3	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 06:05:52.136068+00	
00000000-0000-0000-0000-000000000000	a189165e-beb6-4fc7-b2d0-95872e493a74	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 06:05:52.137065+00	
00000000-0000-0000-0000-000000000000	a5697605-d6f4-4135-b547-8aeeb17d3054	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 07:16:02.159229+00	
00000000-0000-0000-0000-000000000000	8ff0c5c5-d9d9-42cc-886f-45c939eb0a62	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 07:16:02.160278+00	
00000000-0000-0000-0000-000000000000	10096058-9e4a-4e3f-bd14-518f146e1c4c	{"action":"token_refreshed","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 11:47:18.072101+00	
00000000-0000-0000-0000-000000000000	d6234a6a-e2d7-482e-b8c0-1b110119e78f	{"action":"token_revoked","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 11:47:18.073838+00	
00000000-0000-0000-0000-000000000000	c8bb491b-d47e-4d1c-a516-2c508eafb546	{"action":"logout","actor_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","actor_name":"taekmin yang","actor_username":"kootaekmin@gmail.com","actor_via_sso":false,"log_type":"account"}	2024-12-11 11:52:18.142477+00	
00000000-0000-0000-0000-000000000000	143dccb9-0347-4aa4-bea8-d8d10b06c551	{"action":"user_signedup","actor_id":"2401e7b4-4884-4337-81f5-736f03099f36","actor_username":"test-prompt@email.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2024-12-11 11:53:19.532199+00	
00000000-0000-0000-0000-000000000000	cb572a3f-9750-4fa8-9797-2475b7f67cce	{"action":"login","actor_id":"2401e7b4-4884-4337-81f5-736f03099f36","actor_username":"test-prompt@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-11 11:53:19.53457+00	
00000000-0000-0000-0000-000000000000	10226396-eac9-4fb7-93d4-9bad4fd76079	{"action":"login","actor_id":"2401e7b4-4884-4337-81f5-736f03099f36","actor_username":"test-prompt@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-11 11:53:19.629311+00	
00000000-0000-0000-0000-000000000000	d88d1aee-5c9f-49f7-9f40-efcc2bcd185b	{"action":"logout","actor_id":"2401e7b4-4884-4337-81f5-736f03099f36","actor_username":"test-prompt@email.com","actor_via_sso":false,"log_type":"account"}	2024-12-11 11:58:14.210943+00	
00000000-0000-0000-0000-000000000000	88d910b7-c9f0-4080-9e6a-95c9afc5c4a9	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"kootaekmin@gmail.com","user_id":"c092bb15-5ce9-469f-857b-cbb2f9ff1887","user_phone":""}}	2024-12-11 12:01:24.050471+00	
00000000-0000-0000-0000-000000000000	2b0bf93e-a314-496c-a82a-475d23c3edc0	{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"test-prompt@email.com","user_id":"2401e7b4-4884-4337-81f5-736f03099f36","user_phone":""}}	2024-12-11 12:01:27.012151+00	
00000000-0000-0000-0000-000000000000	e2754736-8130-4d54-a1e6-4e4b800e339d	{"action":"user_signedup","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}	2024-12-11 12:15:34.761605+00	
00000000-0000-0000-0000-000000000000	3f3c6936-bfff-4c8d-8caf-47b86940f183	{"action":"login","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-11 12:15:34.765475+00	
00000000-0000-0000-0000-000000000000	7f8c0d1f-5425-42cc-aef9-4c04e7673389	{"action":"login","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-11 12:15:34.862594+00	
00000000-0000-0000-0000-000000000000	9197a8ad-09ec-4d52-a38f-88a1d9bb2cc0	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 15:11:37.144704+00	
00000000-0000-0000-0000-000000000000	04c6582c-da7e-425b-89d0-3ca5230dd9ae	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 15:11:37.145279+00	
00000000-0000-0000-0000-000000000000	9b47859e-6f4a-4575-9c60-e2b1b7cd5bea	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 17:22:44.951194+00	
00000000-0000-0000-0000-000000000000	bae99f9c-f978-4d8b-993e-f33c1a5858ed	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-11 17:22:44.952585+00	
00000000-0000-0000-0000-000000000000	87f870aa-fcee-4e2b-9aba-becbad3c5aaf	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 07:50:17.622448+00	
00000000-0000-0000-0000-000000000000	6828cc58-348a-4ca7-bada-2166f53a2f67	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 07:50:17.622847+00	
00000000-0000-0000-0000-000000000000	7c32d5b4-1ac2-4c47-bd68-c77e4c50988f	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-12 01:00:41.220958+00	
00000000-0000-0000-0000-000000000000	1603bafd-c259-4edf-bf52-46aea2d7b4a5	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-12 01:00:41.221963+00	
00000000-0000-0000-0000-000000000000	3566fa19-9c6c-4b14-97d9-11790d7092d3	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 08:52:20.153863+00	
00000000-0000-0000-0000-000000000000	35cf4c83-e7cf-4298-8dad-b4b69ff90b09	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 08:52:20.15457+00	
00000000-0000-0000-0000-000000000000	0b24ae17-99b7-4a67-8ec0-8be543f42b10	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 10:01:13.460914+00	
00000000-0000-0000-0000-000000000000	220b3730-1d6c-4f08-a2bf-16a98f1687a9	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 10:01:13.461365+00	
00000000-0000-0000-0000-000000000000	0647e891-3cf1-4b0b-b7ad-a5ebba536741	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 11:01:19.978969+00	
00000000-0000-0000-0000-000000000000	d213cf9b-1f07-4f1b-8571-b8658becdedc	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 11:01:19.980147+00	
00000000-0000-0000-0000-000000000000	15970c76-0e07-443d-844d-96195320d97b	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 12:04:16.884591+00	
00000000-0000-0000-0000-000000000000	5e03185a-706e-4967-8ffb-d1295044b39d	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 12:04:16.88615+00	
00000000-0000-0000-0000-000000000000	d5dc2b93-b22e-4f0b-9c70-b8e545c48356	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 14:26:03.817211+00	
00000000-0000-0000-0000-000000000000	8f6a311e-5ad6-458f-82c3-cbdcf275497b	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 14:26:03.817993+00	
00000000-0000-0000-0000-000000000000	69bcec25-dcad-44a6-81b1-8cc7e187db73	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 15:30:20.88044+00	
00000000-0000-0000-0000-000000000000	510a99b3-25cb-44e8-8fde-d9e8329b92f2	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 15:30:20.881724+00	
00000000-0000-0000-0000-000000000000	c0c2cf2c-35a8-4e5d-9954-f828ea84975f	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 16:30:56.144363+00	
00000000-0000-0000-0000-000000000000	e519a4d2-69c1-4c19-b1a9-a56bdb4098d8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 16:30:56.145226+00	
00000000-0000-0000-0000-000000000000	3d5f6384-8028-4a2f-867b-1b4f7798875f	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 17:36:44.380566+00	
00000000-0000-0000-0000-000000000000	3b16c54f-8a23-4413-bb6f-8bc41c3a4c48	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 17:36:44.381577+00	
00000000-0000-0000-0000-000000000000	70e6e39a-d80c-4543-9a8e-099b11664f41	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 18:50:41.094014+00	
00000000-0000-0000-0000-000000000000	888d1238-8b17-4ef6-98ee-1c118f22ff89	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 18:50:41.094437+00	
00000000-0000-0000-0000-000000000000	82013dc1-052f-4b5b-a48f-651870c4f9c5	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 19:55:23.290492+00	
00000000-0000-0000-0000-000000000000	bf2f3aa1-c3f5-4758-8314-946ad642d7d8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 19:55:23.291478+00	
00000000-0000-0000-0000-000000000000	b922da1a-d291-4b85-bd4f-bcd2ca90c73f	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 21:13:58.241859+00	
00000000-0000-0000-0000-000000000000	731e1a66-9181-45e1-b237-7992ffad53e4	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-13 21:13:58.243001+00	
00000000-0000-0000-0000-000000000000	458f20a1-9f1c-4d15-bf75-3f6591d7bf81	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 09:01:13.345635+00	
00000000-0000-0000-0000-000000000000	6c043243-7e8c-4ba7-98a7-31c9cb93eab5	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 09:01:13.352517+00	
00000000-0000-0000-0000-000000000000	913ab95f-55bd-4f6c-86bb-17c0a6f260ef	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 09:59:13.130876+00	
00000000-0000-0000-0000-000000000000	ab23678a-d736-4a3a-8ae8-bd30f72ed337	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 09:59:13.131517+00	
00000000-0000-0000-0000-000000000000	6ea888f8-60d6-4441-b0e7-5d584361515e	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 11:37:06.711252+00	
00000000-0000-0000-0000-000000000000	294ead6d-6374-4b5c-86d1-1352fdcba17f	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 11:37:06.711955+00	
00000000-0000-0000-0000-000000000000	894db681-b9f0-48a3-b7c3-35c2bfa45a5b	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 12:35:26.09747+00	
00000000-0000-0000-0000-000000000000	914f7ef5-aaad-45af-a4bd-17fff7b17860	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 12:35:26.099294+00	
00000000-0000-0000-0000-000000000000	f65d0143-933d-49f5-8d98-319ed276a3f9	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 13:33:26.167761+00	
00000000-0000-0000-0000-000000000000	20c8b211-45b8-462b-9a74-f6a7a436bcac	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 13:33:26.168551+00	
00000000-0000-0000-0000-000000000000	541f7431-ce82-4b98-b433-693067685eb4	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 14:31:45.580383+00	
00000000-0000-0000-0000-000000000000	1ad54102-cb33-4376-8c20-4cdc64e695e8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 14:31:45.581171+00	
00000000-0000-0000-0000-000000000000	c57feb56-3d6a-4a03-8f0d-ffc4469e64ff	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 15:48:25.966177+00	
00000000-0000-0000-0000-000000000000	a1b598c6-3bb1-4b11-b69e-2a02bac578ac	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 15:48:25.967369+00	
00000000-0000-0000-0000-000000000000	2644480c-5ba8-4def-9b9d-7ee8beb1f89c	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 16:46:46.057428+00	
00000000-0000-0000-0000-000000000000	d406269e-ce70-4c5d-bcee-10c64a7f4548	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 16:46:46.058278+00	
00000000-0000-0000-0000-000000000000	de3faf51-9c93-4c29-8cb6-db612d186478	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 17:56:45.535116+00	
00000000-0000-0000-0000-000000000000	9e4e8310-862b-4b10-835f-947e1d6928b3	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 17:56:45.535582+00	
00000000-0000-0000-0000-000000000000	e0a5c03e-3070-4db9-bb57-08840784b660	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 20:22:53.344464+00	
00000000-0000-0000-0000-000000000000	71b98427-ee38-495b-a44a-dc2f2e3ad8f6	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 20:22:53.345661+00	
00000000-0000-0000-0000-000000000000	ba198ca1-97e6-4524-95ff-08264b90fb55	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 20:22:54.045388+00	
00000000-0000-0000-0000-000000000000	708213a9-8d28-49c8-9bdc-3fbf53be2f32	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 22:02:37.853276+00	
00000000-0000-0000-0000-000000000000	7c575f7f-b165-4f7e-952e-9a42ae1528bd	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 22:02:37.855054+00	
00000000-0000-0000-0000-000000000000	623754b4-aebe-4936-8751-8849d6c6d056	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 23:04:49.395983+00	
00000000-0000-0000-0000-000000000000	25ea1dc7-5dce-48e5-a642-699754abacd8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-14 23:04:49.398845+00	
00000000-0000-0000-0000-000000000000	6b1b14f3-b433-4084-bd56-158847231cdc	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 00:06:04.519764+00	
00000000-0000-0000-0000-000000000000	cb31f59c-2dad-4060-bac3-33c120b1142b	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 00:06:04.520268+00	
00000000-0000-0000-0000-000000000000	efeaec3c-bee2-482a-9b9e-9f9944ae12c0	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 07:34:41.802374+00	
00000000-0000-0000-0000-000000000000	dedc8e4b-6fd5-4466-bb55-7d8687981e1d	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 07:34:41.802982+00	
00000000-0000-0000-0000-000000000000	d91bf667-0830-4fd3-a5e9-7511e71b8931	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 09:31:02.308885+00	
00000000-0000-0000-0000-000000000000	5d7b5b04-a9d9-4b07-87a7-f433bb59c789	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 09:31:02.310602+00	
00000000-0000-0000-0000-000000000000	338c8eb1-fcc2-440e-a7c7-c2f40aa2617d	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 11:14:39.994733+00	
00000000-0000-0000-0000-000000000000	f32bbc46-b46d-4b04-addc-8b43007f2808	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 11:14:39.996129+00	
00000000-0000-0000-0000-000000000000	29c69493-597f-43a6-aee0-d92ed357d103	{"action":"logout","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account"}	2024-12-15 11:23:26.504795+00	
00000000-0000-0000-0000-000000000000	be709c31-0c45-444b-83cc-de92e77fbd5e	{"action":"login","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-15 11:23:46.859343+00	
00000000-0000-0000-0000-000000000000	9b4e8cf5-c245-4ff1-9192-41c081f08602	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 12:50:30.032286+00	
00000000-0000-0000-0000-000000000000	90a58ab6-2505-4573-86ba-b5892634054e	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 12:50:30.033729+00	
00000000-0000-0000-0000-000000000000	c2577755-a09b-4f27-9f1c-b483bf82cde1	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 14:18:35.388847+00	
00000000-0000-0000-0000-000000000000	918281cb-13b9-4bd0-8b10-81c821b0ead3	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 14:18:35.3895+00	
00000000-0000-0000-0000-000000000000	06a1a0b0-5552-4042-870a-cc99dd109bc6	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 15:49:08.71684+00	
00000000-0000-0000-0000-000000000000	cb7d8fc7-a09b-47af-8e3e-8642aab456f2	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 15:49:08.717439+00	
00000000-0000-0000-0000-000000000000	2d1a1554-1603-426f-8c7f-54a5fcb6b8fb	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 16:56:08.87589+00	
00000000-0000-0000-0000-000000000000	808256a4-f2c4-47bf-8c6b-ddb9df40731f	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 16:56:08.877165+00	
00000000-0000-0000-0000-000000000000	57c21c6e-60aa-4d01-89a3-84eb11c2c30a	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 18:02:02.658745+00	
00000000-0000-0000-0000-000000000000	b9ddd8f0-807b-429d-b3f7-283835cd6b4d	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 18:02:02.660518+00	
00000000-0000-0000-0000-000000000000	df88b963-624a-4eda-84a2-e064f4703d8a	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 19:00:18.67569+00	
00000000-0000-0000-0000-000000000000	9f639899-e7a4-47b2-8772-97b46bbce8f3	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 19:00:18.676465+00	
00000000-0000-0000-0000-000000000000	02d50e7d-0f8f-4f14-9393-5096c70b18cf	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 20:02:16.258923+00	
00000000-0000-0000-0000-000000000000	e3b289af-abfc-4c1e-ad27-9bf30bdaa1b0	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 20:02:16.262043+00	
00000000-0000-0000-0000-000000000000	b88d9ff5-9967-4401-b0b2-c594b4de3ad3	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 21:00:45.818773+00	
00000000-0000-0000-0000-000000000000	3c562618-a133-49da-b2cd-e1dee44502fe	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 21:00:45.819407+00	
00000000-0000-0000-0000-000000000000	a1fe8e80-c437-4f9a-8ca8-857425b1408b	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 22:21:06.331364+00	
00000000-0000-0000-0000-000000000000	afdf0b26-fd5a-4feb-806e-0a24d3523f5c	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 22:21:06.332269+00	
00000000-0000-0000-0000-000000000000	1c419e7a-6c79-4ab4-abed-8e44435785cb	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 23:23:05.471477+00	
00000000-0000-0000-0000-000000000000	ff053c50-6ebd-4a21-b8ba-e0f8903db163	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-15 23:23:05.472296+00	
00000000-0000-0000-0000-000000000000	6aef95c4-6c93-4594-ad28-ee9cf8d2fb67	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 00:47:25.264368+00	
00000000-0000-0000-0000-000000000000	ec9c68ee-029e-4c3e-b216-0503404f1f23	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 00:47:25.265436+00	
00000000-0000-0000-0000-000000000000	08cd714c-e2d0-4345-879f-9549261aff39	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 09:01:08.702753+00	
00000000-0000-0000-0000-000000000000	ff89c31d-020b-4ddf-9775-62689d459b2d	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 09:01:08.706201+00	
00000000-0000-0000-0000-000000000000	307d6a90-46a6-4376-adab-4adde12d3614	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 11:57:22.997275+00	
00000000-0000-0000-0000-000000000000	a66601a1-45f6-4240-af60-9dc25fcf6dd7	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 11:57:22.998301+00	
00000000-0000-0000-0000-000000000000	968cf2bc-7741-4452-900a-15502a10a1dc	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 13:41:48.170208+00	
00000000-0000-0000-0000-000000000000	a2447e73-da3d-4066-91b0-30b6bbc07a40	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 13:41:48.170895+00	
00000000-0000-0000-0000-000000000000	37977774-81d8-4e90-8fb6-f517a585ce42	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 14:53:10.51801+00	
00000000-0000-0000-0000-000000000000	914b4749-c919-4a5d-9cf0-9e024665f7bc	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 14:53:10.518648+00	
00000000-0000-0000-0000-000000000000	9d8578c9-0e33-4e71-9aa0-562da0c5a5f8	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 15:53:42.262165+00	
00000000-0000-0000-0000-000000000000	d700257d-850c-4800-8ff8-f704d73c8820	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 15:53:42.263584+00	
00000000-0000-0000-0000-000000000000	cda2f5bf-fc0e-423f-909c-7994bcbbb0da	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 15:53:42.28548+00	
00000000-0000-0000-0000-000000000000	acab2833-6f8a-4178-b604-0778f5ec9ca5	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 15:53:42.295972+00	
00000000-0000-0000-0000-000000000000	7992934d-20d9-48a8-8aef-2bc9735ff525	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 15:53:42.311839+00	
00000000-0000-0000-0000-000000000000	d17e6448-9bfa-41ac-b078-7acc0f531e6c	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 16:52:05.193783+00	
00000000-0000-0000-0000-000000000000	39457977-fe12-4096-b040-b1f2ac837a19	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 16:52:05.194659+00	
00000000-0000-0000-0000-000000000000	b6811eed-e2af-49d0-b7f0-9fa0eae5bde3	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 17:50:33.059845+00	
00000000-0000-0000-0000-000000000000	35220826-830a-45b9-b64e-c0f7e71aa6e6	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-16 17:50:33.060722+00	
00000000-0000-0000-0000-000000000000	9c090ef5-539e-4166-a5da-059dfaa608e6	{"action":"login","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-17 10:23:25.515434+00	
00000000-0000-0000-0000-000000000000	e1e69608-689b-4ed2-9e33-b9f4cb0c30d6	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 11:21:26.539757+00	
00000000-0000-0000-0000-000000000000	e80a37ce-03c1-4743-b4e1-939573ba4650	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 11:21:26.540258+00	
00000000-0000-0000-0000-000000000000	691cbf82-dcee-44da-bb0f-9c9331870b6c	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 12:19:52.236107+00	
00000000-0000-0000-0000-000000000000	c1c5b772-f876-4cb9-a28a-ca0f5271235e	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 12:19:52.23719+00	
00000000-0000-0000-0000-000000000000	d3b99bcf-8ce8-4a17-952c-0349fa9a41ac	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 13:35:27.414638+00	
00000000-0000-0000-0000-000000000000	f8014fdc-5652-41ab-8572-c4188cb50ac8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 13:35:27.415173+00	
00000000-0000-0000-0000-000000000000	016edc39-92b1-4801-a417-a560bf6cdfa8	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 14:35:27.790795+00	
00000000-0000-0000-0000-000000000000	cb322d7c-4b6d-417f-b7c0-5ae349d83343	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 14:35:27.791297+00	
00000000-0000-0000-0000-000000000000	8b7f2790-123d-446e-ac1c-2f2b6e4fcf31	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 15:33:46.722915+00	
00000000-0000-0000-0000-000000000000	65ab1dec-a413-43f2-b7bf-5c0d321c9bd0	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 15:33:46.723786+00	
00000000-0000-0000-0000-000000000000	483f7974-2e93-4765-aa2a-95a5100b3778	{"action":"logout","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account"}	2024-12-17 15:43:15.357188+00	
00000000-0000-0000-0000-000000000000	1a7c5fbf-6da9-40e6-9e4c-fd0be7582aea	{"action":"login","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}	2024-12-17 15:44:00.605962+00	
00000000-0000-0000-0000-000000000000	c3bb633e-5cd7-453b-a62c-052ab27f59a9	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 16:42:27.319141+00	
00000000-0000-0000-0000-000000000000	1b04316c-e21e-4c9a-87f4-8802e6197de6	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 16:42:27.319563+00	
00000000-0000-0000-0000-000000000000	ef7f9792-a00c-44d5-a1b5-a8f77fd3adec	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 17:40:55.232398+00	
00000000-0000-0000-0000-000000000000	6f5e5b13-b053-468a-9793-8d93e6d28be1	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 17:40:55.233347+00	
00000000-0000-0000-0000-000000000000	13a92d1d-a559-4224-8bd9-37c312657533	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 18:39:08.793471+00	
00000000-0000-0000-0000-000000000000	d6a9d2a3-b6e4-4a5c-80ee-3395b7f6e52d	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 18:39:08.794183+00	
00000000-0000-0000-0000-000000000000	fea2841d-37ed-4c52-a36b-5cf5a5d59f4f	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 19:37:22.740719+00	
00000000-0000-0000-0000-000000000000	c5ed5234-5797-4639-aa2b-fe4900e24f79	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 19:37:22.741435+00	
00000000-0000-0000-0000-000000000000	48f2df5b-934b-4cda-9fca-9006f962acbe	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 20:35:22.715134+00	
00000000-0000-0000-0000-000000000000	473146f7-da5e-4026-9a92-def9195a53c8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 20:35:22.716217+00	
00000000-0000-0000-0000-000000000000	23b938d0-e89d-4014-bd83-50e31524fdc3	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 21:33:22.77282+00	
00000000-0000-0000-0000-000000000000	7d278c55-5948-4762-913e-dfcbccc544bc	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 21:33:22.774025+00	
00000000-0000-0000-0000-000000000000	c5cae2a3-dd9b-4b7b-a014-ab178fdb19a0	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 23:53:10.122337+00	
00000000-0000-0000-0000-000000000000	5444f847-0108-483d-808c-b68ff097420c	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-17 23:53:10.122824+00	
00000000-0000-0000-0000-000000000000	c5e8f309-8831-48d5-9ec0-f83320964f39	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-18 00:51:16.655245+00	
00000000-0000-0000-0000-000000000000	0cee054f-a670-4bfc-838d-2861cff33667	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-18 00:51:16.657092+00	
00000000-0000-0000-0000-000000000000	da67c8b2-97d8-43b6-a9d0-0141b1056ef7	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-18 08:11:11.285881+00	
00000000-0000-0000-0000-000000000000	fd880cde-17d7-4532-860f-9d1e38a92fe8	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-18 08:11:11.2871+00	
00000000-0000-0000-0000-000000000000	b7b9eca0-fdbd-4dc0-be18-26a57bfdb684	{"action":"token_refreshed","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-18 09:09:11.294129+00	
00000000-0000-0000-0000-000000000000	663f2e16-63af-4d5c-bbf9-31935c6922a1	{"action":"token_revoked","actor_id":"a5eded3c-b113-4327-87b7-33fccd71c5b3","actor_username":"test-prompt1@email.com","actor_via_sso":false,"log_type":"token"}	2024-12-18 09:09:11.295619+00	
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method", "auth_code_issued_at") FROM stdin;
2af51fb8-0980-4655-a927-b489e1486885	eeb4025a-4cea-4eaa-97e8-c7247e62186f	685fa385-a103-48b6-a484-142352788cf1	s256	0d9UJrO1wtrpqv81bCvIeyAUfL8DY7a4AwElNgYVTxk	google	ya29.a0AeDClZC8MF9MJ3hwuDJjSiCE3yKMJ4WlYhw5K0lU3BWFOS91Pz4DBU5QaDBpkslK4lxb-kenaY9NYIQDZhCQfWVyis7Vn59s1atPshp9dZH8yVbmxJlYmki6hk4ZxLQ2a13pjmyQ4OcYUmk7XmZ6n7ERukFv5O08bXWr3hskaCgYKAbkSARESFQHGX2Mi0f2Z7ESdhYsccB6uuGfxvA0175		2024-12-07 08:38:47.298144+00	2024-12-07 08:38:52.354042+00	oauth	2024-12-07 08:38:52.353977+00
a1724cfc-b5a6-466b-aebb-1fe195b14be8	6efd3bf5-1976-4f97-88c1-7b91d28de202	d4eb7603-6e6d-4bab-8abb-4140df20eb2f	s256	uZV0fqCFJIuMRo3bQRMFvzXjYcGrnZf0V0a2d_zcyKk	google	ya29.a0AeDClZBiZzRx3iJxzdotl_u3i_LpNG-3VZkr5G9BJmtfPlYEtOsSndGT5GB4p23gjs39RwkKNnsvtjeirAxcYOJbgnFeklDqM4Sw5Qftzbs62iK1RZzVtobCkFlv1a02khsjGZmoBNjgLbbdcgqYD85Hagt-OB4aeQaCgYKAeMSARESFQHGX2MiMgUyL3MOcTL0G2OBHP3-bA0169		2024-12-07 11:01:32.46094+00	2024-12-07 11:01:33.433568+00	oauth	2024-12-07 11:01:33.433499+00
e201abb1-bb4b-4e67-8b1c-7e047305072c	6efd3bf5-1976-4f97-88c1-7b91d28de202	0c0865d1-c3ea-4baa-9658-48f448359ac1	s256	nAfX7g4Zh255HZYueUNMVn2Yo6USoGqIOSoJk2jkDVQ	google	ya29.a0AeDClZDp9E-ZJmWfuRjrXZfoczxWFogRBGK7GQhlDoOp7NKqlPDZbaS22xxbQ041mwEAwmr3kki_oVbq7O0_M-NVC16KABX5m2KcVxS-g2Bro4gaJs1ZiPUtKwtAODPCA1rdYOU-nKt8n6xgsbterY_csOur_ePf2waCgYKAQQSARESFQHGX2MiVZjpjacK3lfIWDvEONEscw0169		2024-12-07 11:05:56.204905+00	2024-12-07 11:05:57.099841+00	oauth	2024-12-07 11:05:57.099792+00
cbc70d21-ad67-4656-ab6a-9a823113ac40	c092bb15-5ce9-469f-857b-cbb2f9ff1887	865ecfe6-3df4-4a4b-a910-66e90c0aeed8	s256	vKlj51eSXO_j6iCtHL5SdIWr5xyZyamJ8ji7etAs7EQ	google	ya29.a0AeDClZCvNAph30wUM9wrhS9r0UrOsSLEYxqqiLvLWOwxJOrTy-p8PCBrJ9r9IOON1X3AIoy7JUZHTfDY12NpR8K0A6T27jNHmLMT3j5WvMz0Q7ftJ7MLyEiFydAe5OYog4puppo1_V3GtZBX2i7T2L5IRVNZl8PeFAaCgYKAZMSARESFQHGX2Midy8h8GIQ4L3V90oqo5M5Zw0169		2024-12-07 11:08:17.773909+00	2024-12-07 11:08:18.613505+00	oauth	2024-12-07 11:08:18.613438+00
873c8e44-6129-48f4-ae6a-0175aa78181d	c092bb15-5ce9-469f-857b-cbb2f9ff1887	240ada96-039a-4aed-bd85-c2e90893339b	s256	PEKyrbPp-dtTWc03623ES8SxzwGg736JJw5k8_9NFtw	google	ya29.a0AeDClZBW-xQwqkDsD0XWhcMCZrXezbmZ6M2YSLCwMKed6S0-g8lipCy2zLDF2qOt1OU3U_Hz0h5J4sRImNKs61ndImsK8fPSLuuUliQo2E85hxM_-DFxu2nftZwTWL-NvbR_s8QVHHC1fqHnAnUcskVBxQog7mcHggaCgYKAdwSARESFQHGX2Mimhrwn8VvrEFpXbcYX0tV3g0169		2024-12-07 11:29:12.291101+00	2024-12-07 11:29:13.448258+00	oauth	2024-12-07 11:29:13.448201+00
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") FROM stdin;
a5eded3c-b113-4327-87b7-33fccd71c5b3	a5eded3c-b113-4327-87b7-33fccd71c5b3	{"sub": "a5eded3c-b113-4327-87b7-33fccd71c5b3", "email": "test-prompt1@email.com", "email_verified": false, "phone_verified": false}	email	2024-12-11 12:15:34.760448+00	2024-12-11 12:15:34.760473+00	2024-12-11 12:15:34.760473+00	dc1d7acf-0d92-4c83-99d1-26351d8eae2d
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."instances" ("id", "uuid", "raw_base_config", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") FROM stdin;
d207532d-ac1c-43ac-863c-29dd74536bf6	2024-12-17 15:44:00.608281+00	2024-12-17 15:44:00.608281+00	password	221ed993-7067-4dd5-b47c-92f613245d11
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_challenges" ("id", "factor_id", "created_at", "verified_at", "ip_address", "otp_code", "web_authn_session_data") FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."mfa_factors" ("id", "user_id", "friendly_name", "factor_type", "status", "created_at", "updated_at", "secret", "phone", "last_challenged_at", "web_authn_credential", "web_authn_aaguid") FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."one_time_tokens" ("id", "user_id", "token_type", "token_hash", "relates_to", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") FROM stdin;
00000000-0000-0000-0000-000000000000	149	SqE-7o-gqZ-22idNWPcd0g	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 23:53:10.123292+00	2024-12-18 00:51:16.658077+00	E9CkCGLa3OplSWqUmfIvfA	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	150	d8KAbt42_h-3qSsUA8mWQQ	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-18 00:51:16.658673+00	2024-12-18 08:11:11.28791+00	SqE-7o-gqZ-22idNWPcd0g	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	151	fX314MbHZJsKFBZtxEJ2tA	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-18 08:11:11.2882+00	2024-12-18 09:09:11.296407+00	d8KAbt42_h-3qSsUA8mWQQ	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	152	tHQz-JA-cSF_WgtAJClf-Q	a5eded3c-b113-4327-87b7-33fccd71c5b3	f	2024-12-18 09:09:11.296772+00	2024-12-18 09:09:11.296772+00	fX314MbHZJsKFBZtxEJ2tA	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	142	1jukheDM30r2wSF8-IXhKA	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 15:44:00.607453+00	2024-12-17 16:42:27.319901+00	\N	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	143	nG2woktT6T8UYLNl-VQPeQ	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 16:42:27.320095+00	2024-12-17 17:40:55.233976+00	1jukheDM30r2wSF8-IXhKA	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	144	nOPHIy0HbHHDW2LWWfheMQ	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 17:40:55.234353+00	2024-12-17 18:39:08.794634+00	nG2woktT6T8UYLNl-VQPeQ	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	145	nKBpHkpZsajyllTGu1T4Cg	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 18:39:08.794946+00	2024-12-17 19:37:22.741909+00	nOPHIy0HbHHDW2LWWfheMQ	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	146	EvFeNKiZTx-heCfCyHF6Ew	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 19:37:22.742196+00	2024-12-17 20:35:22.716891+00	nKBpHkpZsajyllTGu1T4Cg	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	147	vAjiuiqlGBz5oPzGOLJsbg	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 20:35:22.717336+00	2024-12-17 21:33:22.774836+00	EvFeNKiZTx-heCfCyHF6Ew	d207532d-ac1c-43ac-863c-29dd74536bf6
00000000-0000-0000-0000-000000000000	148	E9CkCGLa3OplSWqUmfIvfA	a5eded3c-b113-4327-87b7-33fccd71c5b3	t	2024-12-17 21:33:22.775332+00	2024-12-17 23:53:10.123101+00	vAjiuiqlGBz5oPzGOLJsbg	d207532d-ac1c-43ac-863c-29dd74536bf6
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_providers" ("id", "sso_provider_id", "entity_id", "metadata_xml", "metadata_url", "attribute_mapping", "created_at", "updated_at", "name_id_format") FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."saml_relay_states" ("id", "sso_provider_id", "request_id", "for_email", "redirect_to", "created_at", "updated_at", "flow_state_id") FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."schema_migrations" ("version") FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") FROM stdin;
d207532d-ac1c-43ac-863c-29dd74536bf6	a5eded3c-b113-4327-87b7-33fccd71c5b3	2024-12-17 15:44:00.606873+00	2024-12-18 09:09:11.30327+00	\N	aal1	\N	2024-12-18 09:09:11.303117	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36	192.168.65.1	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_domains" ("id", "sso_provider_id", "domain", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."sso_providers" ("id", "resource_id", "created_at", "updated_at") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

COPY "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") FROM stdin;
00000000-0000-0000-0000-000000000000	a5eded3c-b113-4327-87b7-33fccd71c5b3	authenticated	authenticated	test-prompt1@email.com	$2a$10$FnDCjaVwbYxrKk5HnWRRW.aSHG1iSycD8mc.OUOpoSYRb.Q.ZFJUK	2024-12-11 12:15:34.761947+00	\N		\N		\N			\N	2024-12-17 15:44:00.606824+00	{"provider": "email", "providers": ["email"]}	{"sub": "a5eded3c-b113-4327-87b7-33fccd71c5b3", "email": "test-prompt1@email.com", "email_verified": false, "phone_verified": false}	\N	2024-12-11 12:15:34.757861+00	2024-12-18 09:09:11.302002+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--

COPY "pgsodium"."key" ("id", "status", "created", "expires", "key_type", "key_id", "key_context", "name", "associated_data", "raw_key", "raw_key_nonce", "parent_key", "comment", "user_data") FROM stdin;
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."chats" ("id", "created_at", "updated_at", "user_email", "user_id", "chat_id") FROM stdin;
\.


--
-- Data for Name: daily_cardio_exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."daily_cardio_exercises" ("id", "created_at", "start_time", "end_time", "duration_minutes", "user_email", "user_id", "cardio_name") FROM stdin;
\.


--
-- Data for Name: daily_intakes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."daily_intakes" ("id", "created_at", "updated_at", "user_id", "user_email", "intake_calories_kcal", "intake_carbohydrate_g", "intake_protein_g", "intake_fat_g", "goal_calories_kcal", "goal_carbohydrate_g", "goal_protein_g", "goal_fat_g", "date", "llm_description") FROM stdin;
b0c9db92-4c9b-416d-9afa-b8aeb0c25355	2024-12-16 15:08:59.014155+00	2024-12-16 15:08:59.014155+00	a5eded3c-b113-4327-87b7-33fccd71c5b3	test-prompt1@email.com	0	0	0	0	0	0	0	0	2024-12-16 15:00:00+00	
9d5242b6-e393-41b7-84f9-73cc68854072	2024-12-16 16:57:52.022548+00	2024-12-16 16:57:52.022548+00	a5eded3c-b113-4327-87b7-33fccd71c5b3	test-prompt1@email.com	0	0	0	0	2000	250	75	70	2024-12-16 15:00:00+00	제공된 정보에 따르면, 귀하는 체중 감량 목표를 설정하지 않았습니다. 따라서, 귀하의 연령과 성별에 따른 일반적인 일일 권장 섭취량을 제공합니다. 이 수치는 참고용이며, 개인의 활동 수준과 건강 상태에 따라 달라질 수 있습니다.
57213dcc-4b3b-47e1-8b85-3b517af7ebfc	2024-12-17 19:28:21.919601+00	2024-12-17 19:28:21.919601+00	a5eded3c-b113-4327-87b7-33fccd71c5b3	test-prompt1@email.com	0	0	0	0	0	0	0	0	2024-12-17 15:00:00+00	
\.


--
-- Data for Name: daily_weights_exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."daily_weights_exercises" ("id", "created_at", "start_time", "end_time", "user_email", "user_id") FROM stdin;
99b6b8e3-f009-45e9-83e7-588a0d8e9443	2024-12-14 16:30:32.128918+00	2024-12-14 16:27:29+00	\N	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3
743e031c-5cd5-4cb5-8373-90192556116f	2024-12-15 11:26:18.868893+00	2024-12-15 11:23:50+00	\N	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3
\.


--
-- Data for Name: each_weights_exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."each_weights_exercises" ("id", "user_email", "user_id", "weights_exercises_id", "workout_name", "body_part") FROM stdin;
0c33336a-a0cb-4fdb-b436-f1aca603f6f5	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	99b6b8e3-f009-45e9-83e7-588a0d8e9443	leg-extension	legs
1319dfb6-98ed-485b-ba8c-7956d7422319	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	99b6b8e3-f009-45e9-83e7-588a0d8e9443	front-raise	shoulders
3359af96-4ee0-4479-85be-bd5ab0bf4e12	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	743e031c-5cd5-4cb5-8373-90192556116f	barbell-curl	arms
\.


--
-- Data for Name: each_weights_exercises_set_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."each_weights_exercises_set_info" ("id", "created_at", "user_email", "user_id", "each_weights_exercises_id", "reps", "kg", "set_number") FROM stdin;
382a079d-4bb0-4a11-a65d-6741fa88aa2f	2024-12-14 16:30:32.128918+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	0c33336a-a0cb-4fdb-b436-f1aca603f6f5	123	0	1
c29bf326-ab7d-47ca-9573-2006dd6a4e1b	2024-12-14 16:30:32.128918+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	0c33336a-a0cb-4fdb-b436-f1aca603f6f5	233	0	2
11fcf879-dafa-4968-b8ce-66500b209cde	2024-12-14 16:30:32.128918+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	1319dfb6-98ed-485b-ba8c-7956d7422319	5	0	1
946ad3ce-ad13-4065-8560-ac089b194a03	2024-12-14 16:30:32.128918+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	1319dfb6-98ed-485b-ba8c-7956d7422319	23	0	2
4aeb4f59-e492-4d7d-835d-d68e4c4a5e6e	2024-12-15 11:26:18.868893+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	3359af96-4ee0-4479-85be-bd5ab0bf4e12	234	0	1
\.


--
-- Data for Name: foods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."foods" ("id", "meal_id", "user_email", "user_id", "calories", "food_name", "pic_url", "protein", "fat", "carbohydrate") FROM stdin;
efa7fd09-8193-4ca7-a5bf-ff9101baf189	5b12e6be-2ae2-4bc4-865d-a629f9491b6f	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	23	음식2	\N	23	44	44
0463f69a-1102-4423-98ee-0098d53b699c	1725f03d-07c9-4912-a996-052726b0e458	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	104	포도	https://mycoach247-food-image-application.s3.ap-northeast-2.amazonaws.com/c0f2bb62-1021-4506-977b-b50c74b25d0c	0.6	0.2	27.3
9f700d33-ab1b-4419-b27a-12bd8fb0d1cd	5856e4e8-c372-4af0-bbc3-5599c4a1a55c	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	150	감자튀김	495b2932-e4b9-4a1d-b2c8-abbb1a6ab046	2	7	19
cb35d4c2-94f8-4b27-9715-675a8f741815	233016df-ab89-44a6-82cd-13445597a715	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	23	food1	\N	32	123	123
d2f06937-c54e-4f92-8e14-c83d62d4b0b0	aef25729-5064-43fd-8a52-18075d9b23b1	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	23	ffda	\N	233	23	213
\.


--
-- Data for Name: health_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."health_info" ("id", "created_at", "updated_at", "user_email", "user_id", "measured_date", "height_cm", "weight_kg", "body_fat_mass_kg", "skeletal_muscle_mass_kg", "age") FROM stdin;
6fc96dd8-2a77-45a4-bacb-d46cf106af1e	2024-12-11 12:15:52.131751+00	2024-12-11 12:15:52.131751+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	2024-12-11 00:00:00+00	175	75	\N	\N	30
\.


--
-- Data for Name: llm_daily_exercies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."llm_daily_exercies" ("id", "created_at", "user_email", "exercise_detail", "user_id", "exercise_date") FROM stdin;
\.


--
-- Data for Name: meals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."meals" ("id", "created_at", "meal_time", "user_email", "user_id", "total_calories", "total_carbohydrate", "total_fat", "total_protein") FROM stdin;
5b12e6be-2ae2-4bc4-865d-a629f9491b6f	2024-12-15 12:04:27.722731+00	2024-12-15 11:57:04+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	23	44	44	23
1725f03d-07c9-4912-a996-052726b0e458	2024-12-15 16:21:01.150626+00	2024-12-16 08:20:00+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	104	27.3	0.2	0.6
5856e4e8-c372-4af0-bbc3-5599c4a1a55c	2024-12-15 16:58:17.641925+00	2024-12-15 21:00:00+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	150	19	7	2
233016df-ab89-44a6-82cd-13445597a715	2024-12-15 20:07:35.860142+00	2024-12-15 20:07:00+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	23	123	123	32
aef25729-5064-43fd-8a52-18075d9b23b1	2024-12-15 20:08:12.315098+00	2024-12-15 20:03:26+00	test-prompt1@email.com	a5eded3c-b113-4327-87b7-33fccd71c5b3	23	213	23	233
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."messages" ("id", "created_at", "user_email", "user_id", "chat_id", "message_id") FROM stdin;
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."profiles" ("id", "created_at", "updated_at", "user_id", "username", "main_image", "user_email", "timezone", "language") FROM stdin;
6034493e-18c5-457e-824e-0db527cb18ae	2024-12-11 12:15:34.757579+00	2024-12-11 12:15:34.757579+00	a5eded3c-b113-4327-87b7-33fccd71c5b3	test-prompt1	\N	test-prompt1@email.com	Asia/Seoul	ko
\.


--
-- Data for Name: user_goals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "public"."user_goals" ("id", "created_at", "updated_at", "user_id", "user_email", "weight_kg", "body_fat_mass_kg", "skeletal_muscle_mass_kg", "goal_description") FROM stdin;
bc00e3db-b115-4a80-b51d-6dd8a24cacaf	2024-12-11 15:11:56.574891+00	2024-12-11 15:11:56.574891+00	a5eded3c-b113-4327-87b7-33fccd71c5b3	test-prompt1@email.com	\N	\N	\N	\N
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY "realtime"."schema_migrations" ("version", "inserted_at") FROM stdin;
20211116024918	2024-12-05 04:27:25
20211116045059	2024-12-05 04:27:25
20211116050929	2024-12-05 04:27:25
20211116051442	2024-12-05 04:27:25
20211116212300	2024-12-05 04:27:25
20211116213355	2024-12-05 04:27:25
20211116213934	2024-12-05 04:27:25
20211116214523	2024-12-05 04:27:25
20211122062447	2024-12-05 04:27:25
20211124070109	2024-12-05 04:27:25
20211202204204	2024-12-05 04:27:25
20211202204605	2024-12-05 04:27:25
20211210212804	2024-12-05 04:27:25
20211228014915	2024-12-05 04:27:25
20220107221237	2024-12-05 04:27:25
20220228202821	2024-12-05 04:27:25
20220312004840	2024-12-05 04:27:25
20220603231003	2024-12-05 04:27:25
20220603232444	2024-12-05 04:27:25
20220615214548	2024-12-05 04:27:25
20220712093339	2024-12-05 04:27:25
20220908172859	2024-12-05 04:27:25
20220916233421	2024-12-05 04:27:25
20230119133233	2024-12-05 04:27:25
20230128025114	2024-12-05 04:27:25
20230128025212	2024-12-05 04:27:25
20230227211149	2024-12-05 04:27:25
20230228184745	2024-12-05 04:27:25
20230308225145	2024-12-05 04:27:25
20230328144023	2024-12-05 04:27:25
20231018144023	2024-12-05 04:27:25
20231204144023	2024-12-05 04:27:25
20231204144024	2024-12-05 04:27:25
20231204144025	2024-12-05 04:27:25
20240108234812	2024-12-05 04:27:25
20240109165339	2024-12-05 04:27:25
20240227174441	2024-12-05 04:27:25
20240311171622	2024-12-05 04:27:25
20240321100241	2024-12-05 04:27:25
20240401105812	2024-12-05 04:27:25
20240418121054	2024-12-05 04:27:25
20240523004032	2024-12-05 04:27:25
20240618124746	2024-12-05 04:27:25
20240801235015	2024-12-05 04:27:25
20240805133720	2024-12-05 04:27:25
20240827160934	2024-12-05 04:27:25
20240919163303	2024-12-05 04:27:25
20240919163305	2024-12-05 04:27:25
20241019105805	2024-12-05 04:27:25
20241030150047	2024-12-05 04:27:26
20241108114728	2024-12-05 04:27:26
20241121104152	2024-12-05 04:27:26
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: supabase_admin
--

COPY "realtime"."subscription" ("id", "subscription_id", "entity", "filters", "claims", "created_at") FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."migrations" ("id", "name", "hash", "executed_at") FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2024-12-05 04:27:47.763165
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2024-12-05 04:27:47.765669
2	storage-schema	5c7968fd083fcea04050c1b7f6253c9771b99011	2024-12-05 04:27:47.767276
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2024-12-05 04:27:47.774236
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2024-12-05 04:27:47.780945
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2024-12-05 04:27:47.782064
6	change-column-name-in-get-size	f93f62afdf6613ee5e7e815b30d02dc990201044	2024-12-05 04:27:47.783492
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2024-12-05 04:27:47.784626
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2024-12-05 04:27:47.785594
9	fix-search-function	3a0af29f42e35a4d101c259ed955b67e1bee6825	2024-12-05 04:27:47.786439
10	search-files-search-function	68dc14822daad0ffac3746a502234f486182ef6e	2024-12-05 04:27:47.787816
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2024-12-05 04:27:47.790149
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2024-12-05 04:27:47.791878
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2024-12-05 04:27:47.793095
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2024-12-05 04:27:47.794135
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2024-12-05 04:27:47.803192
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2024-12-05 04:27:47.804616
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2024-12-05 04:27:47.805618
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2024-12-05 04:27:47.806672
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2024-12-05 04:27:47.808279
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2024-12-05 04:27:47.809217
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2024-12-05 04:27:47.811766
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2024-12-05 04:27:47.819562
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2024-12-05 04:27:47.826801
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2024-12-05 04:27:47.828419
25	custom-metadata	67eb93b7e8d401cafcdc97f9ac779e71a79bfe03	2024-12-05 04:27:47.82941
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads" ("id", "in_progress_size", "upload_signature", "bucket_id", "key", "version", "owner_id", "created_at", "user_metadata") FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

COPY "storage"."s3_multipart_uploads_parts" ("id", "upload_id", "size", "part_number", "bucket_id", "key", "etag", "owner_id", "version", "created_at") FROM stdin;
\.


--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY "supabase_functions"."hooks" ("id", "hook_table_id", "hook_name", "created_at", "request_id") FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--

COPY "supabase_functions"."migrations" ("version", "inserted_at") FROM stdin;
initial	2024-12-05 04:27:06.809683+00
20210809183423_update_grants	2024-12-05 04:27:06.809683+00
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--

COPY "vault"."secrets" ("id", "name", "description", "secret", "key_id", "nonce", "created_at", "updated_at") FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 152, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: supabase_admin
--

SELECT pg_catalog.setval('"realtime"."subscription_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- Name: extensions extensions_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY "_realtime"."extensions"
    ADD CONSTRAINT "extensions_pkey" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY "_realtime"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY "_realtime"."tenants"
    ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_amr_claims"
    ADD CONSTRAINT "amr_id_pk" PRIMARY KEY ("id");


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."audit_log_entries"
    ADD CONSTRAINT "audit_log_entries_pkey" PRIMARY KEY ("id");


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."flow_state"
    ADD CONSTRAINT "flow_state_pkey" PRIMARY KEY ("id");


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."identities"
    ADD CONSTRAINT "identities_pkey" PRIMARY KEY ("id");


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."identities"
    ADD CONSTRAINT "identities_provider_id_provider_unique" UNIQUE ("provider_id", "provider");


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."instances"
    ADD CONSTRAINT "instances_pkey" PRIMARY KEY ("id");


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_amr_claims"
    ADD CONSTRAINT "mfa_amr_claims_session_id_authentication_method_pkey" UNIQUE ("session_id", "authentication_method");


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_challenges"
    ADD CONSTRAINT "mfa_challenges_pkey" PRIMARY KEY ("id");


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_factors"
    ADD CONSTRAINT "mfa_factors_last_challenged_at_key" UNIQUE ("last_challenged_at");


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_factors"
    ADD CONSTRAINT "mfa_factors_pkey" PRIMARY KEY ("id");


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."one_time_tokens"
    ADD CONSTRAINT "one_time_tokens_pkey" PRIMARY KEY ("id");


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id");


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_token_unique" UNIQUE ("token");


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."saml_providers"
    ADD CONSTRAINT "saml_providers_entity_id_key" UNIQUE ("entity_id");


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."saml_providers"
    ADD CONSTRAINT "saml_providers_pkey" PRIMARY KEY ("id");


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."saml_relay_states"
    ADD CONSTRAINT "saml_relay_states_pkey" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."sso_domains"
    ADD CONSTRAINT "sso_domains_pkey" PRIMARY KEY ("id");


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."sso_providers"
    ADD CONSTRAINT "sso_providers_pkey" PRIMARY KEY ("id");


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."users"
    ADD CONSTRAINT "users_phone_key" UNIQUE ("phone");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");


--
-- Name: daily_cardio_exercises cardio_exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."daily_cardio_exercises"
    ADD CONSTRAINT "cardio_exercises_pkey" PRIMARY KEY ("id");


--
-- Name: chats chats_chat_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_chat_id_key" UNIQUE ("chat_id");


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_pkey" PRIMARY KEY ("id");


--
-- Name: daily_intakes daily_intakes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."daily_intakes"
    ADD CONSTRAINT "daily_intakes_pkey" PRIMARY KEY ("id");


--
-- Name: each_weights_exercises each_weights_exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."each_weights_exercises"
    ADD CONSTRAINT "each_weights_exercises_pkey" PRIMARY KEY ("id");


--
-- Name: each_weights_exercises_set_info each_weights_exercises_set_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."each_weights_exercises_set_info"
    ADD CONSTRAINT "each_weights_exercises_set_info_pkey" PRIMARY KEY ("id");


--
-- Name: llm_daily_exercies exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."llm_daily_exercies"
    ADD CONSTRAINT "exercise_pkey" PRIMARY KEY ("id");


--
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."foods"
    ADD CONSTRAINT "foods_pkey" PRIMARY KEY ("id");


--
-- Name: health_info health_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."health_info"
    ADD CONSTRAINT "health_info_pkey" PRIMARY KEY ("id");


--
-- Name: meals meals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."meals"
    ADD CONSTRAINT "meals_pkey" PRIMARY KEY ("id");


--
-- Name: messages messages_message_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_message_id_key" UNIQUE ("message_id");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");


--
-- Name: profiles profiles_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_email_key" UNIQUE ("user_email");


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");


--
-- Name: profiles profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_key" UNIQUE ("user_id");


--
-- Name: user_goals user_goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."user_goals"
    ADD CONSTRAINT "user_goals_pkey" PRIMARY KEY ("id");


--
-- Name: user_goals user_goals_user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."user_goals"
    ADD CONSTRAINT "user_goals_user_email_key" UNIQUE ("user_email");


--
-- Name: daily_weights_exercises weights_exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."daily_weights_exercises"
    ADD CONSTRAINT "weights_exercises_pkey" PRIMARY KEY ("id");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY "realtime"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id", "inserted_at");


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY "realtime"."subscription"
    ADD CONSTRAINT "pk_subscription" PRIMARY KEY ("id");


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY "realtime"."schema_migrations"
    ADD CONSTRAINT "schema_migrations_pkey" PRIMARY KEY ("version");


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."buckets"
    ADD CONSTRAINT "buckets_pkey" PRIMARY KEY ("id");


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."migrations"
    ADD CONSTRAINT "migrations_name_key" UNIQUE ("name");


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."migrations"
    ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("id");


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."objects"
    ADD CONSTRAINT "objects_pkey" PRIMARY KEY ("id");


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads_parts"
    ADD CONSTRAINT "s3_multipart_uploads_parts_pkey" PRIMARY KEY ("id");


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads"
    ADD CONSTRAINT "s3_multipart_uploads_pkey" PRIMARY KEY ("id");


--
-- Name: hooks hooks_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY "supabase_functions"."hooks"
    ADD CONSTRAINT "hooks_pkey" PRIMARY KEY ("id");


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: supabase_functions; Owner: supabase_functions_admin
--

ALTER TABLE ONLY "supabase_functions"."migrations"
    ADD CONSTRAINT "migrations_pkey" PRIMARY KEY ("version");


--
-- Name: extensions_tenant_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE INDEX "extensions_tenant_external_id_index" ON "_realtime"."extensions" USING "btree" ("tenant_external_id");


--
-- Name: extensions_tenant_external_id_type_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX "extensions_tenant_external_id_type_index" ON "_realtime"."extensions" USING "btree" ("tenant_external_id", "type");


--
-- Name: tenants_external_id_index; Type: INDEX; Schema: _realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX "tenants_external_id_index" ON "_realtime"."tenants" USING "btree" ("external_id");


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "audit_logs_instance_id_idx" ON "auth"."audit_log_entries" USING "btree" ("instance_id");


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "confirmation_token_idx" ON "auth"."users" USING "btree" ("confirmation_token") WHERE (("confirmation_token")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "email_change_token_current_idx" ON "auth"."users" USING "btree" ("email_change_token_current") WHERE (("email_change_token_current")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "email_change_token_new_idx" ON "auth"."users" USING "btree" ("email_change_token_new") WHERE (("email_change_token_new")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "factor_id_created_at_idx" ON "auth"."mfa_factors" USING "btree" ("user_id", "created_at");


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "flow_state_created_at_idx" ON "auth"."flow_state" USING "btree" ("created_at" DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "identities_email_idx" ON "auth"."identities" USING "btree" ("email" "text_pattern_ops");


--
-- Name: INDEX "identities_email_idx"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX "auth"."identities_email_idx" IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "identities_user_id_idx" ON "auth"."identities" USING "btree" ("user_id");


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "idx_auth_code" ON "auth"."flow_state" USING "btree" ("auth_code");


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "idx_user_id_auth_method" ON "auth"."flow_state" USING "btree" ("user_id", "authentication_method");


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "mfa_challenge_created_at_idx" ON "auth"."mfa_challenges" USING "btree" ("created_at" DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "mfa_factors_user_friendly_name_unique" ON "auth"."mfa_factors" USING "btree" ("friendly_name", "user_id") WHERE (TRIM(BOTH FROM "friendly_name") <> ''::"text");


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "mfa_factors_user_id_idx" ON "auth"."mfa_factors" USING "btree" ("user_id");


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "one_time_tokens_relates_to_hash_idx" ON "auth"."one_time_tokens" USING "hash" ("relates_to");


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "one_time_tokens_token_hash_hash_idx" ON "auth"."one_time_tokens" USING "hash" ("token_hash");


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "one_time_tokens_user_id_token_type_key" ON "auth"."one_time_tokens" USING "btree" ("user_id", "token_type");


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "reauthentication_token_idx" ON "auth"."users" USING "btree" ("reauthentication_token") WHERE (("reauthentication_token")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "recovery_token_idx" ON "auth"."users" USING "btree" ("recovery_token") WHERE (("recovery_token")::"text" !~ '^[0-9 ]*$'::"text");


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "refresh_tokens_instance_id_idx" ON "auth"."refresh_tokens" USING "btree" ("instance_id");


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "refresh_tokens_instance_id_user_id_idx" ON "auth"."refresh_tokens" USING "btree" ("instance_id", "user_id");


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "refresh_tokens_parent_idx" ON "auth"."refresh_tokens" USING "btree" ("parent");


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "refresh_tokens_session_id_revoked_idx" ON "auth"."refresh_tokens" USING "btree" ("session_id", "revoked");


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "refresh_tokens_updated_at_idx" ON "auth"."refresh_tokens" USING "btree" ("updated_at" DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "saml_providers_sso_provider_id_idx" ON "auth"."saml_providers" USING "btree" ("sso_provider_id");


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "saml_relay_states_created_at_idx" ON "auth"."saml_relay_states" USING "btree" ("created_at" DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "saml_relay_states_for_email_idx" ON "auth"."saml_relay_states" USING "btree" ("for_email");


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "saml_relay_states_sso_provider_id_idx" ON "auth"."saml_relay_states" USING "btree" ("sso_provider_id");


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "sessions_not_after_idx" ON "auth"."sessions" USING "btree" ("not_after" DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "sessions_user_id_idx" ON "auth"."sessions" USING "btree" ("user_id");


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "sso_domains_domain_idx" ON "auth"."sso_domains" USING "btree" ("lower"("domain"));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "sso_domains_sso_provider_id_idx" ON "auth"."sso_domains" USING "btree" ("sso_provider_id");


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "sso_providers_resource_id_idx" ON "auth"."sso_providers" USING "btree" ("lower"("resource_id"));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "unique_phone_factor_per_user" ON "auth"."mfa_factors" USING "btree" ("user_id", "phone");


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "user_id_created_at_idx" ON "auth"."sessions" USING "btree" ("user_id", "created_at");


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX "users_email_partial_key" ON "auth"."users" USING "btree" ("email") WHERE ("is_sso_user" = false);


--
-- Name: INDEX "users_email_partial_key"; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX "auth"."users_email_partial_key" IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "users_instance_id_email_idx" ON "auth"."users" USING "btree" ("instance_id", "lower"(("email")::"text"));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "users_instance_id_idx" ON "auth"."users" USING "btree" ("instance_id");


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX "users_is_anonymous_idx" ON "auth"."users" USING "btree" ("is_anonymous");


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX "ix_realtime_subscription_entity" ON "realtime"."subscription" USING "hash" ("entity");


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX "subscription_subscription_id_entity_filters_key" ON "realtime"."subscription" USING "btree" ("subscription_id", "entity", "filters");


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX "bname" ON "storage"."buckets" USING "btree" ("name");


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX "bucketid_objname" ON "storage"."objects" USING "btree" ("bucket_id", "name");


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX "idx_multipart_uploads_list" ON "storage"."s3_multipart_uploads" USING "btree" ("bucket_id", "key", "created_at");


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX "idx_objects_bucket_id_name" ON "storage"."objects" USING "btree" ("bucket_id", "name" COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX "name_prefix_search" ON "storage"."objects" USING "btree" ("name" "text_pattern_ops");


--
-- Name: supabase_functions_hooks_h_table_id_h_name_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX "supabase_functions_hooks_h_table_id_h_name_idx" ON "supabase_functions"."hooks" USING "btree" ("hook_table_id", "hook_name");


--
-- Name: supabase_functions_hooks_request_id_idx; Type: INDEX; Schema: supabase_functions; Owner: supabase_functions_admin
--

CREATE INDEX "supabase_functions_hooks_request_id_idx" ON "supabase_functions"."hooks" USING "btree" ("request_id");


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER "on_auth_user_created" AFTER INSERT ON "auth"."users" FOR EACH ROW EXECUTE FUNCTION "public"."handle_new_user"();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER "tr_check_filters" BEFORE INSERT OR UPDATE ON "realtime"."subscription" FOR EACH ROW EXECUTE FUNCTION "realtime"."subscription_check_filters"();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER "update_objects_updated_at" BEFORE UPDATE ON "storage"."objects" FOR EACH ROW EXECUTE FUNCTION "storage"."update_updated_at_column"();


--
-- Name: extensions extensions_tenant_external_id_fkey; Type: FK CONSTRAINT; Schema: _realtime; Owner: supabase_admin
--

ALTER TABLE ONLY "_realtime"."extensions"
    ADD CONSTRAINT "extensions_tenant_external_id_fkey" FOREIGN KEY ("tenant_external_id") REFERENCES "_realtime"."tenants"("external_id") ON DELETE CASCADE;


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."identities"
    ADD CONSTRAINT "identities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_amr_claims"
    ADD CONSTRAINT "mfa_amr_claims_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "auth"."sessions"("id") ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_challenges"
    ADD CONSTRAINT "mfa_challenges_auth_factor_id_fkey" FOREIGN KEY ("factor_id") REFERENCES "auth"."mfa_factors"("id") ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."mfa_factors"
    ADD CONSTRAINT "mfa_factors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."one_time_tokens"
    ADD CONSTRAINT "one_time_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."refresh_tokens"
    ADD CONSTRAINT "refresh_tokens_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "auth"."sessions"("id") ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."saml_providers"
    ADD CONSTRAINT "saml_providers_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."saml_relay_states"
    ADD CONSTRAINT "saml_relay_states_flow_state_id_fkey" FOREIGN KEY ("flow_state_id") REFERENCES "auth"."flow_state"("id") ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."saml_relay_states"
    ADD CONSTRAINT "saml_relay_states_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."sessions"
    ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY "auth"."sso_domains"
    ADD CONSTRAINT "sso_domains_sso_provider_id_fkey" FOREIGN KEY ("sso_provider_id") REFERENCES "auth"."sso_providers"("id") ON DELETE CASCADE;


--
-- Name: daily_cardio_exercises cardio_exercises_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."daily_cardio_exercises"
    ADD CONSTRAINT "cardio_exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: chats chats_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."chats"
    ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: daily_intakes daily_intakes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."daily_intakes"
    ADD CONSTRAINT "daily_intakes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: each_weights_exercises_set_info each_weights_exercises_set_info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."each_weights_exercises_set_info"
    ADD CONSTRAINT "each_weights_exercises_set_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: each_weights_exercises_set_info each_weights_exercises_set_info_weights_exercises_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."each_weights_exercises_set_info"
    ADD CONSTRAINT "each_weights_exercises_set_info_weights_exercises_fkey" FOREIGN KEY ("each_weights_exercises_id") REFERENCES "public"."each_weights_exercises"("id") ON DELETE CASCADE;


--
-- Name: each_weights_exercises each_weights_exercises_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."each_weights_exercises"
    ADD CONSTRAINT "each_weights_exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: each_weights_exercises each_weights_exercises_weights_exercises_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."each_weights_exercises"
    ADD CONSTRAINT "each_weights_exercises_weights_exercises_fkey" FOREIGN KEY ("weights_exercises_id") REFERENCES "public"."daily_weights_exercises"("id") ON DELETE CASCADE;


--
-- Name: llm_daily_exercies exercises_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."llm_daily_exercies"
    ADD CONSTRAINT "exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: foods foods_meal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."foods"
    ADD CONSTRAINT "foods_meal_id_fkey" FOREIGN KEY ("meal_id") REFERENCES "public"."meals"("id") ON DELETE CASCADE;


--
-- Name: foods foods_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."foods"
    ADD CONSTRAINT "foods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: health_info health_info_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."health_info"
    ADD CONSTRAINT "health_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: meals meals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."meals"
    ADD CONSTRAINT "meals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: messages messages_chat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("chat_id") ON DELETE CASCADE;


--
-- Name: messages messages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: profiles profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: user_goals user_goals_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."user_goals"
    ADD CONSTRAINT "user_goals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: daily_weights_exercises weights_exercises_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "public"."daily_weights_exercises"
    ADD CONSTRAINT "weights_exercises_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE SET NULL;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."objects"
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets"("id");


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads"
    ADD CONSTRAINT "s3_multipart_uploads_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets"("id");


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads_parts"
    ADD CONSTRAINT "s3_multipart_uploads_parts_bucket_id_fkey" FOREIGN KEY ("bucket_id") REFERENCES "storage"."buckets"("id");


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY "storage"."s3_multipart_uploads_parts"
    ADD CONSTRAINT "s3_multipart_uploads_parts_upload_id_fkey" FOREIGN KEY ("upload_id") REFERENCES "storage"."s3_multipart_uploads"("id") ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."audit_log_entries" ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."flow_state" ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."identities" ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."instances" ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."mfa_amr_claims" ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."mfa_challenges" ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."mfa_factors" ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."one_time_tokens" ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."refresh_tokens" ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."saml_providers" ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."saml_relay_states" ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."schema_migrations" ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."sessions" ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."sso_domains" ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."sso_providers" ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE "auth"."users" ENABLE ROW LEVEL SECURITY;

--
-- Name: llm_daily_exercies Enable insert for owner users only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for owner users only" ON "public"."llm_daily_exercies" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "user_id"));


--
-- Name: chats Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."chats" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: daily_cardio_exercises Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."daily_cardio_exercises" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: daily_intakes Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."daily_intakes" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: daily_weights_exercises Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."daily_weights_exercises" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: each_weights_exercises Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."each_weights_exercises" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: each_weights_exercises_set_info Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."each_weights_exercises_set_info" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: foods Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."foods" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: health_info Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."health_info" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: meals Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."meals" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: user_goals Enable insert for users based on user_id; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON "public"."user_goals" FOR INSERT TO "authenticated" WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: chats Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."chats" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: daily_cardio_exercises Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."daily_cardio_exercises" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: daily_intakes Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."daily_intakes" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: daily_weights_exercises Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."daily_weights_exercises" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: each_weights_exercises Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."each_weights_exercises" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: each_weights_exercises_set_info Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."each_weights_exercises_set_info" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: foods Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."foods" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: health_info Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."health_info" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: llm_daily_exercies Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."llm_daily_exercies" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: meals Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."meals" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: user_goals Enable users to view their own data only; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable users to view their own data only" ON "public"."user_goals" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: chats; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."chats" ENABLE ROW LEVEL SECURITY;

--
-- Name: daily_cardio_exercises; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."daily_cardio_exercises" ENABLE ROW LEVEL SECURITY;

--
-- Name: daily_intakes; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."daily_intakes" ENABLE ROW LEVEL SECURITY;

--
-- Name: daily_weights_exercises; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."daily_weights_exercises" ENABLE ROW LEVEL SECURITY;

--
-- Name: each_weights_exercises; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."each_weights_exercises" ENABLE ROW LEVEL SECURITY;

--
-- Name: each_weights_exercises_set_info; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."each_weights_exercises_set_info" ENABLE ROW LEVEL SECURITY;

--
-- Name: foods; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."foods" ENABLE ROW LEVEL SECURITY;

--
-- Name: health_info; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."health_info" ENABLE ROW LEVEL SECURITY;

--
-- Name: llm_daily_exercies; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."llm_daily_exercies" ENABLE ROW LEVEL SECURITY;

--
-- Name: meals; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."meals" ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles profiles_get_own_data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "profiles_get_own_data" ON "public"."profiles" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: profiles profiles_update_own_data; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "profiles_update_own_data" ON "public"."profiles" FOR UPDATE TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id")) WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));


--
-- Name: user_goals; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."user_goals" ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE "realtime"."messages" ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE "storage"."buckets" ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE "storage"."migrations" ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE "storage"."objects" ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE "storage"."s3_multipart_uploads" ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE "storage"."s3_multipart_uploads_parts" ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION "supabase_realtime" WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

--
-- Name: SCHEMA "auth"; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA "auth" TO "anon";
GRANT USAGE ON SCHEMA "auth" TO "authenticated";
GRANT USAGE ON SCHEMA "auth" TO "service_role";
GRANT ALL ON SCHEMA "auth" TO "supabase_auth_admin";
GRANT ALL ON SCHEMA "auth" TO "dashboard_user";
GRANT ALL ON SCHEMA "auth" TO "postgres";


--
-- Name: SCHEMA "extensions"; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA "extensions" TO "anon";
GRANT USAGE ON SCHEMA "extensions" TO "authenticated";
GRANT USAGE ON SCHEMA "extensions" TO "service_role";
GRANT ALL ON SCHEMA "extensions" TO "dashboard_user";


--
-- Name: SCHEMA "net"; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA "net" TO "supabase_functions_admin";
GRANT USAGE ON SCHEMA "net" TO "postgres";
GRANT USAGE ON SCHEMA "net" TO "anon";
GRANT USAGE ON SCHEMA "net" TO "authenticated";
GRANT USAGE ON SCHEMA "net" TO "service_role";


--
-- Name: SCHEMA "public"; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


--
-- Name: SCHEMA "realtime"; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA "realtime" TO "postgres";
GRANT USAGE ON SCHEMA "realtime" TO "anon";
GRANT USAGE ON SCHEMA "realtime" TO "authenticated";
GRANT USAGE ON SCHEMA "realtime" TO "service_role";
GRANT ALL ON SCHEMA "realtime" TO "supabase_realtime_admin";


--
-- Name: SCHEMA "storage"; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON SCHEMA "storage" TO "postgres";
GRANT USAGE ON SCHEMA "storage" TO "anon";
GRANT USAGE ON SCHEMA "storage" TO "authenticated";
GRANT USAGE ON SCHEMA "storage" TO "service_role";
GRANT ALL ON SCHEMA "storage" TO "supabase_storage_admin";
GRANT ALL ON SCHEMA "storage" TO "dashboard_user";


--
-- Name: SCHEMA "supabase_functions"; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA "supabase_functions" TO "postgres";
GRANT USAGE ON SCHEMA "supabase_functions" TO "anon";
GRANT USAGE ON SCHEMA "supabase_functions" TO "authenticated";
GRANT USAGE ON SCHEMA "supabase_functions" TO "service_role";
GRANT ALL ON SCHEMA "supabase_functions" TO "supabase_functions_admin";


--
-- Name: FUNCTION "halfvec_in"("cstring", "oid", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_in"("cstring", "oid", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_out"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_out"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_recv"("internal", "oid", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_recv"("internal", "oid", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_send"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_send"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_typmod_in"("cstring"[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_typmod_in"("cstring"[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_in"("cstring", "oid", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_in"("cstring", "oid", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_out"("extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_out"("extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_recv"("internal", "oid", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_recv"("internal", "oid", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_send"("extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_send"("extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_typmod_in"("cstring"[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_typmod_in"("cstring"[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_in"("cstring", "oid", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_in"("cstring", "oid", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_out"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_out"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_recv"("internal", "oid", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_recv"("internal", "oid", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_send"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_send"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_typmod_in"("cstring"[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_typmod_in"("cstring"[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_halfvec"(real[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_halfvec"(real[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_vector"(real[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_vector"(real[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_halfvec"(double precision[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_halfvec"(double precision[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_vector"(double precision[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_vector"(double precision[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_halfvec"(integer[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_halfvec"(integer[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_vector"(integer[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_vector"(integer[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_halfvec"(numeric[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_halfvec"(numeric[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "array_to_vector"(numeric[], integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."array_to_vector"(numeric[], integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_to_float4"("extensions"."halfvec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_to_float4"("extensions"."halfvec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec"("extensions"."halfvec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec"("extensions"."halfvec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_to_sparsevec"("extensions"."halfvec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_to_sparsevec"("extensions"."halfvec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_to_vector"("extensions"."halfvec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_to_vector"("extensions"."halfvec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_to_halfvec"("extensions"."sparsevec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_to_halfvec"("extensions"."sparsevec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec"("extensions"."sparsevec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec"("extensions"."sparsevec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_to_vector"("extensions"."sparsevec", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_to_vector"("extensions"."sparsevec", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_to_float4"("extensions"."vector", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_to_float4"("extensions"."vector", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_to_halfvec"("extensions"."vector", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_to_halfvec"("extensions"."vector", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_to_sparsevec"("extensions"."vector", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_to_sparsevec"("extensions"."vector", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector"("extensions"."vector", integer, boolean); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector"("extensions"."vector", integer, boolean) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "email"(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION "auth"."email"() TO "dashboard_user";


--
-- Name: FUNCTION "jwt"(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION "auth"."jwt"() TO "postgres";
GRANT ALL ON FUNCTION "auth"."jwt"() TO "dashboard_user";


--
-- Name: FUNCTION "role"(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION "auth"."role"() TO "dashboard_user";


--
-- Name: FUNCTION "uid"(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION "auth"."uid"() TO "dashboard_user";


--
-- Name: FUNCTION "algorithm_sign"("signables" "text", "secret" "text", "algorithm" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."algorithm_sign"("signables" "text", "secret" "text", "algorithm" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."algorithm_sign"("signables" "text", "secret" "text", "algorithm" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "armor"("bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."armor"("bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."armor"("bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "armor"("bytea", "text"[], "text"[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."armor"("bytea", "text"[], "text"[]) TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."armor"("bytea", "text"[], "text"[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "binary_quantize"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."binary_quantize"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "binary_quantize"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."binary_quantize"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "cosine_distance"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."cosine_distance"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "cosine_distance"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."cosine_distance"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "cosine_distance"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."cosine_distance"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "crypt"("text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."crypt"("text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."crypt"("text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "dearmor"("text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."dearmor"("text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."dearmor"("text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "decrypt"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."decrypt"("bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."decrypt"("bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "decrypt_iv"("bytea", "bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."decrypt_iv"("bytea", "bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."decrypt_iv"("bytea", "bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "digest"("bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."digest"("bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."digest"("bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "digest"("text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."digest"("text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."digest"("text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "encrypt"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."encrypt"("bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."encrypt"("bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "encrypt_iv"("bytea", "bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."encrypt_iv"("bytea", "bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."encrypt_iv"("bytea", "bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "gen_random_bytes"(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."gen_random_bytes"(integer) TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."gen_random_bytes"(integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "gen_random_uuid"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."gen_random_uuid"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."gen_random_uuid"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "gen_salt"("text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."gen_salt"("text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."gen_salt"("text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "gen_salt"("text", integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."gen_salt"("text", integer) TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."gen_salt"("text", integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "grant_pg_cron_access"(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION "extensions"."grant_pg_cron_access"() FROM "postgres";
GRANT ALL ON FUNCTION "extensions"."grant_pg_cron_access"() TO "postgres" WITH GRANT OPTION;
GRANT ALL ON FUNCTION "extensions"."grant_pg_cron_access"() TO "dashboard_user";


--
-- Name: FUNCTION "grant_pg_graphql_access"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."grant_pg_graphql_access"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "grant_pg_net_access"(); Type: ACL; Schema: extensions; Owner: postgres
--

REVOKE ALL ON FUNCTION "extensions"."grant_pg_net_access"() FROM "postgres";
GRANT ALL ON FUNCTION "extensions"."grant_pg_net_access"() TO "postgres" WITH GRANT OPTION;
GRANT ALL ON FUNCTION "extensions"."grant_pg_net_access"() TO "dashboard_user";


--
-- Name: FUNCTION "halfvec_accum"(double precision[], "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_accum"(double precision[], "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_add"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_add"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_avg"(double precision[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_avg"(double precision[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_cmp"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_cmp"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_combine"(double precision[], double precision[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_combine"(double precision[], double precision[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_concat"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_concat"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_eq"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_eq"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_ge"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_ge"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_gt"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_gt"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_l2_squared_distance"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_l2_squared_distance"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_le"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_le"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_lt"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_lt"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_mul"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_mul"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_ne"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_ne"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_negative_inner_product"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_negative_inner_product"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_spherical_distance"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_spherical_distance"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "halfvec_sub"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."halfvec_sub"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hamming_distance"(bit, bit); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hamming_distance"(bit, bit) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hmac"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hmac"("bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."hmac"("bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hmac"("text", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hmac"("text", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."hmac"("text", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hnsw_bit_support"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hnsw_bit_support"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hnsw_halfvec_support"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hnsw_halfvec_support"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hnsw_sparsevec_support"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hnsw_sparsevec_support"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "hnswhandler"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."hnswhandler"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "inner_product"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."inner_product"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "inner_product"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."inner_product"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "inner_product"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."inner_product"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "ivfflat_bit_support"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."ivfflat_bit_support"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "ivfflat_halfvec_support"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."ivfflat_halfvec_support"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "ivfflathandler"("internal"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."ivfflathandler"("internal") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "jaccard_distance"(bit, bit); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."jaccard_distance"(bit, bit) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l1_distance"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l1_distance"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l1_distance"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l1_distance"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l1_distance"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l1_distance"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_distance"("extensions"."halfvec", "extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_distance"("extensions"."halfvec", "extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_distance"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_distance"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_distance"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_distance"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_norm"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_norm"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_norm"("extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_norm"("extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_normalize"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_normalize"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_normalize"("extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_normalize"("extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "l2_normalize"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."l2_normalize"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pg_stat_statements"("showtext" boolean, OUT "userid" "oid", OUT "dbid" "oid", OUT "toplevel" boolean, OUT "queryid" bigint, OUT "query" "text", OUT "plans" bigint, OUT "total_plan_time" double precision, OUT "min_plan_time" double precision, OUT "max_plan_time" double precision, OUT "mean_plan_time" double precision, OUT "stddev_plan_time" double precision, OUT "calls" bigint, OUT "total_exec_time" double precision, OUT "min_exec_time" double precision, OUT "max_exec_time" double precision, OUT "mean_exec_time" double precision, OUT "stddev_exec_time" double precision, OUT "rows" bigint, OUT "shared_blks_hit" bigint, OUT "shared_blks_read" bigint, OUT "shared_blks_dirtied" bigint, OUT "shared_blks_written" bigint, OUT "local_blks_hit" bigint, OUT "local_blks_read" bigint, OUT "local_blks_dirtied" bigint, OUT "local_blks_written" bigint, OUT "temp_blks_read" bigint, OUT "temp_blks_written" bigint, OUT "blk_read_time" double precision, OUT "blk_write_time" double precision, OUT "temp_blk_read_time" double precision, OUT "temp_blk_write_time" double precision, OUT "wal_records" bigint, OUT "wal_fpi" bigint, OUT "wal_bytes" numeric, OUT "jit_functions" bigint, OUT "jit_generation_time" double precision, OUT "jit_inlining_count" bigint, OUT "jit_inlining_time" double precision, OUT "jit_optimization_count" bigint, OUT "jit_optimization_time" double precision, OUT "jit_emission_count" bigint, OUT "jit_emission_time" double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pg_stat_statements"("showtext" boolean, OUT "userid" "oid", OUT "dbid" "oid", OUT "toplevel" boolean, OUT "queryid" bigint, OUT "query" "text", OUT "plans" bigint, OUT "total_plan_time" double precision, OUT "min_plan_time" double precision, OUT "max_plan_time" double precision, OUT "mean_plan_time" double precision, OUT "stddev_plan_time" double precision, OUT "calls" bigint, OUT "total_exec_time" double precision, OUT "min_exec_time" double precision, OUT "max_exec_time" double precision, OUT "mean_exec_time" double precision, OUT "stddev_exec_time" double precision, OUT "rows" bigint, OUT "shared_blks_hit" bigint, OUT "shared_blks_read" bigint, OUT "shared_blks_dirtied" bigint, OUT "shared_blks_written" bigint, OUT "local_blks_hit" bigint, OUT "local_blks_read" bigint, OUT "local_blks_dirtied" bigint, OUT "local_blks_written" bigint, OUT "temp_blks_read" bigint, OUT "temp_blks_written" bigint, OUT "blk_read_time" double precision, OUT "blk_write_time" double precision, OUT "temp_blk_read_time" double precision, OUT "temp_blk_write_time" double precision, OUT "wal_records" bigint, OUT "wal_fpi" bigint, OUT "wal_bytes" numeric, OUT "jit_functions" bigint, OUT "jit_generation_time" double precision, OUT "jit_inlining_count" bigint, OUT "jit_inlining_time" double precision, OUT "jit_optimization_count" bigint, OUT "jit_optimization_time" double precision, OUT "jit_emission_count" bigint, OUT "jit_emission_time" double precision) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pg_stat_statements_info"(OUT "dealloc" bigint, OUT "stats_reset" timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pg_stat_statements_info"(OUT "dealloc" bigint, OUT "stats_reset" timestamp with time zone) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pg_stat_statements_reset"("userid" "oid", "dbid" "oid", "queryid" bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pg_stat_statements_reset"("userid" "oid", "dbid" "oid", "queryid" bigint) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_armor_headers"("text", OUT "key" "text", OUT "value" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_armor_headers"("text", OUT "key" "text", OUT "value" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_armor_headers"("text", OUT "key" "text", OUT "value" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_key_id"("bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_key_id"("bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_key_id"("bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_decrypt"("bytea", "bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_decrypt"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_decrypt"("bytea", "bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt"("bytea", "bytea", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_decrypt_bytea"("bytea", "bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_decrypt_bytea"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_decrypt_bytea"("bytea", "bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_decrypt_bytea"("bytea", "bytea", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_encrypt"("text", "bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt"("text", "bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt"("text", "bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_encrypt"("text", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt"("text", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt"("text", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_encrypt_bytea"("bytea", "bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt_bytea"("bytea", "bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt_bytea"("bytea", "bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_pub_encrypt_bytea"("bytea", "bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt_bytea"("bytea", "bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_pub_encrypt_bytea"("bytea", "bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_decrypt"("bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt"("bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt"("bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_decrypt"("bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt"("bytea", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt"("bytea", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_decrypt_bytea"("bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt_bytea"("bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt_bytea"("bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_decrypt_bytea"("bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt_bytea"("bytea", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_decrypt_bytea"("bytea", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_encrypt"("text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt"("text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt"("text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_encrypt"("text", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt"("text", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt"("text", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_encrypt_bytea"("bytea", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt_bytea"("bytea", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt_bytea"("bytea", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgp_sym_encrypt_bytea"("bytea", "text", "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt_bytea"("bytea", "text", "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."pgp_sym_encrypt_bytea"("bytea", "text", "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgrst_ddl_watch"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgrst_ddl_watch"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "pgrst_drop_watch"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."pgrst_drop_watch"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "set_graphql_placeholder"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."set_graphql_placeholder"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sign"("payload" "json", "secret" "text", "algorithm" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sign"("payload" "json", "secret" "text", "algorithm" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."sign"("payload" "json", "secret" "text", "algorithm" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_cmp"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_cmp"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_eq"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_eq"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_ge"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_ge"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_gt"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_gt"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_l2_squared_distance"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_l2_squared_distance"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_le"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_le"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_lt"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_lt"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_ne"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_ne"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sparsevec_negative_inner_product"("extensions"."sparsevec", "extensions"."sparsevec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sparsevec_negative_inner_product"("extensions"."sparsevec", "extensions"."sparsevec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "subvector"("extensions"."halfvec", integer, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."subvector"("extensions"."halfvec", integer, integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "subvector"("extensions"."vector", integer, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."subvector"("extensions"."vector", integer, integer) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "try_cast_double"("inp" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."try_cast_double"("inp" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."try_cast_double"("inp" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "url_decode"("data" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."url_decode"("data" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."url_decode"("data" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "url_encode"("data" "bytea"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."url_encode"("data" "bytea") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."url_encode"("data" "bytea") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_generate_v1"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v1"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_generate_v1"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_generate_v1mc"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v1mc"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_generate_v1mc"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_generate_v3"("namespace" "uuid", "name" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v3"("namespace" "uuid", "name" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_generate_v3"("namespace" "uuid", "name" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_generate_v4"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v4"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_generate_v4"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_generate_v5"("namespace" "uuid", "name" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_generate_v5"("namespace" "uuid", "name" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_generate_v5"("namespace" "uuid", "name" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_nil"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_nil"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_nil"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_ns_dns"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_dns"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_ns_dns"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_ns_oid"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_oid"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_ns_oid"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_ns_url"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_url"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_ns_url"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "uuid_ns_x500"(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."uuid_ns_x500"() TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."uuid_ns_x500"() TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_accum"(double precision[], "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_accum"(double precision[], "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_add"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_add"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_avg"(double precision[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_avg"(double precision[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_cmp"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_cmp"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_combine"(double precision[], double precision[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_combine"(double precision[], double precision[]) TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_concat"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_concat"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_dims"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_dims"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_dims"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_dims"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_eq"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_eq"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_ge"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_ge"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_gt"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_gt"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_l2_squared_distance"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_l2_squared_distance"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_le"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_le"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_lt"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_lt"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_mul"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_mul"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_ne"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_ne"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_negative_inner_product"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_negative_inner_product"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_norm"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_norm"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_spherical_distance"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_spherical_distance"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "vector_sub"("extensions"."vector", "extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."vector_sub"("extensions"."vector", "extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "verify"("token" "text", "secret" "text", "algorithm" "text"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."verify"("token" "text", "secret" "text", "algorithm" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "extensions"."verify"("token" "text", "secret" "text", "algorithm" "text") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "graphql"("operationName" "text", "query" "text", "variables" "jsonb", "extensions" "jsonb"); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "graphql_public"."graphql"("operationName" "text", "query" "text", "variables" "jsonb", "extensions" "jsonb") TO "postgres";
GRANT ALL ON FUNCTION "graphql_public"."graphql"("operationName" "text", "query" "text", "variables" "jsonb", "extensions" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "graphql_public"."graphql"("operationName" "text", "query" "text", "variables" "jsonb", "extensions" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "graphql_public"."graphql"("operationName" "text", "query" "text", "variables" "jsonb", "extensions" "jsonb") TO "service_role";


--
-- Name: FUNCTION "http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION "net"."http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "net"."http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "supabase_functions_admin";
GRANT ALL ON FUNCTION "net"."http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "postgres";
GRANT ALL ON FUNCTION "net"."http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "anon";
GRANT ALL ON FUNCTION "net"."http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "authenticated";
GRANT ALL ON FUNCTION "net"."http_get"("url" "text", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "service_role";


--
-- Name: FUNCTION "http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer); Type: ACL; Schema: net; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION "net"."http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) FROM PUBLIC;
GRANT ALL ON FUNCTION "net"."http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "supabase_functions_admin";
GRANT ALL ON FUNCTION "net"."http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "postgres";
GRANT ALL ON FUNCTION "net"."http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "anon";
GRANT ALL ON FUNCTION "net"."http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "authenticated";
GRANT ALL ON FUNCTION "net"."http_post"("url" "text", "body" "jsonb", "params" "jsonb", "headers" "jsonb", "timeout_milliseconds" integer) TO "service_role";


--
-- Name: FUNCTION "get_auth"("p_usename" "text"); Type: ACL; Schema: pgbouncer; Owner: postgres
--

REVOKE ALL ON FUNCTION "pgbouncer"."get_auth"("p_usename" "text") FROM PUBLIC;
GRANT ALL ON FUNCTION "pgbouncer"."get_auth"("p_usename" "text") TO "pgbouncer";


--
-- Name: FUNCTION "crypto_aead_det_decrypt"("message" "bytea", "additional" "bytea", "key_uuid" "uuid", "nonce" "bytea"); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION "pgsodium"."crypto_aead_det_decrypt"("message" "bytea", "additional" "bytea", "key_uuid" "uuid", "nonce" "bytea") TO "service_role";


--
-- Name: FUNCTION "crypto_aead_det_encrypt"("message" "bytea", "additional" "bytea", "key_uuid" "uuid", "nonce" "bytea"); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION "pgsodium"."crypto_aead_det_encrypt"("message" "bytea", "additional" "bytea", "key_uuid" "uuid", "nonce" "bytea") TO "service_role";


--
-- Name: FUNCTION "crypto_aead_det_keygen"(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "pgsodium"."crypto_aead_det_keygen"() TO "service_role";


--
-- Name: FUNCTION "add_daily_workouts"("body" "json"); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION "public"."add_daily_workouts"("body" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."add_daily_workouts"("body" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_daily_workouts"("body" "json") TO "service_role";


--
-- Name: FUNCTION "add_meals"("body" "json"); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION "public"."add_meals"("body" "json") TO "anon";
GRANT ALL ON FUNCTION "public"."add_meals"("body" "json") TO "authenticated";
GRANT ALL ON FUNCTION "public"."add_meals"("body" "json") TO "service_role";


--
-- Name: FUNCTION "handle_new_user"(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";


--
-- Name: FUNCTION "apply_rls"("wal" "jsonb", "max_record_bytes" integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) TO "postgres";
GRANT ALL ON FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) TO "anon";
GRANT ALL ON FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) TO "service_role";
GRANT ALL ON FUNCTION "realtime"."apply_rls"("wal" "jsonb", "max_record_bytes" integer) TO "supabase_realtime_admin";


--
-- Name: FUNCTION "broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text"); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text") TO "postgres";
GRANT ALL ON FUNCTION "realtime"."broadcast_changes"("topic_name" "text", "event_name" "text", "operation" "text", "table_name" "text", "table_schema" "text", "new" "record", "old" "record", "level" "text") TO "dashboard_user";


--
-- Name: FUNCTION "build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) TO "postgres";
GRANT ALL ON FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) TO "anon";
GRANT ALL ON FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) TO "service_role";
GRANT ALL ON FUNCTION "realtime"."build_prepared_statement_sql"("prepared_statement_name" "text", "entity" "regclass", "columns" "realtime"."wal_column"[]) TO "supabase_realtime_admin";


--
-- Name: FUNCTION "cast"("val" "text", "type_" "regtype"); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") TO "postgres";
GRANT ALL ON FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") TO "anon";
GRANT ALL ON FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") TO "service_role";
GRANT ALL ON FUNCTION "realtime"."cast"("val" "text", "type_" "regtype") TO "supabase_realtime_admin";


--
-- Name: FUNCTION "check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text"); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") TO "postgres";
GRANT ALL ON FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") TO "anon";
GRANT ALL ON FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") TO "service_role";
GRANT ALL ON FUNCTION "realtime"."check_equality_op"("op" "realtime"."equality_op", "type_" "regtype", "val_1" "text", "val_2" "text") TO "supabase_realtime_admin";


--
-- Name: FUNCTION "is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) TO "postgres";
GRANT ALL ON FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) TO "anon";
GRANT ALL ON FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) TO "service_role";
GRANT ALL ON FUNCTION "realtime"."is_visible_through_filters"("columns" "realtime"."wal_column"[], "filters" "realtime"."user_defined_filter"[]) TO "supabase_realtime_admin";


--
-- Name: FUNCTION "list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) TO "postgres";
GRANT ALL ON FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) TO "anon";
GRANT ALL ON FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) TO "service_role";
GRANT ALL ON FUNCTION "realtime"."list_changes"("publication" "name", "slot_name" "name", "max_changes" integer, "max_record_bytes" integer) TO "supabase_realtime_admin";


--
-- Name: FUNCTION "quote_wal2json"("entity" "regclass"); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."quote_wal2json"("entity" "regclass") TO "postgres";
GRANT ALL ON FUNCTION "realtime"."quote_wal2json"("entity" "regclass") TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."quote_wal2json"("entity" "regclass") TO "anon";
GRANT ALL ON FUNCTION "realtime"."quote_wal2json"("entity" "regclass") TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."quote_wal2json"("entity" "regclass") TO "service_role";
GRANT ALL ON FUNCTION "realtime"."quote_wal2json"("entity" "regclass") TO "supabase_realtime_admin";


--
-- Name: FUNCTION "send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean) TO "postgres";
GRANT ALL ON FUNCTION "realtime"."send"("payload" "jsonb", "event" "text", "topic" "text", "private" boolean) TO "dashboard_user";


--
-- Name: FUNCTION "subscription_check_filters"(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."subscription_check_filters"() TO "postgres";
GRANT ALL ON FUNCTION "realtime"."subscription_check_filters"() TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."subscription_check_filters"() TO "anon";
GRANT ALL ON FUNCTION "realtime"."subscription_check_filters"() TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."subscription_check_filters"() TO "service_role";
GRANT ALL ON FUNCTION "realtime"."subscription_check_filters"() TO "supabase_realtime_admin";


--
-- Name: FUNCTION "to_regrole"("role_name" "text"); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "realtime"."to_regrole"("role_name" "text") TO "postgres";
GRANT ALL ON FUNCTION "realtime"."to_regrole"("role_name" "text") TO "dashboard_user";
GRANT ALL ON FUNCTION "realtime"."to_regrole"("role_name" "text") TO "anon";
GRANT ALL ON FUNCTION "realtime"."to_regrole"("role_name" "text") TO "authenticated";
GRANT ALL ON FUNCTION "realtime"."to_regrole"("role_name" "text") TO "service_role";
GRANT ALL ON FUNCTION "realtime"."to_regrole"("role_name" "text") TO "supabase_realtime_admin";


--
-- Name: FUNCTION "topic"(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION "realtime"."topic"() TO "postgres";
GRANT ALL ON FUNCTION "realtime"."topic"() TO "dashboard_user";


--
-- Name: FUNCTION "http_request"(); Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

REVOKE ALL ON FUNCTION "supabase_functions"."http_request"() FROM PUBLIC;
GRANT ALL ON FUNCTION "supabase_functions"."http_request"() TO "postgres";
GRANT ALL ON FUNCTION "supabase_functions"."http_request"() TO "anon";
GRANT ALL ON FUNCTION "supabase_functions"."http_request"() TO "authenticated";
GRANT ALL ON FUNCTION "supabase_functions"."http_request"() TO "service_role";


--
-- Name: FUNCTION "avg"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."avg"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "avg"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."avg"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sum"("extensions"."halfvec"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sum"("extensions"."halfvec") TO "postgres" WITH GRANT OPTION;


--
-- Name: FUNCTION "sum"("extensions"."vector"); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION "extensions"."sum"("extensions"."vector") TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "audit_log_entries"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE "auth"."audit_log_entries" TO "dashboard_user";
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."audit_log_entries" TO "postgres";
GRANT SELECT ON TABLE "auth"."audit_log_entries" TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "flow_state"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."flow_state" TO "postgres";
GRANT SELECT ON TABLE "auth"."flow_state" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."flow_state" TO "dashboard_user";


--
-- Name: TABLE "identities"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."identities" TO "postgres";
GRANT SELECT ON TABLE "auth"."identities" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."identities" TO "dashboard_user";


--
-- Name: TABLE "instances"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE "auth"."instances" TO "dashboard_user";
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."instances" TO "postgres";
GRANT SELECT ON TABLE "auth"."instances" TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "mfa_amr_claims"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."mfa_amr_claims" TO "postgres";
GRANT SELECT ON TABLE "auth"."mfa_amr_claims" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."mfa_amr_claims" TO "dashboard_user";


--
-- Name: TABLE "mfa_challenges"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."mfa_challenges" TO "postgres";
GRANT SELECT ON TABLE "auth"."mfa_challenges" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."mfa_challenges" TO "dashboard_user";


--
-- Name: TABLE "mfa_factors"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."mfa_factors" TO "postgres";
GRANT SELECT ON TABLE "auth"."mfa_factors" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."mfa_factors" TO "dashboard_user";


--
-- Name: TABLE "one_time_tokens"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."one_time_tokens" TO "postgres";
GRANT SELECT ON TABLE "auth"."one_time_tokens" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."one_time_tokens" TO "dashboard_user";


--
-- Name: TABLE "refresh_tokens"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE "auth"."refresh_tokens" TO "dashboard_user";
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."refresh_tokens" TO "postgres";
GRANT SELECT ON TABLE "auth"."refresh_tokens" TO "postgres" WITH GRANT OPTION;


--
-- Name: SEQUENCE "refresh_tokens_id_seq"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE "auth"."refresh_tokens_id_seq" TO "dashboard_user";
GRANT ALL ON SEQUENCE "auth"."refresh_tokens_id_seq" TO "postgres";


--
-- Name: TABLE "saml_providers"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."saml_providers" TO "postgres";
GRANT SELECT ON TABLE "auth"."saml_providers" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."saml_providers" TO "dashboard_user";


--
-- Name: TABLE "saml_relay_states"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."saml_relay_states" TO "postgres";
GRANT SELECT ON TABLE "auth"."saml_relay_states" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."saml_relay_states" TO "dashboard_user";


--
-- Name: TABLE "schema_migrations"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE "auth"."schema_migrations" TO "dashboard_user";
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."schema_migrations" TO "postgres";
GRANT SELECT ON TABLE "auth"."schema_migrations" TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "sessions"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."sessions" TO "postgres";
GRANT SELECT ON TABLE "auth"."sessions" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."sessions" TO "dashboard_user";


--
-- Name: TABLE "sso_domains"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."sso_domains" TO "postgres";
GRANT SELECT ON TABLE "auth"."sso_domains" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."sso_domains" TO "dashboard_user";


--
-- Name: TABLE "sso_providers"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."sso_providers" TO "postgres";
GRANT SELECT ON TABLE "auth"."sso_providers" TO "postgres" WITH GRANT OPTION;
GRANT ALL ON TABLE "auth"."sso_providers" TO "dashboard_user";


--
-- Name: TABLE "users"; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON TABLE "auth"."users" TO "dashboard_user";
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "auth"."users" TO "postgres";
GRANT SELECT ON TABLE "auth"."users" TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "pg_stat_statements"; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE "extensions"."pg_stat_statements" TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "pg_stat_statements_info"; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON TABLE "extensions"."pg_stat_statements_info" TO "postgres" WITH GRANT OPTION;


--
-- Name: TABLE "decrypted_key"; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE "pgsodium"."decrypted_key" TO "pgsodium_keyholder";


--
-- Name: TABLE "masking_rule"; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE "pgsodium"."masking_rule" TO "pgsodium_keyholder";


--
-- Name: TABLE "mask_columns"; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON TABLE "pgsodium"."mask_columns" TO "pgsodium_keyholder";


--
-- Name: TABLE "chats"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."chats" TO "anon";
GRANT ALL ON TABLE "public"."chats" TO "authenticated";
GRANT ALL ON TABLE "public"."chats" TO "service_role";


--
-- Name: TABLE "daily_cardio_exercises"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."daily_cardio_exercises" TO "anon";
GRANT ALL ON TABLE "public"."daily_cardio_exercises" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_cardio_exercises" TO "service_role";


--
-- Name: TABLE "daily_intakes"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."daily_intakes" TO "anon";
GRANT ALL ON TABLE "public"."daily_intakes" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_intakes" TO "service_role";


--
-- Name: TABLE "daily_weights_exercises"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."daily_weights_exercises" TO "anon";
GRANT ALL ON TABLE "public"."daily_weights_exercises" TO "authenticated";
GRANT ALL ON TABLE "public"."daily_weights_exercises" TO "service_role";


--
-- Name: TABLE "each_weights_exercises"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."each_weights_exercises" TO "anon";
GRANT ALL ON TABLE "public"."each_weights_exercises" TO "authenticated";
GRANT ALL ON TABLE "public"."each_weights_exercises" TO "service_role";


--
-- Name: TABLE "each_weights_exercises_set_info"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."each_weights_exercises_set_info" TO "anon";
GRANT ALL ON TABLE "public"."each_weights_exercises_set_info" TO "authenticated";
GRANT ALL ON TABLE "public"."each_weights_exercises_set_info" TO "service_role";


--
-- Name: TABLE "foods"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."foods" TO "anon";
GRANT ALL ON TABLE "public"."foods" TO "authenticated";
GRANT ALL ON TABLE "public"."foods" TO "service_role";


--
-- Name: TABLE "health_info"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."health_info" TO "anon";
GRANT ALL ON TABLE "public"."health_info" TO "authenticated";
GRANT ALL ON TABLE "public"."health_info" TO "service_role";


--
-- Name: TABLE "llm_daily_exercies"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."llm_daily_exercies" TO "anon";
GRANT ALL ON TABLE "public"."llm_daily_exercies" TO "authenticated";
GRANT ALL ON TABLE "public"."llm_daily_exercies" TO "service_role";


--
-- Name: TABLE "meals"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."meals" TO "anon";
GRANT ALL ON TABLE "public"."meals" TO "authenticated";
GRANT ALL ON TABLE "public"."meals" TO "service_role";


--
-- Name: TABLE "messages"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";


--
-- Name: TABLE "profiles"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";


--
-- Name: TABLE "user_goals"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE "public"."user_goals" TO "anon";
GRANT ALL ON TABLE "public"."user_goals" TO "authenticated";
GRANT ALL ON TABLE "public"."user_goals" TO "service_role";


--
-- Name: TABLE "messages"; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON TABLE "realtime"."messages" TO "postgres";
GRANT ALL ON TABLE "realtime"."messages" TO "dashboard_user";
GRANT SELECT,INSERT,UPDATE ON TABLE "realtime"."messages" TO "anon";
GRANT SELECT,INSERT,UPDATE ON TABLE "realtime"."messages" TO "authenticated";
GRANT SELECT,INSERT,UPDATE ON TABLE "realtime"."messages" TO "service_role";


--
-- Name: TABLE "schema_migrations"; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE "realtime"."schema_migrations" TO "postgres";
GRANT ALL ON TABLE "realtime"."schema_migrations" TO "dashboard_user";
GRANT SELECT ON TABLE "realtime"."schema_migrations" TO "anon";
GRANT SELECT ON TABLE "realtime"."schema_migrations" TO "authenticated";
GRANT SELECT ON TABLE "realtime"."schema_migrations" TO "service_role";
GRANT ALL ON TABLE "realtime"."schema_migrations" TO "supabase_realtime_admin";


--
-- Name: TABLE "subscription"; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON TABLE "realtime"."subscription" TO "postgres";
GRANT ALL ON TABLE "realtime"."subscription" TO "dashboard_user";
GRANT SELECT ON TABLE "realtime"."subscription" TO "anon";
GRANT SELECT ON TABLE "realtime"."subscription" TO "authenticated";
GRANT SELECT ON TABLE "realtime"."subscription" TO "service_role";
GRANT ALL ON TABLE "realtime"."subscription" TO "supabase_realtime_admin";


--
-- Name: SEQUENCE "subscription_id_seq"; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE "realtime"."subscription_id_seq" TO "postgres";
GRANT ALL ON SEQUENCE "realtime"."subscription_id_seq" TO "dashboard_user";
GRANT USAGE ON SEQUENCE "realtime"."subscription_id_seq" TO "anon";
GRANT USAGE ON SEQUENCE "realtime"."subscription_id_seq" TO "authenticated";
GRANT USAGE ON SEQUENCE "realtime"."subscription_id_seq" TO "service_role";
GRANT ALL ON SEQUENCE "realtime"."subscription_id_seq" TO "supabase_realtime_admin";


--
-- Name: TABLE "buckets"; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE "storage"."buckets" TO "anon";
GRANT ALL ON TABLE "storage"."buckets" TO "authenticated";
GRANT ALL ON TABLE "storage"."buckets" TO "service_role";
GRANT ALL ON TABLE "storage"."buckets" TO "postgres";


--
-- Name: TABLE "migrations"; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE "storage"."migrations" TO "anon";
GRANT ALL ON TABLE "storage"."migrations" TO "authenticated";
GRANT ALL ON TABLE "storage"."migrations" TO "service_role";
GRANT ALL ON TABLE "storage"."migrations" TO "postgres";


--
-- Name: TABLE "objects"; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE "storage"."objects" TO "anon";
GRANT ALL ON TABLE "storage"."objects" TO "authenticated";
GRANT ALL ON TABLE "storage"."objects" TO "service_role";
GRANT ALL ON TABLE "storage"."objects" TO "postgres";


--
-- Name: TABLE "s3_multipart_uploads"; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE "storage"."s3_multipart_uploads" TO "service_role";
GRANT SELECT ON TABLE "storage"."s3_multipart_uploads" TO "authenticated";
GRANT SELECT ON TABLE "storage"."s3_multipart_uploads" TO "anon";


--
-- Name: TABLE "s3_multipart_uploads_parts"; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON TABLE "storage"."s3_multipart_uploads_parts" TO "service_role";
GRANT SELECT ON TABLE "storage"."s3_multipart_uploads_parts" TO "authenticated";
GRANT SELECT ON TABLE "storage"."s3_multipart_uploads_parts" TO "anon";


--
-- Name: TABLE "hooks"; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE "supabase_functions"."hooks" TO "postgres";
GRANT ALL ON TABLE "supabase_functions"."hooks" TO "anon";
GRANT ALL ON TABLE "supabase_functions"."hooks" TO "authenticated";
GRANT ALL ON TABLE "supabase_functions"."hooks" TO "service_role";


--
-- Name: SEQUENCE "hooks_id_seq"; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON SEQUENCE "supabase_functions"."hooks_id_seq" TO "postgres";
GRANT ALL ON SEQUENCE "supabase_functions"."hooks_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "supabase_functions"."hooks_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "supabase_functions"."hooks_id_seq" TO "service_role";


--
-- Name: TABLE "migrations"; Type: ACL; Schema: supabase_functions; Owner: supabase_functions_admin
--

GRANT ALL ON TABLE "supabase_functions"."migrations" TO "postgres";
GRANT ALL ON TABLE "supabase_functions"."migrations" TO "anon";
GRANT ALL ON TABLE "supabase_functions"."migrations" TO "authenticated";
GRANT ALL ON TABLE "supabase_functions"."migrations" TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_auth_admin" IN SCHEMA "auth" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_auth_admin" IN SCHEMA "auth" GRANT ALL ON SEQUENCES  TO "dashboard_user";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_auth_admin" IN SCHEMA "auth" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_auth_admin" IN SCHEMA "auth" GRANT ALL ON FUNCTIONS  TO "dashboard_user";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_auth_admin" IN SCHEMA "auth" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_auth_admin" IN SCHEMA "auth" GRANT ALL ON TABLES  TO "dashboard_user";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "extensions" GRANT ALL ON SEQUENCES  TO "postgres" WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "extensions" GRANT ALL ON FUNCTIONS  TO "postgres" WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "extensions" GRANT ALL ON TABLES  TO "postgres" WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "graphql_public" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "pgsodium" GRANT ALL ON SEQUENCES  TO "pgsodium_keyholder";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "pgsodium" GRANT ALL ON TABLES  TO "pgsodium_keyholder";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "pgsodium_masks" GRANT ALL ON SEQUENCES  TO "pgsodium_keyiduser";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "pgsodium_masks" GRANT ALL ON FUNCTIONS  TO "pgsodium_keyiduser";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "pgsodium_masks" GRANT ALL ON TABLES  TO "pgsodium_keyiduser";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "realtime" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "realtime" GRANT ALL ON SEQUENCES  TO "dashboard_user";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "realtime" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "realtime" GRANT ALL ON FUNCTIONS  TO "dashboard_user";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "realtime" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "realtime" GRANT ALL ON TABLES  TO "dashboard_user";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "storage" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON SEQUENCES  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON FUNCTIONS  TO "service_role";


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: supabase_functions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "supabase_admin" IN SCHEMA "supabase_functions" GRANT ALL ON TABLES  TO "service_role";


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER "issue_graphql_placeholder" ON "sql_drop"
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION "extensions"."set_graphql_placeholder"();


ALTER EVENT TRIGGER "issue_graphql_placeholder" OWNER TO "supabase_admin";

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER "issue_pg_cron_access" ON "ddl_command_end"
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION "extensions"."grant_pg_cron_access"();


ALTER EVENT TRIGGER "issue_pg_cron_access" OWNER TO "supabase_admin";

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER "issue_pg_graphql_access" ON "ddl_command_end"
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION "extensions"."grant_pg_graphql_access"();


ALTER EVENT TRIGGER "issue_pg_graphql_access" OWNER TO "supabase_admin";

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: postgres
--

CREATE EVENT TRIGGER "issue_pg_net_access" ON "ddl_command_end"
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION "extensions"."grant_pg_net_access"();


ALTER EVENT TRIGGER "issue_pg_net_access" OWNER TO "postgres";

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER "pgrst_ddl_watch" ON "ddl_command_end"
   EXECUTE FUNCTION "extensions"."pgrst_ddl_watch"();


ALTER EVENT TRIGGER "pgrst_ddl_watch" OWNER TO "supabase_admin";

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER "pgrst_drop_watch" ON "sql_drop"
   EXECUTE FUNCTION "extensions"."pgrst_drop_watch"();


ALTER EVENT TRIGGER "pgrst_drop_watch" OWNER TO "supabase_admin";

--
-- PostgreSQL database dump complete
--

