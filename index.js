/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
require("dotenv").config();
const { sendComics } = require("./sendComics");

exports.handler = async (event, context) => {
  await sendComics();
};
