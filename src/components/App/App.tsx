import css from './App.module.css'
import NoteList from '../NoteList/NoteList'
import { useDebounce } from 'use-debounce'
import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox'
import  { useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { fetchNotes} from '../../services/noteService'
import Pagination from '../Pagination/Pagination'
import NoteForm from '../NoteForm/NoteForm'
export default function App(){
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [debouncedSearch] = useDebounce(searchQuery, 1000)
    const {data} = useQuery({
        queryKey: ['notes', debouncedSearch, currentPage],
        queryFn: () => fetchNotes({
            ...(debouncedSearch.trim() ? {searchText: debouncedSearch}: {}),
            pageQuery: currentPage
        }),
        placeholderData: keepPreviousData,
        
        
        
    })

    const handleResetPage = (newQuery: string) =>{
        setSearchQuery(newQuery);
        setCurrentPage(1);

    }

   
    

    const totalPages = data?.totalPages ?? 0;
    console.log(totalPages);

    const handleCloseModal = () =>{
        setIsModalOpen(false)
    }
    return(
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox onSubmit={handleResetPage} onChange={setSearchQuery}/>
                <button type='button' onClick={() => setIsModalOpen(true)} className={css.button}>Create note +</button>

                
            </header>
            {data?.notes &&
                <NoteList notes={data?.notes}/>
            }
            {totalPages !== undefined && totalPages > 1 &&
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageSelect={setCurrentPage}/>

            }
            
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <NoteForm onClose={handleCloseModal}/>

                </Modal>
            )}
            
            
        </div>

    )
}