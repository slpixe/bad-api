// networkDelayMiddleware.test.ts
import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { networkDelayMiddleware } from './networkDelayMiddleware.js';
import { configStore } from '../store/config.js';

// Mock the configStore to control the delay configurations
vi.mock('../store/config.js', () => ({
	configStore: {
		getConfig: vi.fn(),
	},
}));

// Mock setTimeout for better control over timing in tests
// vi.useFakeTimers();

describe('networkDelayMiddleware', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;

	beforeEach(() => {
		req = {};
		res = {};
		next = vi.fn();

		// Spy on setTimeout and use fake timers for better control over timing
		vi.useFakeTimers();
		vi.spyOn(global, 'setTimeout');
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	it('should apply the network delay when the chance condition is met', () => {
		// Mock the configuration to have a 100% chance of applying delay
		(configStore.getConfig as vi.Mock).mockReturnValue({
			networkDelay: 500,
			networkDelayChance: 1.0, // 100% chance
		});

		// Call the middleware
		const middleware = networkDelayMiddleware();
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was called with the correct delay
		expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);

		// Fast-forward timers to simulate the delay finishing
		vi.runAllTimers();

		// Verify that next() is called after the delay
		expect(next).toHaveBeenCalledTimes(1);
	});

	it('should not apply the network delay when the chance condition is not met', () => {
		// Mock the configuration to have a 0% chance of applying delay
		(configStore.getConfig as vi.Mock).mockReturnValue({
			networkDelay: 500,
			networkDelayChance: 0.0, // 0% chance
		});

		// Call the middleware
		const middleware = networkDelayMiddleware();
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was not called
		expect(setTimeout).not.toHaveBeenCalled();

		// Verify that next() is called immediately
		expect(next).toHaveBeenCalledTimes(1);
	});

	it('should handle random chance correctly for variable outcomes', () => {
		// Mock the configuration with a 50% chance of applying delay
		(configStore.getConfig as vi.Mock).mockReturnValue({
			networkDelay: 500,
			networkDelayChance: 0.5, // 50% chance
		});

		// Create a mock to control the randomness
		vi.spyOn(Math, 'random').mockReturnValue(0.4); // Below 0.5 should trigger delay

		// Call the middleware
		const middleware = networkDelayMiddleware();
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was called since random value is less than 0.5
		expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 500);
		vi.runAllTimers();
		expect(next).toHaveBeenCalledTimes(1);

		// Reset mocks and rerun with a higher random value
		vi.clearAllMocks();
		vi.spyOn(Math, 'random').mockReturnValue(0.6); // Above 0.5 should not trigger delay
		middleware(req as Request, res as Response, next);

		// Verify that setTimeout was not called this time
		expect(setTimeout).not.toHaveBeenCalled();
		expect(next).toHaveBeenCalledTimes(1);
	});
});
