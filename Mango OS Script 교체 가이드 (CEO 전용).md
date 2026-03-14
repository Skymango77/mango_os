# Mango OS Script 교체 가이드 (CEO 전용)

## 1. 정밀 위치

- 파일명: `profile_dashboard.html`
- 행번호: 약 597행 ~ 645행 (파일 끝까지)

## 2. 주의사항

- `authPi()` 함수가 파일 내에 **두 번 존재하면 안 됩니다.** 반드시 기존 것을 지우고 새 것을 넣으세요.
- `<script src="https://sdk.minepi.com/pi-sdk.js"></script>` 줄 아래에 위치해야 합니다.

## 3. 대표님 다음 액션

- [ ] VSCode에서 597행 근처 `async function authPi()`를 찾는다.
- [ ] 위 [통합본] 코드로 덮어쓰기 한다.
- [ ] `git push` 후 폰에서 확인한다.
