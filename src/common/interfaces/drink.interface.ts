import { Field, InterfaceType } from "@nestjs/graphql";


@InterfaceType()
export abstract class Drink {
  // the nest-cli plugin doesn't introspect .interface files by default
  @Field(() => String)
  name: string;
}
