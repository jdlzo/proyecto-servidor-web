import { Column, PrimaryGeneratedColumn, Entity,ManyToOne,JoinColumn } from "typeorm";
import {rol} from "../../rol/entities/rol.entity.js"
import {horario} from "../../horario/entities/horario.entity.js"
@Entity('usuario')
export class usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 10, unique: true })
    cedula: string;

    @Column({ type: 'varchar', length: 100 })
    nombreuser: string;

    @Column({ type: 'varchar', length: 100 })
    apellido: string;

    @Column({ type: 'varchar', length: 255 })
    contrasena: string;

    @Column({ type: 'varchar', length: 100 })
    cargo: string;

    @Column({ type: 'boolean', default: true })
    estado: boolean;

    @Column({ type: 'int', nullable: true })
    rolid: number;

    @Column({ type: 'int', nullable: true })
    horarioid: number;


    @ManyToOne(() => rol, { onDelete: 'RESTRICT' })
    @JoinColumn({ name: 'rolid' })
    rol: rol;


    @ManyToOne(() => horario, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'horarioid' })
    horario: horario;
}