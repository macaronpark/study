# 배열 (Array)

- [배열 (Array)](#배열-array)
  - [`Array()` vs `new Array()`](#array-vs-new-array)
  - [`Array.from(arrayLike, mapFn)`](#arrayfromarraylike-mapfn)
  - [참고](#참고)

## `Array()` vs `new Array()`

- 새로운 Array 객체 생성
- Array()는 `new`를 붙이거나 붙이지 않고 호출할 수 있음
  - 둘 다 새 Array 인스턴스를 생성

```javascript
const arr1 = new Array(3);
const arr2 = Array(3);

console.log(arr1); // [ <3 empty items> ]
console.log(arr2); // [ <3 empty items> ]
```

## `Array.from(arrayLike, mapFn)`

- 순회 가능 또는 유사 배열 객체에서 얕게 복사된 새로운 Array 인스턴스 반환

```javascript
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]

// 배열의 각 위치가 `undefined`로 초기화
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```

## 참고

- [MDN - Array()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Array)
- [MDN - Array.from()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
