import google from "@/assets/icons/google.svg";
import x from "@/assets/icons/x.svg";
import metamask from "@/assets/icons/metamask.svg";
import phantom from "@/assets/icons/phantom.svg";
import facebook from "@/assets/icons/facebook.svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth";
import { z } from "zod";
import { PasswordInput } from "@/components/ui/passwordInput";
import { useState } from "react";

const loginTypes = [
  {
    key: "google",
    name: "Google",
    icon: google,
    type: "social",
  },
  {
    key: "x",
    name: "X",
    icon: x,
    type: "social",
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: facebook,
    type: "social",
  },
  {
    key: "metamask",
    name: "Metamask (Soon)",
    icon: metamask,
    type: "wallet",
  },
  {
    key: "phantom",
    name: "Phantom (Soon)",
    icon: phantom,
    type: "wallet",
  },
];

type LoginFormValues = z.infer<typeof loginSchema>;

const defaultValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log(data);
      // Add your login logic here
    } catch (error) {
      console.error(error);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      console.log(`Logging in with ${provider}`);
      // Add your social login logic here
    } catch (error) {
      console.error(error);
    }
  };

  const handleWalletLogin = async (wallet: string) => {
    try {
      console.log(`Connecting to ${wallet}`);
      // Add your wallet connection logic here
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Card className="border-none bg-[#222936]">
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">
                    Username or Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      className="bg-transparent border-gray-600 border-2"
                      placeholder="Enter your username or email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      type="password"
                      className="bg-transparent border-gray-600 border-2"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full hover:bg-[#FFB571]/80 text-gray-200 bg-[#E77C1B] border-2 my-1 h-10 text-sm border-[#FFB571]"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#222936] px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {loginTypes.map((loginType) => (
            <Button
              key={loginType.key}
              variant="outline"
              className="border-gray-600 bg-[#222936] text-gray-200 cursor-pointer hover:bg-[#4a5565]/80"
              onClick={() =>
                loginType.type == "social"
                  ? handleSocialLogin(loginType.key)
                  : handleWalletLogin(loginType.key)
              }
              disabled={loginType.type == "wallet"}
            >
              <img src={loginType.icon} alt={loginType.name} srcSet="" />
              {loginType.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
