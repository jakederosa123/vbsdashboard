HOUSE Kids VBS Dashboard, updated 2026-05-28

What is updated:
- Root index.html now has the latest embedded dashboard data.
- Registration rows were refreshed from vacation-bible-school-2026-4.csv.
- Volunteer contacts were refreshed from vbs_volunteer_contacts_formatted_with_filters_all_people_2026-05-28.xlsx.
- Stephanie Townsend was removed from the embedded data.
- Groups were rebuilt from 44 registered kids.
- Volunteer interest now contains 44 contact rows.
- Firebase sync is still enabled for project vbsdash-43f18.

How to post this to GitHub:
1. Unzip this folder.
2. Copy everything inside the unzipped folder into:
   /Users/jake/Documents/GitHub/vbsdashboard
3. Replace files when asked.
4. Run:
   cd /Users/jake/Documents/GitHub/vbsdashboard
   npm install
   npm run build
   git add .
   git commit -m "Update VBS dashboard data and names"
   git push

Netlify:
- Netlify should build with npm run build and publish the dist folder.
- node_modules is intentionally not included. GitHub and Netlify should use package.json and package-lock.json.

Important Firebase note:
If old names reappear after refresh, the live Firestore document still has old data.
Open the deployed dashboard, click Delete Firestore Doc or Clear Dashboard, then reload once and save.
