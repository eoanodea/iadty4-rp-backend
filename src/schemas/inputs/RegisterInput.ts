import { InputType, Field } from 'type-graphql';

/**
 * The input for registering a user
 */
@InputType()
export class RegisterInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}
