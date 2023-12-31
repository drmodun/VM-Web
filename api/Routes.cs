﻿namespace api
{
    public static class Routes
    {
        private const string Base = "api";

        public static class Product
        {
            public const string Get = Base + $"/products/{{id:Guid}}";
            public const string Delete = Base + $"/products/{{id:Guid}}";
            public const string Update = Base + $"/products/{{id:Guid}}";
            public const string GetAll = Base + $"/products";
            public const string GetSimilar = Base + $"/products/similar";
            public const string Create = Base + $"/products";
            public const string GetShort = Base + $"/products/short";
            public const string GetFavourites = Base + $"/products/favourites";
            public const string AddToFavourites = Base + $"/products/favourites/{{id:Guid}}";
            public const string RemoveFromFavourites = Base + $"/products/favourites/{{id:Guid}}";
        }

        public static class User
        {
            public const string Get = Base + $"/users/{{id:Guid}}";
            public const string Delete = Base + $"/users";
            public const string Update = Base + $"/users";
            public const string GetAll = Base + $"/users";
            public const string ActivateUser = Base + $"/users/activate/{{code}}";
            public const string ResetPasswordEmail = Base + $"/users/reset-password/email";
            public const string ResetPassword = Base + $"/users/reset-password/{{code}}";
            public const string Create = Base + $"/users";
            public const string Login = Base + $"/users/Login";
            public const string GetMe = Base + $"/users/Me";
            public const string AdminDelete = Base + $"/admin/users/{{id:Guid}}";
            public const string AdminEdit = Base + $"/admin/users/{{id:Guid}}";
            public const string AdminToggle = Base + $"/admin/toggle/{{id:Guid}}";
            public const string AdminCreate = Base + $"/admin/users/";
            public const string AddToCart = Base + $"/users/cart/{{productId:Guid}}";
            public const string RemoveCart = Base + $"/users/cart";
            public const string BuyCart = Base + $"/users/cart";
            public const string GetCart = Base + $"/users/cart";
            public const string Edit = Base + $"/users/edit";
            public const string UpdateCart = Base + $"/users/cart/{{productId:Guid}}";
            public const string RemoveFromCart = Base + $"/users/cart/{{productId:Guid}}";

        }

        public static class Transaction
        {
            public const string Get = Base + $"/transactions/{{id:Guid}}";
            public const string Delete = Base + $"/transactions/{{id:Guid}}";
            public const string Update = Base + $"/transactions/{{id:Guid}}";
            public const string GetAll = Base + $"/transactions";
            public const string Create = Base + $"/transactions";
            public const string GetMyTransactions = Base + $"/transactions/Me";
        }

        public static class Order
        {
            public const string Get = Base + $"/orders/{{id:Guid}}";
            public const string Delete = Base + $"/orders/{{id:Guid}}";
            public const string Update = Base + $"/orders/{{id:Guid}}";
            public const string GetAll = Base + $"/orders";
            public const string Create = Base + $"/orders";
            public const string UpdateInfo = Base + $"/orders/info/{{id:Guid}}";
            public const string GetMyOrders = Base + $"/orders/Me";
        }

        public static class Service
        {
            public const string Get = Base + $"/services/{{id:Guid}}";
            public const string Delete = Base + $"/services/{{id:Guid}}";
            public const string Update = Base + $"/services/{{id:Guid}}";
            public const string GetAll = Base + $"/services";
            public const string Create = Base + $"/services";
        }

        public static class Company
        {
            public const string Get = Base + $"/companies/{{id:Guid}}";
            public const string Delete = Base + $"/companies/{{id:Guid}}";
            public const string Update = Base + $"/companies/{{id:Guid}}";
            public const string GetAll = Base + $"/companies";
            public const string Create = Base + $"/companies";
            public const string GetLarge = Base + $"/companies/large/{{id:Guid}}";
            public const string GetShort = Base + $"/companies/short";
        }

        public static class Category
        {
            public const string Get = Base + $"/categories/{{id:Guid}}";
            public const string Delete = Base + $"/categories/{{id:Guid}}";
            public const string Update = Base + $"/categories/{{id:Guid}}";
            public const string GetAll = Base + $"/categories";
            public const string Create = Base + $"/categories";
            public const string GetShort = Base + $"/categories/short";
            public const string GetLarge = Base + $"/categories/large/{{id:Guid}}";
        }

        public static class Subcategory
        {
            public const string Get = Base + $"/subcategories/{{id:Guid}}";
            public const string GetShort = Base + $"/subcategories/short";
            public const string Delete = Base + $"/subcategories/{{id:Guid}}";
            public const string Update = Base + $"/subcategories/{{id:Guid}}";
            public const string GetAll = Base + $"/subcategories";
            public const string Create = Base + $"/subcategories";
            public const string GetLarge = Base + $"/subcategories/large/{{id:Guid}}";

        }

        public static class PreviousClient
        {
            public const string Get = Base + $"/previous-clients/{{id:Guid}}";
            public const string Delete = Base + $"/previous-clients/{{id:Guid}}";
            public const string Update = Base + $"/previous-clients/{{id:Guid}}";
            public const string GetAll = Base + $"/previous-clients";
            public const string Create = Base + $"/previous-clients";
        }

        public static class Files
        {
            public const string Get = Base + $"/files/{{name}}";
            public const string Create = Base + $"/files/upload/{{path}}";
            public const string Update = Base + $"/files/upload/{{path}}";
            public const string Delete = Base + $"/files/{{name}}";

        }

        public static class Payment
        {
            public const string CreateCustomer = Base + "/add-customer";
            public const string MakePayment = Base + "/make-payment";
        }

    }
}
