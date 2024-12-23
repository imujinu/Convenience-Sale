function loginBtn() {
  const loginForm = document.forms["loginForm"];
  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }
  axios({
    method: "POST",
    url: "/login",
    data: {
      userId: loginForm.userId.value,
      userPw: loginForm.userPw.value,
    },
  }).then((res) => {
    console.log("서버 응답:", res);
    if (res.data) {
      alert("로그인 성공");
      document.location.href = "/";
    } else {
      alert("로그인 실패");
      loginForm.reset();
    }
  });
}
