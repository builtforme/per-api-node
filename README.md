# Per (Node.js API wrapper)

Per is about counting activity and usage. You tell Per about any activity on which you want to bill your users, and then ask for usage totals when you’re ready to bill your users.

By using this API wrapper, integrating with Per is as easy as calling `per.addActivity()` and `per.getReport()`!

To use, you’ll need [a Per account](https://useper.com/), with [tokens](https://useper.com/tokens) and an [activity type](https://useper.com/activityTypes).

## Usage

### Adding user activity

```javascript
const per = require('per');

const perActivityToken = 'xxx'; // from https://useper.com/tokens
const perActivityTypeId = 'xxx'; // from https://useper.com/activityTypes

async function doUserAction() {
  // . . .

  // See https://useper.com/documentation/v1/concepts for details on what kinds
  // of values the billing ID and user ID should be.
  const perBillingId = 'xxx';
  const perUserId = 'xxx';

  // You can 'await' the call to ensure that user activity is properly recorded
  // before you continue with your normal handling.
  await per.addActivity(
    perActivityToken,
    perBillingId,
    perUserId,
    perActivityTypeId
  );

  // . . .
}
```

### Getting a report

Let’s assume that you want a report of user activity for the last week (7 days):

```javascript
const per = require('per');

const perReportingToken = 'xxx'; // from https://useper.com/tokens

async function getLastWeekReport() {
  // The report ends "now", and starts 7 days ago.
  const end = new Date();
  const start = new Date(end.valueOf() - 7 * 24 * 60 * 60 * 1000);

  const report = await per.getReport(
    perReportingToken,
    start.toISOString(),
    end.toISOString()
  );
  // 'report' is an object with the report's start/end dates, and a map of the
  // activity types that occurred during that timespan. See
  // https://www.useper.com/documentation/v1/reporting#get-a-report-of-activity
  // for further details.
}
```

## Further details

This API wrapper assumes that you’re using async/await or Promise-based coding. If you prefer using callbacks, you can create a simple wrapper, or just call the API endpoints directly. The wrapper also assumes that any errors should result in an exception being thrown; values are returned (i.e. the Promise resolves) if and only if the API was called successfully and no errors occurred.
