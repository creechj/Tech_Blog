// const editPost = async (id) => {
//   const response = await fetch("/api/users/dashboard", {
//     method: "PUT",
//     body: JSON.stringify({ username, password }),
//     headers: { "Content-Type": "application/json" },
//   });
//   document.location.replace("/dashboard");
// };

const deletePost = async (id) => {
  const response = await fetch("/dashboard", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  }).then(window.location.replace('/dashboard'));
};