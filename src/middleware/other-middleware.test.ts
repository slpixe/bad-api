import { describe, it, beforeEach, afterEach, vi, expect, type Mock } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { randomErrorMiddleware } from './other-middleware.js';
import { configStore } from '../store/config.js';

// Mock the configStore to control the error configurations
vi.mock('../store/config.js', () => ({
    configStore: {
        getConfig: vi.fn()
    }
}));

describe('randomErrorMiddleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn()
        };
        next = vi.fn();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should return an error when the random value is below error chance', () => {
        // Mock config to have 100% chance of error
        (configStore.getConfig as Mock).mockReturnValue({
            errorChance: 1.0 // 100% chance
        });

        // Mock random to ensure error condition
        vi.spyOn(Math, 'random').mockReturnValue(0.4);

        randomErrorMiddleware(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('=rand-error Error');
        expect(next).not.toHaveBeenCalled();
    });

    it('should continue to next middleware when random value is above error chance', () => {
        // Mock config to have 0% chance of error
        (configStore.getConfig as Mock).mockReturnValue({
            errorChance: 0.0 // 0% chance
        });

        // Mock random to ensure success condition
        vi.spyOn(Math, 'random').mockReturnValue(0.6);

        randomErrorMiddleware(req as Request, res as Response, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    it('should respect configured error chance for variable outcomes', () => {
        // Mock config with 50% chance of error
        (configStore.getConfig as Mock).mockReturnValue({
            errorChance: 0.5
        });

        // First test with random value below 0.5
        vi.spyOn(Math, 'random').mockReturnValue(0.4);
        randomErrorMiddleware(req as Request, res as Response, next);
        expect(res.status).toHaveBeenCalledWith(500);

        // Reset mocks
        vi.clearAllMocks();
        res.status = vi.fn().mockReturnThis();
        res.send = vi.fn();

        // Then test with random value above 0.5
        vi.spyOn(Math, 'random').mockReturnValue(0.6);
        randomErrorMiddleware(req as Request, res as Response, next);
        expect(next).toHaveBeenCalled();
    });
});