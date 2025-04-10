import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  // to provide data before calling api
  // const session = await getServerSession(authOptions);
  // return session
  const user = {
    name: "sager yenkure",
    id: "112233",
    role: "user",
  };
  if (!user) return { name: null, id: null, role: null };
  return user;
});

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
