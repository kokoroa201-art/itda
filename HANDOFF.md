# 잇다 (itda) — 인수인계 문서

## 로컬 경로
```
C:\dev\itda
```

## Git / 배포 구조
| 브랜치 | URL | 용도 |
|--------|-----|------|
| `dev`  | https://iitda1.vercel.app | 개발·수정 (여기서 작업) |
| `main` | https://iitda.vercel.app  | 최종 배포 (완성 후 머지) |

**GitHub:** https://github.com/kokoroa201-art/itda.git  
**Vercel 팀:** kokoroa201-arts-projects  
**Vercel CLI:** 설치됨 (`vercel` 명령어 사용 가능)

---

## 기술 스택
- **Next.js 16** + React 19 + Tailwind CSS v4
- **Supabase** — 프로젝트: mhmzkmouggypahwslptx.supabase.co
- **배포:** Vercel (GitHub 연동)

### 환경변수 (.env.local)
```
# 실제 값은 로컬 .env.local 파일 참고 (Git에 포함 안 됨)
NEXT_PUBLIC_SUPABASE_URL=https://mhmzkmouggypahwslptx.supabase.co
NEXT_PUBLIC_PUBLISHABLE_KEY=sb_publishable_***
SUPABASE_SECRET_KEY=sb_secret_***
```

---

## 페이지 구조
| 경로 | 파일 | 설명 |
|------|------|------|
| `/` | `src/app/page.jsx` | 메인 (허브 다이어그램 + CTA) |
| `/about` | `src/app/about/page.jsx` | 서비스 소개 (Empathy 스타일 미션) |
| `/guide` | `src/app/guide/page.jsx` | 절차 가이드 (타임라인 5단계) |
| `/faq` | `src/app/faq/page.jsx` | 자주 묻는 질문 (아코디언) |
| `/services` | `src/app/services/page.jsx` | 해지 안내 (리스트 + 필터) |
| `/services/[id]` | `src/app/services/[id]/page.jsx` | 서비스 상세 |
| `/checklist` | `src/app/checklist/page.jsx` | 정리 체크리스트 (localStorage) |
| `/admin` | `src/app/admin/page.jsx` | 신청 목록 관리 |

---

## 주요 컴포넌트
| 파일 | 설명 |
|------|------|
| `src/components/Navbar.jsx` | **공통 헤더** — layout.jsx에 삽입, 모든 페이지 적용 |
| `src/components/LogoIcon.jsx` | 회사 로고 (Clearbit API + 이모지 폴백) |
| `src/components/ApplyModal.jsx` | 전문가 도움 요청 모달 → Supabase 저장 |

---

## 데이터
- **`src/data/services.js`** — 35개 서비스 데이터 (카테고리, 난이도, 링크 등)
- **`supabase/migrations/001_create_applications.sql`** — DB 스키마 (Supabase SQL Editor에서 실행 필요)

---

## 작업 흐름
```bash
# 1. dev 서버 실행
cd C:\dev\itda
npm run dev        # http://localhost:3000

# 2. 수정 후 배포
git add -A
git commit -m "수정 내용"
git push origin dev
vercel deploy --scope kokoroa201-arts-projects --prod
```

---

## Supabase — 아직 안 한 것
> **Supabase 대시보드 → SQL Editor에서 아래 파일 실행 필요**
```
supabase/migrations/001_create_applications.sql
```
실행하지 않으면 신청 폼(ApplyModal) 제출 시 오류 발생

---

## 현재 남은 작업 (우선순위 순)

### 반드시
- [ ] Supabase `applications` 테이블 생성 (위 SQL 실행)
- [ ] Vercel 환경변수 `iitda.vercel.app` (main 브랜치용)에도 등록 필요

### 중요
- [ ] `/about` 창업 스토리 텍스트 — 대표님 실제 경험으로 교체
- [ ] 가격 정책 확정 후 반영 (현재 "문의하기"로만 노출)
- [ ] 서비스 100개로 확장 (현재 35개)
- [ ] 회사 로고를 `/public/logos/` 에 직접 넣으면 더 선명해짐

### 추후
- [ ] `/checklist` → 서류 목록 PDF 출력 기능
- [ ] 로그인/회원가입 (Supabase Auth)
- [ ] admin 페이지 로그인 보안 강화
- [ ] B2B 파트너 페이지 (보험사·장례식장 연계)
- [ ] `dev → main` 머지 (최종 배포)

---

## 비즈니스 메모 (교수님 미팅)
- **수익 구조:** 정보 찾기=무료 / 서류작성도움=10만원 / 법무사·세무사=시장조사 후 확정
- **B2B2C 방향:** 보험사·은행에 복지혜택으로 판매 (Empathy 모델 참고)
- **QR 아이디어:** 사망신고 시 잇다 QR코드 발급 (보건복지부·지자체 연계)
- **경쟁사:** Memory-Link(한국), Empathy(미국), 안심상속(정부24)

---

## Vercel CLI 재로그인 (새 PC에서 필요 시)
```bash
vercel login
# 브라우저 열리면 승인
vercel teams list   # kokoroa201-arts-projects 확인
```

---

## 새 PC 환경 설정 순서
1. Node.js 설치 (https://nodejs.org — LTS 버전)
2. Git 설치 (https://git-scm.com)
3. VS Code 설치 (https://code.visualstudio.com)
4. VS Code에서 Claude Code 확장 설치
5. `git clone https://github.com/kokoroa201-art/itda.git`
6. `.env.local` 파일 직접 생성 (위 환경변수 참고, 실제 키 값 입력)
7. `.mcp.json` 파일 직접 생성:
   ```json
   {
     "mcpServers": {
       "supabase": {
         "type": "http",
         "url": "https://mcp.supabase.com/mcp"
       }
     }
   }
   ```
8. `npm install`
9. `npm run dev`
