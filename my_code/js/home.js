/// massger show
// 'error'
function showMessage(message, type = "success") {
  const messageContainer = document.getElementById("messageContainer");
  const messageText = document.getElementById("messageText");
  const messageTimer = document.getElementById("messageTimer");

  messageText.innerText = message;
  messageContainer.className = type;
  messageContainer.style.display = "block";

  messageTimer.style.animation = "none";
  setTimeout(() => {
    messageTimer.style.animation = "";
  }, 10);

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 5000);
}

let image_url = localStorage.getItem("profile_pic");
if (image_url) {
  document.getElementById("user_profile_photo").src = image_url;
} else {
  document.getElementById("user_profile_photo").src =
    "dist/img/avatars/user-image.png";
}

/// setting part stat
function setting_1(event) {
  event.preventDefault();
  const name =
    localStorage.getItem("first_name") +
    " " +
    localStorage.getItem("last_name");
  document.getElementById("user_name").innerText = name;
  if (image_url) {
    document.getElementById("user_profile_photo2").src = image_url;
  } else {
    document.getElementById("user_profile_photo2").src =
      "dist/img/avatars/user-image.png";
  }
}

/// setting part end

// logout
function logout(event) {
  event.preventDefault();
  const refresh = localStorage.getItem("refresh");
  localStorage.clear();
  const info = {
    refresh,
  };
  fetch("http://127.0.0.1:8000/auth/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location.href = `sign-in.html`;
    })
    .catch((error) => {
      window.location.href = `sign-in.html`;
    });
}

// logput

// profile data statt

function profile_data(event) {
  event.preventDefault();
  const access = localStorage.getItem("access");

  fetch("http://127.0.0.1:8000/profile/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.profile) {
        let fn = data.profile.first_name;
        let ln = data.profile.last_name;
        let pic = data.profile.profile_picture;
        document.getElementById("firstName").value = fn;
        document.getElementById("lastName").value = ln;
        document.getElementById("photo_in_my_acc").src = pic;
      } else {
        // window.location.href = `index.html`;
      }
    })
    .catch((error) => {
      window.location.href = `index.html`;
    });
}

// profile data end

// submit profile data to change start

function profile_data_update(event) {
  event.preventDefault();
  const access = localStorage.getItem("access");

  if (
    document.getElementById("photo_in_my_acc").src ==
    localStorage.getItem("profile_pic")
  ) {
    let image_url = localStorage.getItem("profile_pic");
    let first_name = document.getElementById("firstName").value;
    let last_name = document.getElementById("lastName").value;
    const info = {
      image_url,
      first_name,
      last_name,
    };

    fetch("http://127.0.0.1:8000/profile/update/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 1) {
          localStorage.setItem("first_name", first_name);
          localStorage.setItem("last_name", last_name);

          document.getElementById("firstName").value = first_name;
          document.getElementById("lastName").value = last_name;

          showMessage("Your profile has been successfully updated.");
        } else {
          console.log(2);
          showMessage(
            "An error occurred. Your profile was not updated.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.log(3);
        showMessage(
          "An error occurred. Your profile was not updated.",
          "error"
        );
      });
  } else {
    console.log("call");
    const image = document.getElementById("fileInput").files[0];
    const formData = new FormData();
    formData.append("image", image);
    const apiKey = "8fd0dea37bef163ec5e52f7b7748398e";
    const apiUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let profile_pic = data.data.url;

          ///

          let image_url = profile_pic;
          let first_name = document.getElementById("firstName").value;
          let last_name = document.getElementById("lastName").value;

          const info = {
            image_url,
            first_name,
            last_name,
          };

          fetch("http://127.0.0.1:8000/profile/update/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(info),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status == 1) {
                localStorage.setItem("first_name", first_name);
                localStorage.setItem("last_name", last_name);

                document.getElementById("firstName").value = first_name;
                document.getElementById("lastName").value = last_name;

                showMessage("Your profile has been successfully updated.");
              } else {
                console.log(2);
                showMessage(
                  "An error occurred. Your profile was not updated.",
                  "error"
                );
              }
            })
            .catch((error) => {
              console.log(3);
              showMessage(
                "An error occurred. Your profile was not updated.",
                "error"
              );
            });
        } else {
          let image_url = localStorage.getItem("profile_pic");
          let first_name = document.getElementById("firstName").value;
          let last_name = document.getElementById("lastName").value;
          const info = {
            image_url,
            first_name,
            last_name,
          };

          fetch("http://127.0.0.1:8000/profile/update/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${access}`,
              "content-type": "application/json",
            },
            body: JSON.stringify(info),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status == 1) {
                localStorage.setItem("first_name", first_name);
                localStorage.setItem("last_name", last_name);

                document.getElementById("firstName").value = first_name;
                document.getElementById("lastName").value = last_name;

                showMessage("Your profile has been successfully updated.");
              } else {
                console.log(2);
                showMessage(
                  "An error occurred. Your profile was not updated.",
                  "error"
                );
              }
            })
            .catch((error) => {
              console.log(3);
              showMessage(
                "An error occurred. Your profile was not updated.",
                "error"
              );
            });
        }
      })
      .catch((error) => {
        let image_url = localStorage.getItem("profile_pic");
        let first_name = document.getElementById("firstName").value;
        let last_name = document.getElementById("lastName").value;
        const info = {
          image_url,
          first_name,
          last_name,
        };

        fetch("http://127.0.0.1:8000/profile/update/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${access}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(info),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status == 1) {
              localStorage.setItem("first_name", first_name);
              localStorage.setItem("last_name", last_name);

              document.getElementById("firstName").value = first_name;
              document.getElementById("lastName").value = last_name;

              showMessage("Your profile has been successfully updated.");
            } else {
              console.log(2);
              showMessage(
                "An error occurred. Your profile was not updated.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.log(3);
            showMessage(
              "An error occurred. Your profile was not updated.",
              "error"
            );
          });
      });
  }
}

// submit profile dta to change end
