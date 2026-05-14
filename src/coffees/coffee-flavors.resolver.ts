import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { FlavorsByCoffeeLoader } from './data-loader/flavors-by-coffee.loader';

// Declare which is the parent class
@Resolver(() => Coffee)
export class CoffeeFlavorsResolver {
  constructor(
    // @InjectRepository(Flavor)
    // private readonly flavorsRepository: Repository<Flavor>,
    private readonly flavorsByCoffeeLoader: FlavorsByCoffeeLoader
  ) { }

  @ResolveField(() => [Flavor], { name: "flavors" })
  async getFlavorsOfACoffee(@Parent() coffee: Coffee) {
    return this.flavorsByCoffeeLoader.load(coffee.id)
    // return this.flavorsRepository
    //   .createQueryBuilder("flavor")
    //   .innerJoin(
    //     "flavor.coffees", "coffees", "coffees.id = :coffeeId",
    //     { coffeeId: coffee.id }
    //   )
    //   .getMany();
  }
}
