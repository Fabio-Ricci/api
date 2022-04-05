import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Vaccine } from '../vaccine/vaccine.entity';

@Entity()
export class VaccineType {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  name: string;

  @OneToMany(() => Vaccine, (vaccine) => vaccine.vaccineType)
  vaccines: Vaccine[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Vaccine Type with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Vaccine  Type with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Vaccine  Type with id', this.id);
  }
}
