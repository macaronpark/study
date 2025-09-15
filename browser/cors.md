# CORS(Cross Origin Resource Sharing)

브라우저는 기본적으로 다른 도메인 간 요청을 허용하지 않는다. (Same-Origin Policy)
이러한 제한을 선택적으로 완화할 수 있는 방법이 CORS이다.
서버가 CORS 헤더를 통해 허용 범위를 설정하고 브라우저에서 이를 확인한다.

## same origin 기준

프로토콜, 도메인, 포트가 모두 같아야 함

- 예: `https://example.com:3000`
- `https://example.com:3000/api/users` => 🟢
- `http://example.com:3000/api/users` => ❌ 프로토콜이 다름(http !== https)
- `https://example.com/api/users` => ❌ 포트가 다름(3000 !== 433)
- `https://api.example.com:3000/users` => ❌ 도메인이 다름(example.com !== api.example.com)
