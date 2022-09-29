import { useState } from "react";
import Client from "../core/Client";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
    client: Client
    onClientChange?: (client: Client) => void
    canceled?: () => void
}

export default function Form(props: FormProps) {
    const id = props.client?.id;
    
    const [name, setName] = useState(props.client?.name ?? "");
    const [age, setAge] = useState(props.client?.age ?? "");
    
    return (
        <div>
            {id ? (
                <Input 
                    text="Código" 
                    value={id}
                    readonly
                    className="mb-5"
                />
            ) : false }
            <Input 
                text="Name" 
                value={name} 
                onChange={setName}
                className="mb-5"
            />
            <Input 
                text="Idade" 
                value={age} 
                type="number" 
                onChange={setAge}
            />
            <div className="flex justify-end mt-7">
                <Button color="blue" className="mr-2" onClick={() => props.onClientChange?.(new Client(name, +age, id))}>
                    {id ? "Alterar" : "Gravar"}
                </Button>
                <Button onClick={props.canceled}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}