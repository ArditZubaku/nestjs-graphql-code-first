import { Injectable, Scope } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Flavor } from '../entities/flavor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Coffee } from '../entities/coffee.entity';

@Injectable({ scope: Scope.REQUEST })
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> // <id, return>
{
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>
  ) {
    super((keys) => this.batchLoadFn(keys), { cache: true });
  }

  // batchLoadFn(keys: readonly number[]): PromiseLike<ArrayLike<Flavor[] | Error>> {
  private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
    const coffeesWithFlavours = await this.coffeeRepository.find({
      select: ["id"],
      where: {
        id: In(coffeeIds)
      },
      relations: {
        flavors: true,
      },
    })

    // to map an array of coffees to a 2D arr of flavors
    // where each pos in the arr indicates to which coffee flavor it belongs
    return coffeesWithFlavours.map((coffee) => coffee.flavors!)
  }

}
