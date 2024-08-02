const API_BASE_URL = 'https://help-desk-n98w.vercel.app/api';

// Fetch tickets
export const fetchTickets = async (page) => {
  try {
    const response = await fetch(
      `https://help-desk-n98w.vercel.app/api/get-tickets?page=${page}&limit=7`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

// Update ticket status
export const updateTicketStatus = async (id, newStatus) => {
  try {
    const response = await fetch(
      `https://help-desk-n98w.vercel.app/api/update-status/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw error;
  }
};

// Search for a ticket
export const searchTicket = async (query) => {
  try {
    const response = await fetch(
      `https://help-desk-n98w.vercel.app/api/search-ticket/${query}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error searching for ticket:', error);
    throw error;
  }
};

// Filter tickets
export const filterTickets = async (filters) => {
  try {
    const queryParams = new URLSearchParams({
      // Convert status object to JSON string if it's not empty
      status:
        Object.keys(filters.status).length > 0
          ? JSON.stringify(filters.status)
          : '',

      // Ensure orderBy, startDate, and endDate have default values
      orderBy: filters.orderBy || '',
      startDate: filters.startDate || '',
      endDate: filters.endDate || '',
    });

    const response = await fetch(
      `https://help-desk-n98w.vercel.app/api/filter-tickets?${queryParams.toString()}`
    );
    if (!response.ok) throw new Error('Network response was not ok');
    // Parse the JSON response and log it
    const data = await response.json();

    // Return the data
    return data;
  } catch (error) {
    console.error('Error filtering tickets:', error);
    throw error;
  }
};

// Update ticket messages
export const updateMessages = async (id, newMessage) => {
  try {
    const response = await fetch(
      `https://help-desk-n98w.vercel.app/api/update-messages/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessage }),
      }
    );
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response;
    return data;
  } catch (error) {
    console.error('Error updating messages:', error);
    throw error;
  }
};
