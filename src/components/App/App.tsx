import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
// import Pagination from '../Pagination/Pagination'
import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox'
import { useState } from 'react'



export default function App(){
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    

    const handleCloseModal = () =>{
        setIsModalOpen(false)
    }
    return(
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox />
                <button type='button' onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>

                
            </header>
            <NoteList />
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
            
            {/* <Pagination/> */}
        </div>

    )
}