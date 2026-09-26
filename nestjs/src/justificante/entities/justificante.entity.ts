import { Entity,Column,PrimaryGeneratedColumn,Unique,ManyToOne,JoinColumn } from "typeorm";
import {usuario} from "../../usuario/entities/usuario.entity.js"

@Entity('justificante')
export class justificante  {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    usuarioid: number;
    
    @Column({type: 'varchar', length: 255})
        archivo_adjunto: string;
        @Column({type: 'varchar', length:20, default: 'PENDIENTE'})
        estado: string;
        @Column({type:'timestamp'})
        enviado_en: Date;
@ManyToOne(() => usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'usuario_id' })
    usuario: usuario;
}