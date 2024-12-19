"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { insertHealthInfoSchema } from "../../../../lib/schema/health-info.schema";
import { supabaseClient } from "../../../../supabase-utils/client";
import type { Database } from "../../../../lib/types/database.types";

interface UserHealthInfoFormProps {
  profile: Database["public"]["Tables"]["profiles"]["Row"];
}

export function UserHealthInfoForm({ profile }: UserHealthInfoFormProps) {
  const router = useRouter();

  // health info form hook
  const healthInfoForm = useForm<z.infer<typeof insertHealthInfoSchema>>({
    resolver: zodResolver(insertHealthInfoSchema),
    defaultValues: {
      date: new Date().toLocaleDateString("sv-SE"),
      user_email: profile.user_email,
      user_id: profile.user_id!,
      age: 0,
      height: 0,
      weight: 0,
      body_fat_mass: 0,
      skeletal_muscle_mass: 0,
    },
  });

  // health info form submission
  async function onHealthInfoSubmit(
    values: z.infer<typeof insertHealthInfoSchema>,
  ) {
    // set a UTC date to make sure
    const utcDate = new Date(healthInfoForm.getValues("date")).toUTCString();
    healthInfoForm.setValue("date", utcDate);

    const supabase = supabaseClient<Database>();
    const res = await supabase.from("health_info").insert(values);

    if (res.error) {
      console.error(res.error);
      return;
    }

    // REVIEW: next 15 so don't have to invalidate cache
    router.refresh();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">내 정보</h1>

      <Form {...healthInfoForm}>
        <form
          onSubmit={healthInfoForm.handleSubmit(onHealthInfoSubmit)}
          className="space-y-4"
        >
          <FormField
            control={healthInfoForm.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>측정 날짜</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  <span>측정한 날짜를 입력해주세요. 예시: 2024-12-10</span>
                  <span>측정 날짜를 기반으로 개인화된 답변을 생성합니다.</span>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={healthInfoForm.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>나이</FormLabel>
                <FormControl>
                  <Input
                    placeholder="나이"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : 0,
                      )
                    }
                  />
                </FormControl>
                <FormDescription>나이를 입력해주세요</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={healthInfoForm.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>키</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="키"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0,
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    <span>
                      정확할 필요는 없어요. 나중에 다시 입력할 수 있어요.
                    </span>
                    <span>키를 cm로 입력해주세요.</span>
                    <span>예시: 170.4cm, 170cm</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={healthInfoForm.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>몸무게</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="몸무게"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0,
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    <span>
                      정확할 필요는 없어요. 나중에 다시 입력할 수 있어요.
                    </span>
                    <span>몸무게를 kg로 입력해주세요.</span>
                    <span>예시: 60.4kg, 60kg</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <FormField
              control={healthInfoForm.control}
              name="body_fat_mass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>체지방량</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="체지방량"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0,
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    <span>선택사항이에요. 나중에도 입력할 수 있어요.</span>
                    <span>체지방량을 kg로 입력해주세요.</span>
                    <span>예시: 13.4kg, 13</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={healthInfoForm.control}
              name="skeletal_muscle_mass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>골격근량</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="골격근량"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : 0,
                        )
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    <span>선택사항이에요. 나중에도 입력할 수 있어요.</span>
                    <span>골격근량을 kg로 입력해주세요.</span>
                    <span>예시: 10.4kg, 24</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
