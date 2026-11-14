# Regression: homepage CSP (single meta w/ connect-src 'self') + /api/track/access tracking
import os, re, uuid, requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')


def test_homepage_single_csp_with_connect_src():
    html = requests.get(f"{BASE_URL}/", timeout=20).text
    metas = re.findall(r'<meta[^>]*http-equiv=["\']content-security-policy["\'][^>]*>', html, re.I)
    assert len(metas) == 1
    assert "connect-src 'self'" in metas[0]
    assert '/api/track/access' in html


def test_track_access_ok_and_dedup():
    vid = f"TEST_v_{uuid.uuid4().hex[:8]}"
    payload = {"page": "/", "user_agent": "pytest", "extra": {"visitor_id": vid}}
    r1 = requests.post(f"{BASE_URL}/api/track/access", json=payload, timeout=20)
    assert r1.status_code == 200 and r1.json() == {"ok": True}
    r2 = requests.post(f"{BASE_URL}/api/track/access", json=payload, timeout=20)
    assert r2.status_code == 200 and r2.json().get("skipped") == "duplicate"


def test_track_access_skips_admin():
    r = requests.post(f"{BASE_URL}/api/track/access", json={"page": "/donaspainel", "extra": {}}, timeout=20)
    assert r.status_code == 200 and r.json().get("skipped") == "admin"
