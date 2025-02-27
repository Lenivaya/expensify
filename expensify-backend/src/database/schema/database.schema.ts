import { users } from './users.schema'
import { expenses } from './expenses.schema'
import { inflows } from './inflows.schema'
import { userActivity, userConsent } from './analytics.schema'

export const databaseSchema = {
  users,
  expenses,
  inflows,
  userConsent,
  userActivity
}
