import axios from "axios";
import { type Tasks } from "../types/note";



interface FetchNotesProps{
    notes: Tasks[]
}
export const fetchNotes = async (searchText: string) => {
    const mykey = import.meta.env.VITE_NOTEHUB_TOKEN
    const response = await axios.get<FetchNotesProps>(
        'https://notehub-public.goit.study/api/notes',
        {
            params:{
                search: searchText,
                
            },
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
        
    );
    return response.data.notes

}

export const fetchNotesCard = async () => {
    const mykey = import.meta.env.VITE_NOTEHUB_TOKEN
    const response = await axios.get<FetchNotesProps>(
        'https://notehub-public.goit.study/api/notes',
        {
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
        
    );
    return response.data.notes

}

export function createNote(){
    
}

export function deleteNote(){
    
}