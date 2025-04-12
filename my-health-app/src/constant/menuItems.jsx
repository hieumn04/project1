



export const menuItems = [
    {key: "/blog", label: "Blog", path: "/blog"},
    {key:"program", label: "Program", path: "/program",
        roles:["psychologist", "manager", "student"],
        children: [
            {
                key:"/program",
                label: "Program List",
                path: "/program",   

            }
        ]
    },
    {key:"test", label: "Survey", path: "/test",
        roles:["student", "psychologist", "manager"],
        children: [
            {
                key:"/test",
                label: "Survey List",
                path: "/test",
                roles: ["student", "psychologist", "manager"],
            },
            {
                key: "/create-test",
                label: "Create Survey",
                path: "/create-test",
                roles: ["psychologist", "manager"],
            },
            {
                key: "/update-survey",
                label: "Update Survey",
                path: "/update-survey",
                roles: ["psychologist", "manager"],
            }
        ]
    },
    {
        key: "/book-appointment",
        label: "Book Now",
        path: "/book-appointment",
        special: true,
        roles: ["student"],  
    },
    {
        key: "/calendar",
        label: "Appointment",
        path: "/calendar",
        special: true,
        roles: ["psychologist"],
    }



]

export const dropdownMenu = [


]
