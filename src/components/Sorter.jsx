import React from 'react';
import styled from 'styled-components';

const SortContainer = styled.div`
  display: flex;
  justify-content: center;
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

  render() {
    return (
      <SortContainer>
        <label htmlFor="sorter">Sort by:</label>
        <select id="sorter" required onChange={this.handleChange}>
          <option value="">--Select a sort option--</option>
          <option value="created_at" onChange={this.handleChange}>
            Date
          </option>
          <option value="comment_count" onChange={this.handleChange}>
            Comment Count
          </option>
          <option value="votes" onChange={this.handleChange}>
            Votes
          </option>
        </select>
      </SortContainer>
    );
  }
}

export default Sorter;
