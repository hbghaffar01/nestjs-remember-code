import {
  Controller,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProducerService } from '../events/strategies/kafka/kafka.service';
import { validateOrReject } from 'class-validator';

@Controller({ path: 'services' })
export class ValidateController {
  constructor(private readonly producerService: ProducerService) {}

  @Post(':service_id/validate')
  async validateService(
    @Param('service_id') serviceId: string,
    @Body() body: { mobileNumber: string },
  ) {
    const payloadDto = {
      serviceId,
      mobileNumber: body.mobileNumber,
      timestamp: new Date().toISOString(),
    };

    try {
      await validateOrReject(payloadDto);

      await this.producerService.produce({
        type: 'Merchant-Validate',
        payload: {
          serviceID: '123',
        },
      });

      return {
        status: `Kafka producer successfully sent message`,
        serviceId,
        mobileNumber: body.mobileNumber,
      };
    } catch (error) {
      if (error instanceof Array) {
        throw new HttpException(
          `Validation failed: ${error.map((err) => err.toString()).join(', ')}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Failed to send message to Kafka',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
