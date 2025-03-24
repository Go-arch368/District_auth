import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800">Authentication Page</h1>
      
      <div className="flex flex-col space-y-4">
        <Link 
          href="/auth/login"
          className="px-6 py-3 text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
        >
          Go to Login
        </Link>
        
        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link 
            href="/auth/register" 
            className="text-indigo-600 hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
