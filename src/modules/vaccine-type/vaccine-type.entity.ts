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

  @Column()
  manufacturer: string;

  @Column()
  product: string;

  @Column({ name: 'min_age_month', nullable: true })
  minAgeMonth: number | null;

  @Column({ name: 'max_age_month', nullable: true })
  maxAgeMonth: number | null;

  @Column()
  sipniId: number;

  @Column()
  description: string;

  @Column({ name: 'sipni_prevenction' })
  sipniPrevenction: string;

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
