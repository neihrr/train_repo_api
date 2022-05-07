import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [UsersModule],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
