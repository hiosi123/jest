import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/createPayment.dto';

@Injectable()
export class PaymentService {
  private users = [
    {
      email: 'tls1641@gmail.com',
    },
    {
      email: 'tls1641@gmail.com',
    },
    {
      email: 'tls1641@gmail.com',
    },
  ];

  createPayments(createPaymentDto: CreatePaymentDto) {
    const { email } = createPaymentDto;
    const user = this.users.find((user) => {
      user.email === email;
    });
    if (user)
      return {
        id: 1,
        status: 'success',
      };
    else {
      throw new BadRequestException();
    }
  }
}
