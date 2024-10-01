import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Tags } from "./Tags";

@Entity()
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToOne(() => Users, (user) => user.tasks, { onDelete: "CASCADE" })
  user: Users;

  @ManyToMany(() => Tags, (tag) => tag.tasks)
  @JoinTable()
  tags: Tags[];
}
