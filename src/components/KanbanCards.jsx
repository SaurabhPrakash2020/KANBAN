import React from 'react';
const KanbanCards = ({ tickets, group, sort, sortOrder, Users }) => {
  const groupTickets = () => {
    switch (group) {
      case 'status':
        return groupByStatus();
      case 'user':
        return groupByUser();
      case 'priority':
        return groupByPriority();
      default:
        return [];
    }
  };

  const groupByStatus = () => {
    if (!tickets || !Array.isArray(tickets)) {
      return [];
    }

    const groupedTickets = {};
    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }
      groupedTickets[status].push(ticket);
    });

    return Object.entries(groupedTickets).map(([status, tickets]) => ({
      name: status,
      tickets,
    }));
  };

  const groupByUser = () => {
    const groupedTickets = {};
    tickets.forEach((ticket) => {
      const userId = ticket.userId;
      const user = Users && Users.find((user) => user.id === userId);
      const userName = user ? user.name : `Unknown User (${userId})`;

      if (!groupedTickets[userName]) {
        groupedTickets[userName] = [];
      }
      groupedTickets[userName].push({ ...ticket});
    });

    const userGroups = Object.entries(groupedTickets).map(([userName, tickets]) => ({
      name: userName,
      tickets,
    }));
    return sortByTitle(userGroups);
  };

  const groupByPriority = () => {
    const priorityOrder = {
      'Urgent': 4,
      'High': 3,
      'Medium': 2,
      'Low': 1,
      'No priority': 0,
    };
    const priorityNames = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority',
    };
    const groupedTickets = {};
    tickets.forEach((ticket) => {
      const priority = ticket.priority || 'No priority';
      if (!groupedTickets[priority]) {
        groupedTickets[priority] = [];
      }
      groupedTickets[priority].push(ticket);
    });

    return Object.entries(groupedTickets)
      .sort(([priorityA], [priorityB]) => (priorityOrder[priorityB] || 0) - (priorityOrder[priorityA] || 0))
      .map(([priority, tickets]) => ({
        name: priorityNames[priority] || priority,
        tickets,
      }));
  };

  const sortTickets = (ticketsToSort) => {
    switch (sort) {
      case 'priority':
        return sortByPriority(ticketsToSort);
      case 'title':
        return sortByTitle(ticketsToSort);
      default:
        return ticketsToSort;
    }
  };

  const sortByPriority = (ticketsToSort) => {
    const priorityOrder = {
      'Urgent': 4,
      'High': 3,
      'Medium': 2,
      'Low': 1,
      'No priority': 0,
    };

    return ticketsToSort.slice().sort((a, b) => {
      const priorityA = priorityOrder[a.priority] || 'No priority';
      const priorityB = priorityOrder[b.priority] || 'No priority';
      return sortOrder === 'desc' ? priorityB.localeCompare(priorityA) : priorityA.localeCompare(priorityB);
    });
  };

  const sortByTitle = (ticketsToSort) => {
    return ticketsToSort.slice().sort((a, b) => {
      const titleA = (a.title || '').toLowerCase();
      const titleB = (b.title || '').toLowerCase();
      return sortOrder === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
  };

  return (
    <div className="cards">
      {groupTickets().map((group, i) => (
        <div key={i} className="group">
          <h2>{group.name}</h2>
          <div className="columns">
            {sortTickets(group.tickets).map((ticket) => (
              <div key={ticket.id} className="column">
                <div className="ticket">
                  <p style={{ color: '#808080' }}>{ticket.id}</p>
                  <p style={{ fontWeight: 'bold', fontSize: '13px' }}>{ticket.title}</p>
                  <div style={{ color: '#808080', fontSize: '6px' }}>• Feature Request</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanCards;