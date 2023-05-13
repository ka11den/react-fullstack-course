type Video = {
    id: string;
    title: string;
    description: string;
}

type VideosState = {
    video: Video | null;
    videos: Video[];
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
}

namespace VideoAPI {
    type CreateVideoForm = {
        title: string;
        description: string;
        video: any;
        preview: any;
    }
    type UpdateVideoForm = {
        title?: string;
        description?: string;
    }
}
