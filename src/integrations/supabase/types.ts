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
      email_log: {
        Row: {
          created_at: string
          error: string | null
          id: string
          recipient: string
          resend_id: string | null
          status: string
          subject: string | null
          template: string
        }
        Insert: {
          created_at?: string
          error?: string | null
          id?: string
          recipient: string
          resend_id?: string | null
          status?: string
          subject?: string | null
          template: string
        }
        Update: {
          created_at?: string
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
      consultation_status: "pending" | "scheduled" | "completed" | "cancelled"
      doc_request_status: "pending" | "submitted" | "approved" | "rejected"
      meeting_method:
        | "whatsapp"
        | "zoom"
        | "google_meet"
        | "in_person"
        | "phone"
      setup_stage:
        | "consultation"
        | "documentation"
        | "initial_approval"
        | "license_processing"
        | "residency"
        | "emirates_id"
        | "banking_preparation"
        | "completed"
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
      consultation_status: ["pending", "scheduled", "completed", "cancelled"],
      doc_request_status: ["pending", "submitted", "approved", "rejected"],
      meeting_method: ["whatsapp", "zoom", "google_meet", "in_person", "phone"],
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
    },
  },
} as const
