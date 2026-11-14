(function(){
  /* ====================================================
   *  IBGE 2026 — Processo Seletivo Simplificado
   *  Único certame · Único nível (Fundamental) · Único cargo (Recenseador)
   *  Todos os campos são auto-selecionados no carregamento.
   * ==================================================== */

  var CIDADES = [['PORTO VELHO/RO', 'PORTO VELHO/RO']];

  var C = {
    edital_ibge_2026: {
      titulo:       'IBGE 2026 - Processo Seletivo Simplificado - Edital N.\u00ba 03/2026',
      sigla:        'IBGE-PSS',
      orgao:        'IBGE 2026 - Processo Seletivo Simplificado',
      edital_opt:   'Edital N.\u00ba 03/2026 - Recenseador',
      edital_curto: 'Edital N.\u00ba 03/2026',
      orgao_edital: 'IBGE 2026 - Processo Seletivo Simplificado',
      logo:         '/assets/home/img1.webp',
      periodo:      '06/11/26 10:00 - 25/11/26 23:59',
      dataProva:    '31/01/2027 14:00:00',
      cargos: [
        {v:'REC', t:'RECENSEADOR (REC)', p:'70.00'}
      ],
      pagina: '/termos-concurso.html'
    }
  };

  var DEFAULT_KEY = 'edital_ibge_2026';
  var key = DEFAULT_KEY;
  var cur = C[key];

  window.SEAD_CONCURSO = {key: key, cfg: cur, catalogo: C};

  /* ---------- helpers ---------- */
  function fmtPreco(p){ return 'R$ ' + (p || '0.00').replace('.', ','); }

  function optHtml(list){
    return '<option value="">Selecione</option>' + list.map(function(c){
      return '<option value="' + c.v + '" data-price="' + c.p + '" data-title="' + c.t.replace(/"/g, '&quot;') + '">' +
             c.v + '  -  ' + c.t + '</option>';
    }).join('');
  }

  /* ---------- Textos dinâmicos ---------- */
  function applyCurTexts(){
    document.querySelectorAll('[data-c]').forEach(function(el){
      var k = el.getAttribute('data-c');
      if (cur[k] != null && el.textContent !== cur[k]) el.textContent = cur[k];
    });
    document.querySelectorAll('[data-c-src]').forEach(function(el){
      var k = el.getAttribute('data-c-src');
      if (cur[k] != null && el.getAttribute('src') !== cur[k]) el.setAttribute('src', cur[k]);
    });
  }

  /* ---------- Detalhes da vaga ---------- */
  function renderDetalhesVaga(){
    var vaga = document.getElementById('VAGA');
    var det  = document.getElementById('VAGA_DETALHES');
    if (!vaga || !det) return;
    var opt = vaga.options[vaga.selectedIndex];
    if (!opt || !opt.value) { det.innerHTML = ''; det.style.display = 'none'; return; }
    var codigo = opt.value;
    var titulo = opt.getAttribute('data-title') || '';
    var preco  = opt.getAttribute('data-price') || '0.00';
    det.style.display = 'block';
    det.innerHTML =
      '<div class="vaga-det-row"><strong>Cargo:</strong> ' + codigo + ' - ' + titulo + '</div>' +
      '<div class="vaga-det-row"><strong>Per\u00edodo de Inscri\u00e7\u00e3o:</strong> ' + cur.periodo + '</div>' +
      '<div class="vaga-det-row" style="margin-top:8px"><strong>Data da Prova:</strong> ' + cur.dataProva + '</div>' +
      '<div class="vaga-det-row"><strong>Valor da Inscri\u00e7\u00e3o:</strong> ' + fmtPreco(preco) + '</div>';
  }
  window.SEAD_CONCURSO.renderDetalhesVaga = renderDetalhesVaga;

  function ensureDetalhesBox(vaga){
    if (document.getElementById('VAGA_DETALHES')) return;
    var host = vaga.closest('.campo, .form-group, .form-row, p, .fgv-field') || vaga.parentNode;
    var box  = document.createElement('div');
    box.id        = 'VAGA_DETALHES';
    box.className = 'vaga-detalhes';
    box.setAttribute('data-testid', 'vaga-detalhes');
    box.style.cssText = 'display:none;margin-top:10px;padding:12px 14px;border:1px solid #e3e3e3;border-radius:6px;background:#fafafa;font-size:14px;line-height:1.55;color:#1f2937';
    host.parentNode.insertBefore(box, host.nextSibling);
  }

  /* ---------- Auto-preencher a vaga ---------- */
  function fillVaga(){
    var vaga = document.getElementById('VAGA');
    if (!vaga) return;
    vaga.innerHTML = optHtml(cur.cargos);
    // Auto-seleciona o único cargo
    if (cur.cargos.length === 1) {
      vaga.value = cur.cargos[0].v;
    }
    vaga.dispatchEvent(new Event('change', {bubbles: true}));
    renderDetalhesVaga();
  }
  window.SEAD_CONCURSO.fillVaga = fillVaga;

  /* ---------- Inicialização principal ---------- */
  function fill(){
    applyCurTexts();

    var vaga = document.getElementById('VAGA');
    if (vaga && !vaga.dataset.cfg) {
      vaga.dataset.cfg = key;
      var host = vaga.closest('.campo, .form-group, .form-row, p, .fgv-field') || vaga.parentNode;

      /* --- Certame (1 opção — auto-selecionado) --- */
      if (!document.getElementById('CERTAME')) {
        var wrap = document.createElement('div');
        wrap.className = 'campo-certame fgv-field';
        wrap.style.margin = '0 0 12px';
        wrap.innerHTML =
          '<label for="CERTAME" style="display:block;font-weight:600;margin-bottom:4px"><span class="error">*</span> Certame</label>' +
          '<select id="CERTAME" class="select" data-testid="select-certame" style="width:100%">' +
            '<option value="edital_ibge_2026" selected>' + cur.edital_opt + '</option>' +
          '</select>';
        host.parentNode.insertBefore(wrap, host);
      }

      /* --- Escolaridade (1 opção — auto-selecionado) --- */
      if (!document.getElementById('ESCOLARIDADE')) {
        var ewrap = document.createElement('div');
        ewrap.className = 'campo-escolaridade fgv-field';
        ewrap.style.margin = '0 0 12px';
        ewrap.innerHTML =
          '<label for="ESCOLARIDADE" style="display:block;font-weight:600;margin-bottom:4px"><span class="error">*</span> Escolaridade</label>' +
          '<select id="ESCOLARIDADE" class="select" data-testid="select-escolaridade" style="width:100%">' +
            '<option value="fundamental" selected>N\u00edvel Fundamental</option>' +
          '</select>';
        host.parentNode.insertBefore(ewrap, host);
      }

      ensureDetalhesBox(vaga);
      vaga.addEventListener('change', renderDetalhesVaga);

      /* Preenche e auto-seleciona o cargo */
      fillVaga();
    }

    /* Município de prova — agora gerido por uf-municipios.js */
  }

  /* ---------- Execução ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fill);
  } else {
    fill();
  }

  /* Observador para elementos carregados tardiamente */
  try {
    var mo = new MutationObserver(function(){
      var v = document.getElementById('VAGA');
      if (v) { fill(); if (v.dataset.cfg) mo.disconnect(); }
    });
    mo.observe(document.documentElement, {childList: true, subtree: true});
  } catch (e) {}

  /* Ao carregar completamente, garante que tudo está selecionado */
  window.addEventListener('load', function(){
    var v = document.getElementById('VAGA');
    if (!v) return;

    /* Auto-seleciona certame */
    var ce = document.getElementById('CERTAME');
    if (ce) {
      ce.value = 'edital_ibge_2026';
      ce.dispatchEvent(new Event('change', {bubbles: true}));
    }

    /* Auto-seleciona escolaridade */
    var esc = document.getElementById('ESCOLARIDADE');
    if (esc) {
      esc.value = 'fundamental';
      esc.dispatchEvent(new Event('change', {bubbles: true}));
    }

    /* Auto-seleciona o cargo */
    if (cur.cargos.length === 1) {
      v.value = cur.cargos[0].v;
    }
    v.dispatchEvent(new Event('change', {bubbles: true}));
    renderDetalhesVaga();
  });
})();
