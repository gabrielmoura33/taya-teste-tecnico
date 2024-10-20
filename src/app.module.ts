import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { ProposalsModule } from './modules/proposals/proposals.module';
import { UsersModule } from './modules/users/users.module';
import { UserMiddleware } from './common/middleware/user.middleware';
import { CustomersModule } from './modules/customers/customers.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(
          'src',
          'env',
          `.env.${process.env.NODE_ENV || 'development'}`,
        ),
      ],
    }),
    DatabaseModule,
    ProposalsModule,
    UsersModule,
    CustomersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UserMiddleware).forRoutes('*');
  }
}
