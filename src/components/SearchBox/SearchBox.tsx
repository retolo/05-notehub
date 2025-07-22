import css from './SearchBox.module.css'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBoxProps{
    onChange: (searchQuery: string) => void
    onSubmit: (query: string) => void
}

export default function SearchBox({onChange, onSubmit}: SearchBoxProps){
    const updateSearchQuery = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value.trim()), 1000
    )

    const handleInput = (formData: FormData) =>{
        const inputValue = formData.get('query');

        if(inputValue === ''){
            onSubmit(inputValue);
        }

    }
    
    return(
        <form action={handleInput}>
            <input
                className={css.input}
                type="text"
                placeholder="Search notes"
                onChange={updateSearchQuery}
                name='query'
            />
        </form>
            
        
        
        

    )
}