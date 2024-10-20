// src/app.module.ts
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { UsersModule } from './modules/users/users.module';
import { UserMiddleware } from './common/middleware/user.middleware';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [DatabaseModule, ProposalsModule, UsersModule, CustomersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
