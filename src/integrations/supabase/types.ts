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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_description: string | null
          action_title: string
          case_id: string
          created_at: string
          created_by: string | null
          id: string
          status: string | null
        }
        Insert: {
          action_description?: string | null
          action_title: string
          case_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string | null
        }
        Update: {
          action_description?: string | null
          action_title?: string
          case_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_conversations: {
        Row: {
          case_id: string | null
          client_id: string | null
          created_at: string
          id: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          case_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          case_id?: string | null
          client_id?: string | null
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_memory: {
        Row: {
          id: string
          notes: string | null
          preferences: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          notes?: string | null
          preferences?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          notes?: string | null
          preferences?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      case_stages: {
        Row: {
          case_id: string
          client_action_required: string | null
          completed_at: string | null
          created_at: string
          id: string
          internal_note: string | null
          position: number
          public_note: string | null
          stage_key: Database["public"]["Enums"]["case_stage_key"]
          started_at: string | null
          status: Database["public"]["Enums"]["stage_status"]
          updated_at: string
        }
        Insert: {
          case_id: string
          client_action_required?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          internal_note?: string | null
          position: number
          public_note?: string | null
          stage_key: Database["public"]["Enums"]["case_stage_key"]
          started_at?: string | null
          status?: Database["public"]["Enums"]["stage_status"]
          updated_at?: string
        }
        Update: {
          case_id?: string
          client_action_required?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          internal_note?: string | null
          position?: number
          public_note?: string | null
          stage_key?: Database["public"]["Enums"]["case_stage_key"]
          started_at?: string | null
          status?: Database["public"]["Enums"]["stage_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_stages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          assigned_consultant: string | null
          business_activity: string | null
          client_id: string
          company_name: string
          created_at: string
          current_stage: Database["public"]["Enums"]["case_stage_key"]
          expected_next_step: string | null
          id: string
          jurisdiction: string | null
          progress_percentage: number
          status: Database["public"]["Enums"]["case_overall_status"]
          updated_at: string
        }
        Insert: {
          assigned_consultant?: string | null
          business_activity?: string | null
          client_id: string
          company_name?: string
          created_at?: string
          current_stage?: Database["public"]["Enums"]["case_stage_key"]
          expected_next_step?: string | null
          id?: string
          jurisdiction?: string | null
          progress_percentage?: number
          status?: Database["public"]["Enums"]["case_overall_status"]
          updated_at?: string
        }
        Update: {
          assigned_consultant?: string | null
          business_activity?: string | null
          client_id?: string
          company_name?: string
          created_at?: string
          current_stage?: Database["public"]["Enums"]["case_stage_key"]
          expected_next_step?: string | null
          id?: string
          jurisdiction?: string | null
          progress_percentage?: number
          status?: Database["public"]["Enums"]["case_overall_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cases_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          assigned_consultant: string | null
          company_name: string
          created_at: string
          id: string
          notes: string | null
          progress_pct: number
          stage: Database["public"]["Enums"]["setup_stage"]
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_consultant?: string | null
          company_name?: string
          created_at?: string
          id?: string
          notes?: string | null
          progress_pct?: number
          stage?: Database["public"]["Enums"]["setup_stage"]
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_consultant?: string | null
          company_name?: string
          created_at?: string
          id?: string
          notes?: string | null
          progress_pct?: number
          stage?: Database["public"]["Enums"]["setup_stage"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      consultations: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          method: Database["public"]["Enums"]["meeting_method"]
          name: string
          phone: string | null
          preferred_date: string | null
          status: Database["public"]["Enums"]["consultation_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          method?: Database["public"]["Enums"]["meeting_method"]
          name: string
          phone?: string | null
          preferred_date?: string | null
          status?: Database["public"]["Enums"]["consultation_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          method?: Database["public"]["Enums"]["meeting_method"]
          name?: string
          phone?: string | null
          preferred_date?: string | null
          status?: Database["public"]["Enums"]["consultation_status"]
          updated_at?: string
        }
        Relationships: []
      }
      document_requests: {
        Row: {
          client_id: string
          completed_at: string | null
          created_at: string
          description: string | null
          doc_type: string
          id: string
          requested_at: string
          status: Database["public"]["Enums"]["doc_request_status"]
          updated_at: string
        }
        Insert: {
          client_id: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          doc_type: string
          id?: string
          requested_at?: string
          status?: Database["public"]["Enums"]["doc_request_status"]
          updated_at?: string
        }
        Update: {
          client_id?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          doc_type?: string
          id?: string
          requested_at?: string
          status?: Database["public"]["Enums"]["doc_request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          admin_note: string | null
          case_id: string
          created_at: string
          document_type: string
          file_url: string | null
          id: string
          status: Database["public"]["Enums"]["document_status"]
          updated_at: string
          uploaded_at: string | null
        }
        Insert: {
          admin_note?: string | null
          case_id: string
          created_at?: string
          document_type: string
          file_url?: string | null
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          uploaded_at?: string | null
        }
        Update: {
          admin_note?: string | null
          case_id?: string
          created_at?: string
          document_type?: string
          file_url?: string | null
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      email_log: {
        Row: {
          case_id: string | null
          client_id: string | null
          created_at: string
          email_type: string | null
          error: string | null
          id: string
          recipient: string
          resend_id: string | null
          status: string
          subject: string | null
          template: string
        }
        Insert: {
          case_id?: string | null
          client_id?: string | null
          created_at?: string
          email_type?: string | null
          error?: string | null
          id?: string
          recipient: string
          resend_id?: string | null
          status?: string
          subject?: string | null
          template: string
        }
        Update: {
          case_id?: string | null
          client_id?: string | null
          created_at?: string
          email_type?: string | null
          error?: string | null
          id?: string
          recipient?: string
          resend_id?: string | null
          status?: string
          subject?: string | null
          template?: string
        }
        Relationships: []
      }
      onboarding_submissions: {
        Row: {
          bank_account_required: string | null
          business_activity: string | null
          client_id: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          nationality: string | null
          number_of_visas: number | null
          office_requirement: string | null
          preferred_jurisdiction: string | null
          residency_required: string | null
          setup_goals: string[] | null
          status: string
          tax_registration_required: string | null
          updated_at: string
          user_id: string | null
          website_required: boolean | null
          whatsapp: string | null
        }
        Insert: {
          bank_account_required?: string | null
          business_activity?: string | null
          client_id?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          nationality?: string | null
          number_of_visas?: number | null
          office_requirement?: string | null
          preferred_jurisdiction?: string | null
          residency_required?: string | null
          setup_goals?: string[] | null
          status?: string
          tax_registration_required?: string | null
          updated_at?: string
          user_id?: string | null
          website_required?: boolean | null
          whatsapp?: string | null
        }
        Update: {
          bank_account_required?: string | null
          business_activity?: string | null
          client_id?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          nationality?: string | null
          number_of_visas?: number | null
          office_requirement?: string | null
          preferred_jurisdiction?: string | null
          residency_required?: string | null
          setup_goals?: string[] | null
          status?: string
          tax_registration_required?: string | null
          updated_at?: string
          user_id?: string | null
          website_required?: boolean | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      otp_codes: {
        Row: {
          attempts: number
          code_hash: string
          created_at: string
          email: string
          expires_at: string
          id: string
          purpose: string
          used_at: string | null
        }
        Insert: {
          attempts?: number
          code_hash: string
          created_at?: string
          email: string
          expires_at: string
          id?: string
          purpose?: string
          used_at?: string | null
        }
        Update: {
          attempts?: number
          code_hash?: string
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          purpose?: string
          used_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quote_requests: {
        Row: {
          business_activity: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          nationality: string | null
          needs_banking: boolean | null
          needs_digital: boolean | null
          needs_residency: string | null
          needs_tax: boolean | null
          number_of_visas: number | null
          office_requirement: string | null
          preferred_jurisdiction: string | null
          whatsapp: string | null
        }
        Insert: {
          business_activity?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          nationality?: string | null
          needs_banking?: boolean | null
          needs_digital?: boolean | null
          needs_residency?: string | null
          needs_tax?: boolean | null
          number_of_visas?: number | null
          office_requirement?: string | null
          preferred_jurisdiction?: string | null
          whatsapp?: string | null
        }
        Update: {
          business_activity?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          nationality?: string | null
          needs_banking?: boolean | null
          needs_digital?: boolean | null
          needs_residency?: string | null
          needs_tax?: boolean | null
          number_of_visas?: number | null
          office_requirement?: string | null
          preferred_jurisdiction?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      quotes: {
        Row: {
          case_id: string | null
          client_id: string | null
          created_at: string
          estimated_government_fees_max: number | null
          estimated_government_fees_min: number | null
          id: string
          included_services: Json
          number_of_visas: number | null
          optional_addons: Json
          pdf_url: string | null
          quote_number: string
          quote_request_id: string | null
          recipient_email: string
          recipient_name: string | null
          recommended_structure: string | null
          selected_jurisdiction: string | null
          service_fees_max: number | null
          service_fees_min: number | null
          status: Database["public"]["Enums"]["quote_status"]
          timeline_days_max: number | null
          timeline_days_min: number | null
          total_estimated_cost_max: number | null
          total_estimated_cost_min: number | null
          updated_at: string
        }
        Insert: {
          case_id?: string | null
          client_id?: string | null
          created_at?: string
          estimated_government_fees_max?: number | null
          estimated_government_fees_min?: number | null
          id?: string
          included_services?: Json
          number_of_visas?: number | null
          optional_addons?: Json
          pdf_url?: string | null
          quote_number?: string
          quote_request_id?: string | null
          recipient_email: string
          recipient_name?: string | null
          recommended_structure?: string | null
          selected_jurisdiction?: string | null
          service_fees_max?: number | null
          service_fees_min?: number | null
          status?: Database["public"]["Enums"]["quote_status"]
          timeline_days_max?: number | null
          timeline_days_min?: number | null
          total_estimated_cost_max?: number | null
          total_estimated_cost_min?: number | null
          updated_at?: string
        }
        Update: {
          case_id?: string | null
          client_id?: string | null
          created_at?: string
          estimated_government_fees_max?: number | null
          estimated_government_fees_min?: number | null
          id?: string
          included_services?: Json
          number_of_visas?: number | null
          optional_addons?: Json
          pdf_url?: string | null
          quote_number?: string
          quote_request_id?: string | null
          recipient_email?: string
          recipient_name?: string | null
          recommended_structure?: string | null
          selected_jurisdiction?: string | null
          service_fees_max?: number | null
          service_fees_min?: number | null
          status?: Database["public"]["Enums"]["quote_status"]
          timeline_days_max?: number | null
          timeline_days_min?: number | null
          total_estimated_cost_max?: number | null
          total_estimated_cost_min?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quotes_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_quote_request_id_fkey"
            columns: ["quote_request_id"]
            isOneToOne: false
            referencedRelation: "quote_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      status_updates: {
        Row: {
          client_id: string
          created_at: string
          id: string
          note: string | null
          stage: Database["public"]["Enums"]["setup_stage"]
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          note?: string | null
          stage: Database["public"]["Enums"]["setup_stage"]
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          note?: string | null
          stage?: Database["public"]["Enums"]["setup_stage"]
        }
        Relationships: [
          {
            foreignKeyName: "status_updates_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "consultant" | "client"
      case_overall_status: "active" | "on_hold" | "completed" | "cancelled"
      case_stage_key:
        | "consultation"
        | "initial_approval"
        | "trade_name"
        | "ejari"
        | "license"
        | "establishment_card"
        | "residency"
        | "visa_application"
        | "medical"
        | "eid_fingerprint"
        | "eid_issuance"
        | "tax_registration"
        | "banking"
        | "lifetime_support"
      consultation_status: "pending" | "scheduled" | "completed" | "cancelled"
      doc_request_status: "pending" | "submitted" | "approved" | "rejected"
      document_status: "pending" | "uploaded" | "approved" | "rejected"
      meeting_method:
        | "whatsapp"
        | "zoom"
        | "google_meet"
        | "in_person"
        | "phone"
      quote_status: "draft" | "sent" | "accepted" | "expired" | "converted"
      setup_stage:
        | "consultation"
        | "documentation"
        | "initial_approval"
        | "license_processing"
        | "residency"
        | "emirates_id"
        | "banking_preparation"
        | "completed"
      stage_status:
        | "not_started"
        | "in_progress"
        | "waiting_client"
        | "under_review"
        | "completed"
        | "issue"
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
      app_role: ["admin", "consultant", "client"],
      case_overall_status: ["active", "on_hold", "completed", "cancelled"],
      case_stage_key: [
        "consultation",
        "initial_approval",
        "trade_name",
        "ejari",
        "license",
        "establishment_card",
        "residency",
        "visa_application",
        "medical",
        "eid_fingerprint",
        "eid_issuance",
        "tax_registration",
        "banking",
        "lifetime_support",
      ],
      consultation_status: ["pending", "scheduled", "completed", "cancelled"],
      doc_request_status: ["pending", "submitted", "approved", "rejected"],
      document_status: ["pending", "uploaded", "approved", "rejected"],
      meeting_method: ["whatsapp", "zoom", "google_meet", "in_person", "phone"],
      quote_status: ["draft", "sent", "accepted", "expired", "converted"],
      setup_stage: [
        "consultation",
        "documentation",
        "initial_approval",
        "license_processing",
        "residency",
        "emirates_id",
        "banking_preparation",
        "completed",
      ],
      stage_status: [
        "not_started",
        "in_progress",
        "waiting_client",
        "under_review",
        "completed",
        "issue",
      ],
    },
  },
} as const
