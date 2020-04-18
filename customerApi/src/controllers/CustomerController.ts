import {
  controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import { Customer } from '../entities/Customer';
import { CustomerService } from '../services/CustomerService';
import TYPES from '../constants/types';
import { TransactionService } from '../services/TransactionService';
import { Transaction } from '../entities/Transaction';
const axios = require('axios');

@controller('/api/customers')
export class CustomerController extends BaseHttpController {
  @inject(TYPES.CustomerService) private readonly _customerService: CustomerService;
  @inject(TYPES.TransactionService) private readonly _transactionService: TransactionService;

  constructor() {
    super();
  }

  @httpGet('/')
  public getCustomers(request: Request): Promise<Customer[]> {
    if (request.query) {
      return this._customerService.searchCustomers(request.query);
    }

    return this._customerService.getCustomers();
  }

  @httpGet('/:id')
  public getCustomer(request: Request): Promise<Customer> {
    return this._customerService.getCustomer(request.params.id);
  }

  @httpPost('/')
  public newCustomer(request: Request): Promise<Customer> {
    return this._customerService.newCustomer(request.body);
  }

  @httpPut('/:id')
  public updateCustomer(request: Request): Promise<Customer> {
    return this._customerService.updateCustomer(request.params.id, request.body);
  }

  @httpDelete('/:id')
  public deleteCustomer(request: Request): Promise<any> {
    return this._customerService.deleteCustomer(request.params.id);
  }

  @httpPost('/:id/buy-plan')
  public buyPlanForCustomer(request: Request): Promise<any> {
    let body = request.body;

    if (body) {
      let newTransaction = <Transaction>{
        customerId: request.params.id,
        planId: request.body.planId,
        purchaseDate: new Date(),
        amountPaid: request.body.amountPaid
      };

      return this._transactionService.newTransaction(newTransaction);
    }
  }

  @httpGet('/:id/transactions')
  public getCustomerTransactionHistory(request: Request): Promise<any> {
    let transactionDetails = [];

    let promise = new Promise<any>((resolve, reject) => {
      this._transactionService.getTransactions(request.params.id).then(res => {
        res.forEach((item) => {
          this.getPlanDetails(item.planId).then(response => {
            transactionDetails.push({
              plan: response.data,
              purchaseDate: item.purchaseDate,
              amountPaid: item.amountPaid
            });

            resolve(transactionDetails);
          })
            .catch(error => {
              console.log(error);
            });
        });
      });
    });

    return promise;
  }

  private getPlanDetails(planId: number): Promise<any> {

    let planApiUrl = `http://localhost:3000/api/plans/${planId}`;

    return axios.get(planApiUrl);
  }
}