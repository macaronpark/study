# 자료형

- [자료형](#자료형)
  - [유사 배열 (Array-like Object)](#유사-배열-array-like-object)
  - [부동소수점의 정밀도 한계](#부동소수점의-정밀도-한계)
  - [typeof](#typeof)
  - [형 변환](#형-변환)
  - [참고](#참고)

## 유사 배열 (Array-like Object)

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

## 부동소수점의 정밀도 한계

- 자바스크립트에서 정수와 소수 모두 동일한 방식으로 처리되어 저장
  - 10진수 -> 2진수 변환 -> 64비트 구조에 데이터 저장
  - 10진수에서 2진수로 변환하는 과정에서 무한 소수가 발생
  - 정해진 공간에 저장하기 위해 반올림하면서 오차 발생

```javascript
0.1 + 0.7;
// 0.7999999999999999;
```

## typeof

```javascript
console.log(typeof null); // "object"
```

- 자바스크립트의 유명한 버그
- 웹 하위 호환성 때문에 계속 유지 중

```javascript
console.log(typeof []); // "object"
```

- 자바스크립트 배열은 특별한 종류의 "객체"임
- 배열 여부는 Array.isArray()로 체크 필요

## 형 변환

```javascript
console.log([] == false); // true
```

- `==` 동등 연산자는 타입이 다르면 형변환 후 비교
- `===` 일치 연산자는 형변환 없음. 타입과 값이 모두 같아야 true
- 형 변환 과정
  - (1) `[]`는 object, `false`는 boolean으로 타입이 달라 `==` 비교를 위해 형 변환 시작
  - (2) ES 명세에 따라 boolean을 숫자로 변환 => `[] == 0`
  - (3) object는 원시값으로 변환 (valueOf → toString 순서) => `"" == 0`
  - (4) 문자열을 숫자로 변환 => `0 == 0`

```javascript
console.log(null == undefined); // true
```

- 명세에서 정한 특별 규칙

  > [ECMAScript 2026 Language Specification](https://tc39.es/ecma262/#sec-abstract-equality-comparison)
  >
  > 7.2.13 IsLooselyEqual ( x, y ) <br>
  > 2.If x is null and y is undefined, return true.<br>
  > 3.If x is undefined and y is null, return true.

- 웹 하위 호환성 때문에 계속 유지 중

## 참고

- [모던 JavaScript 튜토리얼: 자료형](https://ko.javascript.info/types)
- [모던 JavaScript 튜토리얼: 형 변환](https://ko.javascript.info/type-conversions)
