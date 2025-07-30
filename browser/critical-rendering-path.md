# 브라우저 렌더링 과정

> Q. 브라우저가 HTML, CSS, JS를 받아서 어떻게 화면을 만드는가?

- [브라우저 렌더링 과정](#브라우저-렌더링-과정)
  - [과정](#과정)
    - [1. HTML 파싱 → DOM 트리 생성](#1-html-파싱--dom-트리-생성)
    - [2. CSS 파싱 → CSSOM 생성](#2-css-파싱--cssom-생성)
    - [3. Style Calculation: DOM + CSSOM → Render Tree 생성](#3-style-calculation-dom--cssom--render-tree-생성)
    - [4. Layout (Reflow): 위치와 크기 계산](#4-layout-reflow-위치와-크기-계산)
    - [5. Painting: 픽셀로 그리기](#5-painting-픽셀로-그리기)
    - [6. Compositing: 레이어 조합 → 화면에 표시](#6-compositing-레이어-조합--화면에-표시)
  - [참고](#참고)

## 과정

![The rendering process, as detailed in the previous list.](https://web.dev/static/learn/performance/understanding-the-critical-path/image/fig-1-v2.svg)

### 1. HTML 파싱 → DOM 트리 생성

- 브라우저가 HTML 파싱(동기적)

  - 외부 자원(stylesheet, script, img) 링크를 만날 때 마다 해당 자원에 대한 요청을 보냄
    - script
      | 속성 | 다운로드 | 파싱 중단 여부 | 실행 시점 | 실행 순서 보장 |
      | ------- | ---- | --------- | ------------------- | --------- |
      | 없음 (기본) |파싱 중| ⛔ 중단됨 | 다운로드 후 즉시 실행 | 파일 순서대로 |
      | `async` | 병렬 | ⚠️ 실행 시 잠깐 중단됨 | 다운로드 후 즉시 실행 | ❌ 순서 보장 X |
      | `defer` | 병렬 | ➡️ 중단 안 됨 | HTML 파싱 완료 후 실행 | ✅ 순서 보장 O |

- DOM(Document Object Model)
  - HTML 문서를 구조화된 트리 형태로 변환
  - 각 HTML 요소는 Node 객체로 표현됨
  - JavaScript는 DOM API를 사용해 이 Node들을 읽기/수정/삭제/생성 가능

### 2. CSS 파싱 → CSSOM 생성

- CSSOM(CSS Object Model)
  - 브라우저가 화면 렌더링에 필요한 **유효한 스타일 규칙들만 구조화**해서 모아놓은 객체 모델
  - 선택자와 스타일 속성 매핑

### 3. Style Calculation: DOM + CSSOM → Render Tree 생성

- Render Tree
  - 실제로 화면에 표시될 요소와 스타일만 추려낸 트리
    - `display: none` => ❌ 포함되지 않음
    - `visibility: hidden` => 🟢 포함 됨(자리를 차지해서)
- **무엇을 그릴지**가 정해진 단계
  - 어디에 그릴지는 아직 정해지지 않음
- 최적화 전략
  | 전략 | 설명 |
  | --------------------- | ------------------------------------------------ |
  | CSS 셀렉터는 **구체적으로** 쓰기 | 너무 복잡한 셀렉터 (`div ul > li a.active`)는 계산 비용이 큼 |
  | CSS 상속/겹침 최소화 | 스타일이 너무 많은 곳에서 상속/겹치면 계산 부담 증가 |
  | @import 대신 링크 사용 | `@import`는 병렬 로딩을 막고 렌더링을 지연시킴 |
  | 불필요한 스타일 제거 | 사용하지 않는 CSS(class, id, media query 등)는 번들 크기만 키움 |
  | CSS-in-JS 최적화 | 동적 스타일 생성 비용이 많으면 렌더링 병목 유발 (memoize 등 활용) |

### 4. Layout (Reflow): 위치와 크기 계산

- Render Tree를 기반으로 각 노드의 **정확한 위치(x, y)와 크기(width, height)** 계산
- Reflow는 Layout 과정이 다시 일어나는 걸 의미
  - 레이아웃이 변경되면 자식 요소들까지 다시 계산됨
  - 너무 자주 발생하면 성능 문제 생김
- Reflow 최적화 전략
  | 전략 | 설명 |
  | ---------------------------- | -------------------------------------------------------------------- |
  | DOM 조작은 한번에 모아서 처리 | 반복문 안에서 DOM을 반복 조작하지 말고, DocumentFragment 등을 활용 |
  | 스타일 변경은 클래스 변경으로 | 인라인 스타일 여러 개 바꾸는 것보다 className 토글이 더 효율적 |
  | 레이아웃 정보 접근 최소화 | 브라우저에게 지금 당장 최신 layout 정보를 요구해서 강제로 layout을 발생시키는 `offset*`, `getBoundingClientRect()` 등의 API 사용 줄이기 |
  | 애니메이션은 Layout을 유발하지 않는 속성 사용 | `transform`, `opacity`는 Reflow 없음. `top`, `left`, `width`는 Reflow 발생 |

### 5. Painting: 픽셀로 그리기

- Layout에서 계산된 정보를 바탕으로 요소들을 실제 픽셀로 변환
- 브라우저는 각 요소를 여러 레이어로 나누고 각 레이어를 별도로 paint
- paint가 발생하는 경우: 스타일 속성 변경, 클래스 토글, 애니메이션, 텍스트 변경 등
- Painting 최적화 전략
  | 전략 | 설명 |
  | ---------------------------- | ------------------------------------------------------------------------- |
  | **Paint 비용이 큰 속성 피하기** | `box-shadow`, `border-radius`, `filter`, `background-blur` 등은 Paint 비용이 큼 |
  | 복잡한 이미지 대신 CSS 효과 단순화 | 예: 이미지로 만든 그림자나 배경보다 간단한 색상 사용 |
  | CSS 애니메이션에 Paint 유발 요소 쓰지 않기 | `box-shadow` 애니메이션은 성능에 큰 영향을 줌 |
  | 클리핑/마스킹 최소화 | `clip-path`, `mask-image`는 Paint 비용 높음 |

### 6. Compositing: 레이어 조합 → 화면에 표시

- paint된 여러 레이어를 합쳐서 최종 화면에 출력하는 마지막 단계
- GPU에서 합성
- 독립 레이어가 많을수록 composition 비용 증가
  - `z-index`, `opacity`, `transform` 등이 새로운 레이어 생성
- 최적화 전략
  | 전략 | 설명 |
  | ---------------------- | ------------------------------------------ |
  | 애니메이션은 GPU 가속되는 속성만 사용 | `transform`, `opacity`는 GPU 사용으로 성능이 좋음 |
  | 필요할 때만 will-change 사용 | 너무 많은 요소에 `will-change` 사용하면 오히려 메모리 낭비 |
  | 레이어 수는 최소화 | 너무 많은 합성 레이어는 오히려 GPU 부하 증가 |
  | 하드웨어 가속을 남용하지 않기 | `translateZ(0)` 같은 트릭은 적절할 때만 사용 (과하면 역효과) |

## 참고

- [web.dev - Understand the critical path](https://web.dev/learn/performance/understanding-the-critical-path)
- [web.dev - Critical Rendering Path](https://web.dev/articles/critical-rendering-path)
- [web.dev - Efficiently load third-party JavaScript](https://web.dev/articles/efficiently-load-third-party-javascript#css-selector-performance)
- [web.dev - Rendering performance](https://web.dev/articles/rendering-performance)
- [web.dev - How to create high-performance CSS animations](https://web.dev/articles/animations-guide)
