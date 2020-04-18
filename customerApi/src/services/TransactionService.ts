import { injectable } from 'inversify';
import { Transaction } from '../entities/Transaction';
import { Repository, getManager } from 'typeorm';

@injectable()
export class TransactionService {

  private repository: Repository<Transaction>;

  constructor(
  ) {
    this.repository = getManager().getRepository(Transaction);
  }

  public getTransactions(customerId: number): Promise<Transaction[]> {
    return this.repository.find({ where: { customerId: customerId } });
  }

  public getTransaction(id: string): Promise<Transaction> {
    return this.repository.findOne(id);
  }

  public newTransaction(Transaction: Transaction): Promise<Transaction> {
    return this.repository.save(Transaction);
  }

  public async updateTransaction(id: string, Transaction: Transaction): Promise<Transaction> {
    let toUpdate = await this.repository.findOne(id);
    let updated = Object.assign(toUpdate, Transaction);
    return this.repository.save(updated);
  }

  public async deleteTransaction(id: string): Promise<any> {
    let toDelete = await this.repository.findOne(id);
    return this.repository.delete(toDelete);
  }
}