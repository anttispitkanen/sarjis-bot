/**
 * Fetch daily (Mon - Fri) fok_it strips.
 */
const cheerio = require('cheerio');
const axios = require('axios');

const HS_URL = 'http://hs.fi';
const FOKIT_URL = 'http://hs.fi/nyt/fokit';

const getFokit = async () => {
    // Fok_it is published Mon - Fri, so not on Sat(6) or Sun(0).
    const day = new Date().getDay();
    if (day !== 6 && day !== 0) {
        try {
            const response = await axios.get(FOKIT_URL);
            const $ = cheerio.load(response.data);
            const href = $('#page-main-content .cartoons ol li')
                            .first()
                            .children().first()
                            .children('a').attr('href');
            console.log(HS_URL + href);
        } catch (e) {
            console.error(e);
            throw Error('could not find Fok_it');
        }
    } else {
        return null;
    }
}

module.exports = { getFokit };
