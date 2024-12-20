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
    console.log(res);
    if (res) {
      alert("로그인 성공");
      document.location.href = "/";
    } else {
      alert("로그인 실패");
      loginForm.reset();
    }
  });
}
