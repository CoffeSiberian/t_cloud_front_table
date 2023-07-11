import { useState } from "react";
import { getFetch } from "../utils/dataFetch";

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [succes, setSucces] = useState(false);

    const getData = async () => {
        setLoading(true);
        let dataResponse = await getFetch(
            { "Content-Type": "application/json" },
            url
        );

        if (!(await dataResponse.ok)) {
            setError(true);
        } else setSucces(true);
        setLoading(false);
        return dataResponse;
    };
    const bodySet = async () => {
        return await getData();
    };

    return { loading, error, succes, bodySet, setError, setSucces };
};

export default useFetch;
