"use client"
import {useMutation, useQuery, Authenticated, Unauthenticated} from "convex/react";
import {api} from "@workspace/backend/_generated/api";
import { UserButton, SignInButton} from "@clerk/nextjs";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Authenticated>
       <p>apps/web</p> <br />
       <UserButton />
       <div className="max-w-sm w-full mx-auto ">
       {JSON.stringify(users, null, 2)}
       </div>
       <button onClick={() => addUser()} className="bg-black text-white rounded-md p-2 m-auto">Add User</button>
       </Authenticated>
       <Unauthenticated>
       <div className="flex flex-col items-center gap-4">
          <p>Must be signed in!</p>
          <SignInButton>Sign in!</SignInButton>
        </div>
       </Unauthenticated>
    </div>

  )
}
