import { FieldMiddleware, MiddlewareContext, NextFn } from "@nestjs/graphql";

export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const value: string = await next();
  console.log({ ctx, value, });

  return value?.toUpperCase();
}
