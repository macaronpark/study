# Position

CSS `position` 속성은 문서 상에서 **요소를 배치하는 방법**을 지정한다.

<img alt="css position: static, relative, absolute, fixed, sticky" src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FWiMo5%2FbtsHmGmtrWz%2FAAAAAAAAAAAAAAAAAAAAAOz0sh6JVmQp4wJne8GA8adwzBUDoZPhMhymby908khY%2Fimg.webp%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1756652399%26allow_ip%3D%26allow_referer%3D%26signature%3Dtbf7x2zKHK%252BY%252FKIzOjMpEAtxle8%253D">

## static

- 일반적 문서 흐름에 따라 배치
- `top`, `right`, `bottom`, `left`, `z-index` 속성이 아무런 영향을 주지 않음

## relative

- 일반적 문서 흐름에 따라 배치
- 자기 자신을 기준으로 `top`, `right`, `bottom`, `left` 값에 따라 오프셋 적용
- 오프셋은 다른 요소에 영향을 주지 않음

## absolute

- 일반적 문서 흐름에서 제거
- 페이지 레이아웃에 공간도 배정하지 않음
- 가장 가까운 relative 부모를 기준으로 상대적 배치

## fixed

- 일반적 문서 흐름에서 제거
- 페이지 레이아웃에 공간도 배정하지 않음
- 특정 위치에 요소를 고정
- `top`, `right`, `bottom`, `left` 값에 따라 위치 지정
- 스크롤을 해도 fixed 요소를 지정된 위치에 고정

## sticky

- 일반적 문서 흐름에 따라 배치
- 스크롤 동작이 존재하는 가장 가까운 조상에 달라붙음
- 스크롤 되는 조상을 기준으로 `top`, `right`, `bottom`, `left` 값에 따라 오프셋 적용
- 오프셋은 다른 요소에 영향을 주지 않음
