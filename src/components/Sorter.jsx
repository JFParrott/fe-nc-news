import React from 'react';
import styled from 'styled-components';

const SortSelect = styled.select`
  margin: 5px 0 5px 7px;
  height: 2.5vh;
  font-size: 1.8vh;
`;

const SortContainer = styled.div`
  margin-left: 7px;
  font-size: 2.3vh;
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
        <label htmlFor="order">Order:</label>
        <select id="order" onChange={this.handleOrderChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </SortContainer>
    );
  }
}

export default Sorter;
