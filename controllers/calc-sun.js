const puppeteer = require("puppeteer");
const df = require("date-fns");

module.exports.getSunPos = async ({
  lat = 55.7909,
  alt = 37.5232,
  timestamp = 0,
}) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const dateTime = df.format(new Date(), "yyyy.MM.dd|HH:mm").split("|");

  const url = `https://www.suncalc.org/#/${lat},${alt},17/${dateTime[0]}/${dateTime[1]}/0.1/2`;

  await page.goto(url);

  const d = await page.$$eval("#FensterF2 > table > tbody > tr", (trs) =>
    trs.map((tr) => tr.textContent.trim())
  );

  await browser.close();

  const res = {
      url,
      data: {}
  };

  d.forEach((row) => {
    const rowsplit = row.split(":");
    const key = rowsplit[0];
    const value = rowsplit.slice(1, rowsplit.length).join(":");

    res.data[key] = value;
  });
  return res;
};
