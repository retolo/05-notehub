import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
// import { fetchNotesCard } from '../../services/noteService'
import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox'
import  { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes} from '../../services/noteService'
import Pagination from '../Pagination/Pagination'
export default function App(){
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const {data} = useQuery({
        queryKey: ['notes', searchQuery],
        queryFn: () => fetchNotes({searchText: searchQuery}),
        placeholderData: keepPreviousData,
        enabled: searchQuery !== '',
        
        
    })

    const {data: cardNotes} = useQuery({
        queryKey: ['cardNotes', currentPage],
        queryFn: () => fetchNotes({pageQuery: currentPage}),
        placeholderData: keepPreviousData,
        enabled: !data,
        
        
    })

    const totalPages = cardNotes?.totalPages ?? 0;
    console.log(totalPages);

    const handleCloseModal = () =>{
        setIsModalOpen(false)
    }
    return(
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox  onChange={setSearchQuery}/>
                <button type='button' onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>

                
            </header>
            {searchQuery === '' 
                ? <NoteList notesCard={cardNotes?.notes} />
                : <NoteList  notes={data?.notes}/>
                
            }
            {totalPages !== undefined && totalPages > 1 &&
                <Pagination pageCount={totalPages} forcePage={currentPage} onPageChange={setCurrentPage}/>

            }
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}/>
            
            
        </div>

    )
}