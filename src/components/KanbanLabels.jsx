import React, { useState } from 'react';

const KanbanLabels = ({ group, sort, sortOrder, setGroup, setSort, toggleSortOrder }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  const handleClick = () => {
    setOptionsVisible(true);
  };

  return (
    <div className="label-container" onClick={handleClick}>
      {!optionsVisible && <div>Display ⮟</div>}
      {optionsVisible && (
        <div className="label-div">
          <label>
            Group By:
            <select value={group} onChange={(e) => setGroup(e.target.value)}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </label>
          <label>
            Sort By:
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
          <label>
            Order:
            <select value={sortOrder} onChange={toggleSortOrder}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      )}
    </div>
  );
};

export default KanbanLabels;
