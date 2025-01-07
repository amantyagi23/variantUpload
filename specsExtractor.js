

const puppeteer = require('puppeteer');
const { loadData } = require('./varianUpload');
const { variantMapper } = require('./map');

const URL = [
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z2_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z2_Diesel_E.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_Diesel_E.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z6_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_Diesel_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_Diesel_4x4.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Select_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_Diesel_E_4x4.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z6_Diesel_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Select_Diesel_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Diesel_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_6_Str_Diesel.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Diesel_4x4.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_Diesel_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_6_Str_Diesel_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_Diesel_4x4.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Diesel_4x4_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_Diesel_4x4_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z2.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z2_E.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_E.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z4_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Select.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_Select_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_6_Str.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_AT.htm",
    "https://www.cardekho.com/overview/Mahindra_Scorpio_N/Mahindra_Scorpio_N_Z8L_6_Str_AT.htm"
];



async function scrapeCarDetails() {
for (let i = 0; i < URL.length; i++) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Navigate to the URL
    await page.goto(URL[i], { waitUntil: 'networkidle2' });
    
    // Extract data from the tables
    const data = await page.evaluate(() => {
        const specs = {};
    
        specs["variantName"] = document.querySelector(".displayInlineBlock").innerText || ""
        specs["exShowroomPrice"] = "N/A",
        specs["carId"]= "c03aef2e-1b00-4176-88c8-2d6de3c74b58"
        specs["description"] = "N/A",
        specs['specification'] = {}
        const sections = document.querySelectorAll('h3[data-attribute="scrolledItems"]');
    
        sections.forEach(section => {
            const sectionName = section.innerText; 
            const table = section.nextElementSibling;
    
            if (table && table.tagName === 'TABLE') {
                const rows = table.querySelectorAll('tbody tr');
                specs['specification'][sectionName] = {};
    
                rows.forEach(row => {
                    const key = row.children[0].innerText.trim();
                    const iconCheck = row.querySelector('.icon-check');
                    const value =  row.children[1].innerText.trim() ==="" ?iconCheck ? true : false:row.children[1].innerText.trim();
                    specs['specification'][sectionName][key] = value;
                });
            }
        });
    
        return specs;
    });
    loadData(variantMapper(data))
    // console.log(variantMapper(data));
    // console.log(data);
    
    await browser.close();
}

// Log the extracted data
// console.log(data);

// loadData(variantMapper(data))
// Close the browser

}

scrapeCarDetails()