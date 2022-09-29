import Button from "../components/Button";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Table from "../components/Table";
import useClients from "../hooks/useClients";
import useTableOrForm from "../hooks/useTableOrForm";

export default function Home() {

  const { client, clients, tableVisible, saveClient, showTable, selectClient, deleteClient, newClient } = useClients()

  return (
    <div className={`
      h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      flex items-center justify-center
      text-white
    `}>
      <Layout title="Registo de informações">
        {tableVisible ? (
          <>
            <div className="flex justify-end">
              <Button className={`mb-4`} color="green"
                onClick={newClient}
              >
                Novo Cliente
              </Button>
            </div>
            <Table 
              clients={clients}
              clientDeleted={deleteClient} 
              clientSelected={selectClient}
            />
          </>
        ) : (
          <Form 
            client={client}
            onClientChange={saveClient}
            canceled={showTable}
          />
        )}
        
      </Layout>
    </div>
  )
}
