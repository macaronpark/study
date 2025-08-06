# 값(Value)과 참조(Reference)

- 자바스크립트에는 두 가지 데이터 타입이 있음
  - 원시(primitive): null, undefined, boolean, string, number...
  - 참조(reference): object, function, array
- 변수가 생성되면 고정된 양의 메모리가 할당됨
  - 원시 값: 고정된 양의 메모리에 저장 가능 => 값 자체를 저장
  - 참조 값: 고정된 양의 메모리에 저장할 수 없는 크기 => 레퍼런스(참조 값이 실제로 저장된 메모리의 주소)를 저장
- 변수가 복사되면 메모리에 저장된 값 자체가 복사됨
  - 원시 값: 값 자체 복사
  - 참조 값: 레퍼런스 복사
- 변수를 함수 인자로 전달하면 변수의 복사본이 생성됨

```javascript
let original = 10;
let copied = original;

copied = 20;

console.log(original); // 10
console.log(copied); // 20
```

```javascript
let original = { age: 0 };

let copied = original;

copied.age = 100;

console.log(original.age); // 100
console.log(copied.age); // 100
```

## 참고

- https://gist.github.com/branneman/7fb06d8a74d7e6d4cbcf75c50fec599c
