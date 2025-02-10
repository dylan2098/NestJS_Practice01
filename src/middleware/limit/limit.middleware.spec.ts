import { LimitMiddleware } from './limit.middleware';

describe('LimitMiddleware', () => {
  it('should be defined', () => {
    expect(new LimitMiddleware()).toBeDefined();
  });
});
