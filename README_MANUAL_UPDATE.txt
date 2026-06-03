HOUSE Kids VBS Dashboard Manual Update

Updated from the new HOUSE Kids VBS 2026 Volunteer Manual.

What changed
- Dashboard now reflects five groups: Tree Frogs, Toucans, Monkeys, Parrots, Tigers.
- Monkeys A + B are combined into yellow Monkeys.
- Sloths + Jaguars + Tigers are combined into blue Tigers.
- Monday to Wednesday schedule uses five station rotation blocks from 9:55 AM to 12:00 PM.
- Thursday is Fun Day plus Family BBQ, not a normal rotation day.
- Volunteer roster is editable and includes name, phone, email, role, assignment, days, status, and notes.
- Coverage page shows group leader gaps and station help gaps by day.
- Two-week flow planner was added for different weekly formats and days.

Install
cd /Users/jake/Documents/GitHub/vbsdashboard
npm install
npm run dev

Deploy
git add .
git commit -m "Update VBS dashboard from volunteer manual"
git push

Important
If old data appears after deploy, use Delete Firestore Doc inside the dashboard once, then refresh.
