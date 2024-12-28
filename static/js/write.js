document.addEventListener("DOMContentLoaded", () => {
  console.log("write.js loaded.");

  // 제목, 내용, 이미지 파일 선택 요소
  const boardTitleInput = document.getElementById("boardTitle");
  const boardDetailInput = document.getElementById("boardDetail");

  // 폼 제출 시 기본 검증 (제목/내용 비어 있는지)
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      if (!boardTitleInput.value.trim()) {
        alert("제목을 입력해주세요.");
        event.preventDefault();
        return;
      }
      if (!boardDetailInput.value.trim()) {
        alert("내용을 입력해주세요.");
        event.preventDefault();
        return;
      }
    });
  }
});
