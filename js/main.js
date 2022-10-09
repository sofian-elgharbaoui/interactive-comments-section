import data from "./data.json" assert { type: "json" };

// let commentForm = document.getElementById("create-comment");
let commentTextarea = document.querySelector("#create-comment textarea");
let submitButton = document.querySelector("#create-comment button");
let allCommentsSection = document.querySelector("#comments");
let currentUserImg = document.querySelector("#create-comment img");
currentUserImg.src = data.currentUser.image.png;

for (let i = 0; i < data.comments.length; i++) {
  let upComment = document.createElement("section");
  upComment.className = "upComment";
  // when these two lines below were outside the loop, that means there was just one relpy section, and it was put at the end of loop;
  let repliesSection = document.createElement("div");
  repliesSection.id = "replies";

  let comment = document.createElement("div");
  comment.className = "comment";
  comment.id = data.comments[i].id;
  comment.innerHTML = `
  <div class="left-side">
    <span>+</span>
    <span class="score">${data.comments[i].score}</span>
    <span>-</span>
  </div>
  <div class="right-side">
    <div class="user">
      <img src="${data.comments[i].user.image.png}" alt="" />
      <h5 class="user-name">${data.comments[i].user.username}</h5>
      <span class="created-at">${data.comments[i].createdAt}</span>
      <span  class="reply-btn">
      <i class="fa-solid fa-reply"></i> Reply
      </span>
    </div>
    <div class="content">
    ${data.comments[i].content}
    </div>
  </div>
  `;
  upComment.appendChild(comment);

  if (data.comments[i].replies.length > 0) {
    for (let j = 0; j < data.comments[i].replies.length; j++) {
      let reply = document.createElement("div");
      reply.className = "reply";
      reply.id = data.comments[i].replies[j].id;
      reply.innerHTML = `
          <div class="left-side">
            <span>+</span>
            <span class="score">${data.comments[i].replies[j].score}</span>
            <span>-</span>
          </div>
          <div class="right-side">
            <div class="user">
              <img src="${data.comments[i].replies[j].user.image.png}" alt="" />
              <h5 class="user-name">${data.comments[i].replies[j].user.username}</h5>
              <span class="created-at">${data.comments[i].replies[j].createdAt}</span>
              <span class="reply-btn">
                <i class="fa-solid fa-reply"></i> Reply
              </span>
            </div>
            <div class="content">
              <span class="replying-to">@${data.comments[i].replies[j].replyingTo}</span>
              ${data.comments[i].replies[j].content}
            </div>
          </div>
        `;
      repliesSection.append(reply);
    }
    upComment.appendChild(repliesSection);
  } else {
    upComment.appendChild(repliesSection);
  }
  allCommentsSection.appendChild(upComment);
}

let allusersNames = [...document.querySelectorAll("h5.user-name")];
for (let i = 0; i < allusersNames.length; i++) {
  const userName = allusersNames[i];
  if (userName.innerText == "juliusomo") {
    let you = document.createElement("span");
    you.innerText = "you";
    you.className = "currentUser-sign";
    userName.append(you);
  }
}

submitButton.onclick = () => {
  if (commentTextarea.value !== "") {
    let upComment = document.createElement("section");
    upComment.className = "upComment";

    let comment = document.createElement("div");
    comment.className = "comment";
    comment.innerHTML = `
    <div class="left-side">
    <span>+</span>
    <span class="score">0</span>
    <span>-</span>
    </div>
    <div class="right-side">
    <div class="user">
    <img src="${data.currentUser.image.png}" alt="" />
    <h5 class="user-name">${
      data.currentUser.username
    } <span class="currentUser-sign">you</span></h5>
    <span class="created-at">${
      new Date().getDate() +
      " " +
      new Date().toLocaleString("default", { month: "short" }) +
      ", " +
      new Date().getFullYear()
    }</span>
    <span class="reply-btn">
        <i class="fa-solid fa-reply"></i> Reply
        </span>
        </div>
        <div class="content">
        ${commentTextarea.value}
        </div>
        </div>
        `;
    upComment.appendChild(comment);
    allCommentsSection.appendChild(upComment);
    commentTextarea.value = "";
  }
};

// I can get elements that have just been created with js, even outside the loop.
let replyBtns = [...document.querySelectorAll(".reply-btn")];
for (let i = 0; i < replyBtns.length; i++) {
  const btn = replyBtns[i];
  btn.onclick = () => {
    commentTextarea.focus();
    submitButton.onclick = () => {
      let reply = document.createElement("div");
      reply.className = "reply";
      reply.innerHTML = `
      <div class="left-side">
      <span>+</span>
      <span class="score">0</span>
      <span>-</span>
      </div>
      <div class="right-side">
      <div class="user">
      <img src="${data.currentUser.image.png}" alt="" />
      <h5 class="user-name">${
        data.currentUser.username
      } <span class="currentUser-sign">you</span></h5>
      <span class="created-at">${
        new Date().getDate() +
        " " +
        new Date().toLocaleString("default", { month: "short" }) +
        ", " +
        new Date().getFullYear()
      }</span>
    <span class="reply-btn">
    <i class="fa-solid fa-reply"></i> Reply
    </span>
    </div>
    <div class="content">
    <span class="replying-to">@${
      btn.previousElementSibling.previousElementSibling.textContent
    }</span>
      ${commentTextarea.value}
    </div>
    </div>
    `;
      if (btn.closest(".comment")) {
        btn.closest(".comment").nextElementSibling.appendChild(reply);
      } else if (btn.closest(".reply")) {
        btn.closest(".reply").parentElement.appendChild(reply);
      }
      commentTextarea.value = null;
    };
  };
}
