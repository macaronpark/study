# vi.spyOn

- [vi.spyOn](#vispyon)
  - [개념](#개념)
  - [참고](#참고)

## 개념

- **특정 객체 내 메서드의 호출을 감시하고 기록**하는 역할
- 실제 함수의 동작에 영향을 주지 않고도 호출 여부, 횟수, 인자 등의 호출 관련 정보 기록
- 필요에 따라 원래 구현 변경 가능 (mocking)

```javascript
it("plantNewMushroom: 새로운 버섯을 심는 이벤트를 트리거해야 한다", () => {
  const fieldID = "field-1";
  const spyOnEventBus = vi.spyOn(EventBus, "emit");

  GameLogic.plantNewMushroom({ fieldID });

  expect(spyOnEventBus).toHaveBeenCalledWith({
    from: CONFIG.MODULE_ID.GAME_LOGIC,
    e: CONFIG.EVENT_ID.SET_NEW_MUSHROOM,
    data: {
      fieldID,
      growthStage: CONFIG.GROWTH_STAGE.MYCELIUM,
      growthTime: {
        fruitingToMature: expect.any(Number),
        myceliumToFruiting: expect.any(Number),
      },
      id: expect.any(String),
      name: expect.any(String),
      plantedAt: expect.any(Number),
      rarity: expect.any(Number),
      type: expect.any(String),
    },
  });

  spyOnEventBus.mockRestore();
});
```

## 참고

- [Vitest - vi.spyOn](https://vitest.dev/api/vi.html#vi-spyon)
