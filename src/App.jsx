
import { useMemo, useState } from "react";
import { useDashboardAutosave } from "./useDashboardAutosave";

const defaultDashboardData = {
  "registrations": [
    {
      "id": "kid-asher-eigenberg-3-12-2019",
      "childName": "Asher Eigenberg",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Grade: Pre-K | Allergy: No Dairy Potty Trained | Health: Seasonal | Photo: I do not give permission | Parent: Savannah | Phone: (303) 518-2065 | Email: savannah.eigenberg@gmail.com"
    },
    {
      "id": "kid-kindle-eigenberg-9-9-2016",
      "childName": "Kindle Eigenberg",
      "age": "9",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 1st Grade | Allergy: No Dairy | Health: Seasonal allergies. | Photo: I do not give permission | Parent: Savannah | Phone: (303) 518-2065 | Email: savannah.eigenberg@gmail.com"
    },
    {
      "id": "kid-mila-altonen-6-8-2018",
      "childName": "Mila Altonen",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Health: N/a | Photo: I give permission | Parent: Kayla | Phone: (719) 351-5358 | Email: kayla.altonen@yahoo.com"
    },
    {
      "id": "kid-rio-altonen-9-19-2020",
      "childName": "Rio Altonen",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Kayla | Phone: (719) 351-5358 | Email: kayla.altonen@yahoo.com"
    },
    {
      "id": "kid-asher-altonen-12-22-2014",
      "childName": "Asher Altonen",
      "age": "11",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 5th Grade | Photo: I give permission | Parent: Kayla | Phone: (719) 351-5358 | Email: kayla.altonen@yahoo.com"
    },
    {
      "id": "kid-allyana-anderson-1-4-2016",
      "childName": "Allyana Anderson",
      "age": "10",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 4th Grade | Photo: I give permission | Parent: Jen | Phone: (720) 331-1421 | Email: jenny6481@msn.com"
    },
    {
      "id": "kid-ben-kim-11-26-2019",
      "childName": "Ben Kim",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Melissa | Phone: (303) 994-4881 | Email: Mcmathmelissa@gmail.com"
    },
    {
      "id": "kid-zion-kim-11-21-2021",
      "childName": "Zion Kim",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Melissa | Phone: (303) 994-4881 | Email: Mcmathmelissa@gmail.com"
    },
    {
      "id": "kid-ellie-grein-4-9-2018",
      "childName": "Ellie Grein",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Grade: 1st Grade | Photo: I give permission | Parent: Stacy | Phone: (303) 570-2443 | Email: stacy.grein08@gmail.com"
    },
    {
      "id": "kid-samuel-grein-4-18-2019",
      "childName": "Samuel Grein",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Grade: 1st Grade | Photo: I give permission | Parent: Stacy | Phone: (303) 570-2443 | Email: stacy.grein08@gmail.com"
    },
    {
      "id": "kid-nathan-gray-9-3-2020",
      "childName": "Nathan Gray",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Photo: I do not give permission | Parent: Stacy | Phone: (303) 570-2443 | Email: stacy.grein08@gmail.com"
    },
    {
      "id": "kid-jonah-escalante-",
      "childName": "Jonah Escalante",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Lucas | Phone: (720) 312-7733 | Email: mog111187@gmail.com"
    },
    {
      "id": "kid-micah-escalante-",
      "childName": "Micah Escalante",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Lucas | Phone: (720) 312-7733 | Email: mog111187@gmail.com"
    },
    {
      "id": "kid-annie-herschberg-11-2-2021",
      "childName": "Annie Herschberg",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Grade: Pre-K | Special: No | Photo: I give permission | Parent: Natalie | Phone: (720) 352-7069 | Email: natalieherschberg@gmail.com"
    },
    {
      "id": "kid-hans-herschberg-8-21-2018",
      "childName": "Hans Herschberg",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Grade: Pre-K | Special: No | Photo: I give permission | Parent: Natalie | Phone: (720) 352-7069 | Email: natalieherschberg@gmail.com"
    },
    {
      "id": "kid-gabriel-lugo-4-21-2016",
      "childName": "Gabriel Lugo",
      "age": "10",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 1st Grade | Allergy: NKDA | Photo: I give permission | Parent: Katherine | Phone: (504) 655-4249 | Email: cathylugo1219@gmail.com"
    },
    {
      "id": "kid-oliver-lugo-11-30-2018",
      "childName": "Oliver Lugo",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Grade: Pre-K | Allergy: NKDA | Photo: I give permission | Parent: Katherine | Phone: (504) 655-4249 | Email: cathylugo1219@gmail.com"
    },
    {
      "id": "kid-payton-chirita-",
      "childName": "Payton Chirita",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Jeremy | Phone: (720) 492-5453 | Email: jchirita@outlook.com"
    },
    {
      "id": "kid-noah-chirita-",
      "childName": "Noah Chirita",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Jeremy | Phone: (720) 492-5453 | Email: jchirita@outlook.com"
    },
    {
      "id": "kid-reagan-chirita-",
      "childName": "Reagan Chirita",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Jeremy | Phone: (720) 492-5453 | Email: jchirita@outlook.com"
    },
    {
      "id": "kid-brooklyn-chirita-",
      "childName": "Brooklyn Chirita",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Jeremy | Phone: (720) 492-5453 | Email: jchirita@outlook.com"
    },
    {
      "id": "kid-delaney-chirita-",
      "childName": "Delaney Chirita",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Jeremy | Phone: (720) 492-5453 | Email: jchirita@outlook.com"
    },
    {
      "id": "kid-twila-nolan-2-8-2020",
      "childName": "Twila Nolan",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Emmaline | Phone: (267) 887-8025 | Email: emmalinetnolan@gmail.com"
    },
    {
      "id": "kid-rosemary-nolan-6-30-2022",
      "childName": "Rosemary Nolan",
      "age": "3",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Emmaline | Phone: (267) 887-8025 | Email: emmalinetnolan@gmail.com"
    },
    {
      "id": "kid-thea-phillips-5-20-2022",
      "childName": "Thea Phillips",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Grade: Pre-K | Special: Nnone | Photo: I give permission | Parent: Kendra | Phone: (574) 218-5984 | Email: Phillipsekendra@gmail.com"
    },
    {
      "id": "kid-wesley-phillips-7-19-2020",
      "childName": "Wesley Phillips",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Grade: Pre-K | Photo: I give permission | Parent: Kendra | Phone: (574) 218-5984 | Email: Phillipsekendra@gmail.com"
    },
    {
      "id": "kid-madeline-phillips-5-3-2018",
      "childName": "Madeline Phillips",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Grade: Kindergarten | Photo: I give permission | Parent: Kendra | Phone: (574) 218-5984 | Email: Phillipsekendra@gmail.com"
    },
    {
      "id": "kid-eirene-diermann-11-16-2019",
      "childName": "Eirene Diermann",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Grade: Pre-K | Special: Na | Photo: I give permission | Parent: Abby | Phone: (704) 909-8656 | Email: abbydiermann@gmail.com;Abby.martin883@gmail.com"
    },
    {
      "id": "kid-margot-diermann-10-2-2021",
      "childName": "Margot Diermann",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Grade: Pre-K | Special: Na | Photo: I give permission | Parent: Abby | Phone: (704) 909-8656 | Email: abbydiermann@gmail.com;Abby.martin883@gmail.com"
    },
    {
      "id": "kid-zion-shabanyan-10-17-2021",
      "childName": "zion shabanyan",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Special: No | Photo: I do not give permission | Parent: Caroline | Phone: (720) 421-8083 | Email: ckolesnikov@yahoo.com"
    },
    {
      "id": "kid-beni-parsons-11-4-2021",
      "childName": "Beni Parsons",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Grade: Pre-K | Health: dairy and pineapple | Special: nope | Photo: I do not give permission | Parent: Jes | Phone: (763) 442-3563 | Email: bakkenjessica@gmail.com"
    },
    {
      "id": "kid-madeline-gidenko-5-6-2019",
      "childName": "Madeline Gidenko",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Alena | Phone: (209) 450-5033 | Email: alenagidenko@gmail.com"
    },
    {
      "id": "kid-mia-gidenko-5-6-2019",
      "childName": "Mia Gidenko",
      "age": "7",
      "group": "Monkeys",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Alena | Phone: (209) 450-5033 | Email: alenagidenko@gmail.com"
    },
    {
      "id": "kid-everly-schreiber-9-18-2020",
      "childName": "Everly Schreiber",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Haylie | Phone: (801) 428-9165 | Email: haylieschreiber@gmail.com"
    },
    {
      "id": "kid-noah-schreiber-4-26-2022",
      "childName": "Noah Schreiber",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Haylie | Phone: (801) 428-9165 | Email: haylieschreiber@gmail.com"
    },
    {
      "id": "kid-paulina-agasieva-",
      "childName": "Paulina Agasieva",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Karina | Phone: (720) 280-8358 | Email: Karinapid@gmail.com"
    },
    {
      "id": "kid-eduard-agasiev-",
      "childName": "Eduard Agasiev",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Karina | Phone: (720) 280-8358 | Email: Karinapid@gmail.com"
    },
    {
      "id": "kid-milana-pidkalyuk-",
      "childName": "Milana Pidkalyuk",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: No | Photo: I give permission | Parent: Karina | Phone: (720) 280-8358 | Email: Karinapid@gmail.com"
    },
    {
      "id": "kid-annika-rhodes-11-29-2016",
      "childName": "Annika Rhodes",
      "age": "9",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 1st Grade | Photo: I give permission | Parent: Lidiia | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-leah-rhodes-11-9-2014",
      "childName": "Leah Rhodes",
      "age": "11",
      "group": "Tigers",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Lidiia | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-isaac-rhodes-10-25-2021",
      "childName": "Isaac Rhodes",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Lidiia | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-eli-rhodes-2-27-2018",
      "childName": "Eli Rhodes",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Grade: Kindergarten | Photo: I give permission | Parent: Lidiia | Phone: (720) 299-9298 | Email: Lpidkalyuk@gmail.com"
    },
    {
      "id": "kid-kennedy-jones-8-16-2021",
      "childName": "Kennedy Jones",
      "age": "4",
      "group": "Tree Frogs",
      "registered": true,
      "notes": "Grade: Pre-K | Allergy: Cashew & Pistachio allergy | Health: Food allergy: Cashew and Pistachio | Photo: I give permission | Parent: Alexa | Phone: (858) 357-6017 | Email: alexadanejones@gmail.com"
    },
    {
      "id": "kid-kenley-nicholson-8-28-2015",
      "childName": "Kenley Nicholson",
      "age": "10",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 3rd Grade | Photo: I give permission | Parent: Brook | Phone: (720) 560-0795 | Email: brookann@comcast.net"
    },
    {
      "id": "kid-zion-nicholson-1-28-2017",
      "childName": "Zion Nicholson",
      "age": "9",
      "group": "Tigers",
      "registered": true,
      "notes": "Grade: 1st Grade | Photo: I give permission | Parent: Brook | Phone: (720) 560-0795 | Email: brookann@comcast.net"
    },
    {
      "id": "kid-myles-nicholson-5-16-2020",
      "childName": "Myles Nicholson",
      "age": "6",
      "group": "Monkeys",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Brook | Phone: (720) 560-0795 | Email: brookann@comcast.net"
    },
    {
      "id": "kid-charlie-morris-",
      "childName": "Charlie Morris",
      "age": "",
      "group": "Needs Review",
      "registered": true,
      "notes": "Special: no | Photo: I give permission | Parent: Amy | Phone: (720) 373-2389 | Email: amy@cr-industriesinc.com"
    },
    {
      "id": "kid-olex-kovalchuk-10-8-2020",
      "childName": "Olex Kovalchuk",
      "age": "5",
      "group": "Toucans",
      "registered": true,
      "notes": "Health: He she do not have any allergy | Special: No, he don’t have a no special needs | Photo: I give permission and I do not give permission | Parent: Larissa | Phone: (678) 906-1424 | Email: kooo9876@hotmail.com"
    },
    {
      "id": "kid-victoria-cardenas-5-20-2016",
      "childName": "victoria Cardenas",
      "age": "10",
      "group": "Tigers",
      "registered": true,
      "notes": "Health: N/a | Photo: I give permission | Parent: Jennifer | Phone: (720) 364-7219 | Email: jm.mc@live.com"
    },
    {
      "id": "kid-valeria-cardenas-10-21-2017",
      "childName": "valeria Cardenas",
      "age": "8",
      "group": "Parrots",
      "registered": true,
      "notes": "Photo: I give permission | Parent: Jennifer | Phone: (720) 364-7219 | Email: jm.mc@live.com"
    }
  ],
  "volunteers": [
    {
      "id": "vol-jake-derosa",
      "name": "Jake DeRosa",
      "phone": "",
      "email": "",
      "status": "Confirmed",
      "commitment": "Full week",
      "role": "Director",
      "assignmentType": "station",
      "assignmentId": "floaters",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Team lead / director."
    },
    {
      "id": "vol-annie",
      "name": "Annie",
      "phone": "",
      "email": "",
      "status": "Confirmed",
      "commitment": "Full week",
      "role": "Director",
      "assignmentType": "station",
      "assignmentId": "floaters",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Team lead / director."
    },
    {
      "id": "vol-alexis-s",
      "name": "Alexis S",
      "phone": "",
      "email": "",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": ""
    },
    {
      "id": "vol-ana-julia-dasilva",
      "name": "Ana Julia DaSilva",
      "phone": "(970) 545-2171",
      "email": "annajulialoch@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (970) 545-2171 | Email: annajulialoch@gmail.com"
    },
    {
      "id": "vol-ben-lee",
      "name": "Ben Lee",
      "phone": "",
      "email": "",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": ""
    },
    {
      "id": "vol-brandon-cheun",
      "name": "Brandon Cheun",
      "phone": "(636) 368-5608",
      "email": "cheunbranden@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (636) 368-5608 | Email: cheunbranden@gmail.com"
    },
    {
      "id": "vol-brook-nicholson",
      "name": "Brook Nicholson",
      "phone": "(720) 560-0795",
      "email": "brookann@comcast.net",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (720) 560-0795 | Email: brookann@comcast.net"
    },
    {
      "id": "vol-chloe-guttormson",
      "name": "Chloe Guttormson",
      "phone": "(730) 360-9061",
      "email": "chloeguttormson@gmail.com",
      "status": "Interest",
      "commitment": "cant help week but prep",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (730) 360-9061 | Email: chloeguttormson@gmail.com"
    },
    {
      "id": "vol-christine-hodges",
      "name": "Christine Hodges",
      "phone": "(303) 550-8552",
      "email": "christineaq77@yahoo.com",
      "status": "Committed",
      "commitment": "Thursday only",
      "role": "BBQ Lead",
      "assignmentType": "station",
      "assignmentId": "bbq",
      "days": "Thursday",
      "notes": "Phone: (303) 550-8552 | Email: christineaq77@yahoo.com | Assignments: Thursday Family BBQ (Lead)"
    },
    {
      "id": "vol-danielle-carr",
      "name": "Danielle Carr",
      "phone": "(303) 408-7465",
      "email": "victoryinjesus75@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Station Lead",
      "assignmentType": "station",
      "assignmentId": "scripture",
      "days": "Monday, Tuesday, Wednesday",
      "notes": "Phone: (303) 408-7465 | Email: victoryinjesus75@gmail.com | Assignments: Monday Memory Verse: Verse Vines (Lead); Tuesday Memory Verse: Verse Vines (Lead); Wednesday Memory Verse: Verse Vines (Lead); Thursday Memory Verse: Verse Vines (Lead)"
    },
    {
      "id": "vol-elisabeth-martin",
      "name": "Elisabeth Martin",
      "phone": "(214) 470-1251",
      "email": "elisabethmartin@housedenver.org",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Lead",
      "assignmentType": "station",
      "assignmentId": "jaguars",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (214) 470-1251 | Email: elisabethmartin@housedenver.org | Assignments: Monday Jaguars (Group Lead); Tuesday Jaguars (Group Lead); Wednesday Jaguars (Group Lead); Thursday Jaguars (Group Lead) | Notes: wants to lead older kids"
    },
    {
      "id": "vol-ellie-clifford",
      "name": "Ellie Clifford",
      "phone": "(317) 771-1411",
      "email": "cliffordellie31@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (317) 771-1411 | Email: cliffordellie31@gmail.com | Notes: Set-up"
    },
    {
      "id": "vol-eva-kim",
      "name": "Eva Kim",
      "phone": "",
      "email": "gracekim@housedenver.org",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "monkeys-1",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Email: gracekim@housedenver.org | Assignments: Monday Monkeys A (Group Support); Tuesday Monkeys A (Group Support); Wednesday Monkeys A (Group Support); Thursday Monkeys A (Group Support)"
    },
    {
      "id": "vol-evelyn-odnoralof",
      "name": "Evelyn Odnoralof",
      "phone": "(720) 448-7204",
      "email": "evelynodnoralov@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Worship Lead",
      "assignmentType": "station",
      "assignmentId": "worship",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (720) 448-7204 | Email: evelynodnoralov@gmail.com"
    },
    {
      "id": "vol-evelyn-odnoralov",
      "name": "Evelyn Odnoralov",
      "phone": "(720) 448-7204",
      "email": "evelynodnoralov@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Worship Lead",
      "assignmentType": "station",
      "assignmentId": "worship",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (720) 448-7204 | Email: evelynodnoralov@gmail.com | Assignments: Monday Worship & Dance: Jungle Jam (Lead); Tuesday Worship & Dance: Jungle Jam (Lead); Wednesday Worship & Dance: Jungle Jam (Lead); Thursday Worship & Dance: Jungle Jam (Lead)"
    },
    {
      "id": "vol-gabriella-burgos",
      "name": "Gabriella Burgos",
      "phone": "(787) 413-9330",
      "email": "gabriella.burgos@hotmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (787) 413-9330 | Email: gabriella.burgos@hotmail.com"
    },
    {
      "id": "vol-gabriella-kish",
      "name": "Gabriella Kish",
      "phone": "(989) 798-3126",
      "email": "kishg@mail.gvsu.edu",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (989) 798-3126 | Email: kishg@mail.gvsu.edu"
    },
    {
      "id": "vol-glory-clark",
      "name": "Glory Clark",
      "phone": "(720) 965-9350",
      "email": "",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "toucans-1",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (720) 965-9350 | Assignments: Monday Toucans A (Group Support); Tuesday Toucans A (Group Support); Wednesday Toucans A (Group Support); Thursday Toucans A (Group Support)"
    },
    {
      "id": "vol-grace-glukhoman",
      "name": "Grace Glukhoman",
      "phone": "(720) 840-0767",
      "email": "g.glukhoman@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Worship Lead",
      "assignmentType": "station",
      "assignmentId": "worship",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (720) 840-0767 | Email: g.glukhoman@gmail.com | Assignments: Monday Worship & Dance: Jungle Jam (Lead); Tuesday Worship & Dance: Jungle Jam (Lead); Wednesday Worship & Dance: Jungle Jam (Lead); Thursday Worship & Dance: Jungle Jam (Lead)"
    },
    {
      "id": "vol-grace-kim",
      "name": "Grace Kim",
      "phone": "(816) 560-0100",
      "email": "gracekim@housedenver.org",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Lead",
      "assignmentType": "station",
      "assignmentId": "monkeys-1",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (816) 560-0100 | Email: gracekim@housedenver.org | Assignments: Monday Monkeys A (Group Lead); Tuesday Monkeys A (Group Lead); Wednesday Monkeys A (Group Lead); Thursday Monkeys A (Group Lead) | Notes: need to contact"
    },
    {
      "id": "vol-hadassah-russell",
      "name": "Hadassah Russell",
      "phone": "(816) 807-9060",
      "email": "",
      "status": "Committed",
      "commitment": "Monday, Tuesday",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "jaguars",
      "days": "Monday, Tuesday",
      "notes": "Phone: (816) 807-9060 | Assignments: Monday Jaguars (Group Support); Tuesday Jaguars (Group Support)"
    },
    {
      "id": "vol-haylie-schreiber",
      "name": "Haylie Schreiber",
      "phone": "(801) 428-9165",
      "email": "haylieschreiber@gmail.com",
      "status": "Committed",
      "commitment": "and prep",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (801) 428-9165 | Email: haylieschreiber@gmail.com"
    },
    {
      "id": "vol-ian-andrews",
      "name": "Ian Andrews",
      "phone": "(720) 417-4412",
      "email": "ianandrews@housedenver.org",
      "status": "Interest",
      "commitment": "full comittement",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (720) 417-4412 | Email: ianandrews@housedenver.org"
    },
    {
      "id": "vol-isaac-liptac",
      "name": "Isaac Liptac",
      "phone": "(321) 474-9505",
      "email": "liptacfamily@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Station Lead",
      "assignmentType": "station",
      "assignmentId": "games",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (321) 474-9505 | Email: liptacfamily@gmail.com | Assignments: Monday Games: Wild About God Games (Lead); Tuesday Games: Wild About God Games (Lead); Wednesday Games: Wild About God Games (Lead); Thursday Games: Wild About God Games (Lead)"
    },
    {
      "id": "vol-isaisas-medina",
      "name": "Isaisas Medina",
      "phone": "(720) 323-7565",
      "email": "Isaiasmedina.venezuela@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (720) 323-7565 | Email: Isaiasmedina.venezuela@gmail.com"
    },
    {
      "id": "vol-jolayne-elliot",
      "name": "JoLayne Elliot",
      "phone": "(970) 946-5567",
      "email": "elliott.jolayne@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Lead",
      "assignmentType": "station",
      "assignmentId": "toucans-1",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (970) 946-5567 | Email: elliott.jolayne@gmail.com | Assignments: Monday Toucans A (Group Lead); Tuesday Toucans A (Group Lead); Wednesday Toucans A (Group Lead); Thursday Toucans A (Group Lead)"
    },
    {
      "id": "vol-katherine-lugo",
      "name": "Katherine Lugo",
      "phone": "(504) 655-4249",
      "email": "cathylugo1219@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (504) 655-4249 | Email: cathylugo1219@gmail.com"
    },
    {
      "id": "vol-kendra-phillips",
      "name": "Kendra Phillips",
      "phone": "(574) 218-5984",
      "email": "Phillipsekendra@gmail.com",
      "status": "Committed",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "Monday",
      "notes": "Phone: (574) 218-5984 | Email: Phillipsekendra@gmail.com"
    },
    {
      "id": "vol-kes-hoffman",
      "name": "Kes Hoffman",
      "phone": "(503) 349-4630",
      "email": "kesandra.rose@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (503) 349-4630 | Email: kesandra.rose@gmail.com"
    },
    {
      "id": "vol-kimbery-carr",
      "name": "Kimbery Carr",
      "phone": "(303) 408-7465",
      "email": "",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (303) 408-7465"
    },
    {
      "id": "vol-kyle-hoffman",
      "name": "Kyle Hoffman",
      "phone": "(425) 239-3536",
      "email": "kylerhofmann@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (425) 239-3536 | Email: kylerhofmann@gmail.com"
    },
    {
      "id": "vol-melissa-kim",
      "name": "Melissa Kim",
      "phone": "(303) 994-4881",
      "email": "Mcmathmelissa@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (303) 994-4881 | Email: Mcmathmelissa@gmail.com"
    },
    {
      "id": "vol-mikaila-slayton",
      "name": "Mikaila Slayton",
      "phone": "(720) 694-6635",
      "email": "",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Station Lead",
      "assignmentType": "station",
      "assignmentId": "games",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (720) 694-6635 | Assignments: Monday Games: Wild About God Games (Lead); Tuesday Games: Wild About God Games (Lead); Wednesday Games: Wild About God Games (Lead); Thursday Games: Wild About God Games (Lead)"
    },
    {
      "id": "vol-mya-russell",
      "name": "Mya Russell",
      "phone": "(816) 816-4098",
      "email": "myarussell2003@icloud.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Worship Lead",
      "assignmentType": "station",
      "assignmentId": "worship",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (816) 816-4098 | Email: myarussell2003@icloud.com | Assignments: Monday Worship & Dance: Jungle Jam (Lead); Tuesday Worship & Dance: Jungle Jam (Lead); Wednesday Worship & Dance: Jungle Jam (Lead); Thursday Worship & Dance: Jungle Jam (Lead)"
    },
    {
      "id": "vol-mya-van-nortwick",
      "name": "Mya Van Nortwick",
      "phone": "(616) 322-1001",
      "email": "mlv21@me.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (616) 322-1001 | Email: mlv21@me.com"
    },
    {
      "id": "vol-nick-manning",
      "name": "Nick Manning",
      "phone": "",
      "email": "",
      "status": "Interest",
      "commitment": "non-vbs week",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Notes: wants to help with design"
    },
    {
      "id": "vol-perri-funk",
      "name": "Perri Funk",
      "phone": "(904) 610-1003",
      "email": "perrifunk@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (904) 610-1003 | Email: perrifunk@gmail.com"
    },
    {
      "id": "vol-raymond-phillips",
      "name": "Raymond Phillips",
      "phone": "(574) 218-2716",
      "email": "raymondphillips@housedenver.org",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Station Lead",
      "assignmentType": "station",
      "assignmentId": "bible",
      "days": "Monday, Tuesday, Wednesday",
      "notes": "Phone: (574) 218-2716 | Email: raymondphillips@housedenver.org | Assignments: Monday Bible: Under the Waterfall (Lead); Tuesday Bible: Under the Waterfall (Lead); Wednesday Bible: Under the Waterfall (Lead); Thursday Bible: Under the Waterfall (Lead)"
    },
    {
      "id": "vol-rick-mclaughin",
      "name": "Rick Mclaughin",
      "phone": "",
      "email": "Robinna123@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Email: Robinna123@gmail.com | Notes: set building"
    },
    {
      "id": "vol-robin-mclaughin",
      "name": "Robin Mclaughin",
      "phone": "(207) 731-9192",
      "email": "Robinna123@gmail.com",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (207) 731-9192 | Email: Robinna123@gmail.com"
    },
    {
      "id": "vol-sarah-liptac",
      "name": "Sarah Liptac",
      "phone": "(321) 474-9505",
      "email": "liptacfamily@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Station Lead",
      "assignmentType": "station",
      "assignmentId": "crafts",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (321) 474-9505 | Email: liptacfamily@gmail.com | Assignments: Monday Crafts: Creation Station (Lead); Tuesday Crafts: Creation Station (Lead); Wednesday Crafts: Creation Station (Lead); Thursday Crafts: Creation Station (Lead)"
    },
    {
      "id": "vol-savannah-eigenberg",
      "name": "Savannah Eigenberg",
      "phone": "(303) 518-2065",
      "email": "savannah.eigenberg@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Group Support",
      "assignmentType": "group",
      "assignmentId": "tree-frogs",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (303) 518-2065 | Email: savannah.eigenberg@gmail.com | Assignments: Monday Parrots (Group Lead); Tuesday Parrots (Group Lead); Wednesday Parrots (Group Lead); Thursday Parrots (Group Lead)"
    },
    {
      "id": "vol-scarlet-kim",
      "name": "Scarlet Kim",
      "phone": "(816) 560-0100",
      "email": "gracekim@housedenver.org",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (816) 560-0100 | Email: gracekim@housedenver.org"
    },
    {
      "id": "vol-selah-robles",
      "name": "Selah Robles",
      "phone": "",
      "email": "",
      "status": "Committed",
      "commitment": "Tuesday, Thursday",
      "role": "Station Support",
      "assignmentType": "station",
      "assignmentId": "games",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Assignments: Tuesday Games: Wild About God Games (Lead); Thursday Games: Wild About God Games (Lead)"
    },
    {
      "id": "vol-stacy-grein",
      "name": "Stacy Grein",
      "phone": "(303) 570-2443",
      "email": "stacy.grein08@gmail.com",
      "status": "Committed",
      "commitment": "Full week",
      "role": "Group Support",
      "assignmentType": "group",
      "assignmentId": "parrots",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "notes": "Phone: (303) 570-2443 | Email: stacy.grein08@gmail.com | Assignments: Monday Parrots (Group Support); Tuesday Parrots (Group Support); Wednesday Parrots (Group Support); Thursday Parrots (Group Support)"
    },
    {
      "id": "vol-talia-jones",
      "name": "Talia Jones",
      "phone": "(720) 579-4146",
      "email": "",
      "status": "Interest",
      "commitment": "Not yet scheduled",
      "role": "Support",
      "assignmentType": "station",
      "assignmentId": "",
      "days": "",
      "notes": "Phone: (720) 579-4146"
    }
  ],
  "rooms": [
    {
      "id": "worship",
      "name": "Worship (Sing & Play Tune Lagoon)",
      "shortName": "Worship",
      "room": "Sanctuary",
      "purpose": "All-group worship, song & motions that open and close every day",
      "needed": 3,
      "color": "#7b4fc4",
      "type": "opening"
    },
    {
      "id": "games",
      "name": "Games (Wild About God)",
      "shortName": "Games",
      "room": "Outside Area",
      "purpose": "Active, cooperative outdoor games tied to the day's point",
      "needed": 3,
      "color": "#2f6fd0",
      "type": "station"
    },
    {
      "id": "crafts",
      "name": "Crafts (Creation Station)",
      "shortName": "Crafts",
      "room": "Elementary Area",
      "purpose": "Theme craft / take-home project at structured tables",
      "needed": 2,
      "color": "#3aa655",
      "type": "station"
    },
    {
      "id": "snack",
      "name": "Snack (Snack Shack)",
      "shortName": "Snack",
      "room": "Kitchen + outside",
      "purpose": "Snack, water, allergy checks, calm reset",
      "needed": 2,
      "color": "#ef8a2b",
      "type": "station"
    },
    {
      "id": "bible",
      "name": "Bible (Under the Waterfall)",
      "shortName": "Bible",
      "room": "MPR Room",
      "purpose": "Bible teaching - the day's story and who God is",
      "needed": 2,
      "color": "#1d8a9c",
      "type": "station"
    },
    {
      "id": "scripture",
      "name": "Scripture (Verse Vines)",
      "shortName": "Scripture",
      "room": "Tots Room",
      "purpose": "Learn and lock in the day's memory verse",
      "needed": 2,
      "color": "#f4c430",
      "type": "station"
    },
    {
      "id": "checkin",
      "name": "Check-in Team",
      "shortName": "Check-in",
      "room": "Building entrance",
      "purpose": "Family welcome, child security, name tags, lanyards, group signs, Monday kit handout.",
      "needed": 4,
      "color": "#2a5d6a",
      "type": "support"
    },
    {
      "id": "cave",
      "name": "Cave Room Support",
      "shortName": "Cave Room",
      "room": "Pre-K Cave Room",
      "purpose": "Quiet reset, younger kid support, overflow, bathroom coordination.",
      "needed": 2,
      "color": "#6b4b2f",
      "type": "support"
    },
    {
      "id": "floaters",
      "name": "Floaters and Supplies",
      "shortName": "Floaters",
      "room": "Briefing Room",
      "purpose": "Supply runs, transition support, bathroom escorts, coverage gaps.",
      "needed": 3,
      "color": "#143626",
      "type": "support"
    },
    {
      "id": "facepaint",
      "name": "Face Paint",
      "shortName": "Face Paint",
      "room": "Face Paint Room",
      "purpose": "Small rotating line on Thursday Fun Day, with washable and allergy-aware supplies.",
      "needed": 3,
      "color": "#d9514a",
      "type": "thursday"
    },
    {
      "id": "bbq",
      "name": "Family BBQ",
      "shortName": "BBQ",
      "room": "BBQ / Fellowship Area",
      "purpose": "Thursday parent welcome, serving line, drinks, allergy labels, seating, cleanup.",
      "needed": 5,
      "color": "#e6862e",
      "type": "thursday"
    }
  ],
  "schedule": [
    {
      "id": "monday-8-30-9-00",
      "day": "Monday",
      "start": "8:30",
      "end": "9:00",
      "place": "Briefing Room / entrance",
      "activity": "Volunteer arrival & briefing (adults only); Monday: check-in opens 8:30",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-9-00-9-25",
      "day": "Monday",
      "start": "9:00",
      "end": "9:25",
      "place": "Building entrance",
      "activity": "Check-in & group gathering (Monday extended from 8:30 - kit handout; aim all in by 9:00)",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-9-30-9-50",
      "day": "Monday",
      "start": "9:30",
      "end": "9:50",
      "place": "Sanctuary",
      "activity": "Opening worship & skit - song, group game, daily skit",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-9-55-10-15",
      "day": "Monday",
      "start": "9:55",
      "end": "10:15",
      "place": "5 stations",
      "activity": "Rotation Block 1",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-10-20-10-40",
      "day": "Monday",
      "start": "10:20",
      "end": "10:40",
      "place": "5 stations",
      "activity": "Rotation Block 2",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-10-45-11-05",
      "day": "Monday",
      "start": "10:45",
      "end": "11:05",
      "place": "5 stations",
      "activity": "Rotation Block 3",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-11-10-11-30",
      "day": "Monday",
      "start": "11:10",
      "end": "11:30",
      "place": "5 stations",
      "activity": "Rotation Block 4",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-11-35-12-00",
      "day": "Monday",
      "start": "11:35",
      "end": "12:00",
      "place": "5 stations",
      "activity": "Rotation Block 5",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-12-05-1-00",
      "day": "Monday",
      "start": "12:05",
      "end": "1:00",
      "place": "Sanctuary",
      "activity": "Lunch & closing - eat, review, celebrate, pray, dismiss",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-games-wild-about-god-outside-1",
      "day": "Monday",
      "start": "9:55",
      "end": "10:15",
      "place": "Games Wild About God · Outside",
      "activity": "Block 1",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-games-wild-about-god-outside-2",
      "day": "Monday",
      "start": "10:20",
      "end": "10:40",
      "place": "Games Wild About God · Outside",
      "activity": "Block 2",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-games-wild-about-god-outside-3",
      "day": "Monday",
      "start": "10:45",
      "end": "11:05",
      "place": "Games Wild About God · Outside",
      "activity": "Block 3",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-games-wild-about-god-outside-4",
      "day": "Monday",
      "start": "11:10",
      "end": "11:30",
      "place": "Games Wild About God · Outside",
      "activity": "Block 4",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-games-wild-about-god-outside-5",
      "day": "Monday",
      "start": "11:35",
      "end": "12:00",
      "place": "Games Wild About God · Outside",
      "activity": "Block 5",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-crafts-creation-station-elementary-1",
      "day": "Monday",
      "start": "9:55",
      "end": "10:15",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 1",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-crafts-creation-station-elementary-2",
      "day": "Monday",
      "start": "10:20",
      "end": "10:40",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 2",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-crafts-creation-station-elementary-3",
      "day": "Monday",
      "start": "10:45",
      "end": "11:05",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 3",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-crafts-creation-station-elementary-4",
      "day": "Monday",
      "start": "11:10",
      "end": "11:30",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 4",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-crafts-creation-station-elementary-5",
      "day": "Monday",
      "start": "11:35",
      "end": "12:00",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 5",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-snack-snack-shack-kitchen-1",
      "day": "Monday",
      "start": "9:55",
      "end": "10:15",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 1",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-snack-snack-shack-kitchen-2",
      "day": "Monday",
      "start": "10:20",
      "end": "10:40",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 2",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-snack-snack-shack-kitchen-3",
      "day": "Monday",
      "start": "10:45",
      "end": "11:05",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 3",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-snack-snack-shack-kitchen-4",
      "day": "Monday",
      "start": "11:10",
      "end": "11:30",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 4",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-snack-snack-shack-kitchen-5",
      "day": "Monday",
      "start": "11:35",
      "end": "12:00",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 5",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-bible-under-the-waterfall-mpr-1",
      "day": "Monday",
      "start": "9:55",
      "end": "10:15",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 1",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-bible-under-the-waterfall-mpr-2",
      "day": "Monday",
      "start": "10:20",
      "end": "10:40",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 2",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-bible-under-the-waterfall-mpr-3",
      "day": "Monday",
      "start": "10:45",
      "end": "11:05",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 3",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-bible-under-the-waterfall-mpr-4",
      "day": "Monday",
      "start": "11:10",
      "end": "11:30",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 4",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-bible-under-the-waterfall-mpr-5",
      "day": "Monday",
      "start": "11:35",
      "end": "12:00",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 5",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-scripture-verse-vines-tots-1",
      "day": "Monday",
      "start": "9:55",
      "end": "10:15",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 1",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-scripture-verse-vines-tots-2",
      "day": "Monday",
      "start": "10:20",
      "end": "10:40",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 2",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-scripture-verse-vines-tots-3",
      "day": "Monday",
      "start": "10:45",
      "end": "11:05",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 3",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-scripture-verse-vines-tots-4",
      "day": "Monday",
      "start": "11:10",
      "end": "11:30",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 4",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "monday-scripture-verse-vines-tots-5",
      "day": "Monday",
      "start": "11:35",
      "end": "12:00",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 5",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is our Creator"
    },
    {
      "id": "tuesday-8-30-9-00",
      "day": "Tuesday",
      "start": "8:30",
      "end": "9:00",
      "place": "Briefing Room / entrance",
      "activity": "Volunteer arrival & briefing (adults only); Monday: check-in opens 8:30",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-9-00-9-25",
      "day": "Tuesday",
      "start": "9:00",
      "end": "9:25",
      "place": "Building entrance",
      "activity": "Check-in & group gathering (Monday extended from 8:30 - kit handout; aim all in by 9:00)",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-9-30-9-50",
      "day": "Tuesday",
      "start": "9:30",
      "end": "9:50",
      "place": "Sanctuary",
      "activity": "Opening worship & skit - song, group game, daily skit",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-9-55-10-15",
      "day": "Tuesday",
      "start": "9:55",
      "end": "10:15",
      "place": "5 stations",
      "activity": "Rotation Block 1",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-10-20-10-40",
      "day": "Tuesday",
      "start": "10:20",
      "end": "10:40",
      "place": "5 stations",
      "activity": "Rotation Block 2",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-10-45-11-05",
      "day": "Tuesday",
      "start": "10:45",
      "end": "11:05",
      "place": "5 stations",
      "activity": "Rotation Block 3",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-11-10-11-30",
      "day": "Tuesday",
      "start": "11:10",
      "end": "11:30",
      "place": "5 stations",
      "activity": "Rotation Block 4",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-11-35-12-00",
      "day": "Tuesday",
      "start": "11:35",
      "end": "12:00",
      "place": "5 stations",
      "activity": "Rotation Block 5",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-12-05-1-00",
      "day": "Tuesday",
      "start": "12:05",
      "end": "1:00",
      "place": "Sanctuary",
      "activity": "Lunch & closing - eat, review, celebrate, pray, dismiss",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-games-wild-about-god-outside-1",
      "day": "Tuesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Games Wild About God · Outside",
      "activity": "Block 1",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-games-wild-about-god-outside-2",
      "day": "Tuesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Games Wild About God · Outside",
      "activity": "Block 2",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-games-wild-about-god-outside-3",
      "day": "Tuesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Games Wild About God · Outside",
      "activity": "Block 3",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-games-wild-about-god-outside-4",
      "day": "Tuesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Games Wild About God · Outside",
      "activity": "Block 4",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-games-wild-about-god-outside-5",
      "day": "Tuesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Games Wild About God · Outside",
      "activity": "Block 5",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-crafts-creation-station-elementary-1",
      "day": "Tuesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 1",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-crafts-creation-station-elementary-2",
      "day": "Tuesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 2",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-crafts-creation-station-elementary-3",
      "day": "Tuesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 3",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-crafts-creation-station-elementary-4",
      "day": "Tuesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 4",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-crafts-creation-station-elementary-5",
      "day": "Tuesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 5",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-snack-snack-shack-kitchen-1",
      "day": "Tuesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 1",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-snack-snack-shack-kitchen-2",
      "day": "Tuesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 2",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-snack-snack-shack-kitchen-3",
      "day": "Tuesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 3",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-snack-snack-shack-kitchen-4",
      "day": "Tuesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 4",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-snack-snack-shack-kitchen-5",
      "day": "Tuesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 5",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-bible-under-the-waterfall-mpr-1",
      "day": "Tuesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 1",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-bible-under-the-waterfall-mpr-2",
      "day": "Tuesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 2",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-bible-under-the-waterfall-mpr-3",
      "day": "Tuesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 3",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-bible-under-the-waterfall-mpr-4",
      "day": "Tuesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 4",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-bible-under-the-waterfall-mpr-5",
      "day": "Tuesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 5",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-scripture-verse-vines-tots-1",
      "day": "Tuesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 1",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-scripture-verse-vines-tots-2",
      "day": "Tuesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 2",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-scripture-verse-vines-tots-3",
      "day": "Tuesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 3",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-scripture-verse-vines-tots-4",
      "day": "Tuesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 4",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "tuesday-scripture-verse-vines-tots-5",
      "day": "Tuesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 5",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Love"
    },
    {
      "id": "wednesday-8-30-9-00",
      "day": "Wednesday",
      "start": "8:30",
      "end": "9:00",
      "place": "Briefing Room / entrance",
      "activity": "Volunteer arrival & briefing (adults only); Monday: check-in opens 8:30",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-9-00-9-25",
      "day": "Wednesday",
      "start": "9:00",
      "end": "9:25",
      "place": "Building entrance",
      "activity": "Check-in & group gathering (Monday extended from 8:30 - kit handout; aim all in by 9:00)",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-9-30-9-50",
      "day": "Wednesday",
      "start": "9:30",
      "end": "9:50",
      "place": "Sanctuary",
      "activity": "Opening worship & skit - song, group game, daily skit",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-9-55-10-15",
      "day": "Wednesday",
      "start": "9:55",
      "end": "10:15",
      "place": "5 stations",
      "activity": "Rotation Block 1",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-10-20-10-40",
      "day": "Wednesday",
      "start": "10:20",
      "end": "10:40",
      "place": "5 stations",
      "activity": "Rotation Block 2",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-10-45-11-05",
      "day": "Wednesday",
      "start": "10:45",
      "end": "11:05",
      "place": "5 stations",
      "activity": "Rotation Block 3",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-11-10-11-30",
      "day": "Wednesday",
      "start": "11:10",
      "end": "11:30",
      "place": "5 stations",
      "activity": "Rotation Block 4",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-11-35-12-00",
      "day": "Wednesday",
      "start": "11:35",
      "end": "12:00",
      "place": "5 stations",
      "activity": "Rotation Block 5",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-12-05-1-00",
      "day": "Wednesday",
      "start": "12:05",
      "end": "1:00",
      "place": "Sanctuary",
      "activity": "Lunch & closing - eat, review, celebrate, pray, dismiss",
      "group": "Everyone",
      "volunteers": "",
      "need": "",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-games-wild-about-god-outside-1",
      "day": "Wednesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Games Wild About God · Outside",
      "activity": "Block 1",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-games-wild-about-god-outside-2",
      "day": "Wednesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Games Wild About God · Outside",
      "activity": "Block 2",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-games-wild-about-god-outside-3",
      "day": "Wednesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Games Wild About God · Outside",
      "activity": "Block 3",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-games-wild-about-god-outside-4",
      "day": "Wednesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Games Wild About God · Outside",
      "activity": "Block 4",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-games-wild-about-god-outside-5",
      "day": "Wednesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Games Wild About God · Outside",
      "activity": "Block 5",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-crafts-creation-station-elementary-1",
      "day": "Wednesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 1",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-crafts-creation-station-elementary-2",
      "day": "Wednesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 2",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-crafts-creation-station-elementary-3",
      "day": "Wednesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 3",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-crafts-creation-station-elementary-4",
      "day": "Wednesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 4",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-crafts-creation-station-elementary-5",
      "day": "Wednesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Crafts Creation Station · Elementary",
      "activity": "Block 5",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-snack-snack-shack-kitchen-1",
      "day": "Wednesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 1",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-snack-snack-shack-kitchen-2",
      "day": "Wednesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 2",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-snack-snack-shack-kitchen-3",
      "day": "Wednesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 3",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-snack-snack-shack-kitchen-4",
      "day": "Wednesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 4",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-snack-snack-shack-kitchen-5",
      "day": "Wednesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Snack Snack Shack · Kitchen",
      "activity": "Block 5",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-bible-under-the-waterfall-mpr-1",
      "day": "Wednesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 1",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-bible-under-the-waterfall-mpr-2",
      "day": "Wednesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 2",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-bible-under-the-waterfall-mpr-3",
      "day": "Wednesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 3",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-bible-under-the-waterfall-mpr-4",
      "day": "Wednesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 4",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-bible-under-the-waterfall-mpr-5",
      "day": "Wednesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Bible Under the Waterfall · MPR",
      "activity": "Block 5",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-scripture-verse-vines-tots-1",
      "day": "Wednesday",
      "start": "9:55",
      "end": "10:15",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 1",
      "group": "Tigers · age 9-12",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-scripture-verse-vines-tots-2",
      "day": "Wednesday",
      "start": "10:20",
      "end": "10:40",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 2",
      "group": "Parrots · age 8",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-scripture-verse-vines-tots-3",
      "day": "Wednesday",
      "start": "10:45",
      "end": "11:05",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 3",
      "group": "Monkeys · age 6-7",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-scripture-verse-vines-tots-4",
      "day": "Wednesday",
      "start": "11:10",
      "end": "11:30",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 4",
      "group": "Toucans · age 5",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "wednesday-scripture-verse-vines-tots-5",
      "day": "Wednesday",
      "start": "11:35",
      "end": "12:00",
      "place": "Scripture Verse Vines · Tots",
      "activity": "Block 5",
      "group": "Tree Frogs · age 3-4",
      "volunteers": "",
      "need": "Station lead + group leaders",
      "notes": "God is Forever"
    },
    {
      "id": "thursday-8-30-9-00-setup-bbq-prep-mee",
      "day": "Thursday",
      "start": "8:30",
      "end": "9:00",
      "place": "Briefing Room · all leads + BBQ team",
      "activity": "Setup & BBQ prep meeting - confirm Fun Day boundaries, BBQ assignments, allergy labels",
      "group": "All families",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-9-00-9-25-check-in-gathering",
      "day": "Thursday",
      "start": "9:00",
      "end": "9:25",
      "place": "Sanctuary · group leaders, check-in",
      "activity": "Check-in & gathering by group signs",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-9-30-9-50-fun-day-opening-we",
      "day": "Thursday",
      "start": "9:30",
      "end": "9:50",
      "place": "Sanctuary · Jake, Annie, worship",
      "activity": "Fun Day opening - welcome, prayer, explain the flow and safety boundaries",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-9-55-10-30-worship-celebration",
      "day": "Thursday",
      "start": "9:55",
      "end": "10:30",
      "place": "Sanctuary · worship team",
      "activity": "Worship celebration - high-energy songs, dance, recap of the week",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-10-30-11-15-big-group-games-fa",
      "day": "Thursday",
      "start": "10:30",
      "end": "11:15",
      "place": "Outside + Face Paint Room",
      "activity": "Big-group games + Face paint - games outside; face paint as a small rotating line",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-11-15-11-45-keepsake-craft-fin",
      "day": "Thursday",
      "start": "11:15",
      "end": "11:45",
      "place": "Elementary Area · Sarah + support",
      "activity": "Keepsake craft - finish take-home items or a VBS recap keepsake, in waves",
      "group": "All groups",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-11-45-12-00-final-celebration",
      "day": "Thursday",
      "start": "11:45",
      "end": "12:00",
      "place": "Sanctuary; BBQ setup begins",
      "activity": "Final celebration + BBQ transition - final songs, thank volunteers, recap, prayer",
      "group": "All families",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    },
    {
      "id": "thursday-12-00-1-00-family-bbq-family",
      "day": "Thursday",
      "start": "12:00",
      "end": "1:00",
      "place": "BBQ / Fellowship Area · all hands",
      "activity": "Family BBQ - family lunch, parent connection, pickup flow, cleanup",
      "group": "All families",
      "volunteers": "",
      "need": "",
      "notes": "Fun Day + Family BBQ"
    }
  ],
  "groups": [
    {
      "id": "tree-frogs",
      "name": "Tree Frogs",
      "colorName": "Red",
      "color": "#d8453b",
      "madeOf": "Ages 3-4",
      "ageBand": "Youngest",
      "neededPerDay": 2
    },
    {
      "id": "toucans",
      "name": "Toucans",
      "colorName": "Orange",
      "color": "#ef8a2b",
      "madeOf": "The 5-year-olds",
      "ageBand": "Pre-K / K",
      "neededPerDay": 2
    },
    {
      "id": "monkeys",
      "name": "Monkeys",
      "colorName": "Yellow",
      "color": "#f4c430",
      "madeOf": "Monkeys A + B combined",
      "ageBand": "K-1st (6-7)",
      "neededPerDay": 2
    },
    {
      "id": "parrots",
      "name": "Parrots",
      "colorName": "Green",
      "color": "#3aa655",
      "madeOf": "Parrots",
      "ageBand": "2nd grade (8)",
      "neededPerDay": 2
    },
    {
      "id": "tigers",
      "name": "Tigers",
      "colorName": "Blue",
      "color": "#2f6fd0",
      "madeOf": "Sloths + Jaguars + Tigers combined",
      "ageBand": "Oldest (9-12)",
      "neededPerDay": 3
    }
  ],
  "stations": [
    {
      "id": "worship",
      "name": "Worship (Sing & Play Tune Lagoon)",
      "shortName": "Worship",
      "room": "Sanctuary",
      "purpose": "All-group worship, song & motions that open and close every day",
      "needed": 3,
      "color": "#7b4fc4",
      "type": "opening"
    },
    {
      "id": "games",
      "name": "Games (Wild About God)",
      "shortName": "Games",
      "room": "Outside Area",
      "purpose": "Active, cooperative outdoor games tied to the day's point",
      "needed": 3,
      "color": "#2f6fd0",
      "type": "station"
    },
    {
      "id": "crafts",
      "name": "Crafts (Creation Station)",
      "shortName": "Crafts",
      "room": "Elementary Area",
      "purpose": "Theme craft / take-home project at structured tables",
      "needed": 2,
      "color": "#3aa655",
      "type": "station"
    },
    {
      "id": "snack",
      "name": "Snack (Snack Shack)",
      "shortName": "Snack",
      "room": "Kitchen + outside",
      "purpose": "Snack, water, allergy checks, calm reset",
      "needed": 2,
      "color": "#ef8a2b",
      "type": "station"
    },
    {
      "id": "bible",
      "name": "Bible (Under the Waterfall)",
      "shortName": "Bible",
      "room": "MPR Room",
      "purpose": "Bible teaching - the day's story and who God is",
      "needed": 2,
      "color": "#1d8a9c",
      "type": "station"
    },
    {
      "id": "scripture",
      "name": "Scripture (Verse Vines)",
      "shortName": "Scripture",
      "room": "Tots Room",
      "purpose": "Learn and lock in the day's memory verse",
      "needed": 2,
      "color": "#f4c430",
      "type": "station"
    },
    {
      "id": "checkin",
      "name": "Check-in Team",
      "shortName": "Check-in",
      "room": "Building entrance",
      "purpose": "Family welcome, child security, name tags, lanyards, group signs, Monday kit handout.",
      "needed": 4,
      "color": "#2a5d6a",
      "type": "support"
    },
    {
      "id": "cave",
      "name": "Cave Room Support",
      "shortName": "Cave Room",
      "room": "Pre-K Cave Room",
      "purpose": "Quiet reset, younger kid support, overflow, bathroom coordination.",
      "needed": 2,
      "color": "#6b4b2f",
      "type": "support"
    },
    {
      "id": "floaters",
      "name": "Floaters and Supplies",
      "shortName": "Floaters",
      "room": "Briefing Room",
      "purpose": "Supply runs, transition support, bathroom escorts, coverage gaps.",
      "needed": 3,
      "color": "#143626",
      "type": "support"
    },
    {
      "id": "facepaint",
      "name": "Face Paint",
      "shortName": "Face Paint",
      "room": "Face Paint Room",
      "purpose": "Small rotating line on Thursday Fun Day, with washable and allergy-aware supplies.",
      "needed": 3,
      "color": "#d9514a",
      "type": "thursday"
    },
    {
      "id": "bbq",
      "name": "Family BBQ",
      "shortName": "BBQ",
      "room": "BBQ / Fellowship Area",
      "purpose": "Thursday parent welcome, serving line, drinks, allergy labels, seating, cleanup.",
      "needed": 5,
      "color": "#e6862e",
      "type": "thursday"
    }
  ],
  "dailyShape": [
    {
      "Time": "8:30-9:00",
      "What is happening": "Volunteer arrival & briefing - check in, grab supplies, prayer, set the day focus",
      "Where / who": "Briefing Room · adults only"
    },
    {
      "Time": "9:00-9:25",
      "What is happening": "Child check-in & gathering - kids find their animal/color group sign",
      "Where / who": "Sanctuary · group leaders, check-in team"
    },
    {
      "Time": "9:30-9:50",
      "What is happening": "Opening worship & skit - song (Sing & Play Tune Lagoon), group game, and the daily skit",
      "Where / who": "Sanctuary · worship + skit teams"
    },
    {
      "Time": "9:55-12:00",
      "What is happening": "Station rotations - 5 blocks; each group rotates through all 5 stations",
      "Where / who": "Station leads + group leaders"
    },
    {
      "Time": "12:05-1:00",
      "What is happening": "Lunch & closing - eat, review the point, celebrate, pray, dismiss to pickup",
      "Where / who": "Sanctuary · all leaders"
    }
  ],
  "weekFlows": [
    {
      "id": "week-vbs",
      "title": "VBS Week Flow",
      "days": "Monday, Tuesday, Wednesday, Thursday",
      "format": "Mon-Wed: opening worship, 5 station rotations, lunch and closing. Thursday: Fun Day, face paint, keepsake craft, final celebration, Family BBQ.",
      "owner": "Jake and Annie",
      "status": "Active"
    },
    {
      "id": "week-followup",
      "title": "Follow-up Kids Ministry Week Flow",
      "days": "Different weeknight format",
      "format": "Use this for the next week or summer-night flow. Opening welcome, worship, lesson, small group response, game, snack, parent pickup. Edit days and owners as plans settle.",
      "owner": "Jake",
      "status": "Planning"
    }
  ],
  "planningNotes": "Updated from HOUSE Kids VBS 2026 Volunteer Manual on 2026-06-02. Manual now uses 5 age-based groups, 5 rotating stations, Monday to Wednesday station schedule, and Thursday Fun Day plus Family BBQ."
};
const GROUPS = defaultDashboardData.groups;
const STATIONS = defaultDashboardData.stations;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday"];

