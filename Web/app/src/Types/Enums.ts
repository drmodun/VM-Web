export enum AdminInputs {
    Name,
    Email,
    Password,
    Image,
    Date,
    SelectCategory,
    SelectSubCategory,
    SelectCompany,
}

export enum ServiceType {
    Network = 0,
    Computer = 1,
    Device = 2,
    Other = 3	
}

export enum StatusType{
    Pending = 0,
    Accepted = 1,
    Rejected = 2,
    InProgress = 3,
    Completed = 4,
    Failed = 5
}

export enum TransactionType{
    Paypal= 0,
    CreditCard = 1,
    DebitCard = 2,
    Cash = 3
};
