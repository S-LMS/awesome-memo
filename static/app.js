// //생성한 메모를 ul에 출력
// function displayMemos(memos) {
//   const ul = document.querySelector("#memo-ul");
//   const li = document.createElement("li");
//   li.innerText = `[id:${memo.id}] $(memo.content)`;
//   ul.appendChild(li);
// }

// //생성한 메모를 읽어옴
// async function readMemo() {
//   //get 요청
//   const res = await fetch("/memos");

//   const jsonRes = await res.json();
//   console.log(jsonRes);
//   //jsonRes = [{id:123, content:'~~~'}]
//   const ul = document.querySelector("#memo-ul");
// ul.innerHTML="";
//   jsonRes.forEach(displayMemos);
// }

// // 메모 생성 기능
// async function createMemo(value) {
//   const res = await fetch("/memos", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // stringify로 json으로 변경
//     body: JSON.stringify({
//       id: new Date().getTime(),
//       content: value,
//     }),
//   });

//   readMemo();
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   //    submit 보류
//   const input = document.querySelector("#memo-input");
//   createMemo(input.value);
//   input.value = "";
// }

// const form = document.querySelector("#memo-form");
// form.addEventListener("submit", createMemo);

// readMemo();
const API_URL = "/memo/";

async function fetchMemos() {
  const response = await fetch(API_URL);
  const memos = await response.json();
  displayMemos(memos);
}

async function createMemo(content) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: Date.now(), content }),
  });
  const memo = await response.json();
  displayMemo(memo);
}

async function deleteMemo(e) {
  const id = e.target.dataset.id;
  await fetch(API_URL + `${id}`, {
    method: "DELETE",
  });
  fetchMemos();
}

async function editMemo(e) {
  const id = e.target.dataset.id;
  const editText = prompt("메모 내용을 수정하세요:");

  await fetch(API_URL + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, content: editText }),
  });
  fetchMemos();
}

function displayMemos(memos) {
  const memoList = document.getElementById("memo-list");
  memoList.innerHTML = "";
  memos.forEach(displayMemo);
}

function displayMemo(memo) {
  const memoList = document.getElementById("memo-list");

  const listItem = document.createElement("li");
  listItem.textContent = `${memo.id}: ${memo.content}`;
  memoList.appendChild(listItem);

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.dataset["id"] = memo.id;
  delBtn.addEventListener("click", deleteMemo);
  memoList.appendChild(delBtn);

  const editButton = document.createElement("button");
  editButton.textContent = "수정";
  editButton.dataset["id"] = memo.id;
  editButton.addEventListener("click", editMemo);
  memoList.appendChild(editButton);
}

document
  .getElementById("memo-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = document.getElementById("memo-content").value;
    await createMemo(content);
    document.getElementById("memo-content").value = "";
  });

fetchMemos();
