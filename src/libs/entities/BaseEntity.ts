import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({default: true})
    active: boolean;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
    @BeforeInsert()
    insertDate() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    @BeforeUpdate()
    updateDate() {
        this.updatedAt = new Date();
    }

}
