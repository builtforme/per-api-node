const request = require('request-promise-native');

async function addActivity(token, billingId, userId, activityTypeId) {
  const response = await request({
    uri: 'https://api.useper.com/activities.add',
    headers: { Authorization: `Bearer ${token}` },
    qs: {
      billingId,
      userId,
      activityTypeId,
    },
    json: true,
  });

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response.result;
}

async function getReport(token, start, end) {
  const qs = {};

  if (start) {
    qs.start = start;
  }

  if (end) {
    qs.end = end;
  }

  const response = await request({
    uri: 'https://api.useper.com/reports.get',
    headers: { Authorization: `Bearer ${token}` },
    qs,
    json: true,
  });

  if (!response.ok) {
    throw new Error(response.error);
  }

  return response.result;
}

module.exports = {
  addActivity,
  getReport,
};
