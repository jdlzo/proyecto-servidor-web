import { Entity,Column,PrimaryGeneratedColumn,Unique,ManyToOne,JoinColumn } from "typeorm";

@Entity('rol')
export class rol  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 20})
    nombre: string;
}