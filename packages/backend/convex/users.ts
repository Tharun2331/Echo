import { mutation, query, type QueryCtx, type MutationCtx} from "./_generated/server";

export const getMany = query({
  args:{},
  handler: async (ctx: QueryCtx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  }

})


export const add  = mutation({
  args:{},
  handler: async (ctx: MutationCtx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    const orgId = identity?.orgId as string;

    if(!orgId)
    {
      throw new Error("Missing Organization");
    }

    const userId = await ctx.db.insert("users", {
      name: "Raju"
    })

    return userId;  
  }
})

