import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";
import { Drink } from "src/common/interfaces/drink.interface";

// Mark this class as a GQL type
@ObjectType({ description: "Coffee model", implements: () => Drink })
// Mark this class as a table
@Entity()
export class Coffee implements Drink {
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
  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];

  @CreateDateColumn()
  createdAt?: Date;
}
