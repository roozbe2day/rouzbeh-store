/* GitHub Pages interaction fixes for the exported WordPress snapshot. */
(() => {
  document.body.classList.add('static-export-ready');
  const selector = '.e-n-menu-dropdown-icon[aria-controls]';
  const panelFor = button => document.getElementById(button.getAttribute('aria-controls'));
  const close = button => {
    const panel = panelFor(button);
    button.setAttribute('aria-expanded', 'false');
    if (panel) {
      panel.classList.remove('e-active');
      panel.setAttribute('aria-hidden', 'true');
    }
  };
  const open = (button, panel) => {
    button.setAttribute('aria-expanded', 'true');
    panel.classList.add('e-active');
    panel.setAttribute('aria-hidden', 'false');
  };

  document.addEventListener('click', event => {
    const button = event.target.closest(selector);
    if (!button) {
      if (!event.target.closest('.elementor-location-header .e-n-menu-content')) {
        document.querySelectorAll(`${selector}[aria-expanded="true"]`).forEach(close);
      }
      return;
    }
    const panel = panelFor(button);
    if (!panel) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const opening = button.getAttribute('aria-expanded') !== 'true';
    const widget = button.closest('.elementor-location-header');
    if (widget) widget.querySelectorAll(selector).forEach(other => { if (other !== button) close(other); });
    if (opening) open(button, panel); else close(button);
  }, true);

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const opened = document.querySelectorAll(`${selector}[aria-expanded="true"]`);
    if (opened.length) { opened.forEach(close); opened[0].focus(); }
  });

  // JetTabs in this exported mega-menu is configured for hover. Give each
  // control reliable click and keyboard behavior in both language snapshots.
  const activateTab = control => {
    const root = control.closest('.jet-tabs');
    if (!root) return;
    const targetId = control.getAttribute('aria-controls');
    root.querySelectorAll('.jet-tabs__control').forEach(item => {
      const active = item === control;
      item.classList.toggle('active-tab', active);
      item.setAttribute('aria-expanded', String(active));
      item.setAttribute('tabindex', active ? '0' : '-1');
    });
    root.querySelectorAll('.jet-tabs__content').forEach(panel => {
      const active = panel.id === targetId;
      panel.classList.toggle('active-content', active);
      panel.setAttribute('aria-hidden', String(!active));
      panel.hidden = !active;
    });
  };
  document.addEventListener('click', event => {
    const control = event.target.closest('.elementor-location-header .jet-tabs__control');
    if (!control) return;
    event.preventDefault();
    event.stopPropagation();
    activateTab(control);
  }, true);
  document.addEventListener('keydown', event => {
    const control = event.target.closest('.elementor-location-header .jet-tabs__control');
    if (!control || !['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    activateTab(control);
  });

  // Fetch only the first six homepage promo images eagerly; keep all URLs local.
  if (document.body.classList.contains('home')) {
    document.querySelectorAll('.banners-carousel-wrapper .promo-banner-wrapper img').forEach((img, index) => {
      if (index >= 6) return;
      const lazySrc = img.getAttribute('data-src') || img.getAttribute('data-lazy-src');
      const src = img.getAttribute('src');
      if ((!src || /placeholder|lazy/i.test(src)) && lazySrc) img.setAttribute('src', lazySrc);
      const lazySrcset = img.getAttribute('data-srcset') || img.getAttribute('data-lazy-srcset');
      if ((!img.getAttribute('srcset') || img.getAttribute('srcset') === '') && lazySrcset) img.setAttribute('srcset', lazySrcset);
      img.loading = 'eager';
      img.decoding = 'async';
      img.removeAttribute('hidden');
      img.style.visibility = 'visible';
      img.style.opacity = '1';
    });
  }
})();
