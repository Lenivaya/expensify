import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * Guard that implements local (username/password) authentication.
 *
 * @description
 * This guard extends Passport's local authentication guard to protect routes
 * that require username/password authentication. It is typically used for
 * login endpoints where users provide their credentials.
 *
 * Features:
 * - Implements username/password authentication
 * - Integrates with LocalStrategy for credential validation
 * - Automatically handles authentication failures
 *
 * @example
 * // Login endpoint using local authentication
 * @UseGuards(LocalAuthGuard)
 * @Post('login')
 * async login(@Request() req) {
 *   return this.authService.login(req.user);
 * }
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext) {
//     const request = context
//       .switchToHttp()
//       .getRequest<Request>()
//     const response = context
//       .switchToHttp()
//       .getResponse<Response>()
//
//     console.log(context)
//
//     console.log(request.body)
//
//     // transform the request body object to class instance
//     const body = plainToClass(SignInDto, request.body)
//
//     // get a list of errors
//     const errors = await validate(body)
//
//     // extract error messages from the errors array
//     const errorMessages = errors.flatMap(
//       ({ constraints }) =>
//         constraints ? Object.values(constraints) : []
//     )
//
//     if (errorMessages.length > 0) {
//       response.status(HttpStatus.BAD_REQUEST).send({
//         statusCode: HttpStatus.BAD_REQUEST,
//         error: 'Bad Request',
//         message: errorMessages
//       })
//       return false
//     }
//
//     return super.canActivate(context) as boolean
//   }
// }
