/**
 * Test setup file for Vitest
 * Configures global test environment and mocks
 */

import { beforeEach, vi } from 'vitest'

// Mock localStorage for all tests
const localStorageMock = {
    data: {},
    getItem: vi.fn(function(key) {
        return this.data[key] || null;
    }),
    setItem: vi.fn(function(key, value) {
        this.data[key] = value;
    }),
    removeItem: vi.fn(function(key) {
        delete this.data[key];
    }),
    clear: vi.fn(function() {
        this.data = {};
    })
};

// Setup global mocks
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
})

global.localStorage = localStorageMock;

// Reset mocks and localStorage before each test
beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.data = {};

    // Reset console spies
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
});