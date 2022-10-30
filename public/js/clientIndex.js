function ClientIndex() {
  const clientIndex = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;

  function showMessage(msg) {
    divMsg.querySelector("#msgContent").innerHTML = msg;
    divMsg.style.display = "block";
  }

  function renderPosts(posts) {
    const list = document.getElementById("list");

    console.log(posts);
    for(const post of posts) {
      console.log(post);
      const entry = document.createElement("a");
      entry.className = "list-group-item list-group-item-action";
      const div = document.createElement("div");
      div.className = "d-flex w-100 justify-content-between";
      const h5 = document.createElement("h5");
      h5.className = "mb-1";
      h5.innerHTML = `${post.title}`;
      const small = document.createElement("small");
      small.className = "text-muted";
      small.innerHTML = `Some small print`;
      div.appendChild(h5);
      entry.appendChild(div);
      const p = document.createElement("p");
      p.className = "mb-1";
      p.innerHTML = `${post.content}`;
      entry.appendChild(p);
      entry.appendChild(small);
      entry.addEventListener("click",  (evt) => {
        console.log("clicked");
        window.location.replace("diary.html?id=" + post._id);
      });
      list.appendChild(entry);
    }
    // divContent.innerHTML = `
    //   <h2>Posts for ${currentUser.user}</h2>
    //   ${posts.map((p) => `<div>Text: ${p.title}</div>`).join("")}
    // `;
    //
    // divContent.innerHTML = `
    //   <h2>Posts for ${currentUser.user}</h2>
    //   ${posts.map((p) => `<a href="#" class="list-group-item list-group-item-action">
    //     <div class="d-flex w-100 justify-content-between">
    //       <h5 class="mb-1">${p.title}</h5>
    //       <small class="text-muted">3 days ago</small>
    //     </div>
    //     <p class="mb-1">${p.content}</p>
    //   </a>`).join("")}
    // `;



    // <a href="#" class="list-group-item list-group-item-action">
    //   <div class="d-flex w-100 justify-content-between">
    //     <h5 class="mb-1">List group item heading</h5>
    //     <small class="text-muted">3 days ago</small>
    //   </div>
    //   <p class="mb-1">Some placeholder content in a paragraph.</p>
    //   <small class="text-muted">And some muted small print.</small>
    // </a>
  }

  async function getPosts() {
    let res;
    try {
      res = await fetch("./listDiaries");
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
        renderUsername(currentUser.user);
      } else {
        currentUser = null;
        redirect("login");
      }
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  }

  function renderUsername (username) {
    console.log("renderUsername");
    const usernameEl = document.getElementById("navUsername");
    usernameEl.innerHTML = "Welcome, " + username + "!";
  };

  clientIndex.setupLogin = function () {
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

  clientIndex.setupSignup = function () {
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

  clientIndex.setupLogout = function () {
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

  clientIndex.setupNewpostClick = function () {
    const el = document.getElementById("newpost");
    el.addEventListener("click",  (evt) => {
      window.location.replace("newpost.html");
    });
  };

  clientIndex.getCurrentUser = getCurrentUser;

  return clientIndex;
}

export default ClientIndex();
