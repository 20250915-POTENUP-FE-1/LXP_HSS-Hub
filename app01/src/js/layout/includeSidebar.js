// layout>sidebar.html 웹문서 요청 -> html 문구 텍스트 
fetch("/layout/sidebar.html")
.then( (response) => response.text() )  
.then( (responseText) => {
  document.querySelector(".main-container").insertAdjacentHTML("afterbegin", responseText); 
}) 