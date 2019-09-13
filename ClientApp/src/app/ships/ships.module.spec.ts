import { ShipsModule } from './ships.module';

describe('ShipsModule', () => {
  let shipsModule: ShipsModule;

  beforeEach(() => {
    shipsModule = new ShipsModule();
  });

  it('should create an instance', () => {
    expect(shipsModule).toBeTruthy();
  });
});
