export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const now = new Date();

  //Check if the date is today
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    //calculate hours ago
    const minutesAgo = Math.floor((now - date) / (1000 * 60));
    if (minutesAgo > 59) {
      const hoursAgo = Math.floor((now - date) / (1000 * 60 * 60));
      return `${hoursAgo} hrs`;
    }
    return `${minutesAgo} mins`;
  } else {
    const formattedDate = date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
    return formattedDate;
  }
}
