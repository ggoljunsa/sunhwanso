# 순환소 · Sunhwanso — 미드파이 웹앱

DGIST UI/UX 디자인 2026-1학기 후반기 팀프로젝트 **6조**의 미드파이 프로토타입.
NFC 스티커에 폰을 갖다 대면 그 옷의 이전 사용자·메시지·수선 기록이 펼쳐지는 캠퍼스 자원 순환 플랫폼.

`Blueprint v0.2` (`../순환소 · Blueprint v0.2 · 6조 (Print).pdf`)의 디자인 시스템을 그대로 옮겼습니다.

---

## 파일 구조

```
sunhwanso-app/
├── index.html      # 홈 / Browse (메인 진입)
├── loop.html       # 5단계 대여·반납
├── story.html      # NFC 스토리 (?id= 로 옷 분기)
├── temp.html       # 디지온도 + Map
├── about.html      # 프로젝트 설명
├── README.md       # 이 문서
└── assets/
    ├── styles.css  # 디자인 시스템 (테라코타 8색, Pretendard, IBM Plex Mono)
    ├── data.js     # 옷·스토리 mock 데이터
    └── app.js      # 공통 JS (그리드 렌더, 토스트 등)
```

순수 정적 HTML/CSS/JS — 빌드 없음, 의존성 없음. GitHub Pages에 그대로 올리면 됩니다.

---

## 1. GitHub Pages 배포 (3분)

1. GitHub에서 새 repo 생성: 예) `sunhwanso`
2. 이 `sunhwanso-app/` 폴더 내용을 repo 루트에 push:
   ```bash
   cd sunhwanso-app
   git init
   git add .
   git commit -m "init: sunhwanso mid-fi prototype"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/sunhwanso.git
   git push -u origin main
   ```
3. GitHub repo → **Settings → Pages → Source: `main` / `(root)`** 선택 → 저장
4. 1~2분 뒤 다음 URL이 살아납니다:
   ```
   https://<USERNAME>.github.io/sunhwanso/
   ```

> 폴더명을 `sunhwanso-app`이 아닌 다른 이름으로 두려면 그 폴더 내용물만 push하면 됩니다. **루트에 `index.html`이 있어야** Pages가 자동으로 잡습니다.

---

## 2. NFC 태그 작성 — 어떤 URL을 어디에 쓸까

**핵심 아이디어:** NFC 스티커마다 다른 URL을 적습니다. 하나의 시스템(웹앱)이지만 진입점이 달라서 각자 다른 화면을 보여줍니다.

예시 (`<BASE>` = `https://<USERNAME>.github.io/sunhwanso`):

| NFC 스티커 부착 위치 | 적을 URL | 보이는 화면 |
|---|---|---|
| 우드락 디오라마 정문 (① 입구) | `<BASE>/` | 홈 (Browse, 4개 옷 카탈로그) |
| 디오라마 ②③구역 옆 | `<BASE>/loop.html?id=00032` | 5단계 대여 흐름 (정장으로 데모) |
| **정장 미니어처에 부착** | `<BASE>/story.html?id=00032` | 정장 #32 이야기 |
| **우산 미니어처에 부착** | `<BASE>/story.html?id=00047` | 우산 #47 이야기 |
| **실험복 미니어처에 부착** | `<BASE>/story.html?id=00008` | 실험복 #8 이야기 |
| **블레이저 미니어처에 부착** | `<BASE>/story.html?id=00001` | 첫 사용자 모집 (빈 스토리) |
| 디오라마 ④구역 옆 | `<BASE>/temp.html` | 디지온도 + Map |
| 설명 카드 | `<BASE>/about.html` | 프로젝트 설명 |

→ **6~8개 스티커**면 전체 기능을 시연할 수 있습니다.

### NFC 태그에 URL 쓰는 법

**Android:** Play Store의 `NFC Tools` (무료) → "Write" 탭 → "Add a record" → "URL/URI" → 위 URL 입력 → "Write" → 폰을 스티커에 갖다 댐.

**iPhone:** App Store의 `NFC Tools` → "Write" 동일. iPhone은 잠금 화면에서 자동으로 URL 열림 (별도 앱 불필요).

### 새 옷을 추가하려면

`assets/data.js`의 `items` 객체에 새 키를 추가하면 그 ID로 바로 NFC URL을 만들 수 있습니다:

```js
"00099": {
  id: "00099",
  name: "후드",
  category: "생활",
  size: "Free",
  color: "차콜",
  emoji: "👕",
  locker: "C-01",
  storyBadge: "5명 거쳐옴",
  stock: 1,
  badgeStyle: "normal",
  headline: "이 후드는 5번의 밤샘을 함께했어요.",
  caption: "이번엔 당신의 차례. · ",
  nextNum: 6,
  timeline: [ /* ... */ ]
}
```

`story.html?id=00099`가 자동으로 살아납니다.

---

## 3. 로컬에서 테스트

배포 전에 로컬에서 확인:

```bash
cd sunhwanso-app
python -m http.server 8000
```
브라우저에서 `http://localhost:8000` 열기. 모바일 너비(420px 이하)로 봐야 자연스럽습니다 — 개발자도구 → 디바이스 툴바 → "iPhone 12 Pro" 등.

> `file://`로 직접 열어도 대체로 동작하지만, 일부 브라우저에서 `?id=` 쿼리가 빈 문자열로 잡히는 이슈가 있어 정적 서버를 권장.

---

## 4. 발표 시연 동선 (제안)

1. **회사·컨셉 소개 (ppt)** — 회사명 + 한 줄 컨셉
2. **디오라마 입장** — "이 우드락이 순환소 1호점입니다."
3. **태그 데모 1**: 정문에서 폰을 대 → 홈 화면(`/`) → "오늘 빌릴 수 있는 이야기들."
4. **태그 데모 2**: 정장 미니어처에 폰을 대 → `story.html?id=00032` → **"이 정장은 32명의 디펜스를 함께했어요"** ← 핵심 임팩트
5. **태그 데모 3**: ②구역에서 5단계 흐름(`loop.html?id=00032`) → NFC 버튼 누르며 단계 진행
6. **태그 데모 4**: ④구역에서 디지온도(`temp.html`) → "잘 반납할수록 온도가 오르고 우선권을 받습니다."
7. **마무리**: 비즈니스 모델 (ppt)

---

## 5. 디자인 시스템 (참고)

`Blueprint v0.2` 그대로:

| Token | HEX | 용도 |
|---|---|---|
| Terra | `#C25A35` | 주 강조색, 버튼, 스토리 배지 |
| Terra D | `#9B4225` | 그라데이션·active state |
| Clay | `#7D4A32` | 보조 텍스트 |
| Mustard | `#D99C2B` | 포인트 (당일/온도 게이지) |
| Paper | `#F6F1EA` | 배경 |
| Paper 2 | `#EFE7DA` | 카드 배경 |
| Line | `#CFC1AA` | 선·테두리 |
| Ink | `#2B231B` | 본문 텍스트, dark NFC 카드 |

폰트: **Pretendard** (본문/제목) + **IBM Plex Mono** (NFC ID·숫자·기록 톤). 둘 다 CDN에서 자동 로드.

---

## 6. 알려진 제한

- 첫 글로벌 폰트(Pretendard CSS) 로딩이 살짝 느릴 수 있음 — CDN 캐시 후엔 즉시.
- 이건 mid-fi 데모입니다: 실제 결제·인증·DB 없음. 메시지 게시도 화면에만 토스트로 표시되고 저장되지 않음.
- 모바일 세로(< 420px) 기준 디자인. 데스크톱은 가운데 핸드폰 모형 안에 렌더링됨.

---

**팀 6조** — 박진홍 · 장민준(팀장) · 조형윤 · 한정민
2026-1학기 UI/UX 디자인 후반기 팀프로젝트
