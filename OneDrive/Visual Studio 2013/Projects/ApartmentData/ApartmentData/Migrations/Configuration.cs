namespace ApartmentData.Migrations
{
    using ApartmentData.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ApartmentData.Models.ApartmentContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "ApartmentData.Models.ApartmentContext";
        }

        protected override void Seed(ApartmentData.Models.ApartmentContext context)
        {
            //context.Database.Delete();
            //context.Database.Create();

            //FloorPlan fp = new FloorPlan { ID = Guid.NewGuid(), LowRent = 1185, HighRent = 1325, SquareFeet = 884 };
            //context.FloorPlans.AddOrUpdate(fp);
            //context.Apartments.AddOrUpdate(
            //   new Apartment
            //   { 
            //        ID=Guid.NewGuid(),
            //        Name = "Allister North Hills", 
            //        Street = "430 Allister Dr.", 
            //        City = "Raleigh", 
            //        State="NC", 
            //        ZipCode = "27609",
            //        Rating=100, 
            //   }
            //);
            //fp = new FloorPlan { ID = Guid.NewGuid(), LowRent = 749, HighRent = 749, SquareFeet = 1379 };
            //context.FloorPlans.AddOrUpdate(fp);
            //context.Apartments.AddOrUpdate(
            //   new Apartment
            //   {
            //       ID = Guid.NewGuid(),
            //       Name = "Spanish Trace",
            //       Street = "3020 Spanish CT",
            //       City = "Raleigh",
            //       State = "NC",
            //       ZipCode = "27607",
            //       Rating = 100,
            //   }
            //);
            ////Calibre Chase	231 Calibre Chase Drive	Raleigh, NC 27609 	4.3	94	$750 	$810 	$900 
            //fp = new FloorPlan{ID=Guid.NewGuid(), LowRent = 750,  HighRent = 750, SquareFeet = 1000};
            //context.FloorPlans.AddOrUpdate(fp);
            //context.Apartments.AddOrUpdate(
            //    new Apartment
            //    {
            //        ID = Guid.NewGuid(),
            //        Name= "Calibre Chase",
            //        Street = "Calibre Chase Dr.",
            //        City = "Raleigh",
            //        State="NC",
            //        ZipCode = "27609",
            //        Rating = 94
            //    }
            //    );

            //context.SaveChanges();
        }
    }
}
