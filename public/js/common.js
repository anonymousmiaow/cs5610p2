function Common() {
  const common = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;

  function showMessage(msg) {
    divMsg.querySelector("#msgContent").innerHTML = msg;
    divMsg.style.display = "block";
  }

  function redirect(page) {
    window.location.replace(page + ".html");
  }

  common.getCurrentUser = async function () {
    let res;
    try {
      res = await fetch("./getCurrentUser");
      const resUser = await res.json();
      if (resUser.isLoggedIn) {
        currentUser = resUser.user;
        renderUsername(currentUser.user);
      } else {
        currentUser = null;
        redirect("login");
      }
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  };

  function renderUsername(username) {
    console.log("renderUsername");
    const usernameEl = document.getElementById("navUsername");
    usernameEl.innerHTML = "Welcome, " + username + "!";
  }

  common.setupLogout = function () {
    const linkLogout = document.querySelector("#linkLogout");
    let res;
    linkLogout.addEventListener("click", async (evt) => {
      evt.preventDefault();
      console.log("lgout");
      res = await fetch("/logout");
      const resLogout = await res.json();
      showMessage(resLogout.msg);
      setTimeout(() => redirect("/login"), 2000);
    });
  };

  common.setupSave = function () {
    const form = document.querySelector("form#newdiary");
    const linkLogout = document.getElementById("save");
    let res;
    linkLogout.addEventListener("click", async (evt) => {
      evt.preventDefault();
      res = await fetch("./createDiary", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      const response = await res.json();
      showMessage(response.msg);
      setTimeout(() => redirect("/index"), 2000);
    });
  };
  return common;
}

export default Common();
