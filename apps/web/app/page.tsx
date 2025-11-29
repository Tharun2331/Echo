"use client"
import { Button } from "@workspace/ui/components/button"
import {useMutation, useQuery} from "convex/react";
import {api} from "@workspace/backend/_generated/api";
export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
       <p>apps/web</p>
       <div className="max-w-sm w-full mx-auto ">
       {JSON.stringify(users, null, 2)}
       </div>
      
       <button onClick={() => addUser()} className="bg-black text-white rounded-md p-2 m-auto">Add User</button>
    </div>

  )
}
