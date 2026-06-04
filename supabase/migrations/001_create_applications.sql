-- itda: 서비스 신청 테이블
CREATE TABLE IF NOT EXISTS applications (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  email         TEXT,
  service_type  TEXT        NOT NULL DEFAULT 'free',
  message       TEXT,
  privacy_agreed BOOLEAN    NOT NULL DEFAULT true,
  status        TEXT        NOT NULL DEFAULT 'pending',  -- pending | contacted | completed
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 누구나 신청 제출 가능 (공개 폼)
CREATE POLICY "public_insert" ON applications
  FOR INSERT WITH CHECK (true);

-- 인증된 관리자만 조회 가능
CREATE POLICY "admin_select" ON applications
  FOR SELECT USING (auth.role() = 'authenticated');

-- 인증된 관리자만 수정 가능
CREATE POLICY "admin_update" ON applications
  FOR UPDATE USING (auth.role() = 'authenticated');

-- updated_at 자동 갱신
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


