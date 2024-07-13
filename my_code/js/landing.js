const landing = () => {
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");
  const user_id = localStorage.getItem("user_id");
  fetch("http://127.0.0.1:8000/auth/landing/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("inside data");
      console.log(data);
      if (data.status === 1) {
        localStorage.clear();
        localStorage.setItem("user_id", data.user_id);

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("name", data.name);

        window.location.href = `home.html`;
      } else {
        window.location.href = `index2.html`;
      }
    })
    .catch((error) => {
      window.location.href = `index2.html`;
    });
};

landing();
