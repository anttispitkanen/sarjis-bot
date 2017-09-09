/**
 * This is the file that sends messages.
 * This is run by the Heroku scheduler once every day.
 */
const dotenv = require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const { getFingerpori } = require('./comicApis/fingerpori');

const TOKEN = process.env.TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const bot = new TelegramBot(TOKEN, { polling: false });

const sendFingerpori = async () => {
    try {
        const fingerporiLink = await getFingerpori();
        if (fingerporiLink) {
            console.log(fingerporiLink);
            bot.sendMessage(CHAT_ID, fingerporiLink);
        } else {
            console.log('no Fingerpori today');
        }
    } catch (e) {
        console.error(e);
    }
}

(async () => {
    await sendFingerpori();
})();
