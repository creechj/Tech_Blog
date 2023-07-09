const dashboardHandler = async (event) => {
  const response = await fetch("/api/users/dashboard", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Not working');
  }
};

document.querySelector("#dashboard").addEventListener("click", dashboardHandler);
