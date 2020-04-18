import { injectable } from 'inversify';
import { Plan } from '../entities/Plan';
import { Repository, getManager } from 'typeorm';

@injectable()
export class PlanService {

  private repository: Repository<Plan>;

  constructor(
  ) {
    this.repository = getManager().getRepository(Plan);
  }

  public getPlans(): Promise<Plan[]> {
    return this.repository.find();
  }

  public getPlan(id: string): Promise<Plan> {
    return this.repository.findOne(id);
  }

  public searchPlans(query): Promise<Plan[]> {
    var qb = this.repository.createQueryBuilder().where("IsActive = 'True'");

    if (query.amount) {
      qb = qb.andWhere(`Amount >= ${query.amount}  `);
    }

    if (query.name) {
      qb = qb.andWhere(`Name LIKE :q`, { q: '%' + query.name + '%' });
    }

    return qb.getMany();
  }

  public newPlan(plan: Plan): Promise<Plan> {
    console.log(plan);
    return this.repository.save(plan);
  }

  public async updatePlan(id: string, plan: Plan): Promise<Plan> {
    let toUpdate = await this.repository.findOne(id);
    let updated = Object.assign(toUpdate, plan);
    return this.repository.save(updated);
  }

  public async deletePlan(id: string): Promise<any> {
    let toDelete = await this.repository.findOne(id);
    return this.repository.delete(toDelete);
  }
}