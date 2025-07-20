import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBarProps{
    setSearchQuery: (searchQuery: string) => void
}

export default function SearchBox({setSearchQuery}: SearchBarProps){
    const updateSearchQuery = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value.trim()), 300
    )
    
    return(
        
            <input
                className={css.input}
                type="text"
                placeholder="Search notes"
                onChange={updateSearchQuery}
            />
        
        
        

    )
}