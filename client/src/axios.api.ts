import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type buildSettingsArgs = {
    credentials?: RequestCredentials;
    settings?: {
        headers: Record<string, string>;
    };
    params?: {
        [key: string]: string;
    };
};

function buildSettings({ settings }: buildSettingsArgs): AxiosRequestConfig {
    return {
        ...(settings || {}),
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...((settings && settings.headers) || {})
        }
    };
}

function handleResponse(response: AxiosResponse) {
    if (response.status < 500) {
        return response.data;
    }
}

export const createApiService = (baseUrl: string | undefined) => {
    if (!baseUrl) throw new Error("Service Settings Have Not Provided");

    return {
        get(url: string, settings?: buildSettingsArgs): Promise<any> {
            const requestSettings = buildSettings({});
            const params = new URLSearchParams(settings ? settings.params : {}).toString();

            return axios
                .get(`${baseUrl}${url}?${params}`, {
                    ...requestSettings
                })
                .then(handleResponse);
        },
        post(uri: string, data: unknown): Promise<any> {
            const requestSettings = buildSettings({});
            if (data instanceof FormData) {
                const headers = new Headers(requestSettings.headers as HeadersInit);
                headers.delete("Content-Type");
                (requestSettings.headers as HeadersInit) = headers;
            }

            return axios
                .post(`${baseUrl}${uri}`, data, {
                    ...requestSettings
                })
                .then(handleResponse);
        },
        patch(uri: string, data: unknown): Promise<any> {
            const requestSettings = buildSettings({});

            return axios
                .patch(`${baseUrl}${uri}`, data, {
                    ...requestSettings
                })
                .then(handleResponse);
        },
        delete(uri: string, data?: unknown): Promise<any> {
            const requestSettings = buildSettings({});

            return axios
                .delete(`${baseUrl}${uri}`, {
                    data,
                    ...requestSettings
                })
                .then(handleResponse);
        }
    };
};

export const ApiService = createApiService("http://localhost:8000");
