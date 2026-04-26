export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_audit: {
        Row: {
          action: string
          actor_user_id: string
          id: string
          note: string | null
          target_email: string
          target_user_id: string
          ts: string
        }
        Insert: {
          action: string
          actor_user_id: string
          id?: string
          note?: string | null
          target_email: string
          target_user_id: string
          ts?: string
        }
        Update: {
          action?: string
          actor_user_id?: string
          id?: string
          note?: string | null
          target_email?: string
          target_user_id?: string
          ts?: string
        }
        Relationships: []
      }
      assets: {
        Row: {
          content: string
          created_at: string | null
          id: string
          name: string
          type: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          name: string
          type?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          type?: string | null
        }
        Relationships: []
      }
      audit_leads: {
        Row: {
          audit_score: number | null
          biggest_challenge: string | null
          content_frequency: string | null
          created_at: string
          current_followers: string | null
          email: string
          id: string
          name: string
          niche: string | null
          platforms: string[] | null
          primary_goal: string | null
          revenue_level: string | null
        }
        Insert: {
          audit_score?: number | null
          biggest_challenge?: string | null
          content_frequency?: string | null
          created_at?: string
          current_followers?: string | null
          email: string
          id?: string
          name: string
          niche?: string | null
          platforms?: string[] | null
          primary_goal?: string | null
          revenue_level?: string | null
        }
        Update: {
          audit_score?: number | null
          biggest_challenge?: string | null
          content_frequency?: string | null
          created_at?: string
          current_followers?: string | null
          email?: string
          id?: string
          name?: string
          niche?: string | null
          platforms?: string[] | null
          primary_goal?: string | null
          revenue_level?: string | null
        }
        Relationships: []
      }
      coreproducts: {
        Row: {
          active: boolean
          amount_cents: number
          created_at: string
          currency: string
          id: string
          product_name: string
          stripe_checkout_url: string
          stripe_price_id: string
          stripe_product_id: string
        }
        Insert: {
          active?: boolean
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          product_name: string
          stripe_checkout_url: string
          stripe_price_id: string
          stripe_product_id: string
        }
        Update: {
          active?: boolean
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          product_name?: string
          stripe_checkout_url?: string
          stripe_price_id?: string
          stripe_product_id?: string
        }
        Relationships: []
      }
      dfy_orders: {
        Row: {
          business_name: string | null
          business_type: string | null
          created_at: string
          email: string
          id: string
          name: string
          payment_plan: string | null
          status: string
        }
        Insert: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          payment_plan?: string | null
          status?: string
        }
        Update: {
          business_name?: string | null
          business_type?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          payment_plan?: string | null
          status?: string
        }
        Relationships: []
      }
      digital_originals: {
        Row: {
          created_at: string | null
          evidence_type: string | null
          file_hash: string | null
          file_name: string | null
          id: string
          job_id: string | null
        }
        Insert: {
          created_at?: string | null
          evidence_type?: string | null
          file_hash?: string | null
          file_name?: string | null
          id?: string
          job_id?: string | null
        }
        Update: {
          created_at?: string | null
          evidence_type?: string | null
          file_hash?: string | null
          file_name?: string | null
          id?: string
          job_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "digital_originals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          source_page: string | null
          tier: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          source_page?: string | null
          tier?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          source_page?: string | null
          tier?: string
        }
        Relationships: []
      }
      errors: {
        Row: {
          context: Json | null
          created_at: string | null
          error_message: string
          error_type: string
          id: string
          service: string
          stack_trace: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          error_message: string
          error_type: string
          id?: string
          service: string
          stack_trace?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          error_message?: string
          error_type?: string
          id?: string
          service?: string
          stack_trace?: string | null
        }
        Relationships: []
      }
      ethinx_customers: {
        Row: {
          created_at: string | null
          email: string
          id: string
          stripe_customer_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          stripe_customer_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          stripe_customer_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ethinx_invoices: {
        Row: {
          amount_paid: number
          created_at: string | null
          customer_email: string | null
          customer_id: string | null
          id: string
          status: string
          stripe_invoice_id: string
          subscription_id: string | null
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          customer_email?: string | null
          customer_id?: string | null
          id?: string
          status: string
          stripe_invoice_id: string
          subscription_id?: string | null
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          customer_email?: string | null
          customer_id?: string | null
          id?: string
          status?: string
          stripe_invoice_id?: string
          subscription_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ethinx_invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ethinx_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ethinx_invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "ethinx_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      ethinx_processed_events: {
        Row: {
          id: string
          processed_at: string | null
        }
        Insert: {
          id: string
          processed_at?: string | null
        }
        Update: {
          id?: string
          processed_at?: string | null
        }
        Relationships: []
      }
      ethinx_products: {
        Row: {
          created_at: string | null
          features: Json | null
          id: string
          name: string
          price_cents: number
          stripe_price_id: string
          stripe_product_id: string
          tier: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: Json | null
          id?: string
          name: string
          price_cents: number
          stripe_price_id: string
          stripe_product_id: string
          tier: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: Json | null
          id?: string
          name?: string
          price_cents?: number
          stripe_price_id?: string
          stripe_product_id?: string
          tier?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ethinx_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string | null
          id: string
          product_id: string | null
          status: string
          stripe_subscription_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          status: string
          stripe_subscription_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: string
          product_id?: string | null
          status?: string
          stripe_subscription_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ethinx_subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ethinx_customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ethinx_subscriptions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ethinx_products"
            referencedColumns: ["id"]
          },
        ]
      }
      ethinx_tasks: {
        Row: {
          agent_id: string | null
          created_at: string | null
          id: string
          lane: string
          last_heartbeat: string | null
          payload: Json | null
          retry_count: number | null
          run_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          lane: string
          last_heartbeat?: string | null
          payload?: Json | null
          retry_count?: number | null
          run_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string | null
          id?: string
          lane?: string
          last_heartbeat?: string | null
          payload?: Json | null
          retry_count?: number | null
          run_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          entity_id: string | null
          entity_type: string
          event_type: string
          id: string
          payload: Json | null
        }
        Insert: {
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          event_type: string
          id?: string
          payload?: Json | null
        }
        Update: {
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          event_type?: string
          id?: string
          payload?: Json | null
        }
        Relationships: []
      }
      fulfillment_jobs: {
        Row: {
          created_at: string | null
          id: string
          order_id: string | null
          payload: Json | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          payload?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string | null
          payload?: Json | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fulfillment_jobs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fulfillment_jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_admins"
            referencedColumns: ["user_id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string
          description: string | null
          id: string
          integrity_hash: string | null
          intelligence_payload: Json | null
          legal_evidence_hash: string | null
          priority: number | null
          project_slug: string | null
          recursive_depth: number | null
          status: string | null
          subscription_tier: string | null
          target_market_segment: string | null
          title: string
          user_id: string | null
          value_cents: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          integrity_hash?: string | null
          intelligence_payload?: Json | null
          legal_evidence_hash?: string | null
          priority?: number | null
          project_slug?: string | null
          recursive_depth?: number | null
          status?: string | null
          subscription_tier?: string | null
          target_market_segment?: string | null
          title: string
          user_id?: string | null
          value_cents?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          integrity_hash?: string | null
          intelligence_payload?: Json | null
          legal_evidence_hash?: string | null
          priority?: number | null
          project_slug?: string | null
          recursive_depth?: number | null
          status?: string | null
          subscription_tier?: string | null
          target_market_segment?: string | null
          title?: string
          user_id?: string | null
          value_cents?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_project_slug_fkey"
            columns: ["project_slug"]
            isOneToOne: false
            referencedRelation: "ethinx_command_board"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "jobs_project_slug_fkey"
            columns: ["project_slug"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["slug"]
          },
        ]
      }
      member_progress: {
        Row: {
          created_at: string
          current_week: number
          email: string
          id: string
          last_accessed: string
          modules_completed: string[]
        }
        Insert: {
          created_at?: string
          current_week?: number
          email: string
          id?: string
          last_accessed?: string
          modules_completed?: string[]
        }
        Update: {
          created_at?: string
          current_week?: number
          email?: string
          id?: string
          last_accessed?: string
          modules_completed?: string[]
        }
        Relationships: []
      }
      microproducts: {
        Row: {
          active: boolean
          amount_cents: number
          created_at: string
          currency: string
          id: string
          product_name: string
          stripe_checkout_url: string
          stripe_price_id: string
          stripe_product_id: string
        }
        Insert: {
          active?: boolean
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          product_name: string
          stripe_checkout_url: string
          stripe_price_id: string
          stripe_product_id: string
        }
        Update: {
          active?: boolean
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          product_name?: string
          stripe_checkout_url?: string
          stripe_price_id?: string
          stripe_product_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount_total: number
          business_name: string | null
          created_at: string | null
          currency: string | null
          customer_email: string
          customer_name: string | null
          delivered: boolean
          delivered_at: string | null
          delivery_payload: Json | null
          download_url: string | null
          id: string
          industry: string | null
          package_generated_at: string | null
          product_tier: string
          status: string
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string
          updated_at: string | null
        }
        Insert: {
          amount_total: number
          business_name?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email: string
          customer_name?: string | null
          delivered?: boolean
          delivered_at?: string | null
          delivery_payload?: Json | null
          download_url?: string | null
          id?: string
          industry?: string | null
          package_generated_at?: string | null
          product_tier: string
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id: string
          updated_at?: string | null
        }
        Update: {
          amount_total?: number
          business_name?: string | null
          created_at?: string | null
          currency?: string | null
          customer_email?: string
          customer_name?: string | null
          delivered?: boolean
          delivered_at?: string | null
          delivery_payload?: Json | null
          download_url?: string | null
          id?: string
          industry?: string | null
          package_generated_at?: string | null
          product_tier?: string
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      org_members: {
        Row: {
          created_at: string | null
          id: string
          org_id: number | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          org_id?: number | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          org_id?: number | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_admins"
            referencedColumns: ["user_id"]
          },
        ]
      }
      partner_applications: {
        Row: {
          agency_name: string
          contact_name: string
          created_at: string
          current_clients: string
          email: string
          id: string
          monthly_budget: string
          preferred_tier: string
          status: string
          website: string
          why_partner: string
        }
        Insert: {
          agency_name: string
          contact_name: string
          created_at?: string
          current_clients: string
          email: string
          id?: string
          monthly_budget: string
          preferred_tier: string
          status?: string
          website: string
          why_partner: string
        }
        Update: {
          agency_name?: string
          contact_name?: string
          created_at?: string
          current_clients?: string
          email?: string
          id?: string
          monthly_budget?: string
          preferred_tier?: string
          status?: string
          website?: string
          why_partner?: string
        }
        Relationships: []
      }
      project_stripe_config: {
        Row: {
          created_at: string
          id: string
          live_mode: boolean | null
          project_slug: string | null
          stripe_enabled: boolean | null
        }
        Insert: {
          created_at?: string
          id?: string
          live_mode?: boolean | null
          project_slug?: string | null
          stripe_enabled?: boolean | null
        }
        Update: {
          created_at?: string
          id?: string
          live_mode?: boolean | null
          project_slug?: string | null
          stripe_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "project_stripe_config_project_slug_fkey"
            columns: ["project_slug"]
            isOneToOne: true
            referencedRelation: "ethinx_command_board"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "project_stripe_config_project_slug_fkey"
            columns: ["project_slug"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["slug"]
          },
        ]
      }
      projects: {
        Row: {
          git_remote: string | null
          has_backup: boolean | null
          has_stripe: boolean | null
          health_status: string | null
          last_commit: string | null
          last_health_check: string | null
          last_seen: string | null
          slug: string
          stripe_status: string | null
          tier: number | null
        }
        Insert: {
          git_remote?: string | null
          has_backup?: boolean | null
          has_stripe?: boolean | null
          health_status?: string | null
          last_commit?: string | null
          last_health_check?: string | null
          last_seen?: string | null
          slug: string
          stripe_status?: string | null
          tier?: number | null
        }
        Update: {
          git_remote?: string | null
          has_backup?: boolean | null
          has_stripe?: boolean | null
          health_status?: string | null
          last_commit?: string | null
          last_health_check?: string | null
          last_seen?: string | null
          slug?: string
          stripe_status?: string | null
          tier?: number | null
        }
        Relationships: []
      }
      promo_events: {
        Row: {
          created_at: string | null
          discount_amount: number | null
          event_type: string
          id: string
          order_id: string | null
          promo_code: string | null
        }
        Insert: {
          created_at?: string | null
          discount_amount?: number | null
          event_type: string
          id?: string
          order_id?: string | null
          promo_code?: string | null
        }
        Update: {
          created_at?: string | null
          discount_amount?: number | null
          event_type?: string
          id?: string
          order_id?: string | null
          promo_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount_paid: number
          archetype_id: string
          archetype_name: string
          created_at: string | null
          email: string
          id: string
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount_paid: number
          archetype_id: string
          archetype_name: string
          created_at?: string | null
          email: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount_paid?: number
          archetype_id?: string
          archetype_name?: string
          created_at?: string | null
          email?: string
          id?: string
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      site_stats: {
        Row: {
          id: string
          stat_key: string
          stat_value: string
          updated_at: string
        }
        Insert: {
          id?: string
          stat_key: string
          stat_value: string
          updated_at?: string
        }
        Update: {
          id?: string
          stat_key?: string
          stat_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      sovereign_logs: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          operator_action: string | null
          raw_response: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          operator_action?: string | null
          raw_response?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          operator_action?: string | null
          raw_response?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "sovereign_logs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_admins"
            referencedColumns: ["user_id"]
          },
        ]
      }
      video_requests: {
        Row: {
          created_at: string
          duration: string
          email: string
          id: string
          platform: string
          status: string
          tone: string
          topic: string
        }
        Insert: {
          created_at?: string
          duration: string
          email: string
          id?: string
          platform: string
          status?: string
          tone: string
          topic: string
        }
        Update: {
          created_at?: string
          duration?: string
          email?: string
          id?: string
          platform?: string
          status?: string
          tone?: string
          topic?: string
        }
        Relationships: []
      }
      worker_heartbeat: {
        Row: {
          last_pulse: string | null
          status: string | null
          worker_id: string
        }
        Insert: {
          last_pulse?: string | null
          status?: string | null
          worker_id: string
        }
        Update: {
          last_pulse?: string | null
          status?: string | null
          worker_id?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string
          enabled: boolean | null
          id: string
          key: string
          label: string
          n8n_workflow_id: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean | null
          id?: string
          key: string
          label: string
          n8n_workflow_id: string
        }
        Update: {
          created_at?: string
          enabled?: boolean | null
          id?: string
          key?: string
          label?: string
          n8n_workflow_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      ethinx_command_board: {
        Row: {
          founder_action: string | null
          last_commit: string | null
          slug: string | null
          tier: number | null
        }
        Insert: {
          founder_action?: never
          last_commit?: string | null
          slug?: string | null
          tier?: number | null
        }
        Update: {
          founder_action?: never
          last_commit?: string | null
          slug?: string | null
          tier?: number | null
        }
        Relationships: []
      }
      v_admins: {
        Row: {
          created_at: string | null
          email: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _admin_rate_limit_ok: { Args: never; Returns: boolean }
      assign_job_owner: {
        Args: { p_job_id: string; p_user_id: string }
        Returns: undefined
      }
      get_ethinx_command_board: {
        Args: never
        Returns: {
          founder_action: string
          last_commit: string
          slug: string
          tier: number
        }[]
      }
      grant_admin: { Args: { p_email: string }; Returns: undefined }
      is_admin: { Args: { p_user_id: string }; Returns: boolean }
      revoke_admin: { Args: { p_email: string }; Returns: undefined }
    }
    Enums: {
      app_role: "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
