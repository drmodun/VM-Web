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
            public const string Create = Base + $"/products";
        }

        public static class User
        {
            public const string Get = Base + $"/users/{{id:Guid}}";
            public const string Delete = Base + $"/users/{{id:Guid}}";
            public const string Update = Base + $"/users/{{id:Guid}}";
            public const string GetAll = Base + $"/users";
            public const string Create = Base + $"/users";
            public const string Login = Base + $"/users/Login";
            public const string GetMe = Base + $"/users/Me";
        }

        public static class Transaction
        {
            public const string Get = Base + $"/transactions/{{id:Guid}}";
            public const string Delete = Base + $"/transactions/{{id:Guid}}";
            public const string Update = Base + $"/transactions/{{id:Guid}}";
            public const string GetAll = Base + $"/transactions";
            public const string Create = Base + $"/transactions";
        }

        public static class Order
        {
            public const string Get = Base + $"/orders/{{id:Guid}}";
            public const string Delete = Base + $"/orders/{{id:Guid}}";
            public const string Update = Base + $"/orders/{{id:Guid}}";
            public const string GetAll = Base + $"/orders";
            public const string Create = Base + $"/orders";
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
        }

        public static class Category
        {
            public const string Get = Base + $"/categories/{{id:Guid}}";
            public const string Delete = Base + $"/categories/{{id:Guid}}";
            public const string Update = Base + $"/categories/{{id:Guid}}";
            public const string GetAll = Base + $"/categories";
            public const string Create = Base + $"/categories";
        }

        public static class Subcategory
        {
            public const string Get = Base + $"/subcategories/{{id:Guid}}";
            public const string Delete = Base + $"/subcategories/{{id:Guid}}";
            public const string Update = Base + $"/subcategories/{{id:Guid}}";
            public const string GetAll = Base + $"/subcategories";
            public const string Create = Base + $"/subcategories";
        }

        public static class PreviousClient
        {
            public const string Get = Base + $"/previous-clients/{{id:Guid}}";
            public const string Delete = Base + $"/previous-clients/{{id:Guid}}";
            public const string Update = Base + $"/previous-clients/{{id:Guid}}";
            public const string GetAll = Base + $"/previous-clients";
            public const string Create = Base + $"/previous-clients";
        }

    }
}
