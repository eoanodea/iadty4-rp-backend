import { GraphQLResolveInfo } from "graphql";
import { verify } from "argon2";
import { Resolver, Mutation, Ctx, Arg, Query, Info } from "type-graphql";

import { AuthValidator } from "../contracts/validators";
import { LoggedIn, User } from "../entities";
import { MyContext } from "../utils/interfaces/context.interface";
import {
  ClientSafeError,
  generateAdminToken,
  generateToken,
} from "../middleware";

@Resolver(() => User)
export class AuthResolver {
  @Query(() => User, { nullable: true })
  async get(
    @Ctx() ctx: MyContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<User> {
    try {
      const user = await ctx.em
        .getRepository(User)
        .findOneOrFail({ id: ctx.auth._id }, [
          "completedModules",
          "completedLessons",
          "incorrectQuestions",
          "streak",
        ]);

      return user;
    } catch (err) {
      throw new ClientSafeError("Not Authenticated", 403, "AUTH_ERROR");
    }
  }

  @Mutation(() => LoggedIn, { nullable: true })
  async login(
    @Arg("input") input: AuthValidator,
    @Ctx() ctx: MyContext
  ): Promise<{ token: string; expiration: number; user: User }> {
    try {
      const user = await ctx.em.findOneOrFail(User, { email: input.email });

      if (await verify(user.password, input.password)) {
        const { token, expiration } = generateToken(user.id);

        return { token, expiration, user };
      }

      throw new ClientSafeError("Incorrect Password", 403, "AUTH_ERROR");
    } catch (err) {
      throw new ClientSafeError(
        "Incorrect Email or Password",
        403,
        "AUTH_ERROR"
      );
    }
  }

  @Mutation(() => LoggedIn, { nullable: true })
  async adminLogin(
    @Arg("input") input: AuthValidator,
    @Ctx() ctx: MyContext
  ): Promise<{ token: string; expiration: number; user: User }> {
    try {
      const user = await ctx.em.findOneOrFail(User, { email: input.email });

      if (!user.admin)
        throw new ClientSafeError("Not Authorized", 403, "AUTH_ERROR");

      if (await verify(user.password, input.password)) {
        const { token, expiration } = generateAdminToken(user.id);

        return { token, expiration, user };
      }

      throw new ClientSafeError("Incorrect Password", 403, "AUTH_ERROR");
    } catch (err) {
      throw new ClientSafeError(
        "Incorrect Email or Password",
        403,
        "AUTH_ERROR"
      );
    }
  }
}
