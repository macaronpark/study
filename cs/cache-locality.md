# 캐시 지역성 (Cache Locality) <!-- omit from toc -->

컴퓨터도 사람처럼 방금 쓴 걸 또 쓰거나, 비슷한 것들을 연달아 쓰는 행동 양상을 보인다.
이를 미리 예상해서 준비해두면 속도를 훨씬 빠르게 할 수 있다는 원리다.

캐시 지역성이란 CPU가 데이터를 참조할 때 특정 데이터를 반복적으로 사용하거나, 인접한 데이터를 연속적으로 사용하는 경향을 의미한다.

<br>

- [시간/공간 지역성](#시간공간-지역성)
- [중요한 이유](#중요한-이유)
- [예시](#예시)

<br>

## 시간/공간 지역성

- 시간 지역성 (Temporal Locality)
  - 한 번 사용한 데이터는 다시 사용할 가능성이 높음
- 공간 지역성 (Spatial Locality)
  - 현재 사용 중인 데이터의 근처 데이터를 사용할 가능성이 높음

<br>

## 중요한 이유

- CPU와 메모리의 속도 차이 => 100배 이상
  - CPU: 매우 빠름. 용량 작은 캐시 메모리
  - 메인 메모리: 상대적으로 느림. 용량 큼
- 캐시의 지역성 원리를 이용해
  - 자주 쓰는 데이터는 빠른 캐시에 미리 저장
  - 근처 데이터도 함께 가져와서 준비
  - 결과적으로 전체 시스템이 빨라짐

<br>

## 예시

```js
// 나쁜 예: 매번 DOM을 새로 찾음
document.getElementById("button1").style.color = "red";
document.getElementById("button1").style.fontSize = "16px";
document.getElementById("button1").addEventListener("click", handler);

// 좋은 예: 한 번 찾은 요소를 재사용 (시간 지역성 활용)
const button = document.getElementById("button1");
button.style.color = "red";
button.style.fontSize = "16px";
button.addEventListener("click", handler);
```
