import * as typeorm from 'typeorm'
import { createSandbox, SinonSandbox, createStubInstance } from 'sinon'
import { deepEqual } from 'assert'
import { CustomerService } from '../../src/services/CustomerService'
import { Customer } from '../../src/entities/Customer'

describe('mocha => typeorm => getManager', () => {
  let sandbox: SinonSandbox;
  let Customer: Customer;

  beforeEach(() => {
    sandbox = createSandbox()
  });

  afterEach(() => {
    sandbox.restore()
  });

  it('getAll method passed', async () => {
   
    const fakeRepository = createStubInstance(typeorm.Repository);
    const fakeConnection = createStubInstance(typeorm.Connection)
    fakeConnection.getRepository.withArgs(Customer).returns(fakeRepository as any);

    sandbox.stub(typeorm, 'getRepository').returns(fakeRepository as any);

    const customerService = new CustomerService();

    const result = await customerService.getCustomers();
    
    deepEqual(result, [Customer])
  });
})