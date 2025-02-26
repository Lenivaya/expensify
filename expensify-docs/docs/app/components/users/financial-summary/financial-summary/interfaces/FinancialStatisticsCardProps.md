# Interface: FinancialStatisticsCardProps

Props for the FinancialSummaryCard component
 FinancialStatisticsCardProps

## Properties

### data

> **data**: `FinancialSummaryDto`

Financial summary data containing balance and statistics

#### Description

Complete financial data object containing current balance information
and statistical metrics about the user's financial activity

***

### className?

> `optional` **className**: `string`

Optional className for styling overrides

#### Description

Additional CSS classes to apply to the component

***

### onInflowClick()?

> `optional` **onInflowClick**: () => `void`

Callback fired when clicking on the inflow section

#### Returns

`void`

#### Description

Handler for inflow section clicks. Can be used to navigate to
detailed inflow views or open inflow-specific dialogs

***

### onExpenseClick()?

> `optional` **onExpenseClick**: () => `void`

Callback fired when clicking on the expenses section

#### Returns

`void`

#### Description

Handler for expense section clicks. Can be used to navigate to
detailed expense views or open expense-specific dialogs

***

### onBalanceClick()?

> `optional` **onBalanceClick**: () => `void`

Callback fired when clicking on the balance section

#### Returns

`void`

#### Description

Handler for balance section clicks. Can be used to navigate to
detailed balance views or open balance-specific dialogs
