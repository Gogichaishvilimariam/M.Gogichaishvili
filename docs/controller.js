(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.controller-board').forEach(board => {
    const reset = () => { board.style.removeProperty('--rx'); board.style.removeProperty('--ry'); board.style.removeProperty('--lx'); board.style.removeProperty('--ly'); };
    board.addEventListener('pointermove', event => {
      if (reduced.matches || !fine.matches || event.pointerType === 'touch') return;
      const box = board.getBoundingClientRect();
      const x = Math.max(-.5, Math.min(.5, (event.clientX - box.left) / box.width - .5));
      const y = Math.max(-.5, Math.min(.5, (event.clientY - box.top) / box.height - .5));
      board.style.setProperty('--rx', `${9 - y * 7}deg`);
      board.style.setProperty('--ry', `${-8 + x * 7}deg`);
      board.style.setProperty('--lx', `${(x + .5) * 100}%`);
      board.style.setProperty('--ly', `${(y + .5) * 100}%`);
    });
    board.addEventListener('pointerleave', reset);
    reduced.addEventListener('change', reset);
    board.querySelectorAll('.controller-key:not([aria-disabled])').forEach(key => {
      const release = () => key.classList.remove('is-pressed');
      key.addEventListener('pointerdown', event => { if (event.button === 0) key.classList.add('is-pressed'); });
      key.addEventListener('pointerleave', release);
      key.addEventListener('pointercancel', release);
      window.addEventListener('pointerup', release);
      key.addEventListener('keydown', event => { if (event.key === 'Enter') key.classList.add('is-pressed'); });
      key.addEventListener('keyup', release);
      key.addEventListener('blur', release);
    });
    window.addEventListener('blur', () => { reset(); board.querySelectorAll('.is-pressed').forEach(key => key.classList.remove('is-pressed')); });
  });
})();
