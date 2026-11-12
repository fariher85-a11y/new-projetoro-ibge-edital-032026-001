# PRD — IBGE 2026 – Cesgranrio / Processo Seletivo Simplificado

## Origem
- Base clonada de repo `projetctor-concurso-prefeitur-curitiba-004`.
- Rebrand para Porto Velho/IBGP em sessões anteriores (fork anterior).
- **12/Nov/2026**: Projeto independente — página inicial substituída por IBGE 2026 Cesgranrio. Banco separado (`ibge_2026_db`).

## Stack
- Backend: FastAPI (`/app/backend`) — `server.py`, `admin_routes.py`.
- Frontend: páginas estáticas em `/app/frontend/public/` + bundle React do painel admin em `/app/frontend/public/donaspainel/`.
- Banco: MongoDB (`ibge_2026_db`).

## Credenciais
Ver `/app/memory/test_credentials.md`.

## Implementado

### 12/Nov/2026 — Novo Projeto IBGE 2026
1. **Página inicial substituída** — `inicio.html` com conteúdo Cesgranrio IBGE 2026 (27.279 vagas, R$ 1.741,00, Nível Fundamental)
2. **Página de inscrição IBGE** — `/inscricao-ibge` com seção "Nível Fundamental" retraída/expansível + toggle JavaScript customizado
3. **Fluxo conectado** — Home → INSCREVA-SE → inscricao-ibge → INSCREVER-SE → termos-concurso → Continuar → fluxo de inscrição
4. **Branding atualizado em todas as páginas** — IBGP→Cesgranrio, Porto Velho→IBGE 2026, logos, footer, emails, endereço
5. **Banco independente** — `ibge_2026_db` separado do projeto anterior (`test_database`)
6. **VLibras removido** — Widget de acessibilidade externo removido (não funciona sem backend externo)
7. **Loading 1s** — Transição de 1 segundo entre todas as páginas do fluxo
8. **Links externos removidos** — Todos os `href` para sites externos neutralizados
9. **Integrações preservadas** — CSP, tracking `/api/track/access`, bfcache handler, loading overlay

## Páginas do Fluxo (atualizadas)
- `inicio.html` — Página inicial IBGE 2026
- `inscricao-ibge.html` — Detalhes do edital/cargo (Cesgranrio)
- `termos-concurso.html` — Termos de inscrição
- `dados-inscricao.html` — Formulário de dados
- `confirmacao.html` — Confirmação dos dados
- `inscricao-realizada.html` — Inscrição concluída
- `pagamento-pix.html` — Pagamento via PIX
- `comprovante-inscricao.html` — Comprovante

## Backlog
- P1 — Verificar logo do concurso (img1.webp) — atualmente é texto gerado, pode ser melhorado com imagem oficial
- P2 — Revisão de textos residuais em páginas raramente visitadas
- P2 — Melhorias no feed de atividades do painel admin

## Arquitetura
```
/app/
├── backend/
│   ├── .env (DB_NAME=ibge_2026_db)
│   ├── server.py
│   └── admin_routes.py
├── frontend/
│   ├── .env
│   ├── craco.config.js
│   └── public/
│       ├── inicio.html            ← Página inicial IBGE 2026
│       ├── inscricao-ibge.html    ← Detalhes do edital (Cesgranrio)
│       ├── termos-concurso.html
│       ├── dados-inscricao.html
│       ├── confirmacao.html
│       ├── pagamento-pix.html
│       ├── inscricao-realizada.html
│       ├── comprovante-inscricao.html
│       ├── seduc/concurso.js
│       ├── idcap/chrome.css
│       └── donaspainel/
│           ├── index.html
│           └── admin-extras.js
```
