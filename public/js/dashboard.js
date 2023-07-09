const editPost = async (id) => {
  const newTitle = document.querySelector(`#title-${id}`).value;
  const newBody = document.querySelector(`#body-${id}`).value;

  const response = await fetch("/dashboard", {
    method: "PUT",
    body: JSON.stringify({ blog_title: newTitle, blog_body: newBody, id: id }),
    headers: { "Content-Type": "application/json" },
  }).then(window.location.replace('/dashboard'));
};

const deletePost = async (id) => {
  const response = await fetch("/dashboard", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  }).then(window.location.replace('/dashboard'));
};