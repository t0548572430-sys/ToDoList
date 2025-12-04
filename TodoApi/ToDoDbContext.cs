using Microsoft.EntityFrameworkCore;

namespace TodoApi
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options)
        {
        }

        public DbSet<Item> Items { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // הגדרת הטבלה Items
            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("Items");
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.Property(e => e.Name)
                      .HasMaxLength(100)
                      .IsRequired(false); // לפי הקוד שכתבת, אפשרות ל-null

                entity.Property(e => e.IsComplete)
                      .HasColumnType("tinyint(1)")
                      .IsRequired(false);
            });

            // הגדרת הטבלה Users
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(e => e.Id).HasName("PRIMARY");

                entity.Property(e => e.Username)
                      .HasMaxLength(100)
                      .IsRequired();

                entity.Property(e => e.Password)
                      .HasMaxLength(100)
                      .IsRequired();
            });
        }
    }

    

}
