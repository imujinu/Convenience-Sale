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
