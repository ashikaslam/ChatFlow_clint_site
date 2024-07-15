// Function to generate OTP string from input fields
function generateOTP(event) {
  event.preventDefault();
  // Select all input elements of type 'number'
  const inputs = document.querySelectorAll('input[type="number"]');

  // Initialize an empty string to store the OTP
  let otpString = "";

  // Loop through each input element
  inputs.forEach(function (input) {
    // Append the value of each input to the otpString
    otpString += input.value;
  });

  // Log the generated OTP string (you can replace this with your desired action)
  console.log("Generated OTP:", otpString);
  let otp = parseInt(otpString);
  let email = localStorage.getItem("email");
  let token1 = localStorage.getItem("token1");
  let token2 = localStorage.getItem("token2");

  let info = {
    otp,
    email,
    token1,
    token2,
  };
  console.log(info);
  // make request
  if (otp && email && token1 && token2) {
    fetch("http://127.0.0.1:8000/auth/varifi_otp/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => {
        return res.json(); // Explicitly return res.json()
      })

      .then((data) => {
        if ("message" in data && data.status == 1) {
          document.getElementById("otpsuccess").innerText =
            "Congratulations, the OTP has been successfully validated.";
          document.getElementById("otpsuccess").style.display = "block";
          
        localStorage.clear();
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("first_name", data.first_name);
        localStorage.setItem("last_name", data.last_name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("profile_id", data.profile_id);
        localStorage.setItem("profile_pic", data.profile_pic);

          window.location.href = `../home.html`;
        }
         else {
          
          document.getElementById("otpError").innerText =
            "The OTP entered is invalid. Please enter the correct OTP.";
          document.getElementById("otpError").style.display = "block";
        }
      })

      .catch((err) => {
        document.getElementById("otpError").innerText =
          "There was an unknown error. Please Register again later.";
        document.getElementById("otpError").style.display = "block";
        console.log(err);
        localStorage.clear();
      });
  } else {
    document.getElementById("otpError").innerText =
      "There was an unknown error. Please Register again later.";
    document.getElementById("otpError").style.display = "block";
    localStorage.clear();
  }
  ////
}
