﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.Responses.Category
{
    public class GetAllCategoriesResponse
    {
        public List<GetCategoryResponse> Categories { get; set; }
    }
}