function makeId(prefix = "item") {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
function dayList(value) {
  return String(value || "").split(/[,;]+/).map((d) => d.trim()).filter(Boolean);
}
function includesDay(item, day) {
  return dayList(item.days).some((d) => d.toLowerCase() === day.toLowerCase());
}
function assignmentLabel(id) {
  return GROUPS.find((g) => g.id === id)?.name || STATIONS.find((s) => s.id === id)?.shortName || "Unassigned";
}
function swatch(color) { return { backgroundColor: color || "#999" }; }

export default function App() {
  const { dashboardData, setDashboardData, saveStatus, saveNow, clearEverything, deleteFirestoreDocument, firestoreEnabled } = useDashboardAutosave(defaultDashboardData);
  const [tab, setTab] = useState("overview");
  const [day, setDay] = useState("Monday");
  const [query, setQuery] = useState("");

  const data = { ...defaultDashboardData, ...dashboardData };
  const volunteers = data.volunteers || [];
  const registrations = data.registrations || [];
  const schedule = data.schedule || [];
  const rooms = data.rooms || STATIONS;
  const weekFlows = data.weekFlows || defaultDashboardData.weekFlows;

  const coverage = useMemo(() => {
    const byGroup = GROUPS.map((g) => {
      const rows = DAYS.map((d) => {
        const assigned = volunteers.filter((v) => v.assignmentType === "group" && v.assignmentId === g.id && includesDay(v, d));
        return { day: d, needed: g.neededPerDay || 2, assigned };
      });
      return { ...g, rows };
    });
    const byStation = STATIONS.filter((s) => s.type !== "opening").map((s) => {
      const days = s.type === "thursday" ? ["Thursday"] : DAYS;
      const rows = days.map((d) => {
        const assigned = volunteers.filter((v) => v.assignmentType === "station" && v.assignmentId === s.id && includesDay(v, d));
        return { day: d, needed: Number(s.needed || 2), assigned };
      });
      return { ...s, rows };
    });
    const openGroupSlots = byGroup.flatMap((g) => g.rows.map((r) => Math.max(0, r.needed - r.assigned.length))).reduce((a,b)=>a+b,0);
    const openStationSlots = byStation.flatMap((s) => s.rows.map((r) => Math.max(0, r.needed - r.assigned.length))).reduce((a,b)=>a+b,0);
    return { byGroup, byStation, openGroupSlots, openStationSlots };
  }, [volunteers]);

  const counts = useMemo(() => ({
    kids: registrations.filter((r) => r.registered).length,
    volunteers: volunteers.length,
    groups: GROUPS.length,
    stations: STATIONS.filter((s) => s.type === "station").length,
    openGroupSlots: coverage.openGroupSlots,
    openStationSlots: coverage.openStationSlots,
  }), [registrations, volunteers, coverage]);

  function patchList(section, id, field, value) {
    setDashboardData((current) => ({ ...current, [section]: (current[section] || []).map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  }
  function addVolunteer() { setDashboardData((current) => ({ ...current, volunteers: [...(current.volunteers || []), { id: makeId("vol"), name: "New Volunteer", phone: "", email: "", status: "Interest", commitment: "Not yet scheduled", role: "Support", assignmentType: "station", assignmentId: "", days: "", notes: "" }] })); }
  function remove(section, id) { setDashboardData((current) => ({ ...current, [section]: (current[section] || []).filter((item) => item.id !== id) })); }
  function addScheduleRow() { setDashboardData((current) => ({ ...current, schedule: [...(current.schedule || []), { id: makeId("sched"), day, start: "", end: "", place: "", activity: "", group: "", volunteers: "", need: "", notes: "" }] })); }
  function addWeekFlow() { setDashboardData((current) => ({ ...current, weekFlows: [...(current.weekFlows || []), { id: makeId("week"), title: "New Week Flow", days: "", format: "", owner: "", status: "Planning" }] })); }

  const filteredVolunteers = volunteers.filter((v) => [v.name, v.email, v.phone, v.role, assignmentLabel(v.assignmentId)].join(" ").toLowerCase().includes(query.toLowerCase()));
  const daySchedule = schedule.filter((s) => s.day === day);

  return <div className="appShell">
    <aside className="side">
      <div className="brand"><div className="mark">HK</div><div><h1>VBS Planner</h1><p>Manual-based command center</p></div></div>
      <nav>{[["overview","Overview"],["coverage","Needs"],["volunteers","Volunteers"],["groups","Groups"],["stations","Stations"],["schedule","Schedule"],["weeks","Week Flows"],["kids","Kids"],["notes","Notes"]].map(([id,label]) => <button key={id} className={tab===id?"active":""} onClick={()=>setTab(id)}>{label}</button>)}</nav>
      <div className="syncBox"><strong>{saveStatus}</strong><span>Firestore {firestoreEnabled ? "on" : "off"}</span><button onClick={()=>saveNow(data)}>Save now</button><button className="quiet" onClick={clearEverything}>Clear Firestore</button><button className="danger" onClick={deleteFirestoreDocument}>Delete Firestore Doc</button></div>
    </aside>
    <main>
      <section className="hero"><p className="eyebrow">HOUSE Kids VBS 2026</p><h2>Updated around the new volunteer manual</h2><p>Five age-based groups, five rotation stations, clear locations, editable volunteer assignments, coverage gaps, and week-by-week flow planning.</p></section>
      <section className="stats">{[["Registered kids", counts.kids], ["Volunteer contacts", counts.volunteers], ["Groups", counts.groups], ["Core stations", counts.stations], ["Group slots open", counts.openGroupSlots], ["Station slots open", counts.openStationSlots]].map(([label,value]) => <div className="stat" key={label}><span>{label}</span><strong>{value}</strong></div>)}</section>
      {tab === "overview" && <Overview coverage={coverage} />}{tab === "coverage" && <Coverage coverage={coverage} />}{tab === "volunteers" && <Volunteers volunteers={filteredVolunteers} query={query} setQuery={setQuery} patchList={patchList} remove={remove} addVolunteer={addVolunteer} />}{tab === "groups" && <Groups registrations={registrations} />}{tab === "stations" && <Stations rooms={rooms} patchList={patchList} />}{tab === "schedule" && <Schedule day={day} setDay={setDay} rows={daySchedule} patchList={patchList} remove={remove} addScheduleRow={addScheduleRow} />}{tab === "weeks" && <WeekFlows flows={weekFlows} patchList={patchList} remove={remove} addWeekFlow={addWeekFlow} />}{tab === "kids" && <Kids registrations={registrations} patchList={patchList} remove={remove} />}{tab === "notes" && <Notes value={data.planningNotes || ""} setDashboardData={setDashboardData} />}
    </main>
  </div>;
}
function Overview({ coverage }) { const urgent = [...coverage.byGroup.flatMap((g) => g.rows.filter((r) => r.assigned.length < r.needed).map((r) => `${r.day} ${g.name}: needs ${r.needed - r.assigned.length}`)), ...coverage.byStation.flatMap((s) => s.rows.filter((r) => r.assigned.length < r.needed).map((r) => `${r.day} ${s.shortName}: needs ${r.needed - r.assigned.length}`))].slice(0, 12); return <section className="grid2"><div className="panel"><h3>What changed from the manual</h3><ul className="checkList"><li>Monkeys A + B are combined into one yellow Monkeys group.</li><li>Sloths, Jaguars, and Tigers are combined into one blue Tigers group.</li><li>There are now five child groups and five full station rotations each day.</li><li>Thursday is no longer a normal rotation day. It is Fun Day plus Family BBQ.</li></ul></div><div className="panel"><h3>Most urgent open coverage</h3>{urgent.length ? urgent.map((x)=><p className="needLine" key={x}>{x}</p>) : <p className="good">Every seeded slot is covered.</p>}</div></section>; }
function Coverage({ coverage }) { return <><section className="panel"><h3>Who still needs group leaders</h3><div className="coverageGrid">{coverage.byGroup.map((g)=><CoverageCard key={g.id} item={g} />)}</div></section><section className="panel"><h3>Stations that need help</h3><div className="coverageGrid">{coverage.byStation.map((s)=><CoverageCard key={s.id} item={s} />)}</div></section></>; }
function CoverageCard({ item }) { return <article className="coverageCard" style={{ borderColor: item.color }}><div className="titleRow"><span className="dot" style={swatch(item.color)}></span><h4>{item.name || item.shortName}</h4></div>{item.ageBand && <p className="muted">{item.colorName} lanyards, {item.madeOf}, {item.ageBand}</p>}{item.room && <p className="muted">{item.room}</p>}{item.rows.map((r)=><div className="coverageRow" key={r.day}><strong>{r.day}</strong><span className={r.assigned.length >= r.needed ? "ok" : "gap"}>{r.assigned.length}/{r.needed}</span><small>{r.assigned.map((v)=>v.name).join(", ") || "Needs leader"}</small></div>)}</article>; }
function Volunteers({ volunteers, query, setQuery, patchList, remove, addVolunteer }) { return <section className="panel"><div className="panelHead"><div><h3>Volunteer roster and assignments</h3><p>Edit names, emails, phone numbers, assignment, days, role, and notes. Assignment drives the coverage page.</p></div><button onClick={addVolunteer}>Add volunteer</button></div><input placeholder="Search volunteer, email, phone, role, assignment" value={query} onChange={(e)=>setQuery(e.target.value)} /> <div className="table volunteersTable"><div className="tableHeader">Name</div><div className="tableHeader">Contact</div><div className="tableHeader">Role</div><div className="tableHeader">Assignment</div><div className="tableHeader">Days</div><div className="tableHeader">Status</div><div className="tableHeader">Notes</div><div className="tableHeader">Remove</div>{volunteers.map((v)=><VolunteerRow key={v.id} v={v} patchList={patchList} remove={remove} />)}</div></section>; }
function VolunteerRow({ v, patchList, remove }) { return <><input value={v.name || ""} onChange={(e)=>patchList("volunteers", v.id, "name", e.target.value)} /><div className="stackInputs"><input value={v.phone || ""} placeholder="phone" onChange={(e)=>patchList("volunteers", v.id, "phone", e.target.value)} /><input value={v.email || ""} placeholder="email" onChange={(e)=>patchList("volunteers", v.id, "email", e.target.value)} /></div><input value={v.role || ""} onChange={(e)=>patchList("volunteers", v.id, "role", e.target.value)} /><div className="stackInputs"><select value={v.assignmentType || "station"} onChange={(e)=>patchList("volunteers", v.id, "assignmentType", e.target.value)}><option value="station">Station</option><option value="group">Group</option></select><select value={v.assignmentId || ""} onChange={(e)=>patchList("volunteers", v.id, "assignmentId", e.target.value)}><option value="">Unassigned</option><optgroup label="Groups">{GROUPS.map((g)=><option key={g.id} value={g.id}>{g.name}</option>)}</optgroup><optgroup label="Stations and support">{STATIONS.map((s)=><option key={s.id} value={s.id}>{s.shortName}</option>)}</optgroup></select></div><input value={v.days || ""} placeholder="Monday, Tuesday" onChange={(e)=>patchList("volunteers", v.id, "days", e.target.value)} /><input value={v.status || ""} onChange={(e)=>patchList("volunteers", v.id, "status", e.target.value)} /><textarea value={v.notes || ""} onChange={(e)=>patchList("volunteers", v.id, "notes", e.target.value)} /><button className="danger" onClick={()=>remove("volunteers", v.id)}>Remove</button></>; }
function Groups({ registrations }) { return <section className="panel"><h3>Current group structure and colors</h3><div className="groupGrid">{GROUPS.map((g)=>{const kids=registrations.filter((r)=>r.group===g.name); return <article className="groupCard" key={g.id} style={{ borderColor:g.color }}><div className="titleRow"><span className="dot" style={swatch(g.color)}></span><h4>{g.name}</h4></div><p><strong>{g.colorName}</strong> lanyards</p><p>{g.madeOf}. {g.ageBand}.</p><p><strong>{kids.length}</strong> kids currently assigned</p><details><summary>Show kids</summary>{kids.map((k)=><span className="kidPill" key={k.id}>{k.childName} ({k.age || "age ?"})</span>)}</details></article>})}</div></section>; }
function Stations({ rooms, patchList }) { return <section className="panel"><h3>Station and room planner</h3><div className="stationGrid">{rooms.map((s)=><article className="stationCard" key={s.id} style={{ borderColor:s.color }}><div className="titleRow"><span className="dot" style={swatch(s.color)}></span><input value={s.name || ""} onChange={(e)=>patchList("rooms", s.id, "name", e.target.value)} /></div><label>Room</label><input value={s.room || ""} onChange={(e)=>patchList("rooms", s.id, "room", e.target.value)} /><label>Needed people</label><input type="number" value={s.needed || 0} onChange={(e)=>patchList("rooms", s.id, "needed", e.target.value)} /><label>What happens here</label><textarea value={s.purpose || s.notes || ""} onChange={(e)=>patchList("rooms", s.id, "purpose", e.target.value)} /></article>)}</div></section>; }
function Schedule({ day, setDay, rows, patchList, remove, addScheduleRow }) { return <section className="panel"><div className="panelHead"><div><h3>Daily schedule and station flow</h3><p>Monday to Wednesday follow the same 5-block rotation. Thursday uses Fun Day plus BBQ flow.</p></div><button onClick={addScheduleRow}>Add schedule row</button></div><div className="dayTabs">{DAYS.map((d)=><button key={d} className={day===d?"active":""} onClick={()=>setDay(d)}>{d}</button>)}</div><div className="table scheduleTable"><div className="tableHeader">Time</div><div className="tableHeader">Place</div><div className="tableHeader">Activity</div><div className="tableHeader">Group</div><div className="tableHeader">Need</div><div className="tableHeader">Volunteers</div><div className="tableHeader">Notes</div><div className="tableHeader">Remove</div>{rows.map((r)=><ScheduleRow key={r.id} r={r} patchList={patchList} remove={remove} />)}</div></section>; }
function ScheduleRow({ r, patchList, remove }) { return <><div className="stackInputs"><input value={r.start || ""} onChange={(e)=>patchList("schedule", r.id, "start", e.target.value)} /><input value={r.end || ""} onChange={(e)=>patchList("schedule", r.id, "end", e.target.value)} /></div><input value={r.place || ""} onChange={(e)=>patchList("schedule", r.id, "place", e.target.value)} /><input value={r.activity || ""} onChange={(e)=>patchList("schedule", r.id, "activity", e.target.value)} /><input value={r.group || ""} onChange={(e)=>patchList("schedule", r.id, "group", e.target.value)} /><input value={r.need || ""} onChange={(e)=>patchList("schedule", r.id, "need", e.target.value)} /><input value={r.volunteers || ""} onChange={(e)=>patchList("schedule", r.id, "volunteers", e.target.value)} /><textarea value={r.notes || ""} onChange={(e)=>patchList("schedule", r.id, "notes", e.target.value)} /><button className="danger" onClick={()=>remove("schedule", r.id)}>Remove</button></>; }
function WeekFlows({ flows, patchList, remove, addWeekFlow }) { return <section className="panel"><div className="panelHead"><div><h3>Two-week flow planner</h3><p>Use this to plan separate weeks or different day formats without changing the main VBS rotation.</p></div><button onClick={addWeekFlow}>Add week flow</button></div><div className="weekGrid">{flows.map((f)=><article className="weekCard" key={f.id}><input value={f.title || ""} onChange={(e)=>patchList("weekFlows", f.id, "title", e.target.value)} /><label>Days</label><input value={f.days || ""} onChange={(e)=>patchList("weekFlows", f.id, "days", e.target.value)} /><label>Format and flow</label><textarea value={f.format || ""} onChange={(e)=>patchList("weekFlows", f.id, "format", e.target.value)} /><label>Owner</label><input value={f.owner || ""} onChange={(e)=>patchList("weekFlows", f.id, "owner", e.target.value)} /><label>Status</label><input value={f.status || ""} onChange={(e)=>patchList("weekFlows", f.id, "status", e.target.value)} /><button className="danger" onClick={()=>remove("weekFlows", f.id)}>Remove</button></article>)}</div></section>; }
function Kids({ registrations, patchList, remove }) { return <section className="panel"><h3>Kids roster by current five-group structure</h3><div className="table kidsTable"><div className="tableHeader">Child</div><div className="tableHeader">Age</div><div className="tableHeader">Group</div><div className="tableHeader">Registered</div><div className="tableHeader">Notes</div><div className="tableHeader">Remove</div>{registrations.map((k)=><><input value={k.childName || ""} onChange={(e)=>patchList("registrations", k.id, "childName", e.target.value)} /><input value={k.age || ""} onChange={(e)=>patchList("registrations", k.id, "age", e.target.value)} /><select value={k.group || "Needs Review"} onChange={(e)=>patchList("registrations", k.id, "group", e.target.value)}>{GROUPS.map((g)=><option key={g.id} value={g.name}>{g.name}</option>)}<option value="Needs Review">Needs Review</option></select><label className="check"><input type="checkbox" checked={!!k.registered} onChange={(e)=>patchList("registrations", k.id, "registered", e.target.checked)} /> active</label><textarea value={k.notes || ""} onChange={(e)=>patchList("registrations", k.id, "notes", e.target.value)} /><button className="danger" onClick={()=>remove("registrations", k.id)}>Remove</button></>)}</div></section>; }
function Notes({ value, setDashboardData }) { return <section className="panel"><h3>Planning notes</h3><textarea className="bigNotes" value={value} onChange={(e)=>setDashboardData((current)=>({...current, planningNotes:e.target.value}))} /></section>; }
