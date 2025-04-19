import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import { redirect } from "next/navigation";
import AuthFormContent from "@/components/auth/content"

export default async function AuthPage() {
  // TODO: check if user is authenticated and redirect to home page
  return (
    <div className="flex flex-col flex-1 min-h-full px-6 py-12 mt-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mb-4">
          <Image
            alt="Your Company"
            src="/images/lbta-app.png"
            width={250}
            height={150}
            className="w-auto mx-auto rounded-md"
          />
        </div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Sign in</TabsTrigger>
            <TabsTrigger value="password">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AuthFormContent isSignIn={true} />
          </TabsContent>
          <TabsContent value="password">
            <AuthFormContent isSignIn={false} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
