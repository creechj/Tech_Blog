const newTemp = document.getElementById('newtemplate');
const newPostBtn = document.getElementById('newpost');

const initPage = () => {
  newTemp.style.visibility = 'hidden';
  newPostBtn.style.visibility = 'visible';
};

const newPost = () => {
  newPostBtn.style.visibility= 'hidden';
  newTemp.style.visibility = 'visible';
}

const createPost = async () => {
  const newTitle = document.getElementById(`createtitle`).value;
  const newBody = document.getElementById(`createbody`).value;

  const respons = await fetch("/dashboard", {
    method: "POST",
    body: JSON.stringify({blog_title: newTitle, blog_body: newBody, user_id: 3}),
    headers: { "Content-Type": "application/json" },
  }).then(window.location.reload());
  initPage();
}

const editPost = async (id) => {
  const newTitle = document.querySelector(`#title-${id}`).value;
  const newBody = document.querySelector(`#body-${id}`).value;

  const response = await fetch("/dashboard", {
    method: "PUT",
    body: JSON.stringify({ blog_title: newTitle, blog_body: newBody, id: id }),
    headers: { "Content-Type": "application/json" },
  }).then(window.location.reload());
};

const deletePost = async (id) => {
  const response = await fetch("/dashboard", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  }).then(window.location.reload());
};

initPage();
document.getElementById('newpost').addEventListener('click', newPost);