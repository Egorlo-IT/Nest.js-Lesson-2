import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { Calculator } from './calculator.interface';

@Injectable()
export class CalculatorService {
  calculate(
    data: Calculator,
    @Req() req: Request,
    first: number,
    second: number,
  ) {
    if (req.headers['type-operation'] !== 'undefined') {
      switch (req.headers['type-operation']) {
        case 'plus': {
          if (data.first && data.second) {
            return Number(data.first) + Number(data.second);
          } else if (req.query.first && req.query.second) {
            return Number(req.query.first) + Number(req.query.second);
          } else if (first && second) {
            return Number(first) + Number(second);
          }
        }
        case 'subtract': {
          if (data.first && data.second) {
            return Number(data.first) - Number(data.second);
          } else if (req.query.first && req.query.second) {
            return Number(req.query.first) - Number(req.query.second);
          } else if (first && second) {
            return Number(first) - Number(second);
          }
        }
        case 'multiply': {
          if (data.first && data.second) {
            return Number(data.first) * Number(data.second);
          } else if (req.query.first && req.query.second) {
            return Number(req.query.first) * Number(req.query.second);
          } else if (first && second) {
            return Number(first) * Number(second);
          }
        }
        default:
          return;
      }
    } else {
      return;
    }
  }
}
