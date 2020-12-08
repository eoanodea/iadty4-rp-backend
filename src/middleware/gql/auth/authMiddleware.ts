import { ApolloContext } from "../../../types/ApolloContext";
import { MiddlewareFn } from "type-graphql";
import { ClientSafeError } from "../errors";

export const authCheck: MiddlewareFn<ApolloContext> = (
  { context: ctx },
  next
) => {
  //   if (!!ctx.req.session.userId) {
  return next();
  //   } else {
  //     throw new ClientSafeError("Session timed out", 403);
  //   }
};
