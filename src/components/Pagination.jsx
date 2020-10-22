import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.section`
  margin-left: 4vw;
`;

const Pagination = (props) => {
  const { page, atStart, atEnd, pages, changePage } = props;
  return (
    <PaginationContainer>
      <button
        disabled={atStart}
        onClick={() => {
          changePage(page - 1);
        }}
      >
        {'<'}
      </button>
      {pages.map((singlePage) => (
        <button
          key={singlePage}
          onClick={() => {
            changePage(singlePage);
          }}
          className={page === singlePage ? 'button-background' : null}
        >
          {singlePage}
        </button>
      ))}
      <button
        disabled={atEnd}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        {'>'}
      </button>
    </PaginationContainer>
  );
};

export default Pagination;
