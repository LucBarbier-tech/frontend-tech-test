import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../store/rootReducers';
import { getCharactersRequestAction } from '../../pages/CharacterPage/modules/slice';

export const Pagination = () => {
  const dispatch = useDispatch();

  const limit = useSelector((state: TRootState) => state.characters?.limit);
  const total = useSelector((state: TRootState) => state.characters?.total);
  const offset = useSelector((state: TRootState) => state.characters?.offset);
  const name = useSelector((state: TRootState) => state.characters?.queryName);
  const loading = useSelector((state: TRootState) => state.characters?.loading);

  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.floor((offset - 1) / total + 1);

  const handlePageClick = (event: { selected: number }) => {
    dispatch(
      getCharactersRequestAction({
        name: name.trim().toLowerCase(),
        targetPage: event.selected,
      }),
    );
  };

  return (
    <>
      <div
        className="pagination-container"
        style={{ opacity: loading ? 0 : 1 }}
      >
        <ReactPaginate
          activeClassName={'pagination-item pagination-active '}
          breakLabel={'...'}
          breakClassName={'pagination-item break-me '}
          containerClassName={'pagination-inner-container'}
          marginPagesDisplayed={2}
          nextClassName={'pagination-item pagination-next '}
          forcePage={currentPage}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          pageClassName={'pagination-item pagination-page '}
          pageRangeDisplayed={2}
          previousClassName={'pagination-item pagination-previous'}
        />
      </div>
    </>
  );
};
