import { IsNotEmpty, IsString, IsEmail, MinLength, IsNumber} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  role: Role; // Assuming role is a string, adjust as needed
}
