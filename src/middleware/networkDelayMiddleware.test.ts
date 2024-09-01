// networkDelayMiddleware.test.ts
import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';
import { Request, Response, NextFunction } from 'express';
import { networkDelayMiddleware } from './networkDelayMiddleware.js';
import { configStore } from '../store/config.js';

// Manually mock the configStore
configStore.getConfig = () => ({ networkDelay: 0, networkDelayChance: 0 });

// Helper to mock next function
function mockNext() {
	const calls: unknown[][] = [];
	const fn = (...args: unknown[]) => {
		calls.push(args);
	};
	fn.calls = calls;
	return fn as NextFunction & { calls: unknown[][] };
}

// Helper function to mock setTimeout behavior
function mockSetTimeout() {
	const originalSetTimeout = global.setTimeout;
	const calls: { callback: () => void; delay: number }[] = [];

	global.setTimeout = (callback: () => void, delay: number) => {
		calls.push({ callback, delay });
		return 0 as unknown as NodeJS.Timeout;
	};

	function runAll() {
		calls.forEach(({ callback }) => callback());
	}

	function restore() {
		global.setTimeout = originalSetTimeout;
	}

	return { calls, runAll, restore };
}

describe('networkDelayMiddleware', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;
	let mockTimeout: ReturnType<typeof mockSetTimeout>;

	beforeEach(() => {
		req = {};
		res = {};
		next = mockNext();
		mockTimeout = mockSetTimeout();
	});

	afterEach(() => {
		mockTimeout.restore();
	});

	it('should apply the network delay when the chance condition is met', () => {
		// Mock the configuration to have a 100% chance of applying delay
		configStore.getConfig = () => ({
			networkDelay: 500,
			networkDelayChance: 1.0, // 100% chance
		});

		// Call the middleware
		const middleware = networkDelayMiddleware();
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was called with the correct delay
		assert.strictEqual(mockTimeout.calls.length, 1);
		assert.strictEqual(mockTimeout.calls[0].delay, 500);

		// Fast-forward timers to simulate the delay finishing
		mockTimeout.runAll();

		// Verify that next() is called after the delay
		assert.strictEqual(next.calls.length, 1);
	});

	it('should not apply the network delay when the chance condition is not met', () => {
		// Mock the configuration to have a 0% chance of applying delay
		configStore.getConfig = () => ({
			networkDelay: 500,
			networkDelayChance: 0.0, // 0% chance
		});

		// Call the middleware
		const middleware = networkDelayMiddleware();
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was not called
		assert.strictEqual(mockTimeout.calls.length, 0);

		// Verify that next() is called immediately
		assert.strictEqual(next.calls.length, 1);
	});

	it('should handle random chance correctly for variable outcomes', () => {
		// Mock the configuration with a 50% chance of applying delay
		configStore.getConfig = () => ({
			networkDelay: 500,
			networkDelayChance: 0.5, // 50% chance
		});

		// Mock Math.random to control randomness
		const originalRandom = Math.random;
		Math.random = () => 0.4; // Below 0.5 should trigger delay

		// Call the middleware
		const middleware = networkDelayMiddleware();
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was called since random value is less than 0.5
		assert.strictEqual(mockTimeout.calls.length, 1);
		assert.strictEqual(mockTimeout.calls[0].delay, 500);
		mockTimeout.runAll();
		assert.strictEqual(next.calls.length, 1);

		// Reset mocks and rerun with higher random value
		next.calls.length = 0;
		mockTimeout.calls.length = 0;
		Math.random = () => 0.6; // Above 0.5 should not trigger delay
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was not called this time
		assert.strictEqual(mockTimeout.calls.length, 0);
		assert.strictEqual(next.calls.length, 1);

		// Restore the original Math.random
		Math.random = originalRandom;
	});
});
