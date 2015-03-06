using ApartmentData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GridMvc;
using Newtonsoft.Json.Linq;

namespace ApartmentData.Controllers
{
    public class ApartmentDataController : Controller
    {
        ApartmentContext aptContext = new ApartmentContext();

        // GET: ApartmentData
        [OutputCache(Duration=20, VaryByParam="none")]
        public ActionResult Apartment()
        {
            var model = new ApartmentViewModel();
            var selectedApartments = new List<Apartment>();

            model.ApartmentsAvailable = aptContext.Apartments.ToList();
            model.ApartmentsSelected = selectedApartments;

            //Initialization of textbox for testing
            model.WorkPlaceAddress = "8229 Boone Blvd Vienna, VA 22182";

            return View(model);
        }

        [HttpPost]
        public ActionResult Apartment(ApartmentViewModel model)
        {
            InitModel(model);

            return View(model);
        }

        [HttpPost]
        public PartialViewResult Distances(DistanceFromWork[] model)
        {
             return PartialView("_DistancesPartialView", model);
        }

        public PartialViewResult ApartmentGrid(ApartmentViewModel model)
        {
            InitModel(model);

            return PartialView("_ApartmentGrid", model);
        }

        private void InitModel(ApartmentViewModel model)
        {
            var selectedApts = new List<Apartment>();
            var postedAptIds = new string[0];

            if (model == null)
                model = new ApartmentViewModel();

            if (model.PostedApartments != null && model.PostedApartments.ApartmentIds != null && model.PostedApartments.ApartmentIds.Any())
            {
                postedAptIds = model.PostedApartments.ApartmentIds;
            }

            if (postedAptIds.Any())
            {
                selectedApts = aptContext.Apartments.Where(x => postedAptIds.Any(s => x.ID.ToString().Equals(s))).ToList();
            }

            model.ApartmentsAvailable = aptContext.Apartments.ToList();
            model.ApartmentsSelected = selectedApts;
        }




    }
}
