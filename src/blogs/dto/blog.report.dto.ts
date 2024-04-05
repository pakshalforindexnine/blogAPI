import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(Role)
  status: Role;

  // You can add more properties as needed
}
