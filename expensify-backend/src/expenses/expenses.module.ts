import { Module } from '@nestjs/common'
import { ExpensesService } from './expenses.service'
import { ExpensesController } from './expenses.controller'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [UsersModule],
  providers: [ExpensesService],
  controllers: [ExpensesController]
})
export class ExpensesModule {}
