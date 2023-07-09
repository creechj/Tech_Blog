module.exports = {
  format_date: (date) => {
    // takes timestamp, pulls individual date components and formats as complete date
    let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDay());
    return newDate.toLocaleDateString();
  },
};
