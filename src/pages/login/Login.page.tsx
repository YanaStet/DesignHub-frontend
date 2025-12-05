import { AuthHooks } from "@/entities/auth/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn-ui/ui/form";
import { Input } from "@/shared/shadcn-ui/ui/input";
import { Typography } from "@/shared/shadcn-ui/ui/typography";
import { showToast } from "@/shared/utils/showToast";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/shadcn-ui/ui/button";
import { handleApiError } from "@/shared/api/apiError";
import { useState } from "react";
import {
  loginFormSchema,
  regFormSchema,
  type LoginFormSchema,
  type RegFormSchema,
} from "./loginSchema";
import { UserHooks } from "@/entities/users/hooks";

export function LoginPage() {
  const [isReg, setIsReg] = useState(false);
  const regForm = useForm<RegFormSchema>({
    resolver: zodResolver(regFormSchema),
    reValidateMode: "onSubmit",
  });

  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    reValidateMode: "onSubmit",
  });

  const { mutate: login, isPending: isLoading } = AuthHooks.useLoginMutation();
  const { mutate: register } = UserHooks.useCreateUserMutation();

  const navigate = useNavigate();

  const handleSubmitLogin = (values: LoginFormSchema) => {
    login(
      {
        username: values.email,
        password: values.password,
      },
      {
        onSuccess: (response) => {
          showToast("success", "You successfuly entered your account.");
          localStorage.setItem("access-token", response.access_token);
          navigate("/");
        },
        onError: (er) => {
          handleApiError(er);
        },
      }
    );
  };

  const handleSubmitReg = (values: RegFormSchema) => {
    register(
      {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        role: "designer",
      },
      {
        onSuccess: () => {
          login(
            {
              username: values.email,
              password: values.password,
            },
            {
              onSuccess: (response) => {
                showToast("success", "You successfuly entered your account.");
                localStorage.setItem("access-token", response.access_token);
                navigate("/");
              },
              onError: (er) => {
                handleApiError(er);
              },
            }
          );
        },
        onError: (er) => handleApiError(er),
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 bg-primary-1 rounded-lg shadow-lg flex-col gap-3">
        <Typography variant="h2" className="text-gray-4">
          {isReg ? "Sign In" : "Login"}
        </Typography>

        {isReg && (
          <Form {...regForm}>
            <form onSubmit={regForm.handleSubmit(handleSubmitReg)}>
              <FormField
                control={regForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-6 my-3">
                      First name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        className="text-gray-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-6 my-3">
                      Last name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        className="text-gray-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-6 my-3">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="text-gray-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={regForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-6 my-3">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        className="text-gray-6"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-3 w-full bg-primary-2"
                disabled={isLoading}
              >
                Sign In
              </Button>

              <Typography
                className="text-gray-4 flex gap-1 mt-3"
                variant="body3"
              >
                Already have an account?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setIsReg(false)}
                >
                  Login
                </span>
              </Typography>
            </form>
          </Form>
        )}

        {!isReg && (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(handleSubmitLogin)}>
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-6 my-3">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="text-gray-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-6 my-3">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        className="text-gray-6"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-3 w-full bg-primary-2"
                disabled={isLoading}
              >
                Login
              </Button>
              <Typography
                className="text-gray-4 flex gap-1 mt-3"
                variant="body3"
              >
                Don't have an account yet?{" "}
                <span className="cursor-pointer" onClick={() => setIsReg(true)}>
                  Sign In
                </span>
              </Typography>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
