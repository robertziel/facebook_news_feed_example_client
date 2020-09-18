const formattedDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toDateString();
};

export default formattedDateTime;
