/*

This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.

Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.

Cameron Pittman
*/

/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic" alt="Candidate Image">';
var HTMLWelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 class="skillsH3">Skills:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="%url%" target="_blank">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p>%data%</p>';
var HTMLprojectImage = '<img class="img-responsive col-xs-12 col-sm-6 col-md-4" src="%data%" alt="%alt%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="%url%" target="_blank">%data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolDetails = '<em>%data%</em>';
var OnlineSchoolIcon = '<img class="icon" src="./images/mouse.svg" alt="Online Course" title="Course completed online">';

var HTMLonlineTitle = '<a href="%url%" target="_blank">%data%</a>';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineDetails = '<em>%data%</em>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

// Template to build text for location markers.
var HTMLlocationMarker = '<div id="content">' +
                            '<h1 id="firstHeading" class="firstHeading">%name%</h1>' +
                            '<div id="bodyContent">' +
                              '<p><a href="https://en.wikipedia.org/wiki/%wikiPage%" target="_blank">' +
                                'https://en.wikipedia.org/wiki/%wikiPage%</a></p>' +
                            '</div>' +
                          '</div>';

// Keep track of the last clicked location marker so we can close it's
// infoWindow when another location marker is clicked.
var currentInfoWindow = null;

/*
The International Name challenge in Lesson 2 where you'll create a function that will need
this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function () {
    $('button').click(function () {
        var iName = inName(name) || function () { };
        $('#name').html(iName);
    });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x, y) {
    clickLocations.push(
      {
          x: x,
          y: y
      }
    );
    console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function (loc) {
    logClicks(loc.pageX, loc.pageY);
});

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map; // declares a global map variable

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {
    var locations;

    var mapOptions = {
        disableDefaultUI: true
    };

    // This next line makes `map` a new Google Map JavaScript Object and attaches it to
    // <div id="map">, which is appended as part of an exercise late in the course.
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);

    /*
    locationFinder() returns an array of every location string from the JSONs
    written for bio, education, and work.
    */
    function locationFinder() {
        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array; ignores online schools since they are, of
        // course, global in nature.
        for (var school in education.schools) {
            if (education.schools[school].online.toLowerCase() === 'no') {
                if ($.inArray(education.schools[school].location, locations) === -1) {
                    locations.push(education.schools[school].location);
                }
            }
        }

        // iterates through work locations and appends each location to the locations array.
        for (var job in work.jobs) {
            if ($.inArray(work.jobs[job].location, locations) === -1) {
                locations.push(work.jobs[job].location);
            }
        }

        return locations;
    }

    /*
    createMapMarker(placeData) reads Google Places search results to create map pins.
    placeData is the object returned from search results containing information
    about a single location.
    */
    function createMapMarker(placeData) {
        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat();  // latitude from the place service
        var lon = placeData.geometry.location.lng();  // longitude from the place service
        var name = placeData.formatted_address;   // name of the place from the place service
        var bounds = window.mapBounds;            // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        // Create some content for an infoWindow; the location name and Wikipedia's
        // page for the location in a 'Town,_State' format
        var wikiPage = name.replace(", USA", "").replace(/\s+/g, "_");
        var contentString = HTMLlocationMarker.replace(/%name%/g, name).replace(/%wikiPage%/g, wikiPage);

        // Add an infoWindow to display when the user clicks the location.
        var infoWindow = new google.maps.InfoWindow({
            content: contentString
        });

        // hmmmm, I wonder what this is about... Glad that you asked!
        // This morsel of code hooks up an event handler for markers on
        // the map. When a marker is clicked, it will run the code in
        // the anonymous function. We're going to open the infoWindow
        // that's been created above after closing any infoWindow
        // that is currently open.
        google.maps.event.addListener(marker, 'click', function () {
            // Only show one location's info at a time. If there's an open info
            // window, close it and save this handler's info window for later.
            if (currentInfoWindow) {
                currentInfoWindow.close();
            }

            currentInfoWindow = infoWindow;
            infoWindow.open(map, marker);
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
    callback(results, status) makes sure the search returned results for a location.
    If so, it creates a new map marker for that location.
    */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    /*
    pinPoster(locations) takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    */
    function pinPoster(locations) {
        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
        for (var place in locations) {
            // the search request object
            var request = {
                query: locations[place]
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        }
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function (e) {
    // Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});

//
// Helper function that substitutes the 'info' appropriately into the given
// html template. Then inserts the resulting element into the DOM element
// that matches the given jQuery selector according to the given operation.
//
function addInfo(html, selector, info, op) {
    if (info.length > 0) {
        var formattedHtml = html.replace(/%data%/g, info);
        switch (op) {
            case "prepend":
                $(selector).prepend(formattedHtml);
                break;
            default:
                $(selector).append(formattedHtml);
        }
    }
}

//
// Resume Header, part I: name / title.
//
function addNameAndTitle() {
    // Prepend here so do these in 'reverse' order. Role first, then name.
    addInfo(HTMLheaderRole, "header", bio.role, "prepend");
    addInfo(HTMLheaderName, "header", bio.name, "prepend");
}

//
// Resume Header, part II: contact information.
// Resume Footer: contact information.
//
function addContactInfo(selector) {
    addInfo(HTMLcontactGeneric, selector, bio.genericContact);
    addInfo(HTMLmobile, selector, bio.contacts.mobile);
    addInfo(HTMLemail, selector, bio.contacts.email);
    addInfo(HTMLtwitter, selector, bio.contacts.twitter);
    addInfo(HTMLgithub, selector, bio.contacts.github);
    addInfo(HTMLblog, selector, bio.contacts.blog);
    addInfo(HTMLlocation, selector, bio.contacts.location);
}

//
// Resume Header, part III: profile picture / bio.
//
function addBio() {
    addInfo(HTMLbioPic, "header", bio.bioPic);
    addInfo(HTMLWelcomeMsg, "header", bio.welcomeMessage);
}

//
// Resume Header, part IV: skills catalog.
//
function addSkillsCatalog() {
    if (bio.skills.length === 0) {
        return; // uh oh, no skillz.
    }

    // Add a skills section header.
    $("header").append(HTMLskillsStart);

    // Add each skill individually.
    for (var i = 0; i < bio.skills.length; i++) {
        addInfo(HTMLskills, "#skills", bio.skills[i].trim());
    };
}

//
// Add the job whose index in the work.jobs array matches the given index.
//
function displayJob(index) {
    // Add a job header; each job gets it own header.
    $("#workExperience").append(HTMLworkStart);

    // Add this job's information.
    var location = work.jobs[index].location.replace(", USA", "");
    addInfo(HTMLworkLocation, ".work-entry:last", location);

    var employer = HTMLworkEmployer.replace("%data%", work.jobs[index].employer);
    var title = HTMLworkTitle.replace("%data%", work.jobs[index].title);
    $(".work-entry:last").append(employer + title);

    addInfo(HTMLworkDates, ".work-entry:last", work.jobs[index].dates);
    addInfo(HTMLworkDescription, ".work-entry:last", work.jobs[index].description);
}

//
// Add the project whose index in the projects.projects array matches the given index.
//
function displayProject(index) {
    // Add a project header; each project gets it own header.
    $("#projects").append(HTMLprojectStart);

    var project = projects.projects[index];

    // Add this project's information.
    addInfo(HTMLprojectDates, ".project-entry:last", project.dates);

    var projectTitle = HTMLprojectTitle.replace("%url%", project.url);
    addInfo(projectTitle, ".project-entry:last", project.title);
    addInfo(HTMLprojectDescription, ".project-entry:last", project.description);

    // Add responsive images, if any.
    var addedRow = false;
    for (i = 0; i < project.images.length; i++) {
        // Add a bootstrap row; just once on the first iteration.
        if (i === 0) {
            $(".project-entry:last").append("<div class=\"row\">");
            addedRow = true;
        }
        var image = HTMLprojectImage.replace("%data%", project.images[i]);
        image = image.replace("%alt%", project.imagesAlt[i]); // add alt text; come on, man!
        $(".row:last").append(image);
    };

    // Finish off our bootstrap row, if necessary.
    if (addedRow) {
        $(".img:last").append("</div>");
    }
}

// Add the school whose index in the education.schools array matches the given index.
function displaySchool(index) {
    // Add a school header; each school gets it own header.
    $("#education").append(HTMLschoolStart);

    // Add this school's information.
    var icon = "";
    if (education.schools[index].online.toLowerCase() === "yes") {
        icon = " " + OnlineSchoolIcon; // Online courses are designated by a computer mouse icon.
    }

    var location = education.schools[index].location.replace(", USA", "");
    addInfo(HTMLschoolLocation, ".education-entry:last", location);

    var schoolName = HTMLschoolName.replace("%url%", education.schools[index].url);
    addInfo(schoolName, ".education-entry:last", education.schools[index].name + icon);
    addInfo(HTMLschoolDetails, ".education-entry:last", education.schools[index].details);
    addInfo(HTMLschoolDates, ".education-entry:last", education.schools[index].dates);
}

// Function for internationalization exercise.
function inName(name) {
    // Parameter name is undefined until a global name variable is added!!
    console.log("In inName(" + name + ") ...");

    var finalName = name[0].toUpperCase();
    var capitalize = false;

    for (var i = 1; i < name.length; i++) {
        if (!capitalize) {
            if (name[i] == " ") {
                finalName = finalName + " ";
                capitalize = true;
            }
            else { // Make lowercase.
                finalName = finalName + name[i].toLowerCase();
            }
        }
        else { // Make uppercase.
            finalName = finalName + name[i].toUpperCase();
        }
    }

    // Don't delete this line!
    return finalName;
}