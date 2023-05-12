import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "../video/video.entity";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Video, (video) => video.category, {
        nullable: true
    })
    videos: Video[];
}
