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
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("last_name", data.last_name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("profile_id", data.profile_id);
        localStorage.setItem("profile_pic", data.profile_pic);

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
