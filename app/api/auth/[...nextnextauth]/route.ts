import NextAuth, { Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:"",
            clientSecret:"",
        })
    ],
    async session({session}:{session:Session}){
        
    },
    async signIn({profile}:{profile:Profile}){

    }
})

export {handler as GET,handler as POST};