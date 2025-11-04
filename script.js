document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const cover = document.getElementById('cover');
  const game = document.getElementById('game');
  const nextBtn = document.getElementById('nextBtn');

  startBtn.addEventListener('click', () => {
    // Esconde a capa e mostra o jogo
    cover.classList.add('hidden');
    game.classList.remove('hidden');
    game.focus();
    game.setAttribute('aria-hidden', 'false');
    // Aqui você pode inicializar variáveis do jogo, carregar capítulos, etc.
    console.log('Aventura iniciada — boa sorte!');
  });

  // Exemplo simples de interação dentro do jogo
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      alert('Esse botão levaria ao próximo trecho da história. Substitua pelo seu fluxo de jogo.');
    });
  }
});
