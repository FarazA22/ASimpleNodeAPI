# ASimpleNodeAPI

<h3> Installation </h3>
To install all dependencies, run <code>npm install</code> within terminal

To run Jest, run <code>npm run jest</code> within terminal

To run Dev Server (Nodemon), run <code>npm run dev</code> within terminal

To run Prod Server, run <code>npm start</code> within terminal

<h3> Endpoints </h3>

<h5> Get Request </h5>
**/creditorData/** - Get all creditor data
**/creditorData/analysis** - Get credit analysis on creditor data (conditions: balance is over 2000, min pay percentage doesn't exceed 29.99%)
**/creditorData/:creditorName** - Get creditor data by creditorname

<h5> Post Request </h5>
**/creditorData/** - Create a new creditor data entry

<h5> Put Request </h5>
**/creditorData/:id** - Update existing creditor data
