import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/configs";

interface ListUsers {
    data: User[];
}

interface User {
    rut: string;
    nombre: string;
    apellido: string;
    celular: number;
    eva3: null | number;
}

export const UsersTable = () => {
    const loaded = useRef(false);

    const [users, setUsers] = useState<User[]>([]);

    const { loading, error, succes, bodySet } = useFetch(API_URL);
    const getUsers = async () => {
        const fetchResponse = await bodySet();
        if (fetchResponse.status === 200) {
            const data: ListUsers = await fetchResponse.json();
            setUsers(data.data);
        }
    };

    useEffect(() => {
        if (!loaded.current) {
            getUsers();
            loaded.current = true;
        } // eslint-disable-next-line
    }, []);

    const renderTable = () => {
        return (
            <DataTable className="min-w-[40rem]" value={users} showGridlines>
                <Column field="rut" header="RUT"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="apellido" header="Apellido"></Column>
                <Column field="celular" header="Celular"></Column>
                <Column field="eva3" header="EVA3"></Column>
            </DataTable>
        );
    };

    const reload = () => {
        getUsers();
    };

    return (
        <div className="flex flex-col bg-gray-300 rounded-2xl border-2 shadow-2xl gap-3 p-8 m-16">
            <div className="flex justify-center">
                <div className="flex max-w-7xl">
                    {loading && <h1>Loading...</h1>}
                    {error && <h1>Error</h1>}
                    {succes && !!!loading && renderTable()}
                </div>
            </div>
            <div className="flex justify-center p-10">
                <Button
                    label="Reload"
                    icon="pi pi-replay"
                    loading={loading}
                    onClick={reload}
                />
            </div>
        </div>
    );
};

export default UsersTable;
