const puppeteer = require('puppeteer')
const dailyCheckTool = require('./index');
const isDebugging = () => {
    const debugging_mode = {
        headless: false,
        slowMo: 250,
        devtools: true,
    }
    return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

// describe('on page load', () => {
//     test('h1 loads correctly', async() => dailyCheckTool)
// })


test('runt done with return 1', async() => {
    jest.useFakeTimers('legacy');
    const data = await dailyCheckTool();

    expect(data).toBe('Successfully')

}, )