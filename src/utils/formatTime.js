export const formatTime = (created_at) => {
  const diff = Date.now() - new Date(created_at).getTime();
  if (diff > 2678400000) {
    return `on ${created_at.substring(0, 10)}`;
  } else if (diff > 86400000) {
    return `${Math.floor(diff / 86400000)} days ago`;
  } else if (diff > 3600000) {
    return `${Math.floor(diff / 3600000)} hours ago`;
  } else {
    return `${Math.floor(diff / 60000)} minutes ago`;
  }
};
