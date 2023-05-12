import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from "typeorm";
import { Category } from "../category/category.entity";

@Entity("videos")
export class Video {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    video_extension: string;

    @Column()
    preview_extension: string;

    @Column({ default: true })
    is_visible: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.videos, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "category_id" })
    category: Category;
}
