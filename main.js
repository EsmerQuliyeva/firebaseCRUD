import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBmWxLLdfP0h7ir6XEcn7DYsZE4pt-ZU18",
  authDomain: "chat-dbccd.firebaseapp.com",
  projectId: "chat-dbccd",
  storageBucket: "chat-dbccd.appspot.com",
  messagingSenderId: "159348335472",
  appId: "1:159348335472:web:46f0f5dbdf271de354a5b5",
  measurementId: "G-M7Z0J9XSPM",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
let btn = document.querySelector("#createBtn");

btn.addEventListener("click", () => {
  const name = document.querySelector(".name").value;
  const newData = push(ref(db, "users/"));
  set(newData, { name: name });
  document.querySelector(".name").value = "";
  readData();
});


function readData() {
  const dataList = document.querySelector(".data-list");
  dataList.innerHTML = "";
  onValue(ref(db, "users/"), (snapshot) => {
    snapshot.forEach((child) => {
      const childKey = child.key;
      const childData = child.val();

      const div = document.createElement("div");
      div.innerHTML = `
      <input type="text" value="${childData.name}" data-id="${childKey}"/>
      <button data-id="${childKey}" class="updateBtn">Update</button>
      <button data-id="${childKey}" class="deleteBtn">Delete</button>
      `;
      dataList.appendChild(div);
    });
    document.querySelectorAll(".updateBtn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const nameInput = document.querySelector(
          `input[data-id="${id}"]`
        ).value;
        update(ref(db, "users/" + id), { name: nameInput });
        readData();
      });
    });
    document.querySelectorAll(".deleteBtn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        remove(ref(db, "users/" + id));
        readData();
      });
    });
  });
}
window.addEventListener("load", readData);
