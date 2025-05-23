import { createTRPCContext } from "@/trpc/init";
import { trpcRouter } from "@/trpc/router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: trpcRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
