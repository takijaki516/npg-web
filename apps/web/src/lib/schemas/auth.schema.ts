import { z } from "zod";

export const emailSignupSchema = z.object({
  email: z.string().email({ message: "유요한 이메일 주소를 입력해주세요" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
});

export const emailSigninSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." }),
});
