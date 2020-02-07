const siteUrl = "https://www.bracu.ac.bd/academics/departments/mathematics-and-natural-sciences/mns-faculty-members";
const axios = require('axios');
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
    const rows = $('tr');
    console.log("[");
    for(let i = 0; i < rows.length; i++){
        let name = $(rows[i]).children('td.views-field.views-field-title').children('strong').text();
        let mail = $(rows[i]).children('td.views-field.views-field-field-faculty-emails').children('a').text();
        console.log(JSON.stringify({name: name, mail: mail})+",")
    }
    console.log("]");
}).catch(err => console.error(err));