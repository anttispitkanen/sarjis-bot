/**
 * This is the file that sends messages.
 * This is run by the Heroku scheduler once every day.
 */
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const { getFingerpori } = require("./comicApis/fingerpori");
const { getFokit } = require("./comicApis/fok_it");

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const theBot = new TelegramBot(TOKEN, { polling: false });

/**
 *
 * @param {() => Promise<string | null>} comicFetcher
 * @param {string} name
 * @param {TelegramBot} bot
 * @param {string} chatId
 */
const sendComic = async (comicFetcher, name, bot, chatId) => {
  try {
    const comicLink = await comicFetcher();
    if (comicLink) {
      console.log(comicLink);
      bot.sendPhoto(chatId, comicLink);
    } else {
      console.log(`no ${name} today`);
    }
  } catch (e) {
    console.error(e);
  }
};

const sendComics = async () => {
  try {
    await sendComic(getFingerpori, "Fingerpori", theBot, CHAT_ID);
    await sendComic(getFokit, "Fok_it", theBot, CHAT_ID);
  } catch (e) {
    console.error(e);
  }
};

module.exports = { sendComics };
