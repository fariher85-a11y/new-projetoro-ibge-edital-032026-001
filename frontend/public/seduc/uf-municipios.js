/* ===========================================================
 *  uf-municipios.js  —  Seletor UF → Município
 *  Dados locais: /seduc/municipios-br.json (5.571 municípios)
 * =========================================================== */
(function(){
  'use strict';

  var UFS = [
    {sigla:'AC',nome:'Acre'},{sigla:'AL',nome:'Alagoas'},{sigla:'AM',nome:'Amazonas'},
    {sigla:'AP',nome:'Amapá'},{sigla:'BA',nome:'Bahia'},{sigla:'CE',nome:'Ceará'},
    {sigla:'DF',nome:'Distrito Federal'},{sigla:'ES',nome:'Espírito Santo'},{sigla:'GO',nome:'Goiás'},
    {sigla:'MA',nome:'Maranhão'},{sigla:'MG',nome:'Minas Gerais'},{sigla:'MS',nome:'Mato Grosso do Sul'},
    {sigla:'MT',nome:'Mato Grosso'},{sigla:'PA',nome:'Pará'},{sigla:'PB',nome:'Paraíba'},
    {sigla:'PE',nome:'Pernambuco'},{sigla:'PI',nome:'Piauí'},{sigla:'PR',nome:'Paraná'},
    {sigla:'RJ',nome:'Rio de Janeiro'},{sigla:'RN',nome:'Rio Grande do Norte'},
    {sigla:'RO',nome:'Rondônia'},{sigla:'RR',nome:'Roraima'},{sigla:'RS',nome:'Rio Grande do Sul'},
    {sigla:'SC',nome:'Santa Catarina'},{sigla:'SE',nome:'Sergipe'},{sigla:'SP',nome:'São Paulo'},
    {sigla:'TO',nome:'Tocantins'}
  ];

  var allData = null;  /* Carregado uma vez */
  var loadPromise = null;

  function loadData(){
    if (allData) return Promise.resolve(allData);
    if (loadPromise) return loadPromise;
    loadPromise = fetch('/seduc/municipios-br.json')
      .then(function(r){ return r.json(); })
      .then(function(d){ allData = d; return d; })
      .catch(function(){ allData = {}; return {}; });
    return loadPromise;
  }

  function populateUF(selectEl){
    selectEl.innerHTML = '<option value="">Selecione o Estado</option>' +
      UFS.map(function(u){
        return '<option value="' + u.sigla + '">' + u.sigla + ' - ' + u.nome + '</option>';
      }).join('');
  }

  function populateMunicipio(selectEl, municipios){
    selectEl.innerHTML = '<option value="">Selecione o Município</option>' +
      (municipios || []).map(function(m){
        return '<option value="' + m + '">' + m + '</option>';
      }).join('');
  }

  function bindPair(ufSelect, munSelect){
    populateUF(ufSelect);
    munSelect.innerHTML = '<option value="">Selecione o Estado primeiro</option>';

    ufSelect.addEventListener('change', function(){
      var uf = ufSelect.value;
      if (!uf) {
        munSelect.innerHTML = '<option value="">Selecione o Estado primeiro</option>';
        munSelect.dispatchEvent(new Event('change', {bubbles:true}));
        return;
      }
      munSelect.innerHTML = '<option value="">Carregando...</option>';
      loadData().then(function(data){
        populateMunicipio(munSelect, data[uf] || []);
        munSelect.dispatchEvent(new Event('change', {bubbles:true}));
      });
    });
  }

  /* Pre-load data on page load for instant response */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ loadData(); });
  } else {
    loadData();
  }

  window.UF_MUNICIPIOS = { bindPair: bindPair, UFS: UFS, loadData: loadData };
})();
