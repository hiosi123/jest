import { Test } from "@nestjs/testing";
import { PaymentService } from "../payment.service"

describe('PaymentService', () => {
  let paymentService: PaymentService;

  beforeEach(async () => {
    const paymentModule = await Test.createTestingModule({
      providers:[PaymentService]
    }).compile()

    paymentService = paymentModule.get<PaymentService>(PaymentService)
  }
})