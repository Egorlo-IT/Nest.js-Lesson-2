import { Controller, Put, Patch, Body, Req, Param } from '@nestjs/common';
import { Request } from 'express';
import { Calculator } from './calculator.interface';
import { CalculatorService } from './calculator.service';

@Controller('/calculator')
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) {}

  @Put()
  async calculatePut(
    @Body() data: Calculator,
    @Req() req: Request,
    @Param('first') first: number,
    @Param('second') second: number,
  ) {
    return this.calculatorService.calculate(data, req, first, second);
  }

  @Put('/:first/:second')
  async calculatePutParams(
    @Body() data: Calculator,
    @Req() req: Request,
    @Param('first') first: number,
    @Param('second') second: number,
  ) {
    return this.calculatorService.calculate(data, req, first, second);
  }

  @Patch()
  async calculatePatch(
    @Body() data: Calculator,
    @Req() req: Request,
    @Param('first') first: number,
    @Param('second') second: number,
  ) {
    return this.calculatorService.calculate(data, req, first, second);
  }

  @Patch('/:first/:second')
  async calculatePatchParams(
    @Body() data: Calculator,
    @Req() req: Request,
    @Param('first') first: number,
    @Param('second') second: number,
  ) {
    return this.calculatorService.calculate(data, req, first, second);
  }
}
