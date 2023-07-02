﻿using Data.Enums;

namespace Contracts.Requests.Transaction
{
    public class PutTransactionRequest
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid ProductId { get; set; }

        public DateTime CreatedAt { get; set; }
        public TransactionType Type { get; set; }
    }
}
