# CSS 가독성 <!-- omit from toc -->

- [You want enabling CSS selectors, not disabling ones](#you-want-enabling-css-selectors-not-disabling-ones)

<br>

## You want enabling CSS selectors, not disabling ones

- 문제 상황
  - `<li>` border-bottom을 주되, 마지막 요소에는 border를 주고 싶지 않은 경우
- 기존 방식 (Disabling Selector)

  - 문제점: 규칙을 적용한 후 다시 비활성화 함

    ```css
    li {
      border-bottom: 1px solid black;
    }

    li:last-child {
      border-bottom: none;
    }
    ```

- 개선 방식 (Enabling Selector)
  - `:not()` 사용
    ```css
    li:not(:last-child) {
      <!-- 마지막이 아닌 요소에만 border bottom 적용 -->
      border-bottom: 1px solid black;
    }
    ```
  - `+` 인접 형제 셀렉터 사용
    ```css
    li + li {
      <!-- 이전 형제가 있는 요소에만 border top 적용 -->
      border-top: 1px solid black;
    }
    ```
- Enabling Selector의 좋은점
  - 코드 간결성: 필요한 override가 없어서 코드량이 줄어듦
  - 가독성: 의도가 명확하게 드러남
  - 유지보수성: 포인트가 한 곳으로 집중되어 나중에 수정할 때 안전함
  - 성능: CSS specificity 충돌이나 cascading 문제가 줄어듦
- 참고: [dev.to - You want enabling CSS selectors, not disabling ones](https://dev.to/starbist/you-want-enabling-css-selectors-not-disabling-ones-4l63)
