import request from "request";
import util from "util";

module.exports = async (req, res) => {
  const options = {
    url: "https://data.sfgov.org/resource/yitu-d5am.json",
    qs: { $limit: 5000, $$app_token: process.env.SF_ACCESS_TOKEN }
  };

  const requestPromise = util.promisify(request);
  const response = await requestPromise(options);
  if (response.error) {
    res.status(response.statusCode).send(response);
  }

  const body = JSON.parse(response.body);
  const titles = Array.from(
    new Set(body.filter(m => m.locations).map(m => m.title.trim()))
  );

  res.status(200).send(titles);
};
