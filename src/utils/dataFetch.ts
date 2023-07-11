import { FetchOptions, headers } from "../types/fetchTypes";

const dataFetch = async (method: "GET", headers: headers, url: string) => {
    const optiosFetch: FetchOptions = {
        method: method,
        headers: headers,
    };

    try {
        return await fetch(url, optiosFetch);
    } catch (err: any) {
        return err.message;
    }
};

const getFetch = async (headers: headers, url: string) => {
    return await dataFetch("GET", headers, url);
};

export { getFetch };
