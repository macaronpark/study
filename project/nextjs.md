# next.js <!-- omit from toc -->

## App router 도입 배경

### Page Router의 한계

- `pages/` 디렉토리 기준 라우팅
  - 파일 = 라우트 모델
  - 중첩 레이아웃 구현은 수동으로 구현했음
- 페이지 레벨에서만 서버 사이드 데이터 페칭 가능 (getServerSideProps, getStaticProps)
- 로딩 상태, 에러 처리를 수동으로 구현 (스피너, 사용자 정의 에러 바운더리)
- React 18의 최신 기능들(Server Components, Suspense) 활용 어려움

### App Router의 개선점

- `app/` 디렉토리 기준 라우팅
  - 단순히 파일이 URL이 되는 구조에서 **앱 전체의 사용자 경험을 설계하는 관점으로 변경됨**
  - layout, page, error, loading 등 앱 구조 자체를 모델링
- React Server Components 도입
  - 서버 전용 UI는 JS 번들에서 제외 => 전송/파싱 JS 감소
  - 서버 리소스 직접 접근 가능
- Streaming + Suspense 도입
  - 컴포넌트별로 독립적인 데이터 페칭
  - 준비된 부분부터 점진적으로 클라이언트에 전달
  - 체감 속도 향상 (전체 로딩 시간은 비슷할 수 있음)
