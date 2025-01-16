const express = require('express');
const router = express.Router();

const {assignEmailToPass, getPasswordByEmail} = require("../db");
const {sendMail} = require("../mail-service");

router.get('/', (req, res) => {
    const translations = require(`../locales/${req.language}.json`);

    res.render('index', {
        layout: false,
        translations,
        googleApiKey: process.env.GOOGLE_API_KEY,
        calendarId: process.env.CALENDAR_ID,
    });
});

router.post('/book-form-send', async (req, res) => {
    const { name, email, phone, type, date, time } = req.body;

    try {
        const assigned = await assignEmailToPass(email);
        const password = await getPasswordByEmail(email);
        const text = `New booking request:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nType: ${type}\nDate: ${date}\nTime: ${time}\nPassword: ${password}`;
        sendMail(text);
        if (!assigned) {
            res.json({ message: 'Майл уже был зарегистрирован'})
        } else {
            res.json({ message: 'Отправлено' });
        }
    } catch (error) {
        console.error('Error processing the form:', error);
        res.status(500).json({ error: 'Error processing the form' });
    }
});

module.exports = router;
