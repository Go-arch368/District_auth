"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";


export const Social = () => {
   const onClick =(provider:"google")=>{
       signIn(provider,{
          callbackUrl:DEFAULT_LOGIN_REDIRECT
       })
   }

  return (
    <div className="flex items-center justify-center w-full gap-x-4">
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={() =>onClick("google")}
    >
      <div className="flex items-center justify-center gap-2">
        <FcGoogle size={20} /> {/* Adjusted size for better proportion */}
        <span>Continue with Google</span> {/* Added text label */}
      </div>
    </Button>
  </div>
  );
};
