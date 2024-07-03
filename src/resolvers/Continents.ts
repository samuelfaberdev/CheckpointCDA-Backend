import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Continent, ContinentCreateInput } from "../entities/Continent";

@Resolver(Continent)
export class ContinentResolver {
  @Query(() => [Continent])
  async getContinents() {
    const countries = await Continent.find({
      relations: { countries: true },
    });
    return countries;
  }

  @Mutation(() => Continent)
  async createContinent(
    @Arg("data", () => ContinentCreateInput) data: ContinentCreateInput
  ): Promise<Continent> {
    if (await Continent.findOneBy({ name: data.name })) {
      throw new Error("Continent with that name already exists !");
    }
    const newContinent = new Continent();

    Object.assign(newContinent, data);

    await newContinent.save();

    return newContinent;
  }
}
