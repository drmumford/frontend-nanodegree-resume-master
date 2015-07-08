var work = {
    "jobs" : [
        {
            "employer" : "Denro, Inc.",
            "title" : "Design Engineer",
            "location" : "Gaithersburg, MD, USA",
            "dates" : "Nov 1989 - Oct 1998",
            "description" : "Designed electrical circuits for Air Traffic Control systems."
        },
        {
            "employer" : "Acterna, Inc.",
            "title" : "Software Engineer",
            "location" : "Germantown, MD, USA",
            "dates" : "Nov 1998 - March 2003",
            "description" : "Developed SW for telecommunication test equipment."
        },
        {
            "employer" : "TCNI",
            "title" : "Sr. Software Engineer",
            "location" : "Germantown, MD, USA",
            "dates" : "March 2003 - March 2004",
            "description" : "Developed SW for the US Navy."
        },
        {
            "employer" : "Sonix",
            "title" : "Independent Contractor / Principal Software Engineer",
            "location" : "Springfield, VA, USA",
            "dates" : "March 2004 - March 2006",
            "description" : "Developed SW for Scanning Acoustic Microscopes."
        },
        {
            "employer" : "GreenHill",
            "title" : "Sr. Software Engineer",
            "location" : "Germantown, MD, USA",
            "dates" : "March 2006 - June 2011",
            "description" : "Developed investment performance measurement applications."
        }
    ]
}

var projects = {
    "projects" : [
        {
            "title" : "Online Portfolio",
            "dates" : "June 2015",
            "description" : "My online portfolio  completed as part of Udacity's Front-End Web Developer Nanodegree.",

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
            "title" : "HTML Canvas Game",
            "dates" : "July 2015",
            "description" : "My take on the classic arcade game 'Frogger' completed as part of Udacity's Front-end Web Development course.",

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
    "genericContact" : "",
    "genericData" : "",
    "name" : "David R. Mumford",
    "role" : "Front-End Web Developer",
    "welcomeMessage" : "Results driven developer with a proven ability to create world-class products for my employers.",

    "contacts" : {
        "mobile" : "301.318.3516",
        "email" : "David.Royal.Mumford@gmail.com",
        "twitter" : "drmumford",
        "github" : "drmumford",
        "blog" : "", // no current blog.
        "location" : "Severna Park, MD, USA"
    },

    "bioPic" : "http://www.ironwoodlife.com/resume/images/profile.png",

    "skills" : [

        // Languages.
        "C#", "VB.NET", "C++", "C", "XML", "HTML5", "CSS3", "JavaScript", "PHP", "SQL", "JQuery", "Bootstrap", "PostScript",

        // Databases.
        "SQL Server", "MySQL",

        // Libraries and Tools.
        "Visual Studio",  "MS Project",

        "Apache",

        "Integration Services (SSIS)", "Reporting Services (SSRS)", "Dundas Chart for Reporting Services",

        ".NET Framework", "ASP.NET",

        "GIT", "GitHub", "SVN", "TortoiseSVN", "CVS", "make",

        "Agile (Scrum)",

        "Windows", "Unix (Solaris)", "Linux (Red Hat)",

        "LINQ",  "Serialization",

        "Design Patterns", "OOAD",

        "Digital/Analog Circuit Design",
        "Project Management",
    ]
}

var education = {
    "schools" : [ // NOTE: Leave location blank for online schools.
        {
            "name" : "University of Vermont",
            "url" : "http://www.uvm.edu",
            "location" : "Burlington, VT",
            "online" : "no",
            "details" : "Foundation Engineering Courses",
            "dates" : "1983 - 1985"
        },
        {
            "name" : "University of Maryland",
            "url" : "http://www.umd.edu",
            "location" : "College Park, MD, USA",
            "online" : "no",
            "details" : "BS Electrical Engineering",
            "dates" : "1987 - 1989"
        },
        {
            "name" : "Udacity",
            "url" : "http://www.udacity.com",
            "location" : "Mountain View, CA, USA",
            "online": "yes",
            "details" : "Front-End Web Development Nanodegree",
            "dates" : "2015"
        },
        {
            "name" : "Anne Arundel Community College",
            "url" : "http://www.aacc.edu",
            "location": "Arnold, MD, USA",
            "online": "yes",
            "details" : "Mobile Device Development Certificate",
            "dates" : "2015"
        }
    ]
}

// Resume Header  -------------
bio.display = function() {
    addNameAndTitle();
    addContactInfo("#topContacts");
    addBio();
    addSkillsCatalog();
}

bio.display();

// Work Experience ------------
work.display = function() {
    for (job in work.jobs)
    {
        displayJob(job);
    }
}

work.display();

// Projects -------------------
projects.display = function() {
    for (project in projects.projects)
    {
        displayProject(project);
    }
}

projects.display();

// Education ------------------
education.display = function() {
    for (school in education.schools)
    {
        displaySchool(school);
    }
}

education.display();

// Resume Footer  -------------
addContactInfo("#footerContacts");


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
