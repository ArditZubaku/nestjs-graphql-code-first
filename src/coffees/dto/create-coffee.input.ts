import { Field, InputType } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { CoffeeType } from "src/common/enums/coffee-type.enum";

@InputType({ description: "Create coffee input object type" })
export class CreateCoffeeInput {
  @Field(() => String, { description: "A new coffee name" })
  @MinLength(3)
  name: string;
  brand: string;
  flavors: string[];
  type: CoffeeType;
}
