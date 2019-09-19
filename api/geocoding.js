import request from "request";
import util from "util";

import { mapConfig } from "../src/config.json";

module.exports = async (req, res) => {
  const { locations } = req.query;
  const locationsArray = locations ? locations.split(";") : [];
  const mapboxBaseUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
  const promises = locationsArray.map(async (l, i) => {
    const address = `${l}, San Francisco, CA, United States.json`;
    const options = {
      url: `${mapboxBaseUrl}${address}`,
      qs: {
        access_token: mapConfig.token,
        country: "us"
      }
    };

    const requestPromise = util.promisify(request);
    const response = await requestPromise(options);
    return JSON.parse(response.body);
  });

  const results = await Promise.all(promises);
  const coordinates = results.map(r => r.features[0].geometry);
  res.status(200).send(coordinates);
};
