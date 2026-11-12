# PRD — IBGE 2026 – Cesgranrio / Concurso Público (Porto Velho)

## Origem
- Base clonada de repo `projetctor-concurso-prefeitur-curitiba-004`.
- Rebrand para Porto Velho/IBGP concluído em sessões anteriores.
- **12/Nov/2026**: Página inicial substituída por novo projeto IBGE 2026 – Cesgranrio.

## Stack
- Backend: FastAPI (`/app/backend`) — `server.py`, `admin_routes.py`, `pix_generator.py`, `email_service.py`.
- Frontend: páginas estáticas em `/app/frontend/public/` + bundle React do painel admin em `/app/frontend/public/donaspainel/`.
- Banco: MongoDB (`MONGO_URL`).

## Credenciais
Ver `/app/memory/test_credentials.md`.

## Alterações recentes

### 12/Nov/2026 — Substituição da página inicial (IBGE 2026 – Cesgranrio)
- Página inicial (`inicio.html`) substituída pela página do concurso IBGE 2026 da Cesgranrio.
- HTML original salvo com SingleFile e transformado via script Python:
  - **Links externos removidos**: Todos os `href` apontando para `https://` foram neutralizados (trocados por `#`) para evitar que o usuário saia do projeto.
  - **CSP mantida**: Meta tag `Content-Security-Policy` adicionada com `connect-src 'self'` para permitir chamadas ao `/api/track/access`.
  - **Loading overlay preservado**: Overlay de carregamento com spinner e handler `data-nav` mantido.
  - **BFCache handler preservado**: Listener `pageshow` para limpar overlay ao usar botão "Voltar" do navegador.
  - **Script de tracking preservado**: Script que registra acessos via `POST /api/track/access` com `visitor_id` mantido.
  - **Widgets externos removidos**: Cookie consent (cmplz), GDPR overlay e botão de gerenciamento de consentimento foram removidos (não funcionam sem backend externo).
  - **Título atualizado**: `IBGE 2026 - Processo Seletivo Simplificado`.
- Verificado: acessos à nova página são registrados no MongoDB e aparecem no painel admin.

### Sessões anteriores (resumo)
- Rebrand completo Curitiba → Porto Velho/IBGP
- Filtro encadeado Certame → Escolaridade → Cargo
- Fix bfcache, CSP, PIX, datas de inscrição
- Filtro de atividades no painel admin
- Limpeza de arquivos órfãos

## Backlog
- P1 — Customizar textos/informações da nova página IBGE para o projeto específico do usuário
- P1 — Verificar se o botão VLibras (acessibilidade) deve ser removido ou mantido
- P2 — Revisão de textos residuais em páginas raramente visitadas
- P2 — Melhorias no feed de atividades (mensagem vazia, contador, filtro por data, exportar CSV)

## Arquitetura
```
/app/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   ├── server.py
│   └── admin_routes.py
├── frontend/
│   ├── .env
│   ├── craco.config.js
│   ├── package.json
│   └── public/
│       ├── inicio.html          ← Nova página IBGE 2026 Cesgranrio
│       ├── edital-24.html
│       ├── edital-25.html
│       ├── dados-inscricao.html
│       ├── termos-concurso.html
│       ├── seduc/
│       │   └── concurso.js
│       ├── idcap/
│       │   └── chrome.css
│       └── donaspainel/
│           ├── index.html
│           └── admin-extras.js
```
