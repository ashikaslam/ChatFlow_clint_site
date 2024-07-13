// console.log(refresh);
// const response = fetch("http://127.0.0.1:8000/api/token/refresh/", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(info),
// });
// console.log(response);
// if (response.status === 200) {
//   console.log("valied");
//   // const data = response.data;
//   // console.log(data);
//   // localStorage.setItem("access", data.access);
//   // localStorage.setItem("refresh", data.refresh);
//   //window.location.href = `index.html`;
// } else {
//   const data = response.data;
//   console.log(data);
//   //window.location.href = `sign-in.html`;
// }

const refresh = localStorage.getItem("refresh");
const info = {
  refresh,
};

fetch("http://127.0.0.1:8000/api/token/refresh/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(info),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    if (data.refresh && data.access) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      window.location.href = `index.html`;
    } else {
      window.location.href = `sign-in.html`;
    }
  })
  .catch((error) => {
    window.location.href = `sign-in.html`;
  });
