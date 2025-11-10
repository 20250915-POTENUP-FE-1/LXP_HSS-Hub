import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookDetail.css";
import Button from "../common/Button";

function BookDetail({ book }) {
  //{ book } → 부모 컴포넌트에서 전달받은 book 객체를 구조분해할당.
  const navigate = useNavigate();

  return (
    <div className="book-detail">
      <div className="detail-header">
        <div className="title-group">
          {/* 책 제목(book.title) 보여줌 */}
          <h2 className="title">{book.title}</h2>
          {book.soldOut && <span className="badge">품절</span>}
        </div>
        {/* ategory-box → 책의 카테고리 이름 표시 (book.category.categoryName) */}
        <div className="category-box">{book.category.categoryName}</div>
      </div>
      {/* 저자(book.author)를 보여주는 부분 */}
      <div className="meta">
        <span className="author">{book.author}</span>
      </div>
      {/* toLocaleString() → 숫자를 천 단위 구분자 넣어서 보기 좋게 변환 */}
      <div className="price">₩{book.price.toLocaleString()}</div>
      <div className="actions">
        {/* Button 컴포넌트 사용, variant="secondary" → 스타일 옵션 지정 */}
        <Button variant="secondary">주문하기</Button>
      </div>
    </div>
  );
}

export default BookDetail;
