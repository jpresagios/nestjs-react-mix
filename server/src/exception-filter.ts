import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from "@nestjs/common"

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  public catch (exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const message = exception.response.message.map(err => err);
    const responseError = message.map(error => {
        const errors = Object.values(error.constraints);

        if (errors.length == 1) {
            return {'field': error.property, error: Object.values(error.constraints)[0]};
        }

        return {'field': error.property, error: Object.values(error.constraints)};;
    });

    response
      .status(exception.response.statusCode)
      .json({
        statusCode: exception.response.statusCode,
        error: responseError,
      })
  }
}