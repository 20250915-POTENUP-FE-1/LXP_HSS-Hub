import './NotFoundPage.css';
import Button from '../../components/common/button/Button';

function NotFoundPage() {
  return (
    <>
      <div className="not-found-main">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-text">
            죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
            <br />
            URL이 정확한지 확인하시거나 홈페이지로 이동하세요.
          </p>
          <div className="not-found-button">
            <Button
              size="lg"
              block={true}
              onClick={() => {
                window.location.replace('/');
              }}
            >
              홈페이지로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
