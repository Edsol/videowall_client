const puppeteer = require('puppeteer');

class Page {
    constructor() { }

    async connect(port) {
        console.log('page connect with browser on port', port)
        const browser = await puppeteer.connect({
            browserURL: `http://127.0.0.1:` + port,
            defaultViewport: null
        })

        const pageInstance = (await browser.pages())[0];
        return this.extend(pageInstance);
    }

    extend(page) {
        page.waitAndGoTo = function (time, url) {
            setTimeout(function () {
                console.log('Wait and go to method')
                page.goto(url);
            }, time);
        }

        page.reloadAfterTime = function (time) {
            if (time) {
                setTimeout(function () {
                    page.reload();
                }, time);

                return true;
            }
        }

        return page;
    }
}

module.exports = Page