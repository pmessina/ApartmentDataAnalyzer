using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ApartmentData.Models
{
    public class ApartmentContext : DbContext
    {
        public ApartmentContext() : base("ApartmentData")
        {

        }

        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<FloorPlan> FloorPlans { get; set; }
        public DbSet<DistanceFromWork> DistancesModels { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ApartmentContext>(new CreateDatabaseIfNotExists<ApartmentContext>());
        }


    }
}