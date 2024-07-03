import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CountryCreateInput } from "../entities/Country";

@Resolver(Country)
export class CountryResolver {
  @Query(() => [Country])
  async getCountries() {
    const countries = await Country.find({
      relations: { continent: true },
    });
    return countries;
  }

  @Query(() => Country)
  async getCountryByCode(@Arg("code") code: string): Promise<Country> {
    const country = await Country.findOne({
      where: { code },
      relations: { continent: true },
    });

    if (!country) {
      throw new Error("No country with this 'code'");
    }
    return country;
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryCreateInput) data: CountryCreateInput
  ): Promise<Country> {
    if (await Country.findOneBy({ code: data.code })) {
      throw new Error("Country with that code already exists !");
    }
    const newCountry = new Country();

    Object.assign(newCountry, data);

    await newCountry.save();

    return newCountry;
  }
}
