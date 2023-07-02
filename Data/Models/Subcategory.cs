namespace Data.Models
{
    public class Subcategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public Guid CategoryId { get; set; }

        public Category? Category { get; set; }
        public string Description { get; set; }

        public List<Product> Products { get; set; }

        //Due to simplification, at the start of development a simple dictionary will be used as a placeholder for the schema
        //The first value presents the name of the attribute, the second value presents whether the attribute is required or not
        public Dictionary<string, string> SubSchema { get; set; }
    }
}
