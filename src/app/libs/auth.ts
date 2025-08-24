import type {NextAuthOptions} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github"
import prisma from "../../../prisma/client";


export const authOptions : NextAuthOptions = {
    providers : [
    GoogleProvider ({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
  }),
    GitHubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "" 
  })
],
    callbacks : {
        session :async ({ session }  : any) => {
            console.log(session);
            
            if(session && session.user)
            {
                console.log(session);
                
                    try {
                        const user = await prisma.user.findUnique({
                            where : {
                                email : session.user.email
                            }
                        });

                        if(!user){
                            const newUser = await prisma.user.create({
                                data : {
                                    name : session.user.name,
                                    email : session.user.email,
                                    profileImage : session.user.image
                                }
                            });

                            console.log(`New User : ${newUser}`);  
                        }

                       console.log(`New User : ${user}`); 
                        
                    } catch (error) {
                        console.log(`Error while creating user : ${error}`);
                    }
            }
            return session;
        }
    },
    pages : {
        signIn : '/signin',
    }
}