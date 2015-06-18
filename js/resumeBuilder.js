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
            "location" : "Germantown, MD",
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
            "location" : "Germantown, MD",
            "dates" : "March 2006 - June 2011",
            "description" : "Developed a financial Performance Measurement application."
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

    "bioPic" : "http://www.ironwoodlife.com/portfolio/images/logo-800.jpg",

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

var formattedName = HTMLheaderName.replace("%data%", bio.name);
var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);

var formattedGeneric = HTMLcontactGeneric.replace("%contact%", bio.genericContact);
formattedGeneric = formattedGeneric.replace("%data%", bio.genericData);

var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
var formattedWelcomeMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);

var profilePicture = HTMLbioPic.replace("%data%", bio.bioPic);

$("#topContacts").append(formattedGeneric);
$("#topContacts").append(formattedMobile);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedTwitter);
$("#topContacts").append(formattedGithub);
$("#topContacts").append(formattedBlog);
$("#topContacts").append(formattedLocation);

$("#header").append(profilePicture);
$("#header").append(formattedWelcomeMsg);

// Skills ---------------------
if (bio.skills.length > 0)
{
    addSkills(bio.skills);
}

// Work Experience ------------
for (job in work.jobs)
{
    workExperienceForJob(job);
}

// Education ------------------
$("#education").append(HTMLschoolStart);

var formattedSchoolName =  HTMLworkEmployer.replace("%data%", education.schools[0].name);
var formattedSchoolDegree =  HTMLworkTitle.replace("%data%", education.schools[0].degree);
$(".education-entry").append(formattedSchoolName + formattedSchoolDegree);

formattedSchoolName =  HTMLworkEmployer.replace("%data%", education.schools[1].name);
formattedSchoolDegree =  HTMLworkTitle.replace("%data%", education.schools[1].degree);
$(".education-entry").append(formattedSchoolName + formattedSchoolDegree);

//
// Internationalization Exercise.
//

// Enable the internationalize button.
//$("#main").append(internationalizeButton);

// Two important points missing from the instruction:
//   1) the following global variable has to be declared, and
//   2) it has to be declared after the HTMLheaderName has been added to the DOM.
//var name = $('#name').text();
