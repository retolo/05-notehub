import css from './NoteList.module.css'
import { fetchNotesCard, deleteNote } from '../../services/noteService'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'




interface NoteProps{
    id: number
    tag: string
    content: string
    title: string
}

interface Note{
    notes?: NoteProps[]
    
}
export default function NoteList({notes}: Note){
    const {data} = useQuery({
        queryKey:['cardNotes'],
        queryFn: fetchNotesCard,
        placeholderData: keepPreviousData,
        enabled: !notes
        
    })

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['notes']})
            queryClient.invalidateQueries({queryKey: ['cardNotes']})
        }
        
    })

    const handleDeleteTask = (notes: NoteProps) =>{
        mutation.mutate(notes)
    }

    const finalNotes = notes && notes.length > 0 ? notes : data ?? [];

    return (
        <ul className={css.list}>
            
            {
                finalNotes.map((card) => (
                    <li className={css.listItem} key={`card-${card.id}`}>
                        <h2 className={css.title}>{card.title}</h2>
                        <p className={css.content}>{card.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{card.tag}</span>
                            <button onClick={() => handleDeleteTask(card)} className={css.button}>Delete</button>
                        </div>
                    </li>
                ))}

            
        </ul>

        
    )
}