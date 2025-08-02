# 브라우저 렌더링 과정(Critical Rendering Path)

Q. 브라우저가 화면을 렌더링하는 과정?<br>
Q. Reflow와 Repaint가 실행되는 시점?

<br>

- [브라우저 렌더링 과정(Critical Rendering Path)](#브라우저-렌더링-과정critical-rendering-path)
  - [점진적 렌더링(Progressive Rendering)](#점진적-렌더링progressive-rendering)
  - [CRP(Critical Rendering Path)](#crpcritical-rendering-path)
    - [브라우저는 초기 렌더링을 위해 어떤 리소스를 기다려야 할까?](#브라우저는-초기-렌더링을-위해-어떤-리소스를-기다려야-할까)
    - [Render-blocking resources](#render-blocking-resources)
    - [Parser-blocking resources](#parser-blocking-resources)
  - [참고](#참고)

<br>

## 점진적 렌더링(Progressive Rendering)

- 웹의 분산적 특성
  - 브라우저는 HTML, CSS, JavaScript 파일을 받아서 페이지를 그림
  - 앱과 다르게 모든 리소스가 준비되어있지 않음
- 렌더링 타이밍의 딜레마
  - 너무 빠르면: HTML만 있고 CSS, JavaScript 없이 깨진 화면 노출. 이후 다시 변경되는 좋지 않은 사용자 경험 발생
  - 너무 느리면: 모든 리소스를 전부 기다리면 사용자가 불필요하게 오랜 시간동안 빈 화면을 보고있어야 함
- **CRP(Critical Rendering Path)의 중요성**
  - 브라우저의 첫 렌더링을 위해 최소한으로 필요한 리소스가 무엇인지 알아야 함
  - CRP를 이해하면 초기 렌더링을 불필요하게 block 하지 않으면서도, 너무 일찍 렌더링되어 깨진 화면을 보여주지 않을 수 있음

## CRP(Critical Rendering Path)

브라우저가 초기 렌더링을 수행하기 전 거치는 단계

![The rendering process, as detailed in the previous list.](https://web.dev/static/learn/performance/understanding-the-critical-path/image/fig-1-v2.svg)

- (1) HTML에서 `Document Object Model (DOM)` 구성
- (2) CSS에서 `CSS Object Model (CSSOM)` 구성
- (3) DOM과 CSSOM에 영향을 주는 JavasScript 적용
- (4) DOM과 CSSOM에서 `Render Tree` 구성
  - `display: none` => ❌ 포함되지 않음
  - `visibility: hidden` => 🟢 포함 됨 (자리를 차지해서)
- (5) `Style`, `Layout`: 어떤 요소를 어떻게 배치할지 확인
- (6) `Paint`: 메모리 내 요소의 픽셀 그리기
- (7) `Composite`: 겹치는 픽셀 합성
- (8) `Display`: 모든 결과 픽셀을 화면에 물리적으로 그리기

> [!NOTE]
>
> [chrome for developers - RenderingNG architecture](https://developer.chrome.com/docs/chromium/renderingng-architecture)에서 세부 단계와 더 자세한 설명을 확인할 수 있다.

### 브라우저는 초기 렌더링을 위해 어떤 리소스를 기다려야 할까?

기다리는 것과 안 기다리는 것이 명확히 구분됨

- **브라우저: "기다릴게" (Critical Resources)**
  - HTML 일부분 (전체 아님 ❌, 브라우저가 HTML을 스트리밍 방식으로 처리하므로 전체를 기다리지 않음)
  - `<head>` 내의 render-blocking CSS
  - `<head>` 내의 render-blocking JavaScript
- **브라우저: "안 기다릴게" (Non-Critical Resources)**
  - 전체 HTML
  - 폰트/이미지 => 나중에 로드되면서 레이아웃이 밀릴 수 있음 (CLS)
  - `<head>` 밖의 non-render-blocking JavaScript
  - `<head>` 밖의 non-render-blocking CSS 또는 현재 뷰포트에 적용되지 않는 CSS
- 주의
  - `<head>` 내에 있다고 전부 render-blocking은 아님
  - render-blocking, parser-blocking CSS/JavaScript 개념을 알아야 함

### Render-blocking resources

너무 중요해서 브라우저가 페이지 렌더링을 멈추고 기다리는 리소스

- `CSS`
  - 브라우저가 CSS를 만나면 (인라인, 외부 파일 모두) CSS를 완전히 다운로드하고 처리할 때까지 렌더링을 중단함
  - 현재 조건에 맞지 않는 media 속성 CSS 제외 (예: `media=print`)
- 브라우저의 효율적 처리 방식
  - render-blocking이라고 해서 브라우저가 아무것도 안하는 게 아님
  - HTML 파싱과 같은 다른 작업은 계속 진행
- 브라우저별 발전 과정
  - 과거에는 render-blocking 리소스가 전체 페이지 렌더링을 막았음
  - 최근 브라우저들은 **해당 리소스 아래 컨텐츠만 렌더링을 막음**
    - => `<head>` 내 리소스의 의미: 전체 페이지 렌더링에 영향을 줌
  - Chrome 105부터 `blocking=render` 속성으로 개발자가 명시적으로 제어 가능
    ```html
    <head>
      <!-- 원래는 non-render-blocking이지만 중요한 폰트라서 기다리고 싶음 -->
      <link rel="preload" href="critical-font.woff2" as="font" blocking="render" />
    </head>
    ```

### Parser-blocking resources

브라우저가 HTML 파싱을 진행하는 것을 막는 리소스

- `JavaScript`
  - 기본적으로 parser-blocking (async나 defer가 없다면)
    - DOM을 변경할 수 있기 때문
    - parser가 멈추면 그 이후 컨텐츠에 접근할 수 없어 렌더링도 불가능
- `<head>` 내 parser-blocking
  - 페이지 전체 컨텐츠 렌더링을 막음
  - 파싱이 완료될 때까지 그 전까지 받은 HTML만 렌더링할 수 있음
  - 브라우저의 대응
    - preload scanner라는 보조 HTML 파서 사용
    - 주 파서가 block된 동안 미리 리소스 다운로드
- `<script>`
  | 속성 | 파싱 중단 여부 | 실행 시점 | 실행 순서 보장 |
  | ----------- | ---------------------- | ---------------------- | ---------------- |
  | 없음 (기본) | ⛔ 중단됨 | 다운로드 후 즉시 실행 | ✅ 파일 순서대로 |
  | `async` | ⚠️ 실행 시 잠깐 중단됨 | 다운로드 후 즉시 실행 | ❌ 순서 보장 X |
  | `defer` | ➡️ 중단 안 됨 | HTML 파싱 완료 후 실행 | ✅ 순서 보장 O |

## 참고

- [web.dev - Understand the critical path](https://web.dev/learn/performance/understanding-the-critical-path)
