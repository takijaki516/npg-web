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
      daily_cardio_exercises: {
        Row: {
          calories_burned: number;
          cardio_name: string;
          created_at: string;
          distance: number | null;
          duration: number;
          end_time: string;
          id: string;
          start_time: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          calories_burned: number;
          cardio_name: string;
          created_at?: string;
          distance?: number | null;
          duration: number;
          end_time: string;
          id?: string;
          start_time: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          calories_burned?: number;
          cardio_name?: string;
          created_at?: string;
          distance?: number | null;
          duration?: number;
          end_time?: string;
          id?: string;
          start_time?: string;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      daily_weights_exercises: {
        Row: {
          calories_burned: number;
          created_at: string;
          duration: number;
          end_time: string;
          id: string;
          part: string;
          start_time: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          calories_burned: number;
          created_at?: string;
          duration: number;
          end_time: string;
          id?: string;
          part: string;
          start_time: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          calories_burned?: number;
          created_at?: string;
          duration?: number;
          end_time?: string;
          id?: string;
          part?: string;
          start_time?: string;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      each_weights_exercises: {
        Row: {
          created_at: string;
          duration: number;
          id: string;
          user_email: string;
          user_id: string | null;
          weights_exercises_id: string;
          workout_name: string;
        };
        Insert: {
          created_at?: string;
          duration: number;
          id?: string;
          user_email: string;
          user_id?: string | null;
          weights_exercises_id: string;
          workout_name: string;
        };
        Update: {
          created_at?: string;
          duration?: number;
          id?: string;
          user_email?: string;
          user_id?: string | null;
          weights_exercises_id?: string;
          workout_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "each_weights_exercises_weights_exercises_fkey";
            columns: ["weights_exercises_id"];
            isOneToOne: false;
            referencedRelation: "daily_weights_exercises";
            referencedColumns: ["id"];
          },
        ];
      };
      each_weights_exercises_set_info: {
        Row: {
          created_at: string;
          each_weights_exercises_id: string;
          id: string;
          kg: number;
          reps: number;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          each_weights_exercises_id: string;
          id?: string;
          kg: number;
          reps: number;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          each_weights_exercises_id?: string;
          id?: string;
          kg?: number;
          reps?: number;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "each_weights_exercises_set_info_weights_exercises_fkey";
            columns: ["each_weights_exercises_id"];
            isOneToOne: false;
            referencedRelation: "each_weights_exercises";
            referencedColumns: ["id"];
          },
        ];
      };
      foods: {
        Row: {
          food_info: Json | null;
          id: string;
          meal_id: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          food_info?: Json | null;
          id?: string;
          meal_id: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          food_info?: Json | null;
          id?: string;
          meal_id?: string;
          user_email?: string;
          user_id?: string | null;
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
      health_info: {
        Row: {
          age: number;
          body_fat_mass: number | null;
          created_at: string;
          date: string;
          height: number;
          id: string;
          skeletal_muscle_mass: number | null;
          updated_at: string;
          user_email: string;
          user_id: string | null;
          weight: number;
        };
        Insert: {
          age: number;
          body_fat_mass?: number | null;
          created_at?: string;
          date: string;
          height: number;
          id?: string;
          skeletal_muscle_mass?: number | null;
          updated_at?: string;
          user_email: string;
          user_id?: string | null;
          weight: number;
        };
        Update: {
          age?: number;
          body_fat_mass?: number | null;
          created_at?: string;
          date?: string;
          height?: number;
          id?: string;
          skeletal_muscle_mass?: number | null;
          updated_at?: string;
          user_email?: string;
          user_id?: string | null;
          weight?: number;
        };
        Relationships: [];
      };
      llm_daily_exercies: {
        Row: {
          created_at: string;
          exercise_detail: Json | null;
          id: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          exercise_detail?: Json | null;
          id?: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          exercise_detail?: Json | null;
          id?: string;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      meals: {
        Row: {
          created_at: string;
          date: string;
          id: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          date: string;
          id?: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          date?: string;
          id?: string;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [];
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
      today_info: {
        Row: {
          ai_comment: string | null;
          created_at: string;
          current_date: string;
          id: string;
          updated_at: string;
          user_email: string;
          user_id: string | null;
        };
        Insert: {
          ai_comment?: string | null;
          created_at?: string;
          current_date: string;
          id?: string;
          updated_at?: string;
          user_email: string;
          user_id?: string | null;
        };
        Update: {
          ai_comment?: string | null;
          created_at?: string;
          current_date?: string;
          id?: string;
          updated_at?: string;
          user_email?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_goals: {
        Row: {
          body_fat_mass: number | null;
          created_at: string;
          height: number | null;
          id: string;
          pledge: string | null;
          skeletal_muscle_mass: number | null;
          updated_at: string;
          user_email: string;
          user_id: string | null;
          weight: number | null;
        };
        Insert: {
          body_fat_mass?: number | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          pledge?: string | null;
          skeletal_muscle_mass?: number | null;
          updated_at?: string;
          user_email: string;
          user_id?: string | null;
          weight?: number | null;
        };
        Update: {
          body_fat_mass?: number | null;
          created_at?: string;
          height?: number | null;
          id?: string;
          pledge?: string | null;
          skeletal_muscle_mass?: number | null;
          updated_at?: string;
          user_email?: string;
          user_id?: string | null;
          weight?: number | null;
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
