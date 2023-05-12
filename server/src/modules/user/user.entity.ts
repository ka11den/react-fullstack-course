import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    refreshToken: string;

    @Column({ nullable: true })
    restoreToken: string;

    @Column({ default: false })
    isEmailConfirmed: boolean;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ default: false })
    isPaid: boolean;

    @Column({ default: false })
    isBanned: boolean;

    @Column({ default: "" })
    banReason: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
