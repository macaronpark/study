# Object (객체)

- `key : value` 쌍으로 데이터를 저장
- `key` 문자형/심볼형, `value` 모든 자료형 허용

  ```javascript
  let obj = {
    0: "test", // 🪄 문자형/심볼형이 아닌 경우 문자형으로 자동 형 변환
  };

  console.log(obj["0"]); // test
  console.log(obj[0]); // test (동일한 프로퍼티)
  ```

- 프로퍼티 존재 여부 확인 방법

  - 존재하지 않는 프로퍼티에 접근하면 에러가 발생하지 않고 `undefined`를 반환
  - `in` 연산자

    ```javascript
    let obj = { test: undefined };

    console.log(obj.test); // undefined
    console.log("test" in obj); // true
    ```

- 정렬 방식
  - 키가 정수라면 자동 정렬
  - 그 외의 경우 객체에 추가한 순서 그대로 정렬

# Object vs. Map vs. Set

Map과 Set은 Object가 가진 근본적인 한계(키 타입 제한, 프로토타입 오염 위험성, 크기 계산 비효율성 등등)를 해결하기 위해 새롭게 설계된 전용 데이터 구조이다.

- **Object (프로퍼티 컨테이너)**
  - 레코드나 딕셔너리로 사용할 때
  - JSON 변환 쉬움
    - localStorage에 저장할 때 JSON.stringify 바로 적용 가능
    - Map의 경우에는 추가 변환 작업이 필요함
- **Map (키-값 저장소)**
  - key가 문자열 또는 정수 외의 타입인 경우
  - 삽입 순서가 유지되어야 하는 경우
  - 빈번한 추가, 삭제가 필요한 경우 (`set()`, `delete()`)
  - 크기를 자주 확인해야하는 경우 (`size`)
- **Set (고유값 집합)**
  - 중복을 제거해야 하는 경우
  - 존재 여부 확인이 빈번한 경우 (`has()`)
  - 집합 연산
