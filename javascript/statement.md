8:29-8:53
10:25-10:45
12:00-12:13

# 조건문, 반복문

## if/else

- 범위, 복잡한 조건, 논리 연산에 사용

```javascript
// [조건]
// 18세 미만이면 → "미성년자"
// 18세 이상이고 role이 'admin'이면 → "관리자"
// 18세 이상이고 role이 'user'이면 → "일반사용자"
// role이 없거나 다른 값이면 → "권한없음"

// [질문]
// if/else 체인으로 작성
// 삼항연산자로도 작성
// 실무에서는 어떤 방식이 더 좋을지 생각

function checkUserStatus(user) {
  // 여기에 코드 작성
}

const user = { name: "Alice", age: 17, role: "admin" };
```

## switch

- fall-through: break를 만날 때까지 모든 case가 실행 됨
- break 필수. return 사용하면 자동 종료
- 정확한 비교, 많은 분기 시 사용

## `for...of` vs `for...in`

- `for...of`
  - 값(value) 순회
  - 배열 값에 바로 접근 가능
- `for...in`
  - 키(key/index) 순회
  - 객체 키 순회할 때 사용
  - 배열에 사용 시 배열의 상속받은 속성까지 순회할 수 있어 위험

## 참고

- [if와 '?'를 사용한 조건 처리](https://ko.javascript.info/ifelse)
- [switch문](https://ko.javascript.info/switch)
- [while과 for 반복문](https://ko.javascript.info/while-for)
