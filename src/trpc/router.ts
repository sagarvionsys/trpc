import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./init";
import { createUser, getAllUsers, getUserById } from "./procedures/users";

export const userRouter = {
  getAll: publicProcedure.query(() => getAllUsers()),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => getUserById(input.id)),
  createUser: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => createUser(input.name)),
};

export const authRouter = {};

export const trpcRouter = createTRPCRouter({
  users: userRouter,
  auth: authRouter,
});

export type TRPCRouter = typeof trpcRouter;
