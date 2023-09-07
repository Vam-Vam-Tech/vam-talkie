import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  color: string;
}

export class UpdateDto extends CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
