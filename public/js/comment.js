const checkLogin = () => {
  const logoutCheck = document.getElementById('logout');
  if (typeof(logoutCheck) != 'undefined' && logoutCheck != null) {
    document.querySelectorAll("button.addbtns").forEach(btn => btn.style.display = '');
  }
};

const newComment = (id) => {
  document.getElementById(`title-${id}`).style.display = "none";
  document.getElementById(`comment-${id}`).style.display = "";
  createComment(id);
};

const getRefresh = async () => {
  const response = await fetch("/", {
    method: "GET",
  }).then(document.location.reload());
};

const createComment = (id) => {
  document
    .getElementById(`postbtn-${id}`)
    .addEventListener("click", async () => {
      const addedComment = document.getElementById(`body-${id}`).value;

      const response = fetch("/", {
        method: "POST",
        body: JSON.stringify({ comment_body: addedComment, blog_id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        if (!response.ok) {
          alert("must login to comment");
        } else {
          getRefresh();
        }
      });
    });
};

checkLogin();
