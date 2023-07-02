namespace Data.Models
{
    public class PreviousClient
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public string Website { get; set; }

        public int ? Rating { get; set; }

        public string Image { get; set; }
        public PreviousClient()
        {
            Id = Guid.NewGuid();
        }
    }
}
