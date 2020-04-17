import * as typeorm from 'typeorm'
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon'
import { deepEqual } from 'assert'
import { PlanService } from '../../src/services/PlanService'
import { Plan } from '../../src/entities/Plan'

describe('mocha => typeorm => getManager', () => {
  let sandbox: SinonSandbox;
  let Plan: Plan;

  beforeEach(() => {
    sandbox = createSandbox()
  });

  afterEach(() => {
    sandbox.restore()
  });

  it('getAll method passed', async () => {
   
    const fakeRepository = createStubInstance(typeorm.Repository);
    const fakeConnection = createStubInstance(typeorm.Connection)
    fakeConnection.getRepository.withArgs(Plan).returns(fakeRepository as any);

    sandbox.stub(typeorm, 'getRepository').returns(fakeRepository as any);

    const planService = new PlanService();

    const result = await planService.getPlans();
    
    deepEqual(result, [Plan])
  });
})