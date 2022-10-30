function Profile() {
  const profile = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;

  function renderProfile(user) {
    console.log(user);
    const el = document.getElementById("username");
    el.innerHTML = `${user.user}`;
    const ellocation = document.getElementById("location");
    ellocation.innerHTML = `${user.location}`;
    const elhobby = document.getElementById("hobby");
    elhobby.innerHTML = `${user.hobby}`;
  }

  async function getProfile() {
    let res;
    try {
      res = await fetch("./getUser");
      const profile = await res.json();
      console.log(profile);
      //renderPosts(posts);
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  }

  function redirect(page) {
    window.location.replace(page + ".html");
  }

  profile.getCurrentUser = async function() {
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
  }

  function renderUsername(username) {
    console.log("renderUsername");
    const usernameEl = document.getElementById("navUsername");
    usernameEl.innerHTML = "Welcome, " + username + "!";
  };

  profile.getProfile = async function () {
    let res;
    try {
      res = await fetch("./getUser");
      const user = await res.json();
      renderProfile(user);
    } catch (err) {
      // TODO implement error handling for the user;
      console.log(err);
    }
  };

  profile.setupEdit = function () {
    const el = document.getElementById("edit");
    let res;
    el.addEventListener("click", async (evt) => {
      evt.preventDefault();
      console.log("edit");
      window.location.replace("editprofile.html");
    });
  };

  return profile;
}

export default Profile();
