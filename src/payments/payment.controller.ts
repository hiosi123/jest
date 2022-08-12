import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentDto } from './dto/createPayment.dto';
import { PaymentService } from './payment.service';
@Controller('Payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Get()
  getPayments(
    @Req() request: Request, //
    @Res() response: Response,
  ) {
    const { count, page } = request.query;
    if (!count || !page) {
      response
        .status(400)
        .send({ msg: 'Missing count or page query parameter' });
    } else {
      response.send(200);
    }
  }

  @Post()
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto, //
  ) {
    const response = await this.paymentService.createPayments(createPaymentDto);
    return response;
  }
}
