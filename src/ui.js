/**
 * UI rendering functions for Pure note-taking app
 * Handles DOM manipulation and rendering
 */

import { formatDate, truncateText, sanitizeHTML } from './utils.js';

/**
 * Render notes list in the sidebar
 * @param {HTMLElement} listElement - The notes list container
 * @param {Array} notes - Array of note objects
 * @param {string} activeNoteId - ID of the currently active note
 */
export function renderNotesList(listElement, notes, activeNoteId = null) {
	if (!listElement) return;

	// Clear existing content
	listElement.innerHTML = '';

	if (notes.length === 0) {
		const emptyState = document.createElement('li');
		emptyState.className = 'empty-state';
		emptyState.textContent = 'No notes available';
		listElement.appendChild(emptyState);
		return;
	}

	// Sort notes by updated date (newest first)
	const sortedNotes = [...notes].sort((a, b) =>
		new Date(b.updated) - new Date(a.updated)
	);

	sortedNotes.forEach(note => {
		const li = document.createElement('li');
		li.className = 'note-item';
		if (note.id === activeNoteId) {
			li.classList.add('active');
		}

		li.innerHTML = `
			<div class="note-preview" data-note-id="${note.id}">
				<h3 class="note-title">${sanitizeHTML(note.title || 'Untitled')}</h3>
				<p class="note-excerpt">${sanitizeHTML(truncateText(note.content, 80))}</p>
				<time class="note-date">${formatDate(note.updatedAt)}</time>
			</div>
		`;

		listElement.appendChild(li);
	});
}

/**
 * Render note in the editor
 * @param {Object} note - Note object to edit
 * @param {HTMLElement} titleInput - Title input element
 * @param {HTMLElement} bodyTextarea - Body textarea element
 */
export function renderNoteInEditor(note, titleInput, bodyTextarea) {
	if (!titleInput || !bodyTextarea) return;

	if (note) {
		titleInput.value = note.title || '';
		bodyTextarea.value = note.content || '';
	} else {
		// Clear editor for new note
		titleInput.value = '';
		bodyTextarea.value = '';
	}

	// Focus appropriate element
	if (!note || !note.title) {
		titleInput.focus();
	} else {
		bodyTextarea.focus();
		bodyTextarea.setSelectionRange(bodyTextarea.value.length, bodyTextarea.value.length);
	}
}

/**
 * Filter notes based on search query
 * @param {Array} notes - Array of notes to filter
 * @param {string} query - Search query
 * @returns {Array} - Filtered notes
 */
export function filterNotes(notes, query) {
	if (!query) return notes;

	const searchTerm = query.toLowerCase().trim();

	return notes.filter(note =>
		note.title && note.title.toLowerCase().includes(searchTerm) ||
		note.content && note.content.toLowerCase().includes(searchTerm)
	);
}

/**
 * Show status message
 * @param {HTMLElement} statusElement - Status message element
 * @param {string} message - Message to show
 * @param {string} type - Message type (success, error, info)
 * @param {number} duration - Duration in ms (default 3000)
 */
export function showStatus(statusElement, message, type = 'info', duration = 3000) {
	if (!statusElement) return;

	statusElement.textContent = message;
	statusElement.className = `status ${type}`;
	statusElement.setAttribute('aria-live', 'polite');

	// Clear after duration
	setTimeout(() => {
		statusElement.textContent = '';
		statusElement.className = 'status';
	}, duration);
}

/** 
 * Create a new note object
 * @param {string} title - Note title
 * @param {string} content - Note content
 * @returns {Object} - New note object
 */
export function createNoteObject(title = '', content = '') {
	const now = new Date().toISOString();

	return {
		id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
		title: title.trim(),
		content: content.trim(),
		createdAt: now,
		updatedAt: now
	};
}

/**
 * Update existing note object
 * @param {Object} note - Existing note 
 * @param {string} title - New title
 * @param {string} content - New content
 * @returns {Object} - Updated note object
 */
export function updateNoteObject(note, title, content) {
	return {
		...note,
		title: title.trim(),
		content: content.trim(),
		updatedAt: new Date().toISOString()
	};
}