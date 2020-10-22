import React from 'react';
import styled from 'styled-components';

const SortSelect = styled.select`
  margin: 3px 0 5px 7px;
  height: 2.5vh;
  font-size: 1.8vh;
  border-radius: 3px;
  @media screen and (max-width: 440px) {
    margin-bottom: 0;
  }
`;

const OrderSelect = styled.select`
  margin: 3px 0 5px 7px;
  height: 2.5vh;
  font-size: 1.8vh;
  border-radius: 3px;
`;

const SortContainer = styled.div`
  margin-left: 4vw;
  font-size: 2vh;
  @media screen and (max-width: 440px) {
    display: flex;
    flex-direction: column;
  }
`;
class Sorter extends React.Component {
  state = {
    sortValue: '',
  };

  handleChange = (e) => {
    const { value } = e.target;
    const { addSort } = this.props;
    addSort(value);
  };

  handleOrderChange = (e) => {
    const { value } = e.target;
    const { addSortOrder } = this.props;
    addSortOrder(value);
  };

  render() {
    return (
      <SortContainer>
        <label htmlFor="sorter">Sort by:</label>
        <SortSelect id="sorter" required onChange={this.handleChange}>
          <option value="">--Select option--</option>
          <option value="created_at" onChange={this.handleChange}>
            Date
          </option>
          <option value="comment_count" onChange={this.handleChange}>
            Comment Count
          </option>
          <option value="votes" onChange={this.handleChange}>
            Votes
          </option>
        </SortSelect>
        <OrderSelect id="order" onChange={this.handleOrderChange}>
          <option value="">--Select order--</option>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </OrderSelect>
      </SortContainer>
    );
  }
}

export default Sorter;
