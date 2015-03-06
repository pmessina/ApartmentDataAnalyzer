/// <reference path="google-maps-3-vs-1-0.js" />

$(document).ready(function () {

    var geocoder = new google.maps.Geocoder();
    var bounds = new google.maps.LatLngBounds();
    var infoWindow = new google.maps.InfoWindow({ content: '' });
    var dirDisp = [];
    var dirServ = [];
    var map;
    var markers = [];
    var addresses = [];
    var distances = [];

    $("submitWorkDistances").click(function(){
        var dist = distances.toString();

        if (dist) {
            $distArray = $("#outputdistances").html(dist);

            //alert(dist);
            //$.ajax({
            //    type: "POST",
            //    url: "@Url.Action('Distances', 'ApartmentData')",
            //    data: distToString,
            //    success: function () { alert("Successful"); },
            //    failure: function () { alert("Failure"); },
            //    contentType: 'application/json'

            //});
        }

    });

    function initMap(myLatLng){
        var mapOptions = {
            zoom: 14,
            center: myLatLng,
            draggableCursor: 'crosshair',
            mapTypeControlOptions:{
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                position: google.maps.ControlPosition.TOP_RIGHT
            }
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    }

    //Initialize Map, get results from geocoder, place marker, add mouseover handlers to markers and click handler to map
    google.maps.event.addDomListener(window, 'load', function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
            myLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            initMap(myLatLng);
            InitMarker(myLatLng);
            InitMapClick(map);
        });     
    });

    function InitMarker(myLatLng)
    {
        var addr;

        geocoder.geocode({ 'latLng': myLatLng }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    addr = results[0].formatted_address;
                    var marker = placeMarker(myLatLng, map, addr);
                    
                    OnMarkerMouseOver(map, marker, addr);
                }
            }
            else {
                alert("Geocoder returned with "+ status);
            }

        });

        return addr;
    }

    function LatLngToAddress(myLatLng) {
        var address;

        geocoder.geocode({ 'latLng': myLatLng }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    address = results[0].formatted_address;
                }
            }
            else {
                alert("Geocoder returned with " + status);
            }

        });

        return address;

    }

    function AddressToLatLng(address)
    {
        geocoder.geocode({ 'address': address }, function (results, status) {
            
            if (status == google.maps.GeocoderStatus.OK) {
                var loc = results[0].geometry.location;
                var addr = results[0].formatted_address;
            }
            else {
                alert("Geocoder returned with " + status);
            }

            return loc;

        });
    }

    function AddressToLatLngConfigMap(address, id, icon) {
        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var loc = results[0].geometry.location;
                var addr = results[0].formatted_address;
                var marker = placeMarker(loc, map, addr, id, icon);
                AdjustBounds(map, loc);
                OnMarkerMouseOver(map, marker, id, addr);
            }
            else {
                alert("Geocoder returned with "+ status);
            }

            return loc;

        });
    }

    function OnMarkerMouseOver(map, marker, id, address)
    {
        google.maps.event.addDomListener(marker, 'mouseover', function () {
            infoWindow.setContent(address);
            infoWindow.open(map, marker);
        });
        google.maps.event.addDomListener(marker, 'mouseout', function () {
            infoWindow.close();
        });
        google.maps.event.addDomListener(marker, 'click', function () {
            var marker = markers[id];
            removeMarker(marker, id);
        });
    }

    //Action when map is clicked
    function InitMapClick(map)
    {
        google.maps.event.addDomListener(map, 'click', function (e) {
           
            var address = LatLngToAddress(e.latLng);
            if (address) {
                var marker = placeMarker(e.latLng, map);

                OnMarkerMouseOver(map, marker, address);
                AdjustBounds(map, e.latLng);
            }
        });
    }

    function AdjustBounds(map, point)
    {
        bounds.extend(point);
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    }

    //Action when checkbox is checked
    $('input:checkbox').change(function () {
        var $findLabel = $(this).closest("td").find("input")
        var address = $findLabel.attr("data-address");
        addresses.push(address);
        var id = $findLabel.attr("id");

        if ($(this).is(':checked')) {
            
            AddressToLatLngConfigMap(address, id);
        }
        else {
            
            var marker = markers[id];
            removeMarker(marker, id);
            delete addresses[address];
            //Needs fixed
            //AdjustBounds(map, marker.position);
        }

    });

    $("#submitWorkAddress").submit(function (e) {
        e.preventDefault();

        var workPlaceText = $('input:text[name=WorkPlaceAddress]').val();
        if (workPlaceText) {
            var icon = { path: google.maps.SymbolPath.Circle, scale: 5 };
            AddressToLatLngConfigMap(workPlaceText, icon);
        }

        calcDirections(workPlaceText, addresses, map);

    });

    function placeMarker(coordinates, map, address, id, icon) {

        var marker = new google.maps.Marker({
            id: id,            
            map: map,
            position: coordinates,
            animation: google.maps.Animation.DROP,
            title: address
        });
        //alert(icon);
        if (icon) {
            marker.setIcon(icon);
        }

        markers[id] = marker;

        return marker;
    }

    function removeMarker(marker, id) {
        if (marker) {
            marker.setMap(null);
        }

        if (id) {
            delete markers[id];
        }
    }

    function removeRoute() {
        dirDisp.setMap(null);
    }

    function calcDirections(workplace, addresses, map) {
        
        if (workplace) {

            for (var i = 0; i < addresses.length; i++) {
                var addr = addresses[i];
                var request = {
                    origin: workplace,
                    destination: addr,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }
                dirServ = new google.maps.DirectionsService();

                dirServ.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {

                        dirDisp = new google.maps.DirectionsRenderer();
                        dirDisp.setOptions(
                        {
                            markerOptions:
                                {
                                    visible: false
                                }
                        });
                        dirDisp.setMap(map);
                        dirDisp.setDirections(response);
                        
                        var totDist = 0;
                        var totDur = 0;
                        var legs = response.routes[0].legs;
                        for (var i = 0; i < legs.length; i++) {
                            totDist += legs[i].distance.value;
                            totDur += legs[i].duration.value;
                        }
                        var dist = Math.round(totDist * .000621371192 * 10) / 10;
                        var guid = generateUUID();
                        var addrObject = { ID: guid, Address: addr, Distance: dist };

                        distances.push(addrObject);

                    }
                     
                    else {
                        console.log("Directions Service returned with a " + status);
                    }

                });
            }
        }
        else {
            alert("Please enter a workplace");
 
        }
    

    }
    

    $("distancesLink").click( function (e) {
        e.preventDefault();

        if (distances.length > 0) {
            $.ajax({
                type: "POST",
                url: "Distances",
                data: distances
            });
        }

        //$output = $('#outputdistances');
        //for (var i = 0; i < distances.length; i++) {
        //    var ad = distances[i].a;
        //    var di = distances[i].d;
        //    var elem = "<p>" + ad + " " + di + "</p>"

        //    $output.append(elem);
        //}

    });

    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

});