import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, QueryDocumentSnapshot, setDoc, SnapshotOptions } from "firebase/firestore";
import Client from "../../core/Client";
import ClientRepository from "../../core/ClientRepository";
import { firestore } from "../config";

export default class ClientCollection implements ClientRepository{
    
    #converter = {
        toFirestore(client: Client) {
            return {
                name: client.name,
                age: client.age
            }
        },
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
            const data = snapshot.data(options)
            return new Client(data.name, data.age, snapshot.id);
        }
    }
    
    async save(client: Client): Promise<Client>{
        if(client?.id){
            try {
                const clientRef = doc(this.#collection(), client.id);

                await setDoc(clientRef, client)

                return client;
            } catch (error) {
                console.log("Erro ao atualizar o documento: ", error)
            }
        } else {
            try {
                const docRef = await addDoc(this.#collection(), client);
                
                const doc = await getDoc(docRef);

                return doc.data();
            } catch (error) {
                console.log("Erro ao adicionar o documento: ", error)
            }
        }
    }

    async delete(client: Client): Promise<void>{
        if(client?.id){ 
            const docRef = doc(this.#collection(), client.id)
            return deleteDoc(docRef)
        }
    }

    async getAll(): Promise<Client[]>{
        const query = await getDocs(this.#collection());
        return query.docs.map(doc => doc.data());
    }

    #collection(){
        return collection(firestore, "clients").withConverter(this.#converter)
    }
}