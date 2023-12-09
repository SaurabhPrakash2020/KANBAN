import React, { useState, useEffect } from 'react';
import KanbanLabels from './KanbanLabels';
import KanbanCards from './KanbanCards';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [group, setGroup] = useState('status');
  const [sort, setSort] = useState('priority');
  const [sortOrder, setSortOrder] = useState('desc');
  const [Users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      const ticketsArray = data.tickets || [];
      const userarray=data.users || [];
      setUsers(userarray);
      setTickets(ticketsArray);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="kanban-board">
      <KanbanLabels
        group={group}
        sort={sort}
        sortOrder={sortOrder}
        setGroup={setGroup}
        setSort={setSort}
        toggleSortOrder={toggleSortOrder}
      />
      <KanbanCards tickets={tickets} group={group} sort={sort} sortOrder={sortOrder} Users={Users}/>
    </div>
  );
};

export default KanbanBoard;
