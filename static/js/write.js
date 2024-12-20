// cys2/241219/자유게시판
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    const title = form.querySelector('input[name="title"]').value.trim();
    const content = form.querySelector('textarea[name="content"]').value.trim();

    if (!title || !content) {
      event.preventDefault();
      alert("제목과 내용을 입력해주세요.");
    }
  });
});
