> Intrinsic size is the size an element wants to be — how much space it would naturally take up if unconstrained by things like its parent element or a fixed layout.
>
> [MDN: Intrinsic size](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size)

- HTML, CSS에서 콘텐츠 자체가 가지는 고유의 크기
- 부모나 CSS 스타일이 크기를 명시적으로 지정하지 않아도 콘텐츠가 자연스럽게 차지하려는 크기
- 예: `<img src="image.jpg">`에 width나 height를 따로 지정하지 않으면 이미지의 원본 크기를 intrinsic size로 사용한다.
- 중요 포인트
  - min-content, max-content, fit-content 같은 CSS 속성은 intrinsic size를 기반으로 동작한다.
    - min-content: 컨텐츠가 최소로 줄어든 크기 (minimum intrinsic size) 텍스트 컨텐츠의 경우 단어가 줄바꿈 없이 들어갈 최소 너비
    - max-content: 컨텐츠가 최대로 펼쳐졌을 때의 크기. 텍스트 컨텐츠의 경우 **줄바꿈 되지 않아** 오버플로우가 생길 수 있다.
    - fit-content:max-content를 넘지 않는, min과 max 너비에서 조정된 크기. 텍스트 컨텐츠의 경우 max-content와 달리 줄바꿈이 생길 수 있다.

참고

- [MDN: Intrinsic size](https://developer.mozilla.org/en-US/docs/Glossary/Intrinsic_Size)
