const puppeteer = require('puppeteer');

const dailyCheckTool = async() => {




    const firstName = 'Tien';
    const lastName = 'Phan';
    const url = 'https://ccintegration.ca1.qualtrics.com/jfe/form/SV_5uM5eLTssRDAq46?Q_DL=8cMTGYL9QnWLNpj_5uM5eLTssRDAq46_CGC_jyhd37okfzhzF6z&Q_CHL=email'
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await Promise.all([
            page.waitForNavigation(),
            page.goto(url),
            page.waitForSelector("#Q_lang"),
        ])
        //STEP 1
    const langSelected = await page.evaluate(() => {
        return document.getElementById("Q_lang").value;
    });
    if (langSelected !== 'EN') {
        await page.select(`#Q_lang`, "EN");
    }

    await page.waitForSelector('.QR-QID5');
    await page.waitForTimeout(1000);
    await page.select(".QR-QID5", "7");
    await page.waitForTimeout(1000);
    await page.click("input#NextButton");
    await page.waitForTimeout(1000);
    //STEP 2
    await page.waitForSelector('input.QR-QID57-1');

    await page.evaluate((a, b) => {
        document.querySelector('input.QR-QID57-1').value = a;
        document.querySelector('input.QR-QID57-2').value = b;
    }, firstName, lastName)
    await page.waitForTimeout(1000);
    await page.waitForSelector('input.QR-QID57-1');
    await page.waitForTimeout(1000);
    await page.click("input#NextButton");
    await page.waitForTimeout(1000);
    //STEP 3
    await page.waitForSelector('.radio.QR-QID72-1');
    await page.waitForTimeout(1000);
    await page.click('.SingleAnswer:first-child');
    await page.waitForTimeout(1000);
    await page.click("input#NextButton");
    await page.waitForTimeout(1000);

    //STEP 4
    await page.waitForSelector('input.QR-QID73-2');
    await page.waitForTimeout(1000);
    await page.click('.SingleAnswer:first-child');
    await page.waitForTimeout(1000);
    await page.click("input#NextButton");
    await page.waitForTimeout(1000);

    await page.waitForSelector('div#Questions');
    await page.waitForTimeout(1000);
    const questions = ['QID4', 'QID71', 'QID3', 'QID74', 'QID75', 'QID78', 'QID77', 'QID59', 'QID83', 'QID84', 'QID85', 'QID63', 'QID64'];
    for (let index = 0; index < questions.length; index++) {
        const selector = `label#${questions[index]}-1-label`;
        await page.waitForTimeout(1000);
        await page.click(selector);
    }

    await page.waitForTimeout(1000);
    await page.click("input#NextButton");
    await page.waitForTimeout(1000);
    //STEP 5
    await page.waitForSelector('.QuestionBody');
    await page.waitForTimeout(1000);
    await page.click('label#QID87-1-label');
    await page.waitForTimeout(1000);
    await page.click("input#NextButton");
    console.log("daily help check successfuly")
    return 'Successfully'

};
module.exports = dailyCheckTool