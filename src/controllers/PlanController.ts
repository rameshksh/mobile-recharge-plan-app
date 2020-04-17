import {
  controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { Plan } from '../entities/plan';
import { PlanService } from '../services/PlanService';
import TYPES from '../constants/types';

@controller('/api/plans')
export class PlanController extends BaseHttpController {
  @inject(TYPES.PlanService) private readonly _planService: PlanService;

  constructor() {
    super();
  }

  @httpGet('/')
  public getPlans(request: Request): Promise<Plan[]> {
    console.log(request);

    if (request.query) {
      return this._planService.searchPlans(request.queryString);
    }

    return this._planService.getPlans();
  }

  @httpGet('/:id')
  public getPlan(request: Request): Promise<Plan> {
    return this._planService.getPlan(request.params.id);
  }

  @httpPost('/')
  public newPlan(request: Request): Promise<Plan> {
    return this._planService.newPlan(request.body);
  }

  @httpPut('/:id')
  public updatePlan(request: Request): Promise<Plan> {
    return this._planService.updatePlan(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deletePlan(request: Request): Promise<any> {
    return this._planService.deletePlan(request.params.id);
  }
}