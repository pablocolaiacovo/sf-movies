import request from "request";
import util from "util";

module.exports = async (req, res) => {
  const { title } = req.query;
  const options = {
    url: "https://data.sfgov.org/resource/yitu-d5am.json",
    qs: { $$app_token: process.env.SF_ACCESS_TOKEN, title: title }
  };

  const requestPromise = util.promisify(request);
  const response = await requestPromise(options);
  if (response.error) {
    res.status(response.statusCode).send(response);
  }

  const body = JSON.parse(response.body);
  const movie = body[0];
  const locations = Array.from(new Set(body.map(l => l.locations)));
  res.status(response.statusCode).send({ movie, locations });
};
