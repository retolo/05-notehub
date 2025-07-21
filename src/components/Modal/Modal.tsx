import { createPortal } from 'react-dom'
import css from './Modal.module.css'
import NoteForm from '../NoteForm/NoteForm'
import type React from 'react'
import { useEffect } from 'react'
import { type ReactNode } from 'react'
interface ModalProps{
    onClose: () => void
    isOpen: boolean  
}

type ModalChildrenProps = {
    children: ReactNode;
  };

const BoxModal = ({children}: ModalChildrenProps) =>{
    return(
        <div className={css.modal} >

        {children}         
    </div>
    )
    
    
}

export default function Modal({onClose, isOpen}: ModalProps){

    

    const handleClickBackDrop = (event: React.MouseEvent<HTMLDivElement>) =>{
        if(event.target == event.currentTarget){
            onClose();
        }
    }

    useEffect(() =>{
        const handleKeyDown = (event: KeyboardEvent) =>{
            if(event.key === 'Escape'){
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () =>{
            document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        }
    }, [onClose])
   
    if(!isOpen){
        return null;
    }

    




    return(
        createPortal(
            <div
            onClick={handleClickBackDrop}
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            >
                <BoxModal >
                    <NoteForm  onClose={onClose}/>
                </BoxModal>
            </div>,

    document.body
)
    )
    
}