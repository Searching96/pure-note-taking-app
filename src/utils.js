/**
 * Utility functions for Pure note-taking app
 */

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func -  Function to debounce
 * @param {number} wait - Wait time in milleseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
    let timeoutId;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeoutId);
            func.apply(this, args);
        };
        clearTimeout(timeoutId);
        timeoutId = setTimeout(later, wait);
    }
}

/**
 * Sanitize HTML string to prevent XSS attacks
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeHTML(str) {
    if (!str || typeof str != 'string') return '';

    // Create a temporary div element
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

/**
 * Generate a simple UUID for note IDs
 * @returns {string} - UUID string
 */
export function uuid() {
    return 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Format date for display
 * @param {Date|string|number} date - Date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid Date';

    const now = new Date();
    const diff = now - d;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;

    return d.toLocaleDateString();
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export function truncateText(text, maxLength = 100) {
    if (!text || typeof text !== 'string') return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}