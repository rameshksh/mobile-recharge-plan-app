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
    var queryParams = Object.keys(query);
    let sqlQuery = 'Select * from Plans where';
    let whereCondition = '';
    queryParams.forEach(item => {
      if(item == 'amount'){
        whereCondition = whereCondition + `${item}` > query[item]
      }
      
    });

    
    return this.repository.query(queryString);
  }

  public newPlan(Plan: Plan): Promise<Plan> {
    return this.repository.save(Plan);
  }

  public async updatePlan(id: string, Plan: Plan): Promise<Plan> {
    let toUpdate = await this.repository.findOne(id);
    let updated = Object.assign(toUpdate, Plan);
    return this.repository.save(updated);
  }

  public async deletePlan(id: string): Promise<any> {
    let toDelete = await this.repository.findOne(id);
    return this.repository.delete(toDelete);
  }
}