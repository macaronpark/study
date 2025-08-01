# Array-like Object (유사 배열)

> - 유사 배열이란?
> - 왜 필요한가?
> - 유사 배열이 활용되는 경우?

- 배열처럼 보이지만 실제 배열이 아닌 객체

  ```javascript
  const arrLike = {
    0: "a",
    1: "b",
    2: "c",
    length: 3,
  };

  arrLike.length; // 3 - `length` 프로퍼티를 가진다.
  arrLike[0]; // "a" - 인덱스를 통해 접근할 수 있다.
  arrLike.push("d"); // TypeError: arrLike.push is not a function - Array.prototype의 메서드들(push, pop, map 등)을 사용할 수 없다.
  ```

- 활용 가능 포인트
  - **실제 배열**은 연속된 메모리 공간을 사용하고 다양한 메서드를 가진다. => 오버헤드 가능성
  - **유사 배열**은 필요한 기능만 제공해 가볍다.
- 활용 예시

  - 실시간으로 자주 변경될 수 있는 DOM 요소 컬렉션

    ```javascript
    const elements = document.getElementsByClassName("item"); // HTMLCollection
    console.log(elements.length); // 가능
    // elements.forEach(); // 에러! 배열 메서드 없음

    const nodes = document.querySelectorAll(".item"); // NodeList
    // NodeList는 forEach는 있지만 map, filter 등은 없음
    ```

  - 함수의 arguments 객체
    ```javascript
    function example() {
      console.log(arguments.length); // 가능
      console.log(arguments[0]); // 첫 번째 인자
      // arguments.push('new'); // 에러! 배열 메서드 없음
    }
    ```
  - 문자열

    ```javascript
    const str = "hello";
    console.log(str.length); // 5
    console.log(str[0]); // 'h'
    // str.push('!'); // 에러!
    ```

- 배열로 변환하기

  - `Array.from()` iterable 객체와 array-like 객체에서 얕게 복사된 새로운 Array 인스턴스 생성

    ```javascript
    const arrA = Array.from(arrLike);
    console.log(Array.isArray(arrA)); // true
    ```
