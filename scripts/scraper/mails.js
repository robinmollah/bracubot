const siteUrl = "https://www.bracu.ac.bd/academics/departments/mathematics-and-natural-sciences/mns-faculty-members";
const axios = require('axios');
// const rp = require('request-promise');
const cheerio = require('cheerio');
const https = require('https');

let options = {
    url : siteUrl,
    rejectUnauthorized: false, // This doesn't work
    strictSSL: false,
    insecure: true,
    method: 'get',
    httpsAgent: new https.Agent({rejectUnauthorized: false})
};

axios(options).then(response => {

    const $ = cheerio.load(response.data);
    const mails =  $('td.views-field.views-field-field-faculty-emails a');
    for(let i = 0; i < mails.length; i++){
        console.log($(mails[i]).text());
    }

}).catch(err => console.error(err));