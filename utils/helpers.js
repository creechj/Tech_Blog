const dayjs = require("dayjs");

module.exports = {
  format_date: (date) => {
    return dayjs(date).format("M/D/YYYY");
  },
  append_titleid: (id) => {
    let titleId = `title-${id}`;
    return titleId;
  },
  append_bodyid: (id) => {
    let titleId = `body-${id}`;
    return titleId;
  },
  append_commentid: (id) => {
    let commentId = `comment-${id}`;
    return commentId;
  },
  append_postbtnid: (id) => {
    let postBtnId = `postbtn-${id}`;
    return postBtnId;
  },
};
