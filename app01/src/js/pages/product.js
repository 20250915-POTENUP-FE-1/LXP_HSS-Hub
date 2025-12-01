
/*
  Mission1. 도서 추가 기능 
  + 도서명과 가격을 입력 후 "확인" 버튼 클릭하면 도서가 추가된다.
  + 도서명과 가격을 입력 후 "엔터키" 입력 시 도서가 추가된다.
  + 입력값이 누락되었을 경우 추가되지 않는다. (예외상황)
  + 도서 추가가 완료되면 입력 필드는 초기화한다.
  + 도서 추가 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다. 

  Mission2. 도서 수정 기능
  + 도서 정보의 "수정" 버튼 클릭시 모달 창이 뜬다. 
  + 모달 창이 열리면 수정할 도서의 기존 도서명과 가격이 미리 입력되어있다.
  - 모달창을 통해 신규 도서명,가격을 입력받고 저장 버튼 클릭시 도서명과 가격을 수정할 수 있다.

  Mission3. 도서 삭제기능
  - 도서 정보의 "삭제" 버튼 클릭시 브라우저에 제공되는 confirm창을 띄운다.
  - 해당 confirm 창에서 "확인" 버튼이 클릭되면 해당 도서가 삭제된다. 
  - 도서 삭제 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.
*/

const $ = (selector) => document.querySelector(selector);

function Product() {

  // Mission1. 도서 추가
  $("#book-regist-form").addEventListener("submit", (e) => {
    e.preventDefault(); 

    const bookName = $("#book-name-input").value;
    const bookPrice = Number($("#book-price-input").value);

    if(!bookName.trim() || !bookPrice){
      alert("값이 누락되었습니다. 값을 다 입력해주세요.");
      return;
    }

    const bookItem = `
      <li class="book-item">
        <div class="book-info">
          <span class="book-name">${bookName}</span>
          <span class="book-price">₩${bookPrice.toLocaleString()}</span>
        </div>
        <div class="book-actions">
          <button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
          <button class="delete-btn">삭제</button>
        </div>
      </li>
    `;

    $("#book-list").insertAdjacentHTML("beforeend", bookItem);

    $("#book-regist-form").reset(); // 입력폼 초기화
    $("#book-name-input").focus();

    $("#book-count").innerText = $("#book-list").children.length;

  })

  // Mission2. 도서 수정 
  $("#book-list").addEventListener("click", (e) => {
    
    // 클릭이벤트가 발생한 요소(이벤트 대상)가 수정버튼일 때만 
    if(e.target.classList.contains("edit-btn")){

      const $bookItem = e.target.closest(".book-item");
      
      const bookName = $bookItem.querySelector(".book-name").innerText;
      const bookPrice = Number($bookItem.querySelector(".book-price").innerText.replace(/[₩,]/g, ""));
      //   ul - (nodelist) li li li 
      // array 
      // $("#book-list").children.indexOf 
      //  Array.from($("#book-list").children).indexOf($bookItem)
      const bookIndex =  Array.from($("#book-list").children).indexOf($bookItem); // 10/1


      $("#edit-book-name").value = bookName;
      $("#edit-book-price").value = bookPrice;
      $("#edit-book-index").value = bookIndex; // 10/1
    }

  })

//모달창에서 수정요청시 (submit, 저장클릭시 ) 입력된 도서명, 가격 가져오기 251001
$("#book-edit-form").addEventListener("submit" , (e) => {
  e.preventDefault();

  const editBookName = $("#edit-book-name").value;
  const editBookPrice = Number($("#edit-book-price").value);
  const editBookIndex = $("#edit-book-index").value; // 10/1

  const $bookItem = $("#book-list").children[editBookIndex];

  // $("#book-list").children[editBookIndex].querySelector(".book-name").innerText = editBookName;
  // $("#book-list").children[editBookIndex].querySelector(".book-price").innerText =`₩${editBookPrice.toLocaleString()}`;

  $bookItem.querySelector(".book-name").innerText = editBookName;
  $bookItem.querySelector(".book-price").innerText =`₩${editBookPrice.toLocaleString()}`;

  $("#editModal .modal-close").click();
} )


}

// const product = new Product();