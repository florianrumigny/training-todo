import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tasks } from "./Tasks";

@Entity()
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  color: string;

  @ManyToMany(() => Tasks, (tasks) => tasks.tags)
  tasks: Tasks[];
}
