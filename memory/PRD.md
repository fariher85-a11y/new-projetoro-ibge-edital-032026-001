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
13. **Rebranding do Painel Admin** — `/donaspainel` renomeado para "IBGE 2026" em todos os textos e backend
14. **E-mails transacionais** — 3 templates (Boas-vindas, Sucesso, PIX) atualizados para IBGE 2026 / Cesgranrio
15. **Resend configurado** — Chave API do Resend injetada via ferramenta de segredos
16. **CSP corrigida** — Meta tag duplicada removida para permitir rastreamento na home

### 14/Nov/2026
17. **Auto-seleção de vagas (P0)** — `concurso.js` completamente reescrito: 1 Edital (IBGE 2026), 1 Escolaridade (Fundamental), 1 Cargo (Recenseador R$70,00). Todos os campos auto-selecionados ao carregar a página. Zero cargos antigos.
18. **Local de Prova — UF → Município** — Novo seletor com dropdown de UF (27 estados) + Município carregado de JSON local (5.571 municípios IBGE). Substitui o campo fixo "Porto Velho".
19. **Área de Trabalho — UF → Município** — Novo campo "Área de Trabalho" com o mesmo padrão UF → Município sede. Ambos os pares funcionam independentemente.
20. **Dados de municípios locais** — `municipios-br.json` com todos os municípios brasileiros hospedado localmente (sem dependência de API externa do IBGE).
21. **Backend atualizado** — Campos `uf_prova`, `area_trabalho`, `uf_trabalho` adicionados ao documento de inscrição.

### 14/Nov/2026 (cont.)
22. **Logo header corrigido (P0)** — Logo antigo IBGP em Base64 dentro do `parts.json` substituído por `/assets/cesgranrio-logo.png`. Header Cesgranrio correto em todas as páginas.
23. **Limpeza final de marca** — Referências residuais "Porto Velho" removidas de `finalizar.js` e `donaspainel-documentos.html`. Referência "PMPV" removida de `comprovante-inscricao.html`. Valor fallback R$90 corrigido para R$70 em `finalizar.js`.
24. **Auditoria visual completa** — Screenshots de todas as páginas públicas (desktop + mobile) validados: `inicio.html`, `inscricao-ibge.html`, `inscricao.html`, `dados-inscricao.html`, `inscricao-realizada.html`, `pagamento-pix.html`. Zero resquícios de marca antiga.

### 14/Nov/2026 (fix mobile)
25. **Hero mobile fix (P0)** — Injetado bloco `<style id="mobile-hero-fix">` no `<head>` (linha 17) de `inicio.html` com media queries (≤959px e ≤569px). Força `display:flex; flex-direction:column-reverse` na `.row-child > .row-inner` para mostrar logo IBGE acima do título. Texto alinhado à esquerda, botão sem sobreposição, layout idêntico ao site oficial cesgranrio.org.br. Desktop inalterado.
26. **FOUC fix (P0)** — CSS mobile movido do final do arquivo para o `<head>`, eliminando Flash of Unstyled Content reportado pelo usuário. Estilos carregam antes do conteúdo renderizar.
27. **Logo IBGE visível no mobile (P0)** — Removida regra `display:none` que escondia a coluna da logo IBGE. Agora exibe logo centralizada acima do título "IBGE 2026", igual ao site oficial.

## Backlog
- P1 — Melhorias no feed de atividade do painel admin (mensagem de vazio, contadores numéricos, filtro de data, exportação CSV)
- P2 — Consolidar camadas CSS nas páginas do fluxo para manutenibilidade

## Arquitetura
```
/app/
├── backend/
│   ├── .env (DB_NAME=ibge_2026_db)
│   ├── server.py
│   ├── admin_routes.py
│   └── email_service.py
├── frontend/
│   ├── .env
│   ├── craco.config.js
│   └── public/
│       ├── inicio.html
│       ├── inscricao-ibge.html
│       ├── termos-concurso.html
│       ├── dados-inscricao.html   (form principal com UF→Município)
│       ├── inscricao.html         (dados pessoais)
│       ├── confirmacao.html
│       ├── pagamento-pix.html
│       ├── inscricao-realizada.html
│       ├── comprovante-inscricao.html
│       ├── assets/
│       │   ├── cesgranrio-shared.css
│       │   └── home/img1.webp (logo IBGE)
│       ├── seduc/
│       │   ├── concurso.js          (auto-seleção de vagas)
│       │   ├── uf-municipios.js     (seletor UF→Município)
│       │   └── municipios-br.json   (5.571 municípios)
│       └── donaspainel/
│           ├── index.html
│           └── admin-extras.js
```
