import css from './SearchBox.module.css'
import style from '../NoteList/NoteList.module.css'
import { fetchNotes } from '../../services/noteService'
import { useDebouncedCallback } from 'use-debounce'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import React, { useState } from 'react'
export default function SearchBox(){

    const [searchQuery, setSearchQuery] = useState('');

    const {data} = useQuery({
        queryKey: ['notes', searchQuery],
        queryFn: () => fetchNotes(searchQuery),
        placeholderData: keepPreviousData,
        enabled: searchQuery !== ''
    })

    const updateSearchQuery = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value.trim()), 300
    )
    return(
        <>
            <input
                className={css.input}
                type="text"
                placeholder="Search notes"
                defaultValue={searchQuery}
                onChange={updateSearchQuery}
            />
            {data !== undefined && data?.length > 1 && (

                <ul className={style.list}>
                    {data.map((note) =>(
                        <li className={style.listItem} key={note.id}>
                            <h2 className={style.title}>{note.title}</h2>
                            <p className={style.content}>{note.content}</p>
                            <div className={style.footer}>
                                <span className={style.tag}>{note.tag}</span>
                                <button className={style.button}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
        

    )
}