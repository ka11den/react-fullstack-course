export abstract class Mimetype {
    public static video(file: Express.Multer.File, accepted: string[]): boolean {
        const [type, extension] = file.mimetype.split("/");
        return type === "video" && accepted.includes(extension);
    }
    public static image(file: Express.Multer.File, accepted: string[]): boolean {
        const [type, extension] = file.mimetype.split("/");
        return type === "image" && accepted.includes(extension);
    }
}
