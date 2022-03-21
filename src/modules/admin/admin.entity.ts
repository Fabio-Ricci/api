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
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  email: string;

  @Column({ name: 'hash_password' })
  hashPassword: string;

  @ManyToOne(() => Clinic, (clinic) => clinic, {
    nullable: true,
  })
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic | null;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Admin with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Admin with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Admin with id', this.id);
  }
}
