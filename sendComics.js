/**
 * This is the file that sends messages.
 * This is run by the Heroku scheduler once every day.
 */
const dotenv = require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const { getFingerpori } = require('./comicApis/fingerpori');
const { getFokit } = require('./comicApis/fok_it');

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

const sendFokit = async () => {
    try {
        const fokitLink = await getFokit();
        if (fokitLink) {
            console.log(fokitLink);
            bot.sendMessage(CHAT_ID, fokitLink);
        } else {
            console.log('no Fok_it today');
        }
    } catch (e) {
        console.error(e);
    }
}

(async () => {
    await sendFingerpori();
    await sendFokit();
})();
