function EditDiary() {
  const editDiary = {};
  const divMsg = document.querySelector("div#msg");

  let currentUser = null;

  function showMessage(msg) {
    divMsg.querySelector("#msgContent").innerHTML = msg;
    divMsg.style.display = "block";
  }

  function redirect(page) {
    window.location.replace(page + ".html");
  }

  editDiary.getDiary = async function () {
    let res;
    try {
      const p = new URLSearchParams(window.location.search);
      res = await fetch("./getDiary?id=" + p.get("id"));
      const post = await res.json();
      console.log(post);
      if(!post) {
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

  function renderPosts(post) {
    const title = document.getElementById("title");
    title.value = `${post.title}`;
    const content = document.getElementById("content");
    content.innerHTML = `${post.content}`;
  }

  editDiary.setupSave = function () {
    const form = document.querySelector("form#editdiary");
    const linkLogout = document.getElementById("save");
    let res;
    linkLogout.addEventListener("click", async (evt) => {
      evt.preventDefault();
      const p = new URLSearchParams(window.location.search);
      res = await fetch("./editDiary?id=" + p.get("id"), {
            method: "POST",
            body: new URLSearchParams(new FormData(form)),
      });
      const response = await res.json();
      showMessage(response.msg);
      setTimeout(() => redirect("/index"), 2000);
    });
  };
  return editDiary;
}

export default EditDiary();
