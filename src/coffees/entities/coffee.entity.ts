import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Mark this class as a GQL type
@ObjectType({ description: "Coffee model" })
// Mark this class as a table
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "A unique identifier" })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;
  // if we didn't have the graphql plugin enabled in nest-cli.json
  // we would have to declare each Field like this
  // the plugin does that for us at compile time
  // @Field(() => [String])
  @Column({ type: "json" })
  flavors: string[];
}
