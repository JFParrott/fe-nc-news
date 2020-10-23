import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.section`
  margin-left: 4vw;
`;

const PageButton = styled.button`
  height: 25px;
  width: 25px;
  border-radius: 3px;
`;

const Pagination = (props) => {
  const { page, atStart, atEnd, pages, changePage } = props;
  return (
    <PaginationContainer>
      <PageButton
        disabled={atStart}
        onClick={() => {
          changePage(page - 1);
        }}
      >
        {'<'}
      </PageButton>
      {pages.map((singlePage) => (
        <PageButton
          key={singlePage}
          onClick={() => {
            changePage(singlePage);
          }}
          className={page === singlePage ? 'button-background' : null}
        >
          {singlePage}
        </PageButton>
      ))}
      <PageButton
        disabled={atEnd}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        {'>'}
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
