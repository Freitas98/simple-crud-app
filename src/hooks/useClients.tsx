import { useEffect, useState } from "react";
import Client from "../core/Client";
import ClientRepository from "../core/ClientRepository";
import ClientCollection from "../firebase/db/ClientCollection";
import useTableOrForm from "./useTableOrForm";

export default function useClients() {
    const repo: ClientRepository = new ClientCollection();

    const {showForm, showTable, tableVisible} = useTableOrForm();

    const [clients, setClients] = useState<Client[]>([])
    const [client, setClient] = useState<Client>(Client.empty())

    useEffect(getClients, [])
    
    function getClients () {
        repo.getAll().then(allClients => {
            setClients(allClients);
            showTable()
        })
    }

    function selectClient(client: Client) {
        setClient(client)
        showForm()
    }

    async function deleteClient(client: Client) {
        await repo.delete(client);
        getClients();
    }

    function newClient(){
        setClient(Client.empty())
        showForm();
    }

    async function saveClient(client: Client){
        await repo.save(client)
        getClients();
    }

    return {
        client,
        clients,
        tableVisible,
        showTable,
        newClient,
        saveClient,
        deleteClient,
        selectClient,
        getClients
    }
}