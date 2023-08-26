namespace Contracts.Requests
{
    public enum SortAttributeType
    {
        //this makes it possible to sort by multiple criteria, but it will always be ba this order
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
}
