using Microsoft.EntityFrameworkCore;
using Registration.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Registration.Data
{
    public class FitnessDbContext : DbContext
    {
        public DbSet<Admin> Admin { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<ChatRoom> ChatRooms { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Registration.Data.Models.Task> Task { get; set; }
        public DbSet<Nutrition> Nutrition { get; set; }
        public DbSet<TrainingProgram> TrainingProgram { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<Booking> Booking { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=.;Database=FitnessDb;Integrated Security=True;");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChatRoom>(cr =>
            {
                cr.HasMany(r => r.Users)
                .WithMany(u => u.ChatRooms);
            });
            //modelBuilder.Entity<User>(cr =>
            //{
            //    cr.HasOne(r => r.Users)
            //    .WithMany(u => u.ChatRooms);
            //});
            base.OnModelCreating(modelBuilder);
        }
    }
}
