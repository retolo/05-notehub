import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'


interface ReactPaginateProps{
    forcePage: number
    pageCount: number
    onPageChange: (number: number) => void
}

export default function Pagination({forcePage, pageCount, onPageChange}: ReactPaginateProps){
    return(
        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({selected}) => onPageChange(selected + 1)}
            forcePage={forcePage}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel='→'
            previousLabel='←'
        
        />
    )
}