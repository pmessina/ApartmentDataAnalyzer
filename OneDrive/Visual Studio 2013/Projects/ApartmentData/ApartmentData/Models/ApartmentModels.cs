using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApartmentData.Models
{
    //Data model for Apartment
    public class Apartment
    {
        [Key]
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string City { get; set; }

        [DefaultValue("NC")]
        public string State { get; set; }
        public string ZipCode { get; set; }
        public int Rating { get; set; }
        public string[] Amenities { get; set; }

	    public string Address
	    {
            get 
            { 
                return Name + " " + Street + " " + City + " " + State + " " + ZipCode; 
            }
	    }

        [NotMapped]
        public double DistanceFromWork { get; set; }

        [NotMapped]
        public bool Checked { get; set; }

        public virtual ICollection<FloorPlan> FloorPlans { get; set; }
    }

    //Data model for Floor Plan
    public class FloorPlan
    {
        [Key]
        public Guid ID { get; set; }
        [DisplayName("Low Rent")]
        public int LowRent { get; set; }
        [DisplayName("High Rent")]
        public int HighRent { get; set; }
        [DisplayName("Square Feet")]
        public int SquareFeet { get; set; }

        public virtual Apartment Apartment { get; set; }
    }

    //View model for the Apartments View
    public class ApartmentViewModel
    {
        public List<Apartment> ApartmentsSelected { get; set; }
        public List<Apartment> ApartmentsAvailable { get; set; }
        public PostedApartments PostedApartments { get; set; }
        public string WorkPlaceAddress { get; set; }
        public List<DistanceFromWork> DistancesFromWork { get; set; }
    }

    //Model for the Distance Partial View
    public class DistanceFromWork
    {
        [Key]
        public Guid ID { get; set; }
        public string Distance { get; set; }
        public string Address { get; set; }
    }
    public class PostedApartments
    {
        public string[] ApartmentIds { get; set; }
    }

}