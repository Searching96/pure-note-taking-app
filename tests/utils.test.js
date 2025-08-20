/**
 * Unit tests for utility functions
 * Tests the pure functions in src/utils.js
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, sanitizeHTML } from '../src/utils.js';

describe('Utils Functions', () => {
	describe('debounce', () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it('should delay function execution', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100);

			debouncedFn();
			expect(mockFn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(50);
			expect(mockFn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(50);
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		it('should reset timer on subsequent calls', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100);

			debouncedFn();
			vi.advanceTimersByTime(50);

			debouncedFn(); // Reset timer
			vi.advanceTimersByTime(50);
			expect(mockFn).not.toHaveBeenCalled();

			vi.advanceTimersByTime(50);
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		it('should pass arguments to the debounced function', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100);

			debouncedFn('arg1', 'arg2');
			vi.advanceTimersByTime(100);

			expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
		});

		it('should use the latest arguments when called multiple times', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 100);

			debouncedFn('first');
			debouncedFn('second');
			vi.advanceTimersByTime(100);

			expect(mockFn).toHaveBeenCalledTimes(1);
			expect(mockFn).toHaveBeenCalledWith('second');
		});

		it('should handle zero delay', () => {
			const mockFn = vi.fn();
			const debouncedFn = debounce(mockFn, 0);

			debouncedFn();
			vi.advanceTimersByTime(0);

			expect(mockFn).toHaveBeenCalledTimes(1);
		});
	});

	describe('sanitizeHTML', () => {
		it('should escape HTML tags', () => {
			const input = '<script>alert("xss")</script>';
			const result = sanitizeHTML(input);

			expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
			expect(result).not.toContain('<script>');
		});

		it('should handle basic HTML entities', () => {
			const input = '<div>Hello & goodbye</div>';
			const result = sanitizeHTML(input);

			expect(result).toBe('&lt;div&gt;Hello &amp; goodbye&lt;/div&gt;');
		});

		it('should handle quotes and special characters', () => {
			const input = 'Hello "world" & <em>emphasis</em>';
			const result = sanitizeHTML(input);

			expect(result).toBe('Hello "world" &amp; &lt;em&gt;emphasis&lt;/em&gt;');
		});

		it('should return empty string for null/undefined input', () => {
			expect(sanitizeHTML(null)).toBe('');
			expect(sanitizeHTML(undefined)).toBe('');
			expect(sanitizeHTML('')).toBe('');
		});

		it('should handle non-string input', () => {
			expect(sanitizeHTML(123)).toBe('');
			expect(sanitizeHTML({})).toBe('');
			expect(sanitizeHTML([])).toBe('');
		});

		it('should preserve plain text', () => {
			const input = 'Hello world!';
			const result = sanitizeHTML(input);

			expect(result).toBe('Hello world!');
		});

		it('should handle multiple dangerous patterns', () => {
			const input = '<script src="evil.js"></script><img onerror="alert(1)" src="x">';
			const result = sanitizeHTML(input);

			// Should escape the dangerous HTML tags
			expect(result).not.toContain('<script');
			expect(result).not.toContain('<img');
			expect(result).toContain('&lt;script');
			expect(result).toContain('&lt;img');

			// The dangerous attributes are now safely escaped text
			expect(result).toContain('onerror='); // Still present but as safe text
			expect(result).toContain('&gt;'); // Closing tags are escaped
		});

		it('should handle newlines and whitespace', () => {
			const input = 'Line 1\nLine 2\n<script>evil</script>';
			const result = sanitizeHTML(input);

			expect(result).toContain('Line 1\nLine 2');
			expect(result).toContain('&lt;script&gt;evil&lt;/script&gt;');
		});
	});
});

// Performance tests for debounce
describe('Performance Tests', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('debounce should handle rapid calls efficiently', () => {
		const mockFn = vi.fn();
		const debouncedFn = debounce(mockFn, 100);

		// Simulate rapid user input (like typing)
		for (let i = 0; i < 100; i++) {
			debouncedFn(i);
		}

		// Should not have been called yet
		expect(mockFn).not.toHaveBeenCalled();

		// Fast forward
		vi.advanceTimersByTime(100);

		// Should only be called once with the last value
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith(99);
	});
});

// Integration-style tests
describe('Real-world Usage', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should work like auto-save functionality', () => {
		const saveFn = vi.fn();
		const autoSave = debounce(saveFn, 2000); // 2 second delay like in the app

		// User types quickly
		autoSave('draft 1');
		vi.advanceTimersByTime(500);
		autoSave('draft 2');
		vi.advanceTimersByTime(500);
		autoSave('draft 3');
		vi.advanceTimersByTime(500);

		// Still no save (only 1.5 seconds passed)
		expect(saveFn).not.toHaveBeenCalled();

		// User stops typing, wait for auto-save
		vi.advanceTimersByTime(2000);

		expect(saveFn).toHaveBeenCalledTimes(1);
		expect(saveFn).toHaveBeenCalledWith('draft 3');
	});

	it('should work like search functionality', () => {
		const searchFn = vi.fn();
		const debouncedSearch = debounce(searchFn, 300); // 300ms like in the app

		// User types search query
		debouncedSearch('h');
		vi.advanceTimersByTime(100);
		debouncedSearch('he');
		vi.advanceTimersByTime(100);
		debouncedSearch('hel');
		vi.advanceTimersByTime(100);
		debouncedSearch('hell');
		vi.advanceTimersByTime(100);
		debouncedSearch('hello');

		// Should not have searched yet (only 400ms total, but resets each time)
		expect(searchFn).not.toHaveBeenCalled();

		// User stops typing
		vi.advanceTimersByTime(300);

		expect(searchFn).toHaveBeenCalledTimes(1);
		expect(searchFn).toHaveBeenCalledWith('hello');
	});
});
