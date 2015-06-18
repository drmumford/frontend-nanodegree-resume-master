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

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLWelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skillsH3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<a href="#">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<a href="#">%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%" alt="%alt%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<a href="#">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineTitle = '<a href="#">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="#">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

/*
The International Name challenge in Lesson 2 where you'll create a function that will need
this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var iName = inName(name) || function(){};
    $('#name').html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
    logClicks(loc.pageX, loc.pageY);
});

/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


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
    // the locations array
    for (var school in education.schools) {
      locations.push(education.schools[school].location);
    }

    // iterates through work locations and appends each location to
    // the locations array
    for (var job in work.jobs) {
      locations.push(work.jobs[job].location);
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

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
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

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  // Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});


//
// Resume Header, part I.
// Provides name / title / contact information.
//
function addTitleAndContactInfo() {

  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
  $("#header").prepend(formattedRole);
  $("#header").prepend(formattedName);

  // Add a generic contact just for grins because it's there.
  var formattedGeneric = HTMLcontactGeneric.replace("%contact%", bio.genericContact);
  formattedGeneric = formattedGeneric.replace("%data%", bio.genericData);
  $("#topContacts").append(formattedGeneric);

  var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
  $("#topContacts").append(formattedMobile);

  var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
  $("#topContacts").append(formattedEmail);

  var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
  $("#topContacts").append(formattedTwitter);

  var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
  $("#topContacts").append(formattedGithub);

  var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
  $("#topContacts").append(formattedBlog);

  var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
  $("#topContacts").append(formattedLocation);
}

//
// Resume Header, part II.
// Provides profile picture / short bio / skills catalog.
//
function addBio() {

  var profilePicture = HTMLbioPic.replace("%data%", bio.bioPic);
  $("#header").append(profilePicture);

  var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
  $("#header").append(formattedWelcomeMsg);

  addSkillsCatalog(bio.skills);
}

//
// Add the skills in the given array to the resume.
//
function addSkillsCatalog(skills) {

  // Add skills to the bio, if any.
  if (bio.skills.length > 0)
  {
    // Add a skills section header.
    $("#header").append(HTMLskillsStart);

    // Add each skill individually.
    for (i = 0; i < skills.length; i++) {
      var skill = HTMLskills.replace("%data%", skills[i]);
      $("#skills").append(skill);
    };
  }
}

//
// Add the job whose index in the work.jobs array matches the given index.
//
function displayJob(index) {

    // Add a job header; each job gets it own header.
    $("#workExperience").append(HTMLworkStart);

    // Add this job's information.
    var employer =  HTMLworkEmployer.replace("%data%", work.jobs[index].employer);
    var title =  HTMLworkTitle.replace("%data%", work.jobs[index].title);
    $(".work-entry:last").append(employer + title);

    var dates = HTMLworkDates.replace("%data%", work.jobs[index].dates);
    $(".work-entry:last").append(dates);

    var location = HTMLworkLocation.replace("%data%", work.jobs[index].location);
    $(".work-entry:last").append(location);

    var description = HTMLworkDescription.replace("%data%", work.jobs[index].description);
    $(".work-entry:last").append(description);
}

//
// Add the project whose index in the projects.projects array matches the given index.
//
function displayProject(index) {

  // Add a project header; each project gets it own header.
  $("#projects").append(HTMLprojectStart); // var HTMLprojectStart = '<div class="project-entry"></div>';

  // Add this job's information.
  var title =  HTMLprojectTitle.replace("%data%", projects.projects[index].title);
  $(".project-entry:last").append(title);

  var dates = HTMLprojectDates.replace("%data%", projects.projects[index].dates);
  $(".project-entry:last").append(dates);

  var description = HTMLprojectDescription.replace("%data%", projects.projects[index].description);
  $(".project-entry:last").append(description);

  // Add images for the project, if any.
  for (i = 0; i < projects.projects[index].images.length; i++) {
    var image = HTMLprojectImage.replace("%data%", projects.projects[index].images[i]);
    image = image.replace("%alt%", projects.projects[index].imagesAlt[i]); // add alt text; come on, man!
    $(".project-entry:last").append(image);
  };
}

//
// Add the school whose index in the education.schools array matches the given index.
//
function displaySchool(index) {

  // Add a school header; each school gets it own header.
  $("#education").append(HTMLschoolStart);

  // Add this school's information.
  var formattedSchoolName =  HTMLschoolName.replace("%data%", education.schools[index].name);
  var formattedSchoolDegree =  HTMLschoolDegree.replace("%data%", education.schools[index].degree);
  $(".education-entry:last").append(formattedSchoolName + formattedSchoolDegree);

  var dates = HTMLschoolDates.replace("%data%", education.schools[index].dates);
  $(".education-entry:last").append(dates);

  var location = HTMLschoolLocation.replace("%data%", education.schools[index].location);
  $(".education-entry:last").append(location);

  var major = HTMLschoolMajor.replace("%data%", education.schools[index].majors);
  $(".education-entry:last").append(major);
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