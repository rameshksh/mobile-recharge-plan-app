import { injectable } from 'inversify';
import { Customer } from '../entities/Customer';
import { Repository, getManager } from 'typeorm';
const axios = require('axios');

@injectable()
export class CustomerService {

  private repository: Repository<Customer>;

  constructor(
  ) {
    this.repository = getManager().getRepository(Customer);
  }

  public getCustomers(): Promise<Customer[]> {
    return this.repository.find();
  }

  public getCustomer(id: string): Promise<Customer> {
    return this.repository.findOne(id);
  }

  public searchCustomers(query): Promise<Customer[]> {
    var qb = this.repository.createQueryBuilder().where("IsActive = 'True'");

    if (query.name) {
      qb = qb.andWhere(`Name LIKE :q`, { q: '%' + query.name + '%' });
    }

    return qb.getMany();
  }

  public newCustomer(Customer: Customer): Promise<Customer> {
    return this.repository.save(Customer);
  }

  public async updateCustomer(id: string, Customer: Customer): Promise<Customer> {
    let toUpdate = await this.repository.findOne(id);
    let updated = Object.assign(toUpdate, Customer);
    return this.repository.save(updated);
  }

  public async deleteCustomer(id: string): Promise<any> {
    let toDelete = await this.repository.findOne(id);
    return this.repository.delete(toDelete);
  }

  public async getAllPlanForCustomer(): Promise<any> {
    let planApiUrl = "http://localhost:3000/api/plans";

    return axios.get(planApiUrl).then(response => {
      return response.data;
    })
      .catch(error => {
        console.log(error);
      });
  } 
  
}