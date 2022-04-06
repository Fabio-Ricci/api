import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  AfterRemove,
  AfterUpdate,
  AfterInsert,
  Entity,
} from 'typeorm';

import { Clinic } from '../clinic/clinic.entity';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Clinic, (clinic) => clinic, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic;

  @Column()
  name: string;

  @Column({ name: 'calendar_type' })
  calendarType: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Calendar with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Calendar with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Calendar with id', this.id);
  }
}
