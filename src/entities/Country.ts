import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Continent } from "./Continent";
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  emoji!: string;

  @ManyToOne(() => Continent, (continent) => continent.countries)
  @Field(() => Continent, { nullable: true })
  continent!: Continent;
}

@InputType()
export class CountryCreateInput {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field()
  emoji!: string;

  @Field(() => ObjectId, { nullable: true })
  continent?: ObjectId;
}
