import css from './NoteList.module.css'
import { fetchNotesCard } from '../../services/noteService'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export default function NoteList(){
    const {data} = useQuery({
        queryKey:['cardNotes'],
        queryFn: fetchNotesCard,
        placeholderData: keepPreviousData
        
    })



    return(
        <>
        {data !== undefined && data?.length > 1 && (
            <ul className={css.list}>
                {data.map((card) =>(
                    <li className={css.listItem} key={card.id}>
                        <h2 className={css.title}>{card.title}</h2>
                        <p className={css.content}>{card.content}</p>
                        <div className={css.footer}>
                            <span className={css.tag}>{card.tag}</span>
                            <button className={css.button}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    
        </>
        

    )
}