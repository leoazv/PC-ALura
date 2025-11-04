document.addEventListener('DOMContentLoaded', () => {
  // Elementos principais
  const startBtn = document.getElementById('startBtn');
  const cover = document.getElementById('cover');
  const game = document.getElementById('game');
  const nextBtn = document.getElementById('nextBtn');
  const toast = document.getElementById('toast');
  const coverImage = document.querySelector('.cover__image');

  // Estado do jogo
  let gameStarted = false;
  let currentChapter = 0;
  const chapters = [
    { title: 'Capítulo 1 — O Despertar', text: 'Você acorda em um mundo pixelado. O que fará?' },
    { title: 'Capítulo 2 — Floresta Binária', text: 'Uma trilha de bits se abre à frente.' },
    { title: 'Capítulo 3 — O Núcleo', text: 'O coração do servidor pulsa com energia.' }
  ];

  // Função utilitária: mostrar toast (mensagem amigável)
  function showToast(message, timeout = 2200) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => (toast.hidden = true), 200);
    }, timeout);
  }

  // Carregamento da imagem: anima entrada quando pronta
  if (coverImage) {
    coverImage.addEventListener('load', () => {
      coverImage.classList.add('loaded');
    });
    // Em caso de imagem inexistente, usa alternativa visual
    coverImage.addEventListener('error', () => {
      coverImage.style.display = 'none';
    });
  }

  // Função para iniciar o jogo
  function iniciarAventura() {
    if (gameStarted) return;
    gameStarted = true;
    currentChapter = 0;
    // Esconde capa e mostra área do jogo
    if (cover) cover.classList.add('hidden');
    if (game) {
      game.classList.remove('hidden');
      game.setAttribute('aria-hidden', 'false');
      game.focus();
    }
    // Habilita botão próximo e carrega capítulo 1
    if (nextBtn) nextBtn.removeAttribute('disabled');
    carregarCapitulo(currentChapter);
    showToast('Aventura iniciada — boa sorte!');
    console.log('Aventura iniciada — boa sorte!');
  }

  // Carrega um capítulo no DOM
  function carregarCapitulo(index) {
    const titleEl = document.getElementById('chapterTitle');
    const textEl = document.getElementById('gameText');
    const chapter = chapters[index];
    if (!chapter) {
      showToast('Você chegou ao fim da aventura.');
      if (nextBtn) nextBtn.setAttribute('disabled', 'true');
      return;
    }
    if (titleEl) titleEl.textContent = chapter.title;
    if (textEl) textEl.textContent = chapter.text;
  }

  // Próximo trecho
  function proximoTrecho() {
    if (!gameStarted) {
      showToast('Clique em Iniciar para começar a aventura.');
      return;
    }
    currentChapter++;
    if (currentChapter >= chapters.length) {
      showToast('Fim da aventura — volte e explore outras escolhas!');
      if (nextBtn) nextBtn.setAttribute('disabled', 'true');
      return;
    }
    carregarCapitulo(currentChapter);
  }

  // Listeners seguros (aplica somente se os elementos existirem)
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      iniciarAventura();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      proximoTrecho();
    });
  }

  // Expose for debugging (opcional)
  window.__pcAluraGame = {
    start: iniciarAventura,
    next: proximoTrecho,
    state: () => ({ started: gameStarted, currentChapter })
  };
});
