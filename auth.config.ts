import Google from "next-auth/providers/google";
import Crendentials from "next-auth/providers/credentials"

import type {NextAuthConfig} from "next-auth"
import { LoginSchema } from "./schemas"
import { getUserByEmail } from "./data/user"
import bcrypt from "bcryptjs"
export const runtime = "nodejs";
export default {
    providers:[
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
        Crendentials({
            async authorize(credentials){
                console.log(credentials);
                
                const validatedFields = LoginSchema.safeParse(credentials)
                if(validatedFields.success){
                    const {email,password} = validatedFields.data
                    
                    const user = await getUserByEmail(email)
                    if(!user||!user.password) return null;
                    const passwordsMatch = await bcrypt.compare(password,user.password)

                    if(passwordsMatch) return user
                }
                return null
            }
        })
    ]
}satisfies NextAuthConfig