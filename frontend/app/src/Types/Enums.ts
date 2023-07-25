export enum ServiceType {
  Network = 0,
  Computer = 1,
  Device = 2,
  Other = 3,
}

export enum StatusType {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  InProgress = 3,
  Completed = 4,
  Failed = 5,
}

export enum TransactionType {
  Paypal = 0,
  CreditCard = 1,
  DebitCard = 2,
  Cash = 3,
}

export enum SortAttributeType {
  SortByName,
  SortByQuantity,
  SortByPrice,

  SortByDeadline,
  SortBySubcategoryName,
  SortByTotalSold,

  SortByCategoryName,

  SortByProfit,
  SortByAddress,
  SortByEmail,
  SortByType,
  SortByUpdated,
  SortByCompanyName,
  SortByAmountOfOrders,
  SortByOrderProfit,
}

export enum SortType {
  Ascending = 0,
  Descending = 1,
}
