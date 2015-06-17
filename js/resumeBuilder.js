var work = {
    "jobs" : [
        {
            "employer" : "Denro, Inc.",
            "title" : "Design Engineer",
            "location" : "Gaithersburg, MD",
            "dates" : "8 years",
            "description" : "I designed electrical circuits for Air Traffic Control systems."
        },
        {
            "employer" : "Acterna, Inc.",
            "title" : "Software Engineer",
            "location" : "Germantown, MD",
            "dates" : "5 years",
            "description" : "Developed SW for telecommunication test equipment."
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
                "http://www.ironwood.com/Portfolio/images/logo-600.jpg",
                "http://www.ironwood.com/Portfolio/images/kitty2-600.jpg"
            ]
        },
        {
            "title" : "Project 2",
            "dates" : "6 weeks",
            "description" : "Project 1 description",
            "images" : [
                "http://www.ironwood.com/Portfolio/images/logo-800.jpg",
                "http://www.ironwood.com/Portfolio/images/kitty1-800.jpg"
            ]
        }
    ]
}

var bio = {
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

    "skills" : [
        "HTML", "JavaScript", "JQuery", "Bootstrap"
    ]
}

var education = {
    "schools" : [
        {
            "name" : "University of Vermont",
            "location" : "Burlington, VT",
            "degree" : "",
            "majors" : ["Engineering Foundation Courses"],
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

/*
var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);


//var formattedGeneric = HTMLcontactGeneric.replace("%data%", bio.generic);
var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

var bioPic = HTMLbioPic.replace("%data%", bio.bioPic);

//$("#topContacts").append(formattedGeneric);
$("#topContacts").append(formattedMobile);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedTwitter);
$("#topContacts").append(formattedGithub);
$("#topContacts").append(formattedBlog);
$("#topContacts").append(formattedLocation);

//$("#topContacts").append(bioPic);

$("#workExperience").append(HTMLworkStart);
//var formattedWorkStart =  HTMLworkStart.replace("%data", work.);
var formattedWorkEmployer =  HTMLworkEmployer.replace("%data%", work.Employer);
var formattedWorkTitle =  HTMLworkTitle.replace("%data%", work.Title);
//var formattedWorkDates = HTMLworkDates.replace("%data", work.);
//var formattedWorkLocation = HTMLworkLocation.replace("%data", work.);
//var formattedWorkDescription = HTMLworkDescription.replace("%data", work.);

$(".work-entry").append(formattedWorkEmployer + formattedWorkTitle);
//$(".work-entry").append(formattedWorkTitle);


$("#education").append(HTMLschoolStart);

var formattedSchoolName =  HTMLworkEmployer.replace("%data%", education.name);
var formattedSchoolDegree =  HTMLworkTitle.replace("%data%", education.degree);
$(".education-entry").append(formattedSchoolName + formattedSchoolDegree);
*/