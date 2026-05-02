// Route info HTML formatter - extracted to avoid duplication

import { t } from '../i18n/i18n.js';

/**
 * Format number with thousand separator (thin space)
 */
export function formatNumberWithThousandSeparator(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}

/**
 * Format time in seconds to human-readable string
 */
export function formatTime(timeSeconds) {
  const timeMinutes = Math.round(timeSeconds / 60);
  const timeHours = Math.floor(timeMinutes / 60);
  const timeMins = timeMinutes % 60;
  
  if (timeHours > 0) {
    return `${timeHours}h ${timeMins}min`;
  }
  return `${timeMinutes} min`;
}

/**
 * Generate route info HTML from path data
 * @param {Object} path - GraphHopper path object
 * @returns {string} HTML string
 */
export function generateRouteInfoHTML(path, uncoveredDistance = null) {
  if (!path) {
    return `<div class="route-info-compact">${t('errors.noRouteData')}</div>`;
  }

  const distance = (path.distance / 1000).toFixed(2);
  const timeSeconds = Math.round(path.time / 1000);
  const timeDisplay = formatTime(timeSeconds);
  const ascend = path.ascend ? Math.round(path.ascend) : null;
  const descend = path.descend ? Math.round(path.descend) : null;

  let uncoveredHTML = '';
  if (uncoveredDistance !== null) {
    const uncoveredKm = (uncoveredDistance / 1000).toFixed(2);
    const percent = path.distance > 0 ? Math.round(uncoveredDistance / path.distance * 100) : 0;
    uncoveredHTML = `
      <div class="route-info-row" title="${t('routeInfo.uncoveredTitle')}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
        <span class="route-info-compact-value">+${uncoveredKm} km / ${percent}%</span>
      </div>`;
  }

  return `
    <div class="route-info-compact">
      <div class="route-info-row">
        <svg width="16" height="16" viewBox="0 0 179 179" fill="currentColor">
          <polygon points="52.258,67.769 52.264,37.224 0,89.506 52.264,141.782 52.258,111.237 126.736,111.249 126.736,141.782 179.006,89.506 126.736,37.224 126.736,67.769"/>
        </svg>
        <span class="route-info-compact-value">${distance} km</span>
      </div>
      <div class="route-info-row">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span class="route-info-compact-value">${timeDisplay}</span>
      </div>
      ${uncoveredHTML}
      ${(ascend !== null || descend !== null) ? `
      <div class="route-info-row">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 14L17 9L22 18H2.84444C2.46441 18 2.2233 17.5928 2.40603 17.2596L10.0509 3.31896C10.2429 2.96885 10.7476 2.97394 10.9325 3.32786L15.122 11.3476"/>
        </svg>
        <span class="route-info-compact-value">
          ${ascend !== null ? `↑ ${ascend} m` : ''}
          ${ascend !== null && descend !== null ? ' ' : ''}
          ${descend !== null ? `↓ ${descend} m` : ''}
        </span>
      </div>
      ` : ''}
    </div>
  `;
}

/**
 * Display error message in route info container
 * @param {string} message - Error message to display
 * @param {HTMLElement|null} routeInfoElement - Route info container element
 */
export function displayRouteError(message, routeInfoElement) {
  if (!routeInfoElement) return;
  
  routeInfoElement.innerHTML = `
    <div style="color: #dc2626; padding: 8px; background: #fee2e2; border-radius: 4px; font-size: 13px;">
      ${message}
    </div>
  `;
}

