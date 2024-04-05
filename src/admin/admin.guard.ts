// // admin.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Role } from 'src/enums/role.enum';
// @Injectable()
// export class AdminGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<Role[]>('roles', context.getHandler());
//     if (!roles || !roles.includes(Role.Admin)) {
//       return false;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return user && user.role === Role.Admin;
//   }
// }
