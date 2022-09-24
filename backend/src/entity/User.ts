import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column({ nullable: true })
    token: string;

    @UpdateDateColumn()
    updatedAt: Date
}
