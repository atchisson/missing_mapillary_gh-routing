// Panel positioning - fires panelPositioningComplete event when routing panel is ready
// The context panel was removed; this module now only signals layout readiness for heightgraph

export function setupPanelPositioning() {
  const routingPanel = document.querySelector('.routing-panel');
  if (!routingPanel) return;

  const dispatchReady = () => {
    window.dispatchEvent(new CustomEvent('panelPositioningComplete', {
      detail: { routingPanelHeight: routingPanel.getBoundingClientRect().height }
    }));
  };

  // Fire once after initial layout settles
  setTimeout(dispatchReady, 100);

  // Re-fire on resize so heightgraph can redraw at correct width
  let resizeTimeout = null;
  window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(dispatchReady, 150);
  });

  // Re-fire when routing panel content changes (route calculated, heightgraph shown/hidden)
  const observer = new MutationObserver(() => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(dispatchReady, 100);
  });

  observer.observe(routingPanel, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
  });

  window.addEventListener('routingPanelToggled', () => setTimeout(dispatchReady, 50));
}
