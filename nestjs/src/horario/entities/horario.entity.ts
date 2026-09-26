import { Column, PrimaryGeneratedColumn, Entity,ManyToOne,JoinColumn } from "typeorm";

@Entity('horario')
export class horario{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'time'})
    hora_entrada: string;

    @Column({type: 'time'})
    hora_salida: string;

    @Column({type: 'int'})
    tolerancia: number;

}