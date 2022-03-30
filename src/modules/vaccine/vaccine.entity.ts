import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Clinic } from '../clinic/clinic.entity';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  name: string;

  @ManyToOne(() => Clinic, (clinic) => clinic, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Vaccine with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Vaccine with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Vaccine with id', this.id);
  }
}
