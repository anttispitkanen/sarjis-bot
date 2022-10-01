/**
 * This is the file that sends messages.
 * This is run by the Heroku scheduler once every day.
 */
const dotenv = require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const { getFingerpori } = require("./comicApis/fingerpori");
const { getFokit } = require("./comicApis/fok_it");

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const theBot = new TelegramBot(TOKEN, { polling: false });

const sendComic = async (comicFetcher, name, bot, chatId) => {
  try {
    const comicLink = await comicFetcher();
    if (comicLink) {
      console.log(comicLink);
      bot.sendMessage(chatId, comicLink);
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
