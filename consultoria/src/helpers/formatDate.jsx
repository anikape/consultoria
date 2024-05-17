export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("pt-BR", options);
};

export const formatDateForm = (dateString) => {
  const date = new Date(dateString);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();
  const day = `0${date.getDate()}`.slice(-2);

  const formatedDate = `${year}-${month}-${day}`;
  return formatedDate;
};
