(() => {
  const root = document.documentElement;
  let choice = 'auto';
  try {
    choice = localStorage.getItem('artclub-motion-v23')
      || localStorage.getItem('artclub-motion-v22')
      || (localStorage.getItem('artclub-motion') === 'off' ? 'off' : 'auto');
  } catch {}
  if (!['auto', 'full', 'quiet', 'off'].includes(choice)) choice = 'auto';
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const enabled = choice === 'full' || choice === 'quiet' || (choice === 'auto' && !reduced);
  root.dataset.motionChoice = choice;
  root.dataset.motionLevel = choice;
  root.dataset.motion = enabled ? 'full' : 'off';
})();
