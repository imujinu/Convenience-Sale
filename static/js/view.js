document.addEventListener("DOMContentLoaded", () => {
  const deleteBtn = document.getElementById("deleteBtn");

  deleteBtn.addEventListener("click", () => {
    const password = prompt("삭제를 위해 암호를 입력해주세요.");

    if (password) {
      fetch(window.location.href + "/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
        .then((res) => {
          if (res.ok) {
            alert("게시글이 삭제되었습니다.");
            window.location.href = "/board";
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        })
        .catch(() => alert("오류가 발생했습니다."));
    }
  });
});
