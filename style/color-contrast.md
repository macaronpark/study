# Color Contrast <!-- omit from toc -->

낮은 색상 대비는 웹 페이지의 가독성을 해침

- [확인하기](#확인하기)
  - [CSS Overview](#css-overview)
  - [Lighthouse](#lighthouse)
- [수정하기](#수정하기)

<br>

## 확인하기

### CSS Overview

- css overview 패널이란?
  - 웹 사이트의 CSS 통계를 확인할 수 있음
  - 사용되지 않는 CSS 선언, 대비 이슈 등 잠재적 CSS 개선점 파악에 용이함
- 색상 대비 확인 방법
  - [developer.chrome - Contrast issues in the CSS Overview panel](https://developer.chrome.com/docs/devtools/accessibility/contrast?utm_source=chatgpt.com#overview-contrast)
    ![Contrast issues in the CSS Overview panel](https://developer.chrome.com/static/docs/devtools/accessibility/contrast/image/list-contrast-issues-cs-636b0f83d6e21_1440.png)

### Lighthouse

- lighthouse란?
  - 웹 페이지 품질 개선을 위한 오픈소스 자동화 도구
  - Performance, Accessibility, SEO, BestPractice에 대한 audit 기능 제공
  - Chrome DevTools, CLI, Node module, Web으로 사용 가능
- 색상 대비 확인 방법
  - [developer.chrome - Contrast issues in a Lighthouse report](https://developer.chrome.com/docs/devtools/accessibility/contrast?utm_source=chatgpt.com#lighthouse-contrast)
    ![Contrast issues in a Lighthouse report](https://developer.chrome.com/static/docs/devtools/accessibility/contrast/image/the-contrast-section-the-8a7e7e9e32685_1440.png)

<br>

## 수정하기

- styles 패널 > color 선언 옆 사각형 색상 미리보기 클릭해서 color picker 열어서 색상 대비 비율을 확인할 수 있음
- **AA/AAA 준수를 위한 추천 색상**을 바로 적용할 수 있음
- 알려주는 **그래프 구역**을 참고해 색상을 정해볼 수 있음
  ![Fix low contrast text](https://developer.chrome.com/static/docs/devtools/accessibility/contrast/image/the-contrast-ratio-sectio-dbb2e34ad690d_1440.png)
