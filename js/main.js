let container = document.querySelector(".container");
import data from "./data.json" assert { type: "json" };

for (let i = 0; i < data.comments.length; i++) {
  let comment = document.createElement("div");
  comment.className = "comment";
  comment.id = data.comments[i].id;
  comment.innerHTML = `
  <div class="left-side">
    <span>+</span>
    <span>${data.comments[i].score}</span>
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
  container.appendChild(comment);
  if (data.comments[i].replies.length > 0) {
    for (let j = data.comments[i].replies.length - 1; j >= 0; j--) {
      let reply = document.createElement("div");
      reply.className = "reply";
      reply.id = data.comments[i].replies[j].id;
      reply.innerHTML = `
          <div class="left-side">
            <span>+</span>
            <span>${data.comments[i].replies[j].score}</span>
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

      comment.after(reply);
    }
  }
}
