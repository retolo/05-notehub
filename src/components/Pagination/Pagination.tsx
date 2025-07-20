import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'


interface ReactPaginateProps{
    forcePage: number
    pageCount: number
    onPageChange: (page: number) => void
}

export default function Pagination({forcePage, pageCount, onPageChange}: ReactPaginateProps){
    return(
        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({selected}) => onPageChange(selected + 1)}
            forcePage={forcePage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel='→'
            previousLabel='←'
            renderOnZeroPageCount={null}
            breakLabel={'...'}
        
        />
    )
}