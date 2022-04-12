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

import { Admin } from '../admin/admin.entity';
import { Calendar } from '../calendar/calendar.entity';
import { Vaccine } from '../vaccine/vaccine.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  phoneNumber: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @Column()
  cep: string;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  complement: string;

  @Column()
  number: string;

  @Column({ type: 'real' })
  shipping: number;

  @OneToMany(() => Admin, (admin) => admin.clinic)
  admins: Admin[];

  @OneToMany(() => Vaccine, (vaccine) => vaccine.clinic)
  vaccines: Vaccine[];

  @OneToMany(() => Calendar, (calendar) => calendar.clinic)
  calendars: Calendar[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Clinic with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Clinic with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Clinic with id', this.id);
  }
}
