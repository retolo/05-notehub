import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
// import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox'
import React, { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes} from '../../services/noteService'


export default function App(){
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const {data} = useQuery({
        queryKey: ['notes', searchQuery],
        queryFn: () => fetchNotes(searchQuery),
        placeholderData: keepPreviousData,
        enabled: searchQuery !== ''
    })
    

    

    

    

    const handleCloseModal = () =>{
        setIsModalOpen(false)
    }
    return(
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox setSearchQuery={setSearchQuery}/>
                <button type='button' onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>

                
            </header>
            {searchQuery === '' 
                ? <NoteList />
                : <NoteList  notes={data}/>
                
            }
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
            
            {/* <Pagination/> */}
        </div>

    )
}