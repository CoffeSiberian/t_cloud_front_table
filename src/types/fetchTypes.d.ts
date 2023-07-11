export interface FetchOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: { [key: string]: string };
    body?: string;
}

export interface headers {
    [key: string]: string;
}
