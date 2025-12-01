// layout>header.html 웹문서 요청 -> html 문구 텍스트 
// fetch("요청할 자원의 주소")
fetch("/layout/header.html")
.then( (response) => response.text() )   //then 메소드 : 함수실행 /응답객체를 받아서 텍스트 응답객체로 받음
.then( (responseText) => {
  // console.log(responseText); //response.text())을 반환 받아서 전달된것
  document.querySelector(".container").insertAdjacentHTML("afterbegin", responseText);
})  