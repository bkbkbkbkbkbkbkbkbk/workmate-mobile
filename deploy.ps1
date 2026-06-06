# WorkMate Mobile 배포 스크립트
# 실행 방법: 이 파일을 우클릭 → PowerShell로 실행

Set-Location $PSScriptRoot

# ── 1. sw.js 버전 자동 증가 ──────────────────────────
$swPath = ".\sw.js"
$swContent = Get-Content $swPath -Raw -Encoding UTF8

# 현재 버전 번호 추출
if ($swContent -match "workmate-v(\d+)") {
    $currentVersion = [int]$Matches[1]
    $newVersion = $currentVersion + 1
    $swContent = $swContent -replace "workmate-v$currentVersion", "workmate-v$newVersion"
    Set-Content $swPath $swContent -Encoding UTF8 -NoNewline
    Write-Host "✓ sw.js 버전 업데이트: v$currentVersion → v$newVersion" -ForegroundColor Green
} else {
    Write-Host "✗ sw.js에서 버전을 찾을 수 없어요." -ForegroundColor Red
    Read-Host "아무 키나 눌러 종료"
    exit 1
}

# ── 2. git add & commit & push ───────────────────────
Write-Host "`n배포 중..." -ForegroundColor Cyan

git add .

$commitMsg = "release: v$newVersion"
git commit -m $commitMsg

git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✓ 배포 완료! (workmate-v$newVersion)" -ForegroundColor Green
    Write-Host "URL: https://bkbkbkbkbkbkbkbkbk.github.io/workmate-mobile/" -ForegroundColor Cyan
} else {
    Write-Host "`n✗ push 실패. 인터넷 연결 또는 GitHub 로그인 상태를 확인해주세요." -ForegroundColor Red
}

Write-Host ""
Read-Host "아무 키나 눌러 종료"
