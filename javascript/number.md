# 부동소수점의 정밀도 한계

- 자바스크립트에서 정수와 소수 모두 동일한 방식으로 처리되어 저장
  - 10진수 -> 2진수 변환 -> 64비트 구조에 데이터 저장
  - 10진수에서 2진수로 변환하는 과정에서 무한 소수가 발생
  - 정해진 공간에 저장하기 위해 반올림하면서 오차 발생

```javascript
0.1 + 0.7;
// 0.7999999999999999;
```
