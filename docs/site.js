(() => {
  'use strict';
  const dialog = document.querySelector('.lightbox');
  const links = [...document.querySelectorAll('a[data-gallery]')];
  let group = [], index = 0, opener = null;
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('.lightbox-stage img');
    const counter = dialog.querySelector('.lightbox-count');
    const caption = dialog.querySelector('.lightbox-caption');
    const previous = dialog.querySelector('[data-prev]');
    const next = dialog.querySelector('[data-next]');
    const render = () => {
      const source = group[index];
      image.src = source.href;
      image.alt = source.querySelector('img').alt;
      counter.textContent = `${index + 1} / ${group.length}`;
      caption.textContent = image.alt;
      previous.disabled = next.disabled = group.length < 2;
    };
    const move = direction => { index = (index + direction + group.length) % group.length; render(); };
    links.forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault(); opener = link;
      group = links.filter(item => item.dataset.gallery === link.dataset.gallery);
      index = group.indexOf(link); render();
      dialog.showModal(); document.documentElement.classList.add('lightbox-open');
    }));
    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    });
    dialog.addEventListener('close', () => {
      document.documentElement.classList.remove('lightbox-open');
      image.removeAttribute('src');
      if (opener) opener.focus();
    });
  }
  const copy = document.querySelector('.copy-email');
  if (copy && navigator.clipboard && window.isSecureContext) {
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      const status = document.querySelector('[data-copy-status]');
      try { await navigator.clipboard.writeText('gogichaishvili.design@gmail.com'); status.textContent = 'Email address copied.'; }
      catch { status.textContent = 'Please select the email address above to copy it.'; }
    });
  }
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Animate on entry without hiding content before JavaScript or observers run.
  if ('IntersectionObserver' in window && !motion.matches) {
    const targets = [...document.querySelectorAll('.section-heading,.project-header,.services-list li,.gallery figure,.feedback,.profile-header,.contact-cta,.cv-actions')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    targets.forEach(target => {
      if (target.getBoundingClientRect().top > window.innerHeight) observer.observe(target);
    });
    motion.addEventListener('change', event => {
      if (event.matches) {
        observer.disconnect();
        targets.forEach(target => target.classList.remove('scroll-revealed'));
      }
    });
  }
  // A small progress line shows the reader's position on every page.
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let progressQueued = false;
  const updateProgress = () => {
    const root = document.documentElement;
    const distance = root.scrollHeight - root.clientHeight;
    progress.style.setProperty('--scroll-progress', distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0);
    progressQueued = false;
  };
  const queueProgress = () => {
    if (!progressQueued) { progressQueued = true; requestAnimationFrame(updateProgress); }
  };
  window.addEventListener('scroll', queueProgress, { passive: true });
  window.addEventListener('resize', queueProgress);
  window.addEventListener('load', queueProgress);
  if ('ResizeObserver' in window) new ResizeObserver(queueProgress).observe(document.body);
  updateProgress();
  document.querySelectorAll('video').forEach(video => {
    const details = video.closest('details');
    if (details) details.addEventListener('toggle', () => { if (!details.open) video.pause(); });
    video.addEventListener('error', () => {
      const note = video.parentElement.querySelector('.supporting');
      if (note) note.textContent = 'The video could not load. Please try again later.';
    });
  });
})();
