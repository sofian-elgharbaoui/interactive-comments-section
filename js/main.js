fetch(
  "https://raw.githubusercontent.com/sofian-elgharbaoui/interactive-comments-section/main/js/data.json"
)
// fetch("http://127.0.0.1:5500/js/data.json")
  .then((onfulfiled) => {
    return onfulfiled.json();
  })
  .then((data) => {
    let container = $(".container");
    let comments = $("#comments");
    // declare the i to work for all loops. to minimize the code
    // let i = 0;
    //we can't do that because every loop will set the i value to its last loop (i.e. 2, 5, ...)

    // EVERY THING ABOUT THE EXTRACTION OF DATA FROM data.json TO index.html
    for (let i = 0; i < data.comments.length; i++) {
      const cmtData = data.comments[i];

      let upComment = document.createElement("section");

      let repliesSection = document.createElement("div");
      repliesSection.id = "replies";

      let comment = document.createElement("div");
      comment.className = "comment";
      comment.id = cmtData.id;
      comment.innerHTML = `
        <div class="left-side">
          <span class="plus-btn">+</span>
          <span class="score">${cmtData.score}</span>
          <span class="minus-btn">-</span>
        </div>
        <div class="right-side">
          <div class="user">
            <img src="${cmtData.user.image.png}" alt="${cmtData.user.username}" />
            <p class="user-name">${cmtData.user.username}</p>
            <span class="created-at">${cmtData.createdAt}</span>
            <button  class="reply-btn">
              <i class="fa-solid fa-reply"></i> Reply
            </button>
          </div>
          <div class="content">
            ${cmtData.content}
          </div>
        </div>
        `;

      upComment.append(comment);
      if (cmtData.replies.length > 0) {
        for (let i = 0; i < cmtData.replies.length; i++) {
          const rplData = cmtData.replies[i];

          let reply = document.createElement("div");
          reply.className = "reply";
          reply.id = rplData.id;
          if (rplData.user.username == "juliusomo") {
            reply.innerHTML = `
              <div class="left-side">
              <span class="plus-btn">+</span>
              <span class="score">${rplData.score}</span>
              <span class="minus-btn">-</span>
              </div>
            <div class="right-side">
            <div class="user">
            <img src="${rplData.user.image.png}" alt="${rplData.user.username}" />
            <p class="user-name">${rplData.user.username}</p>
            <span class="created-at">${rplData.createdAt}</span>
            <button class="delete-btn">
                  <i class="fa-solid fa-trash"></i> Delete
                  </button>
                  <button class="edit-btn"><i class="fa-solid fa-pen"></i> Edit</button>
                  </div>
                  <div class="content">
                  <b class="replying-to">@${rplData.replyingTo}</b>
                  ${rplData.content}
                  </div>
                  </div>
                  `;
          } else {
            reply.innerHTML = `
                    <div class="left-side">
                    <span class="plus-btn">+</span>
                    <span class="score">${rplData.score}</span>
                    <span class="minus-btn">-</span>
                    </div>
                    <div class="right-side">
                    <div class="user">
                    <img src="${rplData.user.image.png}" alt="${rplData.user.username}" />
                <p class="user-name">${rplData.user.username}</p>
                <span class="created-at">${rplData.createdAt}</span>
                <button class="reply-btn">
                <i class="fa-solid fa-reply"></i> Reply
                </button>
                </div>
                <div class="content">
                <b class="replying-to">@${rplData.replyingTo}</b>
                ${rplData.content}
                </div>
                </div>
                `;
          }
          repliesSection.append(reply);
        }
      }
      upComment.append(repliesSection);
      comments.append(upComment);
    }

    let allDeleteBtns = document.querySelectorAll(".delete-btn");
    for (let i = 0; i < allDeleteBtns.length; i++) {
      let deleteBtn = allDeleteBtns[i];
      deleteBtn.addEventListener("click", () => {
        Swal.fire({
          title: "<h4 style='text-align: left'>Delete Comment</h4>",
          html: "<p style='text-align: left'>Are you sure you want to delete this comment? <br> This will remove the comment and can't be undone.</p>",

          confirmButtonText: "YES, DELETE",
          cancelButtonColor: "#ed6468",

          showCancelButton: true,
          cancelButtonText: "NO, CANCEL",
          confirmButtonColor: "gray",

          width: "25rem",
        }).then((valuesObj) => {
          if (valuesObj.isConfirmed) {
            deleteBtn.closest(".right-side").parentElement.remove();
          } else return;
        });
      });
    }

    let allEditBtns = document.querySelectorAll(".edit-btn");
    for (let i = 0; i < allEditBtns.length; i++) {
      let editBtn = allEditBtns[i];
      editBtn.onclick = () => {
        let updateBtn = document.createElement("button");
        updateBtn.id = "update-btn";
        updateBtn.innerText = "UPDATE";
        // query for the .content which is inside the .right-side element.
        // I used to use the document.querySelector('el'), which means query for the el inside the whole document
        let theContent = editBtn
          .closest(".right-side")
          .querySelector(".content");
        theContent.setAttribute("contenteditable", "");
        theContent.focus();
        editBtn.closest(".right-side").append(updateBtn);

        theContent.onblur = () => {
          theContent.removeAttribute("contenteditable");
          updateBtn.remove();
        };
        updateBtn.onclick = () => {
          theContent.removeAttribute("contenteditable");
          updateBtn.remove();
        };
      };
    }

    let allPlusBtns = document.getElementsByClassName("plus-btn");
    for (let i = 0; i < allPlusBtns.length; i++) {
      const plusBtn = allPlusBtns[i];
      // let scoreValue = plusBtn.nextElementSibling.textContent;
      plusBtn.onclick = () => {
        plusBtn.nextElementSibling.textContent++;
      };
    }

    let allMinusBtns = document.getElementsByClassName("minus-btn");
    console.log(allMinusBtns);
    for (let i = 0; i < allMinusBtns.length; i++) {
      const minusBtn = allMinusBtns[i];
      // that means I want the vlaue of this element; this isn't express that element
      // let scoreValue = minusBtn.previousElementSibling.textContent;
      minusBtn.onclick = () => {
        minusBtn.previousElementSibling.textContent--;
      };
    }

    // EVERY THING ABOUT THE CLICK ON ANY REPLY BTN,
    // make an action if any reply button has clicked.
    let allReplyBtns = $(".reply-btn");
    for (let i = 0; i < allReplyBtns.length; i++) {
      const replyBtn = allReplyBtns[i];
      replyBtn.addEventListener("click", () => {
        let createReply = document.createElement("div");
        createReply.id = "create-reply";
        createReply.innerHTML = `
          <img src="${data.currentUser.image.png}">
          <textarea placeholder="Reply on ${replyBtn.parentElement.children[1].innerText}"></textarea>
          <button class="send-btn">REPLY</button>
          `;

        // to make the reply fit its previous el's width.
        if (replyBtn.closest(".reply")) {
          createReply.style.cssText = "width: 90%; margin-left: auto;";
        }

        replyBtn.closest(".right-side").parentElement.after(createReply);

        $("#create-reply .send-btn").click((e) => {
          let reply = document.createElement("div");
          reply.className = "reply";
          reply.innerHTML = `
                    <div class="left-side">
                    <span class="plus-btn">+</span>
                    <span class="score">0</span>
                    <span class="minus-btn">-</span>
                    </div>
                    <div class="right-side">
                    <div class="user">
                    <img src="${data.currentUser.image.png}" alt="${data.currentUser.username}" />
                <p class="user-name">${data.currentUser.username}</p>
                <span class="created-at"></span>
                <button class="delete-btn">
                  <i class="fa-solid fa-trash"></i> delete
                </button>
                <button class="edit-btn">
                  <i class="fa-solid fa-pen"></i> edit
                </button>
                </div>
                <div class="content">
                <b class="replying-to">@${replyBtn.parentElement.children[1].innerText}</b>
                ${e.target.previousElementSibling.value}
                </div>
                </div>
                `;

          createReply.remove();
          if (replyBtn.closest(".comment")) {
            replyBtn
              .closest(".right-side")
              .parentElement.nextElementSibling.append(reply);
          } else {
            replyBtn.closest(".reply").parentElement.append(reply);
          }
          // add the delete action in created replies
          let allDeleteBtns = document.querySelectorAll(".delete-btn");
          for (let i = 0; i < allDeleteBtns.length; i++) {
            let deleteBtn = allDeleteBtns[i];
            deleteBtn.onclick = () => {
              Swal.fire({
                title: "<h4 style='text-align: left'>Delete Comment</h4>",
                html: "<p style='text-align: left'>Are you sure you want to delete this comment? <br> This will remove the comment and can't be undone.</p>",

                confirmButtonText: "YES, DELETE",
                cancelButtonColor: "#ed6468",

                showCancelButton: true,
                cancelButtonText: "NO, CANCEL",
                confirmButtonColor: "gray",

                width: "25rem",
              }).then((valuesObj) => {
                if (valuesObj.isConfirmed) {
                  deleteBtn.closest(".right-side").parentElement.remove();
                } else return;
              });
            };
          }

          let allEditBtns = document.querySelectorAll(".edit-btn");
          for (let i = 0; i < allEditBtns.length; i++) {
            let editBtn = allEditBtns[i];
            editBtn.onclick = () => {
              let updateBtn = document.createElement("button");
              updateBtn.id = "update-btn";
              updateBtn.innerText = "UPDATE";
              // query for the .content which is inside the .right-side element.
              // I used to use the document.querySelector('el'), which means query for the el inside the whole document
              let theContent = editBtn
                .closest(".right-side")
                .querySelector(".content");
              theContent.setAttribute("contenteditable", "");
              theContent.focus();
              editBtn.closest(".right-side").append(updateBtn);

              theContent.onblur = () => {
                theContent.removeAttribute("contenteditable");
                updateBtn.remove();
              };
              updateBtn.onclick = () => {
                theContent.removeAttribute("contenteditable");
                updateBtn.remove();
              };
            };
          }

          let allPlusBtns = document.getElementsByClassName("plus-btn");
          for (let i = 0; i < allPlusBtns.length; i++) {
            const plusBtn = allPlusBtns[i];
            // let scoreValue = plusBtn.nextElementSibling.textContent;
            plusBtn.onclick = () => {
              plusBtn.nextElementSibling.textContent++;
            };
          }

          let allMinusBtns = document.getElementsByClassName("minus-btn");
          console.log(allMinusBtns);
          for (let i = 0; i < allMinusBtns.length; i++) {
            const minusBtn = allMinusBtns[i];
            // that means I want the vlaue of this element; this isn't express that element
            // let scoreValue = minusBtn.previousElementSibling.textContent;
            minusBtn.onclick = () => {
              minusBtn.previousElementSibling.textContent--;
            };
          }
        });
      });
    }

    // EVERY THING ABOUT CREATE A COMMENT & WHEN CREATED
    // create the comment section to send comments.
    let createComment = document.createElement("div");
    createComment.id = "create-comment";
    createComment.innerHTML = `
    <img src="${data.currentUser.image.png}">
    <textarea placeholder="Add a comment..."></textarea>
    <button class="send-btn">SEND</button>
    `;
    container.append(createComment);

    $("#create-comment .send-btn").click((ev) => {
      let upComment = document.createElement("section");

      let comment = document.createElement("div");
      comment.className = "comment";
      comment.innerHTML = `
        <div class="left-side">
          <span class="plus-btn">+</span>
          <span class="score">0</span>
          <span class="minus-btn">-</span>
          </div>
          <div class="right-side">
          <div class="user">
          <img src="${data.currentUser.image.png}" alt="${data.currentUser.username}" />
          <p class="user-name">${data.currentUser.username}</p>
          <span class="created-at">0</span>
          <button class="delete-btn">
          <i class="fa-solid fa-trash"></i> delete
                </button>
                <button class="edit-btn">
                  <i class="fa-solid fa-pen"></i> edit
                </button>
          </div>
          <div class="content">
          ${ev.target.previousElementSibling.value}
          </div>
          </div>
        `;

      upComment.append(comment);
      comments.append(upComment);
      ev.target.previousElementSibling.value = null;

      // add the delete action in created comments
      let allDeleteBtns = document.querySelectorAll(".delete-btn");
      for (let x = 0; x < allDeleteBtns.length; x++) {
        const deleteBtn = allDeleteBtns[x];
        deleteBtn.addEventListener("click", () => {
          Swal.fire({
            title: "<h4 style='text-align: left'>Delete Comment</h4>",
            html: "<p style='text-align: left'>Are you sure you want to delete this comment? <br> This will remove the comment and can't be undone.</p>",

            confirmButtonText: "YES, DELETE",
            cancelButtonColor: "#ed6468",

            showCancelButton: true,
            cancelButtonText: "NO, CANCEL",
            confirmButtonColor: "gray",

            width: "25rem",
          }).then((valuesObj) => {
            if (valuesObj.isConfirmed) {
              deleteBtn.closest(".right-side").parentElement.remove();
            } else return;
          });
        });
      }

      let allEditBtns = document.querySelectorAll(".edit-btn");
      for (let i = 0; i < allEditBtns.length; i++) {
        let editBtn = allEditBtns[i];
        editBtn.onclick = () => {
          let updateBtn = document.createElement("button");
          updateBtn.id = "update-btn";
          updateBtn.innerText = "UPDATE";
          // query for the .content which is inside the .right-side element.
          // I used to use the document.querySelector('el'), which means query for the el inside the whole document
          let theContent = editBtn
            .closest(".right-side")
            .querySelector(".content");
          theContent.setAttribute("contenteditable", "");
          theContent.focus();
          editBtn.closest(".right-side").append(updateBtn);

          theContent.onblur = () => {
            theContent.removeAttribute("contenteditable");
            updateBtn.remove();
          };
          updateBtn.onclick = () => {
            theContent.removeAttribute("contenteditable");
            updateBtn.remove();
          };
        };
      }

      let allPlusBtns = document.getElementsByClassName("plus-btn");
      for (let i = 0; i < allPlusBtns.length; i++) {
        const plusBtn = allPlusBtns[i];
        // let scoreValue = plusBtn.nextElementSibling.textContent;
        plusBtn.onclick = () => {
          plusBtn.nextElementSibling.textContent++;
        };
      }

      let allMinusBtns = document.getElementsByClassName("minus-btn");
      console.log(allMinusBtns);
      for (let i = 0; i < allMinusBtns.length; i++) {
        const minusBtn = allMinusBtns[i];
        // that means I want the vlaue of this element; this isn't express that element
        // let scoreValue = minusBtn.previousElementSibling.textContent;
        minusBtn.onclick = () => {
          minusBtn.previousElementSibling.textContent--;
        };
      }
    });
    // the end of our promise
  });
