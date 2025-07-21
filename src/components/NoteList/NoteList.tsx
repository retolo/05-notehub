import css from './NoteList.module.css'
import { deleteNote } from '../../services/noteService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type Note } from '../../types/note'
interface NoteListProps{
    notes?: Note[]
    notesCard?: Note[]
    
}
type idNote = Note['id']

export default function NoteList({notes, notesCard}: NoteListProps){
    

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () =>{
            queryClient.invalidateQueries({queryKey: ['notes']})
            queryClient.invalidateQueries({queryKey: ['cardNotes']})
        }
        
    })

    const handleDeleteTask = (id: idNote) =>{
        mutation.mutate(id)
    }

    const finalNotes = notes && notes.length > 0 ? notes : notesCard;

    return (
        <>
        <ul className={css.list}>
            {finalNotes !== undefined &&
                finalNotes.map((card) =>(
                    <li className={css.listItem} key={`card-${card.id}`}>
                            <h2 className={css.title}>{card.title}</h2>
                            <p className={css.content}>{card.content}</p>
                            <div className={css.footer}>
                                <span className={css.tag}>{card.tag}</span>
                                <button onClick={() => handleDeleteTask(card.id)} className={css.button}>Delete</button>
                            </div>
                        </li>
                ))
            
            }

        </ul>
        
        
        </>
        
        
    )
}