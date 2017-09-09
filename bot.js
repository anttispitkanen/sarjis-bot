const dotenv = require('dotenv').config();

const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const cheerio = require('cheerio');

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('runnin on port ' + PORT);
});
