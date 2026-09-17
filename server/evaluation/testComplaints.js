const testComplaints = [

    // ==========================================
    // 1-7 : ELECTRICITY
    // ==========================================

    {
        id: 1,
        complaint: "The ceiling fan in Classroom 204 is not working.",
        expectedCategory: "Electricity",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 2,
        complaint: "There is a power failure in the entire computer laboratory.",
        expectedCategory: "Electricity",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 3,
        complaint: "The lights in the corridor near Block B are flickering continuously.",
        expectedCategory: "Electricity",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 4,
        complaint: "A damaged electrical wire is exposed near the classroom entrance.",
        expectedCategory: "Electricity",
        expectedPriority: "Emergency",
        expectedEmergency: true
    },

    {
        id: 5,
        complaint: "The air conditioner in Seminar Hall 2 has stopped working.",
        expectedCategory: "Electricity",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 6,
        complaint: "There are sparks coming from the electrical switchboard in the laboratory.",
        expectedCategory: "Electricity",
        expectedPriority: "Emergency",
        expectedEmergency: true
    },

    {
        id: 7,
        complaint: "Several lights in the library are not turning on.",
        expectedCategory: "Electricity",
        expectedPriority: "Low",
        expectedEmergency: false
    },


    // ==========================================
    // 8-13 : WATER
    // ==========================================

    {
        id: 8,
        complaint: "Water is leaking from the ceiling of Classroom 101.",
        expectedCategory: "Water",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 9,
        complaint: "The drinking water cooler near the library is not supplying water.",
        expectedCategory: "Water",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 10,
        complaint: "The washroom tap has been leaking continuously since morning.",
        expectedCategory: "Water",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 11,
        complaint: "There is heavy water flooding near the main campus entrance.",
        expectedCategory: "Water",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 12,
        complaint: "The water supply to Block C has completely stopped.",
        expectedCategory: "Water",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 13,
        complaint: "A water pipe has burst and water is rapidly spreading inside the building.",
        expectedCategory: "Water",
        expectedPriority: "Emergency",
        expectedEmergency: true
    },


    // ==========================================
    // 14-19 : NETWORK
    // ==========================================

    {
        id: 14,
        complaint: "WiFi is not working in Computer Lab 3.",
        expectedCategory: "Network",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 15,
        complaint: "The internet connection in the library is extremely slow.",
        expectedCategory: "Network",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 16,
        complaint: "Students cannot connect their laptops to the campus WiFi.",
        expectedCategory: "Network",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 17,
        complaint: "The network connection keeps disconnecting every few minutes in the laboratory.",
        expectedCategory: "Network",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 18,
        complaint: "The WiFi signal is weak in the second floor corridor.",
        expectedCategory: "Network",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 19,
        complaint: "The college portal is inaccessible from the campus network.",
        expectedCategory: "Network",
        expectedPriority: "High",
        expectedEmergency: false
    },


    // ==========================================
    // 20-25 : SECURITY
    // ==========================================

    {
        id: 20,
        complaint: "The main campus gate is being left unattended during college hours.",
        expectedCategory: "Security",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 21,
        complaint: "A suspicious person is trying to enter the restricted laboratory area.",
        expectedCategory: "Security",
        expectedPriority: "Emergency",
        expectedEmergency: true
    },

    {
        id: 22,
        complaint: "The CCTV camera near the parking area is not working.",
        expectedCategory: "Security",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 23,
        complaint: "My college ID card was stolen from my bag in the classroom.",
        expectedCategory: "Security",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 24,
        complaint: "The security guard is not present at the hostel entrance.",
        expectedCategory: "Security",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 25,
        complaint: "Someone is threatening students near the campus gate right now.",
        expectedCategory: "Security",
        expectedPriority: "Emergency",
        expectedEmergency: true
    },


    // ==========================================
    // 26-31 : CLEANLINESS
    // ==========================================

    {
        id: 26,
        complaint: "Garbage has not been collected from the classroom area for three days.",
        expectedCategory: "Cleanliness",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 27,
        complaint: "The washroom is very dirty and needs immediate cleaning.",
        expectedCategory: "Cleanliness",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 28,
        complaint: "There is garbage scattered around the cafeteria entrance.",
        expectedCategory: "Cleanliness",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 29,
        complaint: "The classroom floor has not been cleaned since yesterday.",
        expectedCategory: "Cleanliness",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 30,
        complaint: "A large amount of waste is blocking the corridor.",
        expectedCategory: "Cleanliness",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 31,
        complaint: "The garbage bin near the library is overflowing.",
        expectedCategory: "Cleanliness",
        expectedPriority: "Medium",
        expectedEmergency: false
    },


    // ==========================================
    // 32-37 : FURNITURE
    // ==========================================

    {
        id: 32,
        complaint: "Several chairs in Classroom 205 are broken.",
        expectedCategory: "Furniture",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 33,
        complaint: "The classroom desk is damaged and cannot be used.",
        expectedCategory: "Furniture",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 34,
        complaint: "A broken chair has a sharp metal edge that could injure students.",
        expectedCategory: "Furniture",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 35,
        complaint: "The laboratory stools are unstable and need replacement.",
        expectedCategory: "Furniture",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 36,
        complaint: "The library study table is broken.",
        expectedCategory: "Furniture",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 37,
        complaint: "The cupboard door in the faculty room is damaged.",
        expectedCategory: "Furniture",
        expectedPriority: "Low",
        expectedEmergency: false
    },


    // ==========================================
    // 38-43 : MAINTENANCE
    // ==========================================

    {
        id: 38,
        complaint: "The classroom door is damaged and does not close properly.",
        expectedCategory: "Maintenance",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 39,
        complaint: "The projector in Seminar Hall 1 is not working.",
        expectedCategory: "Maintenance",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 40,
        complaint: "The ceiling plaster is falling down in the old classroom building.",
        expectedCategory: "Maintenance",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 41,
        complaint: "The elevator in Block A has stopped working.",
        expectedCategory: "Maintenance",
        expectedPriority: "High",
        expectedEmergency: false
    },

    {
        id: 42,
        complaint: "The classroom window is damaged and cannot be closed.",
        expectedCategory: "Maintenance",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 43,
        complaint: "A large piece of ceiling material has fallen into the classroom.",
        expectedCategory: "Maintenance",
        expectedPriority: "Emergency",
        expectedEmergency: true
    },


    // ==========================================
    // 44-50 : OTHER / AMBIGUOUS
    // ==========================================

    {
        id: 44,
        complaint: "I found an unidentified item near the college auditorium.",
        expectedCategory: "Other",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 45,
        complaint: "I am unable to understand where to report a problem with my student ID.",
        expectedCategory: "Other",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 46,
        complaint: "There is an unusual problem in the campus area and I need administrative assistance.",
        expectedCategory: "Other",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 47,
        complaint: "I lost my notebook somewhere inside the college campus.",
        expectedCategory: "Other",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 48,
        complaint: "I found a wallet near the cafeteria and do not know where to submit it.",
        expectedCategory: "Other",
        expectedPriority: "Low",
        expectedEmergency: false
    },

    {
        id: 49,
        complaint: "A student needs help regarding an issue that does not belong to any listed campus service.",
        expectedCategory: "Other",
        expectedPriority: "Medium",
        expectedEmergency: false
    },

    {
        id: 50,
        complaint: "There is an unidentified unattended bag inside the main building and nobody knows who it belongs to.",
        expectedCategory: "Security",
        expectedPriority: "Emergency",
        expectedEmergency: true
    }

];

module.exports = testComplaints;