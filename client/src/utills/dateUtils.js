export function formatLastActivity(lastActivityTimestamp) {
  const lastActivityDate = new Date(lastActivityTimestamp);
  const currentDate = new Date();

  if (
    lastActivityDate.getFullYear() === currentDate.getFullYear() &&
    lastActivityDate.getMonth() === currentDate.getMonth() &&
    lastActivityDate.getDate() === currentDate.getDate()
  ) {
    // It's today
    const hours = lastActivityDate.getHours();
    const minutes = lastActivityDate.getMinutes();
    return `today at ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  } else {
    // It's a different day
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const hours = lastActivityDate.getHours();
    const minutes = lastActivityDate.getMinutes();
    return `yesterday at ${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }
}

export function formatTime(timestamp) {
  const time = new Date(timestamp);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return `${hours}:${minutes > 9 ? minutes : `0${minutes}`}`;
}
