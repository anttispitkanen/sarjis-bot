/**
 * Fetch daily (Mon-Sat) Fingerpori link.
 */
const cheerio = require("cheerio");
const axios = require("axios");

const HS_URL = "http://hs.fi";
const BASE_URL = "http://www.hs.fi/fingerpori/";

const getFingerpori = async () => {
  // Fingerpori is published on all days except sunday (0).
  // Note that this doesn't take e.g. holidays into consideration.
  if (new Date().getDay() !== 0) {
    try {
      const response = await axios.get(BASE_URL);
      const $ = cheerio.load(response.data);
      const href = $("#page-main-content .cartoons ol li")
        .first()
        .children()
        .first()
        .children("a")
        .attr("href");

      const fingerporiUrl = `${HS_URL}${href}`;

      const individualFingerporiPage = await axios.get(fingerporiUrl);
      const $$ = cheerio.load(individualFingerporiPage.data);

      const imageUrlWithoutProtocol = $$("figure.cartoon.image.scroller")
        .children()
        .first()
        .attr("data-srcset")
        .split(" ")[0];

      const imageUrlWithProtocol = `https:${imageUrlWithoutProtocol}`;

      return imageUrlWithProtocol;
    } catch (e) {
      console.error(e);
      throw Error("could not find Fingerpori");
    }
  } else {
    return null;
  }
};

module.exports = { getFingerpori };
