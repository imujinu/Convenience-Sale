//이 함수는 화살표를 눌렀을 때
//1. 화살표를 아래방향으로 바꾼다.
//2. 목록을 보여주기 위해 새로운 박스를 보여준다..

function showList(arrow) {
  // 아래로 화살표 모양이 향합니다.

  //1. 화살표 아래방향으로 바꾸는 것은 CSS에서 미리 클래스를 선언해줌
  // 눌렀을 때 on이라는 클래스를 버튼에다가 추가해준다.
  arrow.classList.toggle("on");

  //2.목록을 보여주기 위해 새로운 박스를 보여준다.
  const contentContainer = arrow.parentElement.nextElementSibling;
  //   console.log(contentContainer);
  contentContainer.classList.toggle("hide");
}

// I don't
function confirmDelete() {
  const isConfirmed = confirm("정말로 탈퇴하시겠습니까?");
  if (isConfirmed) {
    // 비밀번호 입력 모달 표시
    document.querySelector("#passwordModal").style.display = "block";
  }
}

//
function submitPassword() {
  const password = document.querySelector("#passwordInput").value;

  if (!password) {
    alert("비밀번호를 입력해주세요.");
    return;
  }

  // 서버에 탈퇴 요청
  fetch("/delete-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  })
    .then((response) => {
      if (response.ok) {
        alert("탈퇴가 완료되었습니다.");
        window.location.href = "/"; // 탈퇴 후 메인 페이지로 이동
      } else {
        alert("비밀번호가 일치하지 않습니다. 다시 시도해주세요.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    });
}

function closeModal() {
  document.querySelector("#passwordModal").style.display = "none";
}
