import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column()
  email: string;

  @Column({ name: 'hash_password' })
  hash_password: string;

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
