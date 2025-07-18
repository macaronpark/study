# 자료형

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
