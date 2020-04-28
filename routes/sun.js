var express = require("express");
const sunCalc = require("../controllers/calc-sun");

var router = express.Router();
router.get("/:azimuth/:lat/:alt/:timestamp", async function (req, res, next) {
  const windowAzimuth = Number(req.params.azimuth);

  const response = await sunCalc.getSunPos({
    alt: req.params.alt,
    lat: req.params.lat,
    timestamp: new Date(),
  });

  if (windowAzimuth > 315 && windowAzimuth < 45) {
    console.log("north");
  } else if (windowAzimuth >= 45 && windowAzimuth < 135) {
    console.log("east");
  } else if (windowAzimuth >= 135 && windowAzimuth < 225) {
    console.log("south");
  } else if (windowAzimuth >= 225 && windowAzimuth < 315) {
    if (response["Azimuth"] < 225 || response["Azimuth"] > 315) {
      console.log("Open the gates! Sun isnt in window");
    }
    console.log("west");
  }

  res.json(response);
});

module.exports = router;
