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

  diary.getCurrentUser = async function () {
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
      const post = await res.json();
      console.log(post);
      if (!post) {
        console.log(post);
        redirect("/index");
      } else {
        renderPosts(post);
      }
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  };

  diary.setupEdit = function () {
    const el = document.getElementById("edit");
    let res;
    el.addEventListener("click", async (evt) => {
      evt.preventDefault();
      console.log("edit");
      const p = new URLSearchParams(window.location.search);
      window.location.replace("editdiary.html?id=" + p.get("id"));
    });
  };

  diary.setupDelete = function () {
    const el = document.getElementById("delete");
    let res;
    el.addEventListener("click", async (evt) => {
      evt.preventDefault();
      console.log("delete");
      const p = new URLSearchParams(window.location.search);
      res = await fetch("/deleteDiary?id=" + p.get("id"));
      const resDelete = await res.json();
      showMessage("Dairy deleted!");
      
      setTimeout(() => redirect("/index"), 2000);
    });
  };

  return diary;
}

export default Diary();
