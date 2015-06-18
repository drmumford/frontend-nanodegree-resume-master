var work = {
    "jobs" : [
        {
            "employer" : "Denro, Inc.",
            "title" : "Design Engineer",
            "location" : "Gaithersburg, MD",
            "dates" : "Nov 1989 - Oct 1998",
            "description" : "Designed electrical circuits for Air Traffic Control systems."
        },
        {
            "employer" : "Acterna, Inc.",
            "title" : "Software Engineer",
            "location" : "Germantown, MD",
            "dates" : "Nov 1998 - March 2003",
            "description" : "Developed SW for telecommunication test equipment."
        },
        {
            "employer" : "TCNI",
            "title" : "Sr. Software Engineer",
            "location" : "Chicago, IL",
            "dates" : "March 2003 - March 2004",
            "description" : "Developed SW for the US Navy."
        },
        {
            "employer" : "Sonix",
            "title" : "Independent Contractor / Principal Software Engineer",
            "location" : "Springfield, VA",
            "dates" : "March 2004 - March 2006",
            "description" : "Developed SW for Scanning Acoustic Microscopes."
        },
        {
            "employer" : "GreenHill",
            "title" : "Sr. Software Engineer",
            "location" : "Dallas, TX",
            "dates" : "March 2006 - June 2011",
            "description" : "Developed financial Performance Measurement applications."
        }
    ]
}

var projects = {
    "projects" : [
        {
            "title" : "Project 1",
            "dates" : "6 weeks",
            "description" : "Project 1 description",

            "images" : [
                "http://www.ironwoodlife.com/portfolio/images/kitty1-400.jpg",
                "http://www.ironwoodlife.com/portfolio/images/kitty2-400.jpg"
            ],
            "imagesAlt" : [
                "The BEFORE image of my first project",
                "The AFTER image of my first project"
            ]
        },
        {
            "title" : "Project 2",
            "dates" : "6 weeks",
            "description" : "Project 2 description",

            "images" : [
                "http://www.ironwoodlife.com/portfolio/images/kitty2-400.jpg",
                "http://www.ironwoodlife.com/portfolio/images/kitty3-400.jpg"
            ],
            "imagesAlt" : [
                "The BEFORE image of my second project",
                "The AFTER image of my second project"
            ]
        }
    ]
}

var bio = {
    "genericContact" : "Google Transponder ID",
    "genericData" : "ETO3715",
    "name" : "David R. Mumford",
    "role" : "Front-End Web Developer",
    "welcomeMessage" : "Welcome Message ...",

    "contacts" : {
        "mobile" : "301.318.3516",
        "email" : "David.Royal.Mumford@gmail.com",
        "twitter" : "drmumford",
        "github" : "drmumford",
        "location" : "Severna Park, MD"
    },

    "bioPic" : "http://www.ironwoodlife.com/portfolio/images/logo-400.jpg",

    "skills" : [
        "HTML", "JavaScript", "JQuery", "Bootstrap"
    ]
}

var education = {
    "schools" : [
        {
            "name" : "University of Vermont",
            "location" : "Burlington, VT",
            "degree" : "Foundation Engineering Courses",
            "majors" : [""],
            "dates" : "1983",
            "url" : "http://www.uvm.edu"
        },
        {
            "name" : "University of Maryland",
            "location" : "College Park, MD",
            "degree" : "BS",
            "majors" : ["Electrical Engineering"],
            "dates" : "1989",
            "url" : "http://www.umd.edu"
        }
    ],

    "OnlineCourses" : [
        {
            "title" : "Front-End Web Development",
            "school" : "Udacity",
            "dates" : "2015",
            "url" : "http://www.udacity.com"
        },
        {
            "title" : "Mobile Device Development",
            "school" : "Anne Arundel Community College",
            "dates" : "2015",
            "url" : "http://www.aacc.edu"
        }
    ]
}

// Resume Header  -------------
addTitleAndContactInfo();
addBio();

// Work Experience ------------
for (job in work.jobs)
{
    displayJob(job);
}

// Projects -------------------
// Per the instructions, create a 'display' property to encapsulate how projects are displayed.
projects.display = function() {
    for (project in projects.projects)
    {
        displayProject(project);
    }
}

projects.display(); // voila!

// Education ------------------
$("#education").append(HTMLschoolStart);

var formattedSchoolName =  HTMLworkEmployer.replace("%data%", education.schools[0].name);
var formattedSchoolDegree =  HTMLworkTitle.replace("%data%", education.schools[0].degree);
$(".education-entry").append(formattedSchoolName + formattedSchoolDegree);

formattedSchoolName =  HTMLworkEmployer.replace("%data%", education.schools[1].name);
formattedSchoolDegree =  HTMLworkTitle.replace("%data%", education.schools[1].degree);
$(".education-entry").append(formattedSchoolName + formattedSchoolDegree);

// Map ------------------------
$("#mapDiv").append(googleMap);

//
// Internationalization Exercise.
//

// Enable the internationalize button.
//$("#main").append(internationalizeButton);

// Two important points missing from the instruction:
//   1) the following global variable has to be declared, and
//   2) it has to be declared after the HTMLheaderName has been added to the DOM.
//var name = $('#name').text();
