import { isAfter, subDays } from "date-fns";
import { IStatement } from "../models/Account.dto";


export function filterLastMonth(statements: IStatement[]): IStatement[] {
  const filtered = statements.filter(statement => {
    const firstValidDay = subDays(new Date(), 30)

    return isAfter(statement.createdAt, firstValidDay) ? statement : undefined
  })

  if (!filtered) return []

  return filtered
}
