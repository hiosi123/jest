import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentController } from '../payment.controller';
import { PaymentService } from '../payment.service';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  const requestMock = {
    query: {},
  } as unknown as Request;
  //
  const statusResponseMock = {
    send: jest.fn((x) => x),
  };

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;
  beforeEach(async () => {
    const paymentModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useValue: {
            createPayments: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    paymentController = paymentModule.get<PaymentController>(PaymentController);
    paymentService = paymentModule.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(paymentController).toBeDefined();
  });

  it('should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', async () => {
      await paymentController.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });

    it('should return a status of 200 when query params are present', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      paymentController.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    // it('should return a successful response', async () => {
    //   const response = await paymentController.createPayment({
    //     email: 'tls1641@gmail.com',
    //     price: 1200,
    //   });
    //   expect(response).toStrictEqual({ status: 'success' });
    // });
    it('should throw an error', async () => {
      jest
        .spyOn(paymentService, 'createPayments')
        .mockImplementationOnce(() => {
          throw new BadRequestException();
        });
      try {
        const response = await paymentController.createPayment({
          email: 'tls1641@gmail.com',
          price: 200,
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
});
