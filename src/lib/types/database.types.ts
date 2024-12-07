export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      daily_trackings: {
        Row: {
          comments: string | null;
          created_at: string;
          id: string;
          updated_at: string;
          user_email: string;
        };
        Insert: {
          comments?: string | null;
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_email: string;
        };
        Update: {
          comments?: string | null;
          created_at?: string;
          id?: string;
          updated_at?: string;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "daily_tracker_user_email_fkey";
            columns: ["user_email"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_email"];
          },
        ];
      };
      exercises: {
        Row: {
          created_at: string;
          daily_tracker_id: string;
          description: string | null;
          end_time: string | null;
          exercise_type: string | null;
          id: string;
          start_time: string | null;
          user_email: string;
        };
        Insert: {
          created_at?: string;
          daily_tracker_id: string;
          description?: string | null;
          end_time?: string | null;
          exercise_type?: string | null;
          id?: string;
          start_time?: string | null;
          user_email: string;
        };
        Update: {
          created_at?: string;
          daily_tracker_id?: string;
          description?: string | null;
          end_time?: string | null;
          exercise_type?: string | null;
          id?: string;
          start_time?: string | null;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercise_daily_tracker_id_fkey";
            columns: ["daily_tracker_id"];
            isOneToOne: false;
            referencedRelation: "daily_trackings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "exercise_user_email_fkey";
            columns: ["user_email"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_email"];
          },
        ];
      };
      foods: {
        Row: {
          food_info: Json | null;
          id: string;
          meal_id: string;
        };
        Insert: {
          food_info?: Json | null;
          id?: string;
          meal_id: string;
        };
        Update: {
          food_info?: Json | null;
          id?: string;
          meal_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "foods_meal_id_fkey";
            columns: ["meal_id"];
            isOneToOne: false;
            referencedRelation: "meals";
            referencedColumns: ["id"];
          },
        ];
      };
      meals: {
        Row: {
          created_at: string;
          daily_tracker_id: string;
          date: string;
          id: string;
          user_email: string;
        };
        Insert: {
          created_at?: string;
          daily_tracker_id: string;
          date: string;
          id?: string;
          user_email: string;
        };
        Update: {
          created_at?: string;
          daily_tracker_id?: string;
          date?: string;
          id?: string;
          user_email?: string;
        };
        Relationships: [
          {
            foreignKeyName: "meal_user_email_fkey";
            columns: ["user_email"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["user_email"];
          },
          {
            foreignKeyName: "meals_daily_tracker_id_fkey";
            columns: ["daily_tracker_id"];
            isOneToOne: false;
            referencedRelation: "daily_trackings";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          created_at: string;
          id: string;
          main_image: string | null;
          updated_at: string;
          user_email: string;
          user_id: string | null;
          username: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          main_image?: string | null;
          updated_at?: string;
          user_email?: string;
          user_id?: string | null;
          username?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          main_image?: string | null;
          updated_at?: string;
          user_email?: string;
          user_id?: string | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
