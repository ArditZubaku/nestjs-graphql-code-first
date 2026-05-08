import { Resolver, Query } from '@nestjs/graphql';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Tea } from 'src/coffees/entities/tea.entity';
import { Drink } from 'src/common/interfaces/drink.interface';

@Resolver()
export class DrinksResolver {
  @Query(() => [Drink], { name: "drinks" })
  async findAll(): Promise<Drink[]> {
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = "coffee";
    coffee.brand = "brand";

    const tea = new Tea();
    tea.name = "tea"

    return [coffee, tea];
  }
}
