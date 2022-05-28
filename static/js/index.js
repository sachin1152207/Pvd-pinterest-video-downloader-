document.getElementById("nullLink").style.display = "none";

// Empty variable here
let link;
// Getting random fact with interval here
setInterval(facts, 10000);
function facts() {
  window
    .fetch("https://api.github.com/gists/0ec1e3bb0b370a075d2080c6f673d294")
    .then((r) => r.json())
    .then((r) => JSON.parse(r.files["facts.json"].content))
    .catch((e) => [`Something went wrong: ${e.message}`])
    .then((facts) => {
      const fact = facts[Math.floor(Math.random() * facts.length)];
      document.getElementById("facts").innerHTML = fact;
    });
}

// Getting Ip address here
// fetch("https://httpbin.org/ip")
//   .then((r) => r.json())
//   .then(
//     (data) =>
//       (document.getElementById("ip").innerText = `${data["origin"]}`)
//   );

let btn = document.querySelector("#submit");

btn.addEventListener("click", function () {
  if (document.getElementById("videoLink").value == "") {
    document.getElementById("nullLink").style.display = "block";
  } else {
    fetch("http://192.168.1.101:5000/api", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify({
        videoUrl: document.getElementById("videoLink").value,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (response) {
            if (response["status"] == "200") {
              document.getElementById(
                "video"
              ).innerHTML = `<video style="width: px; height: 675px;" controls="" autoplay="">
              <source src="${response["downloadlink"]}" type="video/mp4">
              </video>
              <a href="${response["downloadlink"]}" target="_blank" class="btn btn-primary">Download 1080P</a>`;
            } else {
              document.getElementById(
                "video"
              ).innerHTML = `<img class="img-fluid my-2"src="https://cdn-icons-png.flaticon.com/512/1201/1201519.png" alt=""><p class="text-center">Unable to find video</p>`;
            }
            document.getElementById("videoLink").value = "";
            document.getElementById("nullLink").style.display = "none";
          });
        } else {
          throw Error("Something went wrong");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});
