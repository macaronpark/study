# Box model

- [Box model](#box-model)
  - [영역](#영역)
    - [Padding](#padding)
    - [Margin](#margin)
  - [제어](#제어)
  - [참고](#참고)

<br>

Box model은

- CSS의 핵심 기반
- 원활한 CSS 작성을 위해
  - 동작 방식,
  - 다른 CSS에 어떤 영향을 주는지,
  - 어떻게 제어할 수 있는지 알아야 함

## 영역

<img alt="The box model illustrated using physical picture frames." src="https://web.dev/static/learn/css/box-model/image/three-photo-frames-610a106217f8d_1440.jpg">

### Padding

- 요소의 content와 border 사이의 공간
- border에서 content를 밀어냄
- scroll bar가 있을 때, 이 공간 일부를 차지함

### Margin

- 요소 바깥의, 요소를 둘러싼 공간
- 박스에서 다른 요소를 밀어냄

## 제어

- User agent style sheet
  - 브라우저가 기본으로 적용하는 CSS 스타일 (브라우저별로 적용 스타일 값 다름)
  - 이 스타일에 포함되는 속성
    - `display`
      - 요소가 어떻게 레이아웃에 배치될지를 결정하는 가장 핵심적 CSS 속성
      - 값에 따라 마진, 너비 등의 동작 방식 상이
        - `block`
          - 한 줄 전부 차지 → 아래로 쌓임
          - width, height, margin, padding 다 적용됨
          - 예: `<div>`, `<p>`, `<section>`
        - `inline`
          - 텍스트처럼 줄 안에 배치됨 (옆으로 나열됨)
          - width, height 안 먹힘
          - margin, padding은 좌우만 적용됨 (상하 무시됨)
          - 예: `<span>`, `<a>`, `<strong>`
        - `inline-block`
          - inline처럼 옆에 배치됨
          - width, height 먹힘
          - 인라인의 배치 + 블록의 사이즈 지정 기능
        - `none`
        - `flex`
        - `grid`
    - `box-sizing`
      - 기본 값: `content-box`
        - border나 padding을 제외한 content만을 기준으로 박스 크기가 계산되는 방식

## 참고

- [MDN - Box Model](https://web.dev/learn/css/box-model)
