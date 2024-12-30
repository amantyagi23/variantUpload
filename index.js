const puppeteer = require('puppeteer');
const { mapper } = require('./map');
const { loadData } = require('./jmd');

const URL = [
   "https://www.cardekho.com/mahindra/bolero"
]

async function scrapeCarDetails() {
   for (let i = 0; i < URL.length; i++) {
    const url = URL[i];

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the URL
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for page content to load
    // await page.waitForSelector('.contentWrapper'); // Adjust the selector based on page structure

    // Extract car details
    const carDetails = await page.evaluate(() => {
        const carName = document.querySelector('.thcHeading')?.innerText.trim() || 'N/A';
        const brandName = "Maruti"; // Hardcoded since it's Maruti Dzire
        const totalVariants = document.querySelectorAll('.allvariant tbody tr').length || 0;
        
        const description = document.querySelector('.thcontent')?.innerText.trim() || 'N/A';

        return {
            carName,
            brandName,
            totalVariants,
            description
        };
    });

    loadData(mapper(carDetails))
    

    // Close the browser
    await browser.close();
    
   }
}

scrapeCarDetails().catch(console.error);
