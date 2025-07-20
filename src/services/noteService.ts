import axios from "axios";
import { type Tasks } from "../types/note";



interface FetchNotesProps{
    notes: Tasks[]
    totalPages: number
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

export const fetchNotesCard = async (pageQuery: number): Promise<FetchNotesProps> => {
    const mykey = import.meta.env.VITE_NOTEHUB_TOKEN
    const response = await axios.get<FetchNotesProps>(
        'https://notehub-public.goit.study/api/notes',
        {
            params:{
                page: pageQuery
            },
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
        
    );
    
    return response.data

}

export const  createNote = async (newTask: object) => {
    const mykey = import.meta.env.VITE_NOTEHUB_TOKEN;
    const response = await axios.post(
        `https://notehub-public.goit.study/api/notes/`, newTask,
        {
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }

    )
    return response.data
}

export const  deleteNote = async (note: Tasks) =>{
    const mykey = import.meta.env.VITE_NOTEHUB_TOKEN;
    const response = await axios.delete(
        `https://notehub-public.goit.study/api/notes/${note.id}`,
        {
            headers:{
                accept: 'application/json',
                Authorization: `Bearer ${mykey}`
            }
        }
    )
    return response.data
    
}