# PRD — IBGE 2026 – Cesgranrio / Processo Seletivo Simplificado

## Origem
- Base clonada de repo `projetctor-concurso-prefeitur-curitiba-004`.
- **12/Nov/2026**: Projeto independente — página inicial substituída por IBGE 2026 Cesgranrio. Banco separado (`ibge_2026_db`).

## Stack
- Backend: FastAPI (`/app/backend`) — `server.py`, `admin_routes.py`.
- Frontend: páginas estáticas em `/app/frontend/public/` + bundle React do painel admin em `/app/frontend/public/donaspainel/`.
- Banco: MongoDB (`ibge_2026_db`).

## Credenciais
Ver `/app/memory/test_credentials.md`.

## Implementado

### 12/Nov/2026
1. **Página inicial IBGE 2026** — `inicio.html` com conteúdo Cesgranrio (27.279 vagas, R$ 1.741,00, Nível Fundamental)
2. **Página de inscrição IBGE** — `/inscricao-ibge` com seção "Nível Fundamental" retraída/expansível
3. **Fluxo conectado** — Home → INSCREVA-SE → inscricao-ibge → INSCREVER-SE → termos → CONTINUAR → inscricao (formulário)
4. **Branding IBGE/Cesgranrio** — Todas as páginas atualizadas: IBGP→Cesgranrio, Porto Velho→IBGE 2026, logos, footer, emails
5. **Header/Footer Cesgranrio** — Logo oficial Cesgranrio extraído e aplicado como componente compartilhado em todas as páginas
6. **Cores padronizadas #42517A** — Todos os botões e acentos em azul Cesgranrio (zero vermelho)
7. **Banco independente** — `ibge_2026_db` separado do projeto anterior
8. **VLibras removido** — Widget de acessibilidade externo removido
9. **Loading 1s** — Transição de 1 segundo entre todas as páginas
10. **Links externos removidos** — Todos os `href` externos neutralizados
11. **Integrações preservadas** — CSP, tracking `/api/track/access`, bfcache handler, loading overlay
12. **Bug fix: formulário inscrição** — Corrigido `.bgConcurso` sendo escondido por CSS/JS injetado, formulário agora visível

## Backlog
- P1 — Verificar CSP na inicio.html para tracking (connect-src pode estar faltando)
- P2 — Consolidar camadas CSS nas páginas do fluxo para manutenibilidade
- P2 — Melhorias no painel admin (renomear para IBGE 2026)

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
│       ├── inicio.html
│       ├── inscricao-ibge.html
│       ├── termos-concurso.html
│       ├── inscricao.html
│       ├── dados-inscricao.html
│       ├── confirmacao.html
│       ├── pagamento-pix.html
│       ├── inscricao-realizada.html
│       ├── comprovante-inscricao.html
│       ├── assets/
│       │   ├── cesgranrio-logo.png
│       │   ├── cesgranrio-footer-logo.png
│       │   ├── cesgranrio-shared.css
│       │   └── home/img1.webp (logo IBGE)
│       ├── seduc/concurso.js
│       ├── idcap/
│       │   ├── chrome.css
│       │   └── parts.json
│       └── donaspainel/
│           ├── index.html
│           └── admin-extras.js
```
