// script.js — navegação entre passos (passo-capa -> passo-0 -> ...)
document.addEventListener('DOMContentLoaded', () => {
  // pega todos os botões que devem avançar para outro passo
  const btns = Array.from(document.querySelectorAll('.btn-proximo'));

  function irParaPasso(id) {
    if (!id && id !== 0) return;
    const targetId = `passo-${id}`;
    // se o id for '0' o targetId é passo-0; se vier diretamente 'passo-capa', suporta também
    const target = document.getElementById(targetId) || document.getElementById(String(id)) || document.getElementById(`passo-${id}`);
    if (!target) {
      console.warn('Passo alvo não encontrado:', id);
      return;
    }
    // remove ativo de quem tiver
    const atual = document.querySelector('.passo.ativo');
    if (atual) atual.classList.remove('ativo');
    // adiciona ativo ao target
    target.classList.add('ativo');
    // rola para o topo do passo
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // suporta botões com data-proximo contendo número do passo (ex: 0, 1, 2...)
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const proximo = btn.getAttribute('data-proximo');
      if (proximo === null) {
        console.warn('Botão sem data-proximo:', btn);
        return;
      }
      // se proximo for '0' ou string numérica
      // algumas tags podem usar ids completos; trata ambos
      // tenta converter para número, mas mantém string se falhar
      const num = Number(proximo);
      if (!Number.isNaN(num)) {
        irParaPasso(num);
      } else {
        // se for um id textual (ex: 'passo-capa' ou 'passo-0')
        const normalized = proximo.startsWith('passo-') ? proximo : `passo-${proximo}`;
        const target = document.getElementById(normalized);
        if (target) {
          const atual = document.querySelector('.passo.ativo');
          if (atual) atual.classList.remove('ativo');
          target.classList.add('ativo');
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          console.warn('Destino não encontrado para data-proximo:', proximo);
        }
      }
    });
  });

  // Fallback visual: se imagem de capa não existir, tenta ocultar o <img> sem quebrar layout
  const imgCapa = document.getElementById('img-capa');
  if (imgCapa) {
    imgCapa.addEventListener('error', () => {
      imgCapa.style.display = 'none';
    });
  }
});
