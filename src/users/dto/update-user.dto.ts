// src/users/dto/update-user.dto.ts

import { Role } from "src/enums/role.enum"; // Ensure Role is imported correctly

export class UpdateUserDto {
  // Add properties as needed
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: Role; // Ensure role matches the type in your User entity
}
