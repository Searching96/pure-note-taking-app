/**
 * UI rendering functions for Pure note-taking app
 * Handles DOM manipulation and rendering only
 * 
 * Responsibilities:
 * - DOM element creation and manipulation
 * - Notes list rendering with accessibility attributes
 * - Editor form rendering and focus management
 * - Status message display with ARIA live regions
 * - Keyboard navigation event handling for UI elements
 * - Visual feedback and user interface updates
 * 
 * Dependencies: utils.js (for formatting and sanitization)
 * Note: Contains no business logic or state management
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
		li.setAttribute('role', 'listitem');
		li.setAttribute('tabindex', '0');
		li.setAttribute('aria-describedby', `note-desc-${note.id}`);

		if (note.id === activeNoteId) {
			li.classList.add('active');
			li.setAttribute('aria-current', 'true');
			li.setAttribute('aria-selected', 'true');
		}

		li.innerHTML = `
			<div class="note-preview" data-note-id="${note.id}">
				<h3 class="note-title" id="note-title-${note.id}">
					${sanitizeHTML(note.title || 'Untitled')}
				</h3>
				<p class="note-excerpt" id="note-desc-${note.id}">
				  ${sanitizeHTML(truncateText(note.content, 80))}
				</p>
				<time class="note-date" datetime="${note.updatedAt}">
					${formatDate(note.updatedAt)}
				</time>
			</div>
		`;

		// Add keyboard navigation
		li.addEventListener('keydown', handleNoteItemKeydown);

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
	statusElement.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
	statusElement.setAttribute('role', 'status');

	// Announce to screen readers immediately for errors
	if (type === 'error') {
		statusElement.setAttribute('aria-atomic', 'true');
	}

	// Clear after duration
	setTimeout(() => {
		statusElement.textContent = '';
		statusElement.className = 'status';
	}, duration);
}

/**
 * handle keyboard navigation in note list
 * @param {KeyboardEvent} e - Keyboard event
 */
function handleNoteItemKeydown(e) {
	const current = e.currentTarget;
	const noteItems = [...document.querySelectorAll('.note-item')];
	const currentIndex = noteItems.indexOf(current);

	switch(e.key) {
		case 'ArrowDown':
			e.preventDefault();
			const nextIndex = Math.min(currentIndex + 1, noteItems.length - 1);
			if (noteItems[nextIndex]) {
				noteItems[nextIndex].focus();
			}
			break;
		case 'ArrowUp':
			e.preventDefault();
			const prevIndex = Math.max(currentIndex - 1, 0);
			if (noteItems[prevIndex]) {
				noteItems[prevIndex].focus();
			}
			break;
		case 'Enter':
		case ' ':
			e.preventDefault();
			const notePreview = current.querySelector('.note-preview');
			notePreview?.click();
			break;
		case 'Home':
			e.preventDefault();
			noteItems[0]?.focus();
			break;
		case 'End':
			e.preventDefault();
			noteItems[noteItems.length - 1]?.focus();
			break;
	}
}