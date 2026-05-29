import { useMemo, useState } from "react";
import { useDashboardAutosave } from "./useDashboardAutosave";

const defaultDashboardData = {
  "registrations": [
    {
      "id": "kid-eduardagasiev-",
      "childName": "Eduard Agasiev",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Family: Agasiev | Phone: (720) 280-8358"
    },
    {
      "id": "kid-paulinaagasieva-",
      "childName": "Paulina Agasieva",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Family: Agasieva | Phone: (720) 280-8358"
    },
    {
      "id": "kid-asheraltonen-1993-12-19",
      "childName": "Asher Altonen",
      "age": "11",
      "group": "Tigers",
      "registered": true,
      "notes": "Family: Altonen | Phone: (719) 351-5358"
    },
    {
      "id": "kid-milaaltonen-2018-06-08",
      "childName": "Mila Altonen",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Family: Altonen Household | Phone: +1 9315358"
    },
    {
      "id": "kid-rioaltonen-2020-09-19",
      "childName": "Rio Altonen",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Altonen Household | Phone: (719) 351-5358"
    },
    {
      "id": "kid-allyanaanderson-2016-01-04",
      "childName": "Allyana Anderson",
      "age": "10",
      "group": "Jaguars",
      "registered": true,
      "notes": "Family: Anderson | Phone: (720) 331-1421 | Email: allyana1416@gmail.com"
    },
    {
      "id": "kid-brooklynchirita-2021-02-22",
      "childName": "Brooklyn Chirita",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Chirita Household | Phone: (720) 438-0912 | Email: Jcchirita@gmail.com"
    },
    {
      "id": "kid-delaneychirita-2022-08-20",
      "childName": "Delaney Chirita",
      "age": "3",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Family: Chirita Household | Phone: (720) 438-0912 | Email: Jcchirita@gmail.com"
    },
    {
      "id": "kid-noahchirita-2017-12-13",
      "childName": "Noah Chirita",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Family: Chirita Household | Phone: (720) 438-0912 | Email: Jcchirita@gmail.com"
    },
    {
      "id": "kid-paytonchirita-2016-08-24",
      "childName": "Payton Chirita",
      "age": "9",
      "group": "Sloths",
      "registered": true,
      "notes": "Family: Chirita Household | Phone: (720) 492-5453 | Email: jcchirita@gmail.com"
    },
    {
      "id": "kid-reaganchirita-2019-06-22",
      "childName": "Reagan Chirita",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Chirita Household | Phone: (720) 438-0912 | Email: Jcchirita@gmail.com"
    },
    {
      "id": "kid-eirenediermann-2019-11-16",
      "childName": "Eirene Diermann",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Diermann Household | Phone: (704) 909-8656"
    },
    {
      "id": "kid-margotdiermann-2021-10-02",
      "childName": "Margot Diermann",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Diermann Household | Phone: (704) 909-8656"
    },
    {
      "id": "kid-ashereigenberg-2019-03-12",
      "childName": "Asher Eigenberg",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Eigenberg Household | Phone: (303) 518-2065 | Email: Savannah.Eigenberg@gmail.com"
    },
    {
      "id": "kid-kindleeigenberg-2016-09-09",
      "childName": "Kindle Eigenberg",
      "age": "9",
      "group": "Sloths",
      "registered": true,
      "notes": "Family: Eigenberg Household | Phone: (303) 518-2065 | Email: savannah.eigenberg@gmail.com"
    },
    {
      "id": "kid-jonahescalante-2017-08-04",
      "childName": "Jonah Escalante",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Family: Escalante Household | Phone: (720) 312-7733 | Email: Mog111187@gmail.com"
    },
    {
      "id": "kid-micahescalante-2020-08-09",
      "childName": "Micah Escalante",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Escalante Household | Phone: 720312773"
    },
    {
      "id": "kid-madelinegidenko-2019-05-06",
      "childName": "Madeline Gidenko",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Gidenko Household | Phone: (209) 450-5033"
    },
    {
      "id": "kid-elliegrein-2018-04-09",
      "childName": "Ellie Grein",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Family: Grein Household | Phone: (303) 570-2443"
    },
    {
      "id": "kid-nathangray-2020-09-03",
      "childName": "Nathan Gray",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Grein Household | Phone: (303) 570-2443 | Email: Stacy.grein08@gmail.com"
    },
    {
      "id": "kid-samuelgrein-2019-04-18",
      "childName": "Samuel Grein",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Grein Household | Phone: (303) 570-2443"
    },
    {
      "id": "kid-annieherschberg-2021-11-02",
      "childName": "Annie Herschberg",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Herschberg Household | Phone: (720) 352-7069 | Email: Natalieherschberg@gmail.com"
    },
    {
      "id": "kid-hansherschberg-2018-08-21",
      "childName": "Hans Herschberg",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Herschberg Household | Phone: (720) 352-7069 | Email: Natalieherschberg@gmail.com"
    },
    {
      "id": "kid-kennedyjones-2021-08-16",
      "childName": "Kennedy Jones",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Jones | Phone: (858) 357-6017"
    },
    {
      "id": "kid-benkim-2019-11-26",
      "childName": "Ben Kim",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Kim Household | Phone: (303) 994-4881 | Email: Mcmathmelissa@gmail.com"
    },
    {
      "id": "kid-zionkim-2021-11-21",
      "childName": "Zion Kim",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Kim Household | Phone: (303) 994-4881 | Email: Mcmathmelissa@gmail.com"
    },
    {
      "id": "kid-gabriellugo-2016-04-21",
      "childName": "Gabriel Lugo",
      "age": "10",
      "group": "Jaguars",
      "registered": true,
      "notes": "Family: Lugo Household | Phone: (504) 655-4249 | Email: cathylugo1219@gmail.com"
    },
    {
      "id": "kid-oliverlugo-2018-11-30",
      "childName": "Oliver Lugo",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Lugo Household | Phone: (504) 655-4249 | Email: cathylugo1219@gmail.com"
    },
    {
      "id": "kid-kenleynicholson-2015-08-28",
      "childName": "Kenley Nicholson",
      "age": "10",
      "group": "Jaguars",
      "registered": true,
      "notes": "Family: Nicholson Household | Phone: (303) 478-7803 | Email: brookann@comcast.net"
    },
    {
      "id": "kid-mylesnicholson-2020-05-16",
      "childName": "Myles Nicholson",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Nicholson Household | Phone: (303) 478-7803 | Email: brookann@comcast.net"
    },
    {
      "id": "kid-zionnicholson-2017-01-28",
      "childName": "Zion Nicholson",
      "age": "9",
      "group": "Sloths",
      "registered": true,
      "notes": "Family: Nicholson Household | Phone: (303) 478-7803 | Email: brookann@comcast.net"
    },
    {
      "id": "kid-rosemarynolan-2022-06-30",
      "childName": "Rosemary Nolan",
      "age": "3",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Family: Nolan Household | Phone: (267) 887-8025"
    },
    {
      "id": "kid-twilanolan-2020-02-08",
      "childName": "Twila Nolan",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Family: Nolan Household | Phone: (267) 887-8025"
    },
    {
      "id": "kid-beniparsons-2021-11-04",
      "childName": "Beni Parsons",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Parsons Household | Phone: (303) 565-6020 | Email: bakkenjessica@gmail.com"
    },
    {
      "id": "kid-madelinephillips-2018-05-03",
      "childName": "Madeline Phillips",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Family: Phillips Household | Phone: (574) 218-5984 | Email: phillipsekendra@gmail.com"
    },
    {
      "id": "kid-theaphillips-2022-05-20",
      "childName": "Thea Phillips",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Phillips Household | Phone: (574) 218-5984 | Email: Phillipsekendra@gmail.com"
    },
    {
      "id": "kid-wesleyphillips-2020-07-19",
      "childName": "Wesley Phillips",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Phillips Household | Phone: (574) 218-5984 | Email: Phillipsekendra@gmail.com"
    },
    {
      "id": "kid-milanapidkalyuk-",
      "childName": "Milana Pidkalyuk",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Family: Pidkalyuk | Phone: (720) 280-8358"
    },
    {
      "id": "kid-annikarhodes-2016-11-29",
      "childName": "Annika Rhodes",
      "age": "9",
      "group": "Sloths",
      "registered": true,
      "notes": "Family: Rhodes | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-elirhodes-2018-02-27",
      "childName": "Eli Rhodes",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Family: Rhodes | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-isaacrhodes-2021-10-25",
      "childName": "Isaac Rhodes",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Rhodes | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-leahrhodes-2014-11-09",
      "childName": "Leah Rhodes",
      "age": "11",
      "group": "Tigers",
      "registered": true,
      "notes": "Family: Rhodes | Phone: (720) 299-9298"
    },
    {
      "id": "kid-everlyschreiber-2020-09-18",
      "childName": "Everly Schreiber",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Schreiber Household | Phone: (801) 428-9165"
    },
    {
      "id": "kid-zionshabanyan-2021-10-17",
      "childName": "zion shabanyan",
      "age": "4",
      "group": "Toucans",
      "registered": true,
      "notes": "Family: Shabanyan Household | Phone: (720) 421-8083"
    }
  ],
  "volunteers": [
    {
      "id": "interest-alexis-s",
      "name": "Alexis S",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-ana-julia-dasilva",
      "name": "Ana Julia DaSilva",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-ben-lee",
      "name": "Ben Lee",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-brandon-cheun",
      "name": "Brandon Cheun",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-brook-nicholson",
      "name": "Brook Nicholson",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-chloe-guttormson",
      "name": "Chloe Guttormson",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-christine-hodges",
      "name": "Christine Hodges",
      "role": "Lead",
      "day": "Thursday",
      "confirmed": true
    },
    {
      "id": "interest-danielle-carr",
      "name": "Danielle Carr",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-elisabeth-martin",
      "name": "Elisabeth Martin",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-ellie-clifford",
      "name": "Ellie Clifford",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-eva-kim",
      "name": "Eva Kim",
      "role": "Support",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-evelyn-odnoralof",
      "name": "Evelyn Odnoralof",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-evelyn-odnoralov",
      "name": "Evelyn Odnoralov",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-gabriella-burgos",
      "name": "Gabriella Burgos",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-gabriella-kish",
      "name": "Gabriella Kish",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-glory-clark",
      "name": "Glory Clark",
      "role": "Support",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-grace-glukhoman",
      "name": "Grace Glukhoman",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-grace-kim",
      "name": "Grace Kim",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-hadassah-russell",
      "name": "Hadassah Russell",
      "role": "Support",
      "day": "Monday, Tuesday",
      "confirmed": true
    },
    {
      "id": "interest-haylie-schreiber",
      "name": "Haylie Schreiber",
      "role": "Support",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-ian-andrews",
      "name": "Ian Andrews",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-isaac-liptac",
      "name": "Isaac Liptac",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-isaisas-medina",
      "name": "Isaisas Medina",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-jolayne-elliot",
      "name": "JoLayne Elliot",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-katherine-lugo",
      "name": "Katherine Lugo",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-kendra-phillips",
      "name": "Kendra Phillips",
      "role": "Support",
      "day": "Monday",
      "confirmed": true
    },
    {
      "id": "interest-kes-hoffman",
      "name": "Kes Hoffman",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-kimbery-carr",
      "name": "Kimbery Carr",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-kyle-hoffman",
      "name": "Kyle Hoffman",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-melissa-kim",
      "name": "Melissa Kim",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-mikaila-slayton",
      "name": "Mikaila Slayton",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-mya-russell",
      "name": "Mya Russell",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-mya-van-nortwick",
      "name": "Mya Van Nortwick",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-nick-manning",
      "name": "Nick Manning",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-perri-funk",
      "name": "Perri Funk",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-raymond-phillips",
      "name": "Raymond Phillips",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-rick-mclaughin",
      "name": "Rick Mclaughin",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-robin-mclaughin",
      "name": "Robin Mclaughin",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-sarah-liptac",
      "name": "Sarah Liptac",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-savannah-eigenberg",
      "name": "Savannah Eigenberg",
      "role": "Lead",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-scarlet-kim",
      "name": "Scarlet Kim",
      "role": "Support",
      "day": "",
      "confirmed": false
    },
    {
      "id": "interest-selah-robles",
      "name": "Selah Robles",
      "role": "Lead",
      "day": "Tuesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-stacy-grein",
      "name": "Stacy Grein",
      "role": "Support",
      "day": "Monday, Tuesday, Wednesday, Thursday",
      "confirmed": true
    },
    {
      "id": "interest-talia-jones",
      "name": "Talia Jones",
      "role": "Support",
      "day": "",
      "confirmed": false
    }
  ],
  "rooms": [
    {
      "id": "sanctuary",
      "name": "Sanctuary",
      "capacity": "",
      "notes": "Transform into a rainforest environment. Add a large visual waterfall installation along the side of the stage. Move all chairs to the back of the room for the week so there is open space for worship, dance, movement, and group engagement. Add clear age-group and animal-color signage so every group knows its morning and pickup meeting spot."
    },
    {
      "id": "mpr-room",
      "name": "MPR Room",
      "capacity": "",
      "notes": "Hallway entrance should feel like passing beneath flowing water using hanging tinsel foil curtains. Cover walls in blue paper. Decorate with sea animals, coral reef elements, rocks, fishing nets, and lesson-connected props. Goal: calm, captivating room where kids dive deeper into who God is and how His Word applies to their lives."
    },
    {
      "id": "kitchen-snack-shack",
      "name": "Kitchen + Outside Kitchen Area",
      "capacity": "",
      "notes": "Use the kitchen and outdoor area directly outside for snacks and lunch. Keep decor simple: paper-lined walls with vines, flowers, and leaves. Add a covering above the kitchen windows so it feels like a tropical hut or snack stand."
    },
    {
      "id": "pre-k-cave-room",
      "name": "Pre-K Room",
      "capacity": "",
      "notes": "Cover walls fully in gray paper to mimic a cave interior. Add rock and boulder elements made from cardboard and paper. Use this room for a quieter station, younger kid reset space, or themed activity rotation."
    },
    {
      "id": "tots-room-verse-vines",
      "name": "Tots Room",
      "capacity": "",
      "notes": "Because the room already has animal wall paintings, keep added decor minimal. Add select wall or ceiling materials if needed. Use hanging vines, greenery, or ceiling elements for the Verse Vines theme."
    },
    {
      "id": "nursery-overflow",
      "name": "Nursery Room",
      "capacity": "",
      "notes": "Use as the 3-year-old hangout, potty-trained preschool support room, nap/reset room, or overflow space if group sizes require it."
    },
    {
      "id": "elementary-creation-station",
      "name": "Elementary Area",
      "capacity": "",
      "notes": "Cover all walls except cabinets and doors with paper. Decorate with vines, flowers, leaves, and optional animal cutouts. Wrap the two pillars in brown paper to look like trees, with chain-linked greenery extending upward as canopy. Arrange tables and chairs in rows for structured craft work."
    },
    {
      "id": "outside-games",
      "name": "Outside Area",
      "capacity": "",
      "notes": "No major decorations needed outside. Keep all games and props on theme. Use relays, team challenges, water games if weather allows, and free-choice activities for Day 4."
    },
    {
      "id": "briefing-room",
      "name": "Briefing Room",
      "capacity": "",
      "notes": "Use for volunteer check-in, coordinator briefing, extra supplies, prep materials, or floater staging. Can also serve as a quiet problem-solving room during transitions."
    },
    {
      "id": "face-paint-room",
      "name": "Face Paint Room",
      "capacity": "",
      "notes": "Use washable, allergy-aware supplies, mirrors, wipes, water, and a simple design board. Keep line control clear. Offer a no-face-paint alternative."
    },
    {
      "id": "bbq-fellowship",
      "name": "BBQ / Fellowship Area",
      "capacity": "",
      "notes": "Use for setup, serving, seating, cleanup, and family welcome. Include allergy labels, trash cans, drink station, seating, and supervised games nearby."
    }
  ],
  "schedule": [],
  "planningNotes": "Seeded from latest VBS dashboard data on 2026-05-28. Registered kids: 44. Volunteer contacts: 44."
};

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const {
    dashboardData,
    setDashboardData,
    saveStatus,
    saveNow,
    clearEverything,
    deleteFirestoreDocument,
    firestoreEnabled,
  } = useDashboardAutosave(defaultDashboardData);

  const [activeTab, setActiveTab] = useState("overview");

  const counts = useMemo(() => {
    const registrations = dashboardData.registrations || [];
    const volunteers = dashboardData.volunteers || [];
    const rooms = dashboardData.rooms || [];
    const schedule = dashboardData.schedule || [];

    return {
      registeredKids: registrations.filter((item) => item.registered).length,
      totalKids: registrations.length,
      volunteers: volunteers.length,
      rooms: rooms.length,
      scheduleBlocks: schedule.length,
    };
  }, [dashboardData]);

  function updateField(section, id, field, value) {
    setDashboardData((current) => ({
      ...current,
      [section]: (current[section] || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }

  function addRegistration() {
    setDashboardData((current) => ({
      ...current,
      registrations: [
        ...(current.registrations || []),
        {
          id: makeId(),
          childName: "",
          age: "",
          group: "",
          registered: true,
          notes: "",
        },
      ],
    }));
  }

  function deleteRegistration(id) {
    setDashboardData(
      (current) => ({
        ...current,
        registrations: (current.registrations || []).filter((item) => item.id !== id),
      }),
      { saveImmediately: true }
    );
  }

  function addVolunteer() {
    setDashboardData((current) => ({
      ...current,
      volunteers: [
        ...(current.volunteers || []),
        {
          id: makeId(),
          name: "",
          role: "",
          day: "",
          confirmed: false,
        },
      ],
    }));
  }

  function deleteVolunteer(id) {
    setDashboardData(
      (current) => ({
        ...current,
        volunteers: (current.volunteers || []).filter((item) => item.id !== id),
      }),
      { saveImmediately: true }
    );
  }

  function addRoom() {
    setDashboardData((current) => ({
      ...current,
      rooms: [
        ...(current.rooms || []),
        {
          id: makeId(),
          name: "",
          capacity: "",
          notes: "",
        },
      ],
    }));
  }

  function deleteRoom(id) {
    setDashboardData(
      (current) => ({
        ...current,
        rooms: (current.rooms || []).filter((item) => item.id !== id),
      }),
      { saveImmediately: true }
    );
  }

  function addScheduleBlock() {
    setDashboardData((current) => ({
      ...current,
      schedule: [
        ...(current.schedule || []),
        {
          id: makeId(),
          time: "",
          activity: "",
          location: "",
          leader: "",
        },
      ],
    }));
  }

  function deleteScheduleBlock(id) {
    setDashboardData(
      (current) => ({
        ...current,
        schedule: (current.schedule || []).filter((item) => item.id !== id),
      }),
      { saveImmediately: true }
    );
  }

  function updatePlanningNotes(value) {
    setDashboardData((current) => ({
      ...current,
      planningNotes: value,
    }));
  }


  function handleSaveNow() {
    void saveNow(dashboardData);
  }

  function handleClearEverything() {
    const confirmed = window.confirm(
      "Clear the entire dashboard in Firestore? This removes all registrations, volunteers, rooms, schedule blocks, and notes."
    );

    if (confirmed) {
      void clearEverything();
    }
  }

  function handleDeleteFirestoreDocument() {
    const confirmed = window.confirm(
      "Delete the Firestore dashboard document completely? This is only for fixing stuck old data."
    );

    if (confirmed) {
      void deleteFirestoreDocument();
    }
  }
  return (
    <main className="app">
      <header className="topbar">
        <div>
          <p className="eyebrow">HOUSE Kids</p>
          <h1>VBS Dashboard</h1>
          <p className="subtitle">
            Registration, volunteers, rooms, schedule, and planning notes.
          </p>
        </div>

        <div className="saveControls">
          <div
            className={`saveBadge ${
              saveStatus === "Saved to Firestore" || saveStatus === "Firestore cleared" ? "saved" : ""
            }`}
          >
            {saveStatus}
          </div>
          <div className="saveButtons">
            <button type="button" onClick={handleSaveNow}>Save Now</button>
            <button type="button" className="warning" onClick={handleClearEverything}>
              Clear Dashboard
            </button>
            <button type="button" className="danger" onClick={handleDeleteFirestoreDocument}>
              Delete Firestore Doc
            </button>
          </div>
          <p className="syncNote">
            {firestoreEnabled ? "Firestore sync is on." : "Firestore sync is off. Check Netlify env vars."}
          </p>
        </div>
      </header>

      <nav className="tabs">
        {["overview", "registrations", "volunteers", "rooms", "schedule", "notes"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab[0].toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </nav>

      {activeTab === "overview" && (
        <section className="panel">
          <h2>Overview</h2>

          <div className="cards">
            <div className="card">
              <span>Registered Kids</span>
              <strong>{counts.registeredKids}</strong>
            </div>
            <div className="card">
              <span>Total Kids</span>
              <strong>{counts.totalKids}</strong>
            </div>
            <div className="card">
              <span>Volunteers</span>
              <strong>{counts.volunteers}</strong>
            </div>
            <div className="card">
              <span>Rooms</span>
              <strong>{counts.rooms}</strong>
            </div>
            <div className="card">
              <span>Schedule Blocks</span>
              <strong>{counts.scheduleBlocks}</strong>
            </div>
          </div>

          <div className="helpBox">
            <h3>Autosave check</h3>
            <p>
              Make a change anywhere on the dashboard. Wait until the save badge says
              <strong> Saved to Firestore</strong>. Deleted rows are now saved by replacing the
              full Firestore dashboard document, not by merging old data back in.
            </p>
          </div>
        </section>
      )}

      {activeTab === "registrations" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Registrations</h2>
            <button onClick={addRegistration}>Add Child</button>
          </div>

          <div className="table">
            <div className="tableHeader registrationsGrid">
              <span>Child Name</span>
              <span>Age</span>
              <span>Group</span>
              <span>Registered</span>
              <span>Notes</span>
              <span></span>
            </div>

            {dashboardData.registrations.map((item) => (
              <div className="tableRow registrationsGrid" key={item.id}>
                <input
                  value={item.childName}
                  onChange={(event) =>
                    updateField("registrations", item.id, "childName", event.target.value)
                  }
                  placeholder="Child name"
                />
                <input
                  value={item.age}
                  onChange={(event) =>
                    updateField("registrations", item.id, "age", event.target.value)
                  }
                  placeholder="Age"
                />
                <input
                  value={item.group}
                  onChange={(event) =>
                    updateField("registrations", item.id, "group", event.target.value)
                  }
                  placeholder="Group"
                />
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    checked={item.registered}
                    onChange={(event) =>
                      updateField("registrations", item.id, "registered", event.target.checked)
                    }
                  />
                  Yes
                </label>
                <input
                  value={item.notes}
                  onChange={(event) =>
                    updateField("registrations", item.id, "notes", event.target.value)
                  }
                  placeholder="Notes"
                />
                <button className="danger" onClick={() => deleteRegistration(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "volunteers" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Volunteers</h2>
            <button onClick={addVolunteer}>Add Volunteer</button>
          </div>

          <div className="table">
            <div className="tableHeader volunteersGrid">
              <span>Name</span>
              <span>Role</span>
              <span>Day</span>
              <span>Confirmed</span>
              <span></span>
            </div>

            {dashboardData.volunteers.map((item) => (
              <div className="tableRow volunteersGrid" key={item.id}>
                <input
                  value={item.name}
                  onChange={(event) =>
                    updateField("volunteers", item.id, "name", event.target.value)
                  }
                  placeholder="Volunteer name"
                />
                <input
                  value={item.role}
                  onChange={(event) =>
                    updateField("volunteers", item.id, "role", event.target.value)
                  }
                  placeholder="Role"
                />
                <input
                  value={item.day}
                  onChange={(event) =>
                    updateField("volunteers", item.id, "day", event.target.value)
                  }
                  placeholder="Day"
                />
                <label className="checkboxLabel">
                  <input
                    type="checkbox"
                    checked={item.confirmed}
                    onChange={(event) =>
                      updateField("volunteers", item.id, "confirmed", event.target.checked)
                    }
                  />
                  Yes
                </label>
                <button className="danger" onClick={() => deleteVolunteer(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "rooms" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Rooms</h2>
            <button onClick={addRoom}>Add Room</button>
          </div>

          <div className="table">
            <div className="tableHeader roomsGrid">
              <span>Room Name</span>
              <span>Capacity</span>
              <span>Notes</span>
              <span></span>
            </div>

            {dashboardData.rooms.map((item) => (
              <div className="tableRow roomsGrid" key={item.id}>
                <input
                  value={item.name}
                  onChange={(event) => updateField("rooms", item.id, "name", event.target.value)}
                  placeholder="Room name"
                />
                <input
                  value={item.capacity}
                  onChange={(event) =>
                    updateField("rooms", item.id, "capacity", event.target.value)
                  }
                  placeholder="Capacity"
                />
                <input
                  value={item.notes}
                  onChange={(event) => updateField("rooms", item.id, "notes", event.target.value)}
                  placeholder="Notes"
                />
                <button className="danger" onClick={() => deleteRoom(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "schedule" && (
        <section className="panel">
          <div className="sectionHeader">
            <h2>Schedule</h2>
            <button onClick={addScheduleBlock}>Add Schedule Block</button>
          </div>

          <div className="table">
            <div className="tableHeader scheduleGrid">
              <span>Time</span>
              <span>Activity</span>
              <span>Location</span>
              <span>Leader</span>
              <span></span>
            </div>

            {dashboardData.schedule.map((item) => (
              <div className="tableRow scheduleGrid" key={item.id}>
                <input
                  value={item.time}
                  onChange={(event) => updateField("schedule", item.id, "time", event.target.value)}
                  placeholder="9:00 AM"
                />
                <input
                  value={item.activity}
                  onChange={(event) =>
                    updateField("schedule", item.id, "activity", event.target.value)
                  }
                  placeholder="Activity"
                />
                <input
                  value={item.location}
                  onChange={(event) =>
                    updateField("schedule", item.id, "location", event.target.value)
                  }
                  placeholder="Location"
                />
                <input
                  value={item.leader}
                  onChange={(event) => updateField("schedule", item.id, "leader", event.target.value)}
                  placeholder="Leader"
                />
                <button className="danger" onClick={() => deleteScheduleBlock(item.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === "notes" && (
        <section className="panel">
          <h2>Planning Notes</h2>
          <textarea
            className="notesBox"
            value={dashboardData.planningNotes}
            onChange={(event) => updatePlanningNotes(event.target.value)}
            placeholder="Write planning notes here. These notes autosave to Firebase."
          />
        </section>
      )}
    </main>
  );
}
