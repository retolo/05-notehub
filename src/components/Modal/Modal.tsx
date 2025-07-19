import { createPortal } from 'react-dom'
import css from './Modal.module.css'
import NoteForm from '../NoteForm/NoteForm'

interface ModalProps{
    onClose: () => void
    isOpen: boolean
}


export default function Modal({onClose, isOpen}: ModalProps){
   
    if(!isOpen){
        return null;
    }

    return(
        createPortal(
            <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            >
                <div className={css.modal} >
                    <NoteForm onClose={onClose}/>
                </div>
            </div>,

    document.body
)
    )
    
}