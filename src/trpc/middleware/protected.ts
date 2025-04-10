import { middleware } from "../init";

export const adminMiddleware = middleware(({ ctx, next }) => {
  if (ctx?.role !== "admin")
    throw new Error(
      "Not authorized,u are not authorized to perform this action"
    );

  return next({ ctx });
});

export const userMiddleware = middleware(({ ctx, next }) => {
  if (!ctx.role)
    throw new Error(
      "Not logged in, u are not logged in to perform this action"
    );

  return next({ ctx });
});
