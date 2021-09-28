import { IsString } from 'class-validator';

export class AddRoleDto {
  @IsString({ message: 'Should be string' })
  readonly value: string;
  @IsString({ message: 'Should be string' })
  readonly userId: string;
}
