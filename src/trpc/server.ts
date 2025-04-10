import "server-only";
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { trpcRouter } from "./router";
import { createCallerFactory, createTRPCContext } from "./init";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(trpcRouter)(createTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<
  typeof trpcRouter
>(caller, getQueryClient);
