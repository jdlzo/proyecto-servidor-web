import { Entity,Column,PrimaryGeneratedColumn,Unique,ManyToOne,JoinColumn } from "typeorm";
import { usuario } from "../../usuario/entities/usuario.entity.js";

@Entity('asistencia')
@Unique(['usuarioid','fecha'])
export class asistencia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    usuarioid: number;

    @Column({type: 'date'})
    fecha: string;

    @Column({type: 'time'})
    hora_entrada: string;

    @Column({type: 'time'})
    hora_salida: string;

    @Column({type: 'varchar', length: 20})
    estado: string;

    @ManyToOne(() => usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuarioid' })
    usuario: usuario;
}