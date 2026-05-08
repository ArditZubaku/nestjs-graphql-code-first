import { Resolver, Query } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Tea } from 'src/coffees/entities/tea.entity';
import { DrinksResultUnion } from 'src/common/unions/drinks-result.union';

@Resolver()
export class DrinksResolver {
  // @Query(() => [Drink], { name: "drinks" })
  @Query(() => [DrinksResultUnion], { name: "drinks" })
  async findAll(): Promise<typeof DrinksResultUnion[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = "coffee";
    coffee.brand = "brand";

    const tea = new Tea();
    tea.name = "tea"

    return [coffee, tea];
  }
}
