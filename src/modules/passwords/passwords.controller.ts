import { Body, Controller, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('passwords')
@ApiTags('passwords')
export class PasswordsController {
  constructor(private readonly passwordResetsService: PasswordsService) { }

  @Post('/:token')
  @HttpCode(204)
  @ApiNoContentResponse()
  @UsePipes(ValidationPipe)
  async resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto
  ): Promise<void> {
    await this.passwordResetsService.resetPassword(token, resetPasswordDto);
  }
}