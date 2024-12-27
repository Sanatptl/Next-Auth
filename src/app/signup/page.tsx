"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the validation schema using Zod
const formSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }),
  email: z.string().email({ message: "Invalid email adress." }),
  password: z.string().min(6, "Password must be at least 8 characters long."),
});

// Define field configurations
const fields = [
  {
    name: "userName",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

// Define the types based on the schema
type UserFormInput = z.infer<typeof formSchema>;
// const form = useForm<UserFormInput>({ resolver: zodResolver(formSchema) });//Invalid hook call. Hooks can only be called inside of the body of a function component

//component to be exported
export default function SignupPage() {
  // const router = useRouter();

  const form = useForm<UserFormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });
  // console.log(form);
  // const [buttonDisabled, setButtonDisabled] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    // const onSubmit = (data: UserFormInput) => {
    try {
      console.log("called!!!");
      // setIsLoading(true);
      // const response = await axios.post("/api/users/signup", data);
      // router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full md:min-w-px">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    type="email"
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
