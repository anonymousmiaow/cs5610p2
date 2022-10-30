function EditProfile() {
  const editProfile = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;

  function showMessage(msg) {
    divMsg.querySelector("#msgContent").innerHTML = msg;
    divMsg.style.display = "block";
  }

  function redirect(page) {
    window.location.replace(page + ".html");
  }

  function renderProfile(user) {
    console.log(user);
    const el = document.getElementById("username");
    el.value = `${user.user}`;
    const ellocation = document.getElementById("location");
    ellocation.value = `${user.location}`;
    const elhobby = document.getElementById("hobby");
    elhobby.value = `${user.hobby}`;
  }

  editProfile.getProfile = async function () {
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

  function renderPosts(post) {
    const title = document.getElementById("title");
    title.value = `${post.title}`;
    const content = document.getElementById("content");
    content.innerHTML = `${post.content}`;
  }

  editProfile.setupSave = function () {
    const form = document.querySelector("form#editprofile");
    const linkLogout = document.getElementById("save");
    let res;
    linkLogout.addEventListener("click", async (evt) => {
      evt.preventDefault();
      console.log(form);
      res = await fetch("./updateProfile", {
            method: "POST",
            body: new URLSearchParams(new FormData(form)),
      });
      const response = await res.json();
      showMessage(response.msg);
      setTimeout(() => redirect("/profile"), 2000);
    });
  };
  return editProfile;
}

export default EditProfile();
