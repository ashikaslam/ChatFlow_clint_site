function Registration(event) {
  let isValid = true;
  event.preventDefault();
  // Get form data
  let first_name = document.getElementById("firstName").value;
  let last_name = document.getElementById("lastName").value;
  let email = document.getElementById("emailAddress").value;

  // Validate fields
  if (first_name.length < 2) {
    document.getElementById("firstNameError").innerText =
      "First name must be at least 2 characters long";
    document.getElementById("firstNameError").style.display = "block";
    isValid = false;
  }
  if (last_name.length < 2) {
    document.getElementById("lastNameError").innerText =
      "Last name must be at least 2 characters long";
    document.getElementById("lastNameError").style.display = "block";
    isValid = false;
  }
  if (!validateName(first_name)) {
    document.getElementById("firstNameError").innerText =
      "Name must contain only English alphabets (a-z, A-Z)";
    document.getElementById("firstNameError").style.display = "block";
    isValid = false;
  }
  if (!validateName(last_name)) {
    document.getElementById("lastNameError").innerText =
      "Name must contain only English alphabets (a-z, A-Z)";
    document.getElementById("lastNameError").style.display = "block";
    isValid = false;
  }
  if (!validateEmail(email)) {
    isValid = false;
  }

  /// data taking complte
  let info = {
    first_name,
    last_name,
    email,
  };
  console.log(info);
  /// request making
  if (isValid) {
    //  fetch("https://chatflow-1.onrender.com/auth/signup/", {
    fetch("http://127.0.0.1:8000/auth/signup/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => {
        return res.json(); // Explicitly return res.json()
      })

      .then((data) => {
        if ("message" in data) {
          let email = data.email;
          let token1 = data.token1;
          let token2 = data.token2;
          localStorage.setItem("email", email);
          localStorage.setItem("token1", token1);
          localStorage.setItem("token2", token2);
          if (data.status == 1) {
            window.location.href = `otp_verification/index.html`;
          }
          // 'message' property exists, perform your action
        } else {
          let errorString = data.error;
          if (
            errorString ==
            "{'email': [ErrorDetail(string='user with this email already exists.', code='unique')]}"
          ) {
            document.getElementById("emailAddressError").innerText =
              "user with this email already exists.";
            document.getElementById("emailAddressError").style.display =
              "block";
          }
        }
      })

      .catch((err) => {
        console.log("inside err ");
        console.log(err);
        localStorage.clear();
      });
  }
  ///
  return isValid;
}

// extra code
function validateName(name) {
  // Regular expression to match only English alphabets (a-z and A-Z)
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
}

// Function to validate email address
function validateEmail(email) {
  // Regular expression to validate email address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Check if the email field is empty
  if (email === "") {
    document.getElementById("emailAddressError").innerText =
      "This field cannot be empty";
    document.getElementById("emailAddressError").style.display = "block";
    return false;
  }
  // Check if the email address is valid
  else if (!emailRegex.test(email)) {
    document.getElementById("emailAddressError").innerText =
      "Please enter a valid email address";
    document.getElementById("emailAddressError").style.display = "block";
    return false;
  } else {
    document.getElementById("emailAddressError").style.display = "none";
    return true;
  }
}
//////////////////////////////////

function login(event) {
  let isValid = true;
  event.preventDefault();
  let email = document.getElementById("emailAddress1").value;
  // Clear previous error messages
  document.getElementById("emailAddressError").style.display = "none";

  console.log(email);

  if (!validateEmail(email)) {
    isValid = false;
  }

  ///
  /// data taking complte
  let info = {
    email,
  };
  console.log(info);
  /// request making
  if (isValid) {
    fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => {
        return res.json(); // Explicitly return res.json()
      })

      .then((data) => {
        if ("message" in data) {
          if (data.status == 1) {
            let email = data.email;
            let token1 = data.token1;
            let token2 = data.token2;
            localStorage.setItem("email", email);
            localStorage.setItem("token1", token1);
            localStorage.setItem("token2", token2);

            window.location.href = `otp_verification/index.html`;
          } else {
            document.getElementById("emailAddressError").innerText =
              "No user found with this email address.";
            document.getElementById("emailAddressError").style.display = "block";
            isValid = false;
          }
        } else {
          document.getElementById("emailAddressError").innerText =
            "No user found with this email address.";
          document.getElementById("emailAddressError").style.display = "block";
          isValid = false;
        }
      })

      .catch((err) => {
        document.getElementById("emailAddressError").innerText =
          "No user found with this email address.";
        document.getElementById("emailAddressError").style.display = "block";
        isValid = false;
        localStorage.clear();
      });
  }
}
