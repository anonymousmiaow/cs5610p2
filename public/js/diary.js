function Diary() {
  const diary = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;

  function showMessage(msg) {
    divMsg.querySelector("#msgContent").innerHTML = msg;
    divMsg.style.display = "block";
  }

  function renderPosts(post) {
    const title = document.getElementById("title");
    title.innerHTML = `${post.title}`;
    const content = document.getElementById("content");
    content.innerHTML = `${post.content}`;
  }

  async function getDiary() {
    let res;
    try {
      res = await fetch("./getDiary");
      const posts = await res.json();
      renderPosts(posts);
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  }

  function redirect(page) {
    window.location.replace(page + ".html");
  }

  async function getCurrentUser() {
    let res;
    try {
      res = await fetch("./getCurrentUser");
      const resUser = await res.json();
      if (resUser.isLoggedIn) {
        currentUser = resUser.user;
        getPosts();
      } else {
        currentUser = null;
        redirect("login");
      }
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  }

  diary.setupLogin = function () {
    console.log("Setup login");
    const form = document.querySelector("form#login");
    let res;
    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      console.log("Authenticating");
      try {
        res = await fetch("./authenticate", {
          method: "POST",
          body: new URLSearchParams(new FormData(form)),
        });
        const resUser = await res.json();
        if (resUser.isLoggedIn) {
          redirect("index");
        } else {
          showMessage(resUser.err);
        }
      } catch (err) {
        // TODO implement error handling for the user;
        console.log(err);
      }
    });
  };

  diary.setupSignup = function () {
    console.log("Setup signup");
    const form = document.querySelector("form#signup");
    let res;
    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      console.log("Signing up");
      try {
        res = await fetch("./signup", {
          method: "POST",
          body: new URLSearchParams(new FormData(form)),
        });
        const resUser = await res.json();
        if (resUser.isLoggedIn) {
          redirect("index");
        } else {
          showMessage(resUser.err);
        }
      } catch (err) {
        // TODO implement error handling for the user;
        console.log(err);
      }
    });
  };

  diary.setupLogout = function () {
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

  diary.getDiary = async function () {
    let res;
    try {
      const p = new URLSearchParams(window.location.search);
      res = await fetch("./getDiary?id=" + p.get("id"));
      const posts = await res.json();
      renderPosts(posts);
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  };

  diary.getCurrentUser = getCurrentUser;
  return diary;
}

export default Diary();
