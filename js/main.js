const userList = document.querySelector(".user-list");
const postList = document.querySelector(".post-list");
const commentList = document.querySelector(".comment-list");
const userItemId = document.querySelector(".user-item-id");
const userItemUsername = document.querySelector(".user-item-username");
const userItemName = document.querySelector(".user-item-name");
const userItemEmail = document.querySelector(".user-item-email");
const userItemLocation = document.querySelector(".user-item-location-link");
const userItemPhone = document.querySelector(".user-item-phone");
const userItemWebsite = document.querySelector(".user-item-website");
const userItemCompanyName = document.querySelector(".user-item-company-name");
const userItemCompanyPhrase = document.querySelector(".user-item-company-phrase");
const userItemCompanyBs = document.querySelector(".user-item-company-bs");

const userItemTemplate = document.querySelector(".user-item-template").content;
const postItemTemplate = document.querySelector(".post-item-template").content;
const commentItemTemplate = document.querySelector(".comment-item-template").content;

let renderUserReq = `https://jsonplaceholder.typicode.com/users`;
let renderPostReq = `https://jsonplaceholder.typicode.com/posts`;
let renderCommentReq = `https://jsonplaceholder.typicode.com/comments`;

async function renderUser(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();

    let userItemFragment = document.createDocumentFragment();
    data.forEach((item) => {
      let cloneUserItemTemplate = userItemTemplate.cloneNode(true);

      cloneUserItemTemplate.querySelector(".user-item-btn").dataset.userId = item.id;
      // cloneUserItemTemplate.querySelector(".user-item-id").textContent = item.id;
      cloneUserItemTemplate.querySelector(".user-item-username").textContent = item.username;
      cloneUserItemTemplate.querySelector(".user-item-name").textContent = item.name;
      cloneUserItemTemplate.querySelector( ".user-item-email").href = `mailto:${item.email}`;
      cloneUserItemTemplate.querySelector(".user-item-email").textContent = item.email;
      cloneUserItemTemplate.querySelector(".user-item-location-link").href = `https://www.google.com/maps/place/${item.address.geo.lat + item.address.geo.lng}`;
      cloneUserItemTemplate.querySelector(".user-item-phone").href = `tel:+${item.phone}`;
      cloneUserItemTemplate.querySelector(".user-item-website").href = `https://${item.website}`;
      cloneUserItemTemplate.querySelector(".user-item-company-name").textContent = `Company: ${item.company.name}`;
      cloneUserItemTemplate.querySelector(".user-item-company-phrase").textContent = `Company Phrase: ${item.company.catchPhrase}`;
      // cloneUserItemTemplate.querySelector(".user-item-company-bs").textContent = item.company.bs;
 
      userItemFragment.appendChild(cloneUserItemTemplate);
    });
    userList.appendChild(userItemFragment);
  } catch (error) {
    console.log(error);
  }
}
renderUser(renderUserReq);

async function renderPost(url) {
  postList.innerHTML = " ";
  commentList.innerHTML = " ";

  try {
    let res = await fetch(url);
    let data = await res.json();
    let postItemFragment = document.createDocumentFragment();
    data.forEach((item) => {
      let clonePostItemTemplate = postItemTemplate.cloneNode(true);

      // clonePostItemTemplate.querySelector(".post-item-id").textContent = item.id;
      clonePostItemTemplate.querySelector(".post-item-title").textContent = item.title;
      clonePostItemTemplate.querySelector(".post-item-text").textContent = item.body;
      clonePostItemTemplate.querySelector(".post-item-btn").dataset.postId =item.id;

      postItemFragment.appendChild(clonePostItemTemplate);
    });
    postList.appendChild(postItemFragment);
  } catch (error) {
    console.log(error);
  }
}

async function renderComments(url) {
  commentList.innerHTML = " ";

  try {
    let res = await fetch(url);
    let data = await res.json();

    let commentItemFragment = document.createDocumentFragment();

    data.forEach((item) => {
      let cloneItemCommentTemplate = commentItemTemplate.cloneNode(true);

      // cloneItemCommentTemplate.querySelector(".comment-item-id").textContent = item.id;
      cloneItemCommentTemplate.querySelector(".comment-item-title").textContent = item.name;
      cloneItemCommentTemplate.querySelector(".comment-item-text").textContent = item.body;

      commentItemFragment.appendChild(cloneItemCommentTemplate);
    });
    commentList.appendChild(commentItemFragment);
  } catch (error) {
    console.log(error);
  }
}

userList.addEventListener("click", (evt) => {
  if (evt.target.matches(".user-item-btn")) {
    let userId = evt.target.dataset.userId;
    renderPost(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }
});

postList.addEventListener("click", (evt) => {
  if (evt.target.matches(".post-item-btn")) {
    let postId = evt.target.dataset.postId;
    renderComments(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
  }
});
