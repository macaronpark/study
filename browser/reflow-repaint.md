# Reflow vs. Repaint

- [Reflow vs. Repaint](#reflow-vs-repaint)
  - [Reflow](#reflow)
  - [Repaint](#repaint)
  - [참고](#참고)

## Reflow

- 발생 시점
  - 브라우저가 특정 부분의 **position과 geometry를 다시 계산해야할 때**
  - 페이지 **레이아웃에 영향을 주는 변경이 발생할 때**
    - 트리거 예시
      - 브라우저 창 크기 변경
      - 폰트 변경
      - 컨텐츠 변경 (예: input box에 text 입력)
      - DOM 요소 추가, 삭제, 클래스 변경
      - offsetWidth, offsetHeight 계산
- 이후 화면을 다시 그리는 repaint 으로 이어지는 경향이 있음

## Repaint

- 발생 시점
  - 브라우저가 시각적 업데이트를 보여주기 위해 **화면을 다시 그려야할 때**
  - 레이아웃이 변경되지 않더라도 **가시성에 변화가 생길 때**
    - visibility, background color, outline

## 참고

- [MDN - Reflow](https://developer.mozilla.org/en-US/docs/Glossary/Reflow)
- [MDN - Repaint](https://developer.mozilla.org/en-US/docs/Glossary/Repaint)
- [dev.to - Understanding Reflow and Repaint in the browser](https://dev.to/gopal1996/understanding-reflow-and-repaint-in-the-browser-1jbg)
- [Nicole Sullivan - Reflows & Repaints: CSS Performance making your JavaScript slow?](https://www.stubbornella.org/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/#tables)
