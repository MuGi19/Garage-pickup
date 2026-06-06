import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'bookings' })
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  carMake: string;

  @Column()
  carModel: string;

  @Column('int')
  year: number;

  @Column()
  location: string;

  @Column()
  service: string;

  @CreateDateColumn()
  createdAt: Date;
}
