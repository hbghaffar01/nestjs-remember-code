import { IsString, IsPhoneNumber } from 'class-validator';

export class ValidateServiceDto {
  @IsString()
  @IsPhoneNumber(null)
  mobileNumber: string;
}
