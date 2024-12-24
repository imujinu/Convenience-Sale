async function loginBtn() {
  const loginForm = document.forms["loginForm"];
  if (!loginForm.checkValidity()) {
    loginForm.reportValidity();
    return;
  }
  await axios({
    method: "POST",
    url: "/login",
    data: {
      userId: loginForm.userId.value,
      userPw: loginForm.userPw.value,
    },
  })
    .then((res) => {
      console.log("서버 응답:", res);
      if (res.data) {
        alert("로그인 성공");
        document.location.href = "/";
      }
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        alert(err.response.data);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
      loginForm.reset();
    });
}
