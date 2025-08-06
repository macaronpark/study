# 얕은 복사(Shallow copy) vs. 깊은 복사(Deep copy)

- 얕은 복사
  - 객체를 복사할 때, 참조형 속성이 원본 객체와 같은 레퍼런스를 공유함
  - 얕은 복사를 하는 JS standard built-in object-copy operations
    - spread syntax
    - Object.assign()
    - Array.from()
    - Array.prototype.slice() ...
- 깊은 복사
  - 내부의 참조형 속성까지 새로 복사해서 원본과 완전 독립적인 객체를 만듬
    ```javascript
    const ingredientsList = ["noodles", { list: ["eggs", "flour", "water"] }];
    const ingredientsListDeepCopy = JSON.parse(JSON.stringify(ingredientsList));
    ```
    - function, symbols, HTML DOM API와 같이 직렬화할 수 없는 객체는 JSON 방식으로 깊은 복사를 만들 수 없다.

## 참고

- https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy
- https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy
