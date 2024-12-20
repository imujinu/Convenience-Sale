// cys2/241219/자유게시판
document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.querySelector("form");

  commentForm.addEventListener("submit", (event) => {
    const comment = commentForm
      .querySelector('input[name="comment"]')
      .value.trim();

    if (!comment) {
      event.preventDefault();
      alert("댓글 내용을 입력해주세요.");
    }
  });
});
