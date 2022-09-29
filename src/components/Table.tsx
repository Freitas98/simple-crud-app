import Client from "../core/Client"
import { editIcon, trashIcon } from "./icons"

interface TableProps {
    clients: Client[]
    clientSelected?: (client: Client) => any
    clientDeleted?: (client: Client) => any
}

export default function Table(props: TableProps) {
    
    const showActions = props.clientSelected || props.clientDeleted;

    function renderTableHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {showActions ? <th className="text-center p-4">Ações</th> : false}
            </tr>
        )
    }

    function renderData() {
        return props.clients?.map((client, i) => (
            <tr key={client.id} 
                className={`${i % 2 === 0 ? "bg-purple-200" : "bg-purple-100"}`}>
                <td className="text-left p-4">{client.id}</td>
                <td className="text-left p-4">{client.name}</td>
                <td className="text-left p-4">{client.age}</td>
                {showActions ? renderActions(client) : false}
            </tr>
        ))
    }

    function renderActions(client: Client) {
        return (
            <td className="flex justify-center">
                {props.clientSelected ? (
                    <button 
                        onClick={() => props.clientSelected?.(client)}
                        className={`
                            flex justify-center items-center
                            text-green-600 rounded-full p-2 m-1
                            hover:bg-purple-50
                        `}
                    >
                        {editIcon}
                    </button>
                ) : false}
                {props.clientDeleted ? (
                    <button 
                        onClick={() => props.clientDeleted?.(client)}
                        className={`
                            flex justify-center items-center
                            text-red-500 rounded-full p-2 m-1
                            hover:bg-purple-50
                        `}
                    >
                        {trashIcon}
                    </button>
                ) : null}
            </td>
        )
    }
    
    return (
        <table className={`
           w-full rounded-xl overflow-hidden
        `}>
            <thead className={`
                 bg-gradient-to-tr from-purple-500 to-purple-800
                 text-gray-100
            `}>
                {renderTableHeader()}
            </thead>
            <tbody className={`

            `}>
                {renderData()}
            </tbody>
        </table>
    )
}