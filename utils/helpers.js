module.exports = {
  format_date: (date) => {
    // takes timestamp, pulls individual date components and formats as complete date
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDay());
    return newDate.toLocaleDateString();
  },
  append_titleid: (id) => {
    let titleId = `title-${id}`;
    return titleId;
  },
  append_bodyid: (id) => {
    let titleId = `body-${id}`;
    return titleId;
  },
};
