import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./Country";

@Entity()
@ObjectType()
export class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name!: string;

  @OneToMany(() => Country, (country) => country.continent)
  @Field(() => [Country])
  countries!: Country[];
}

@InputType()
export class ContinentCreateInput {
  @Field()
  name!: string;
}
