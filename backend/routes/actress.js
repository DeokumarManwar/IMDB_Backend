const router = require("express").Router();

const actress = require("../models/actress");

router.post("/save", async (req, res) => {
  const newActress = actress({
    name: req.body.name,
    image_url: req.body.image_url,
  });
  try {
    const savedActress = await newActress.save();
    return res.status(200).send({ success: true, actress: savedActress });
  } catch (e) {
    return res.status(400).send({ success: false, msg: e });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await actress.find();
    if (data) {
      return res.status(200).send({ success: true, actress: data });
    } else {
      return res.status(400).send({ success: false, msg: "Data Not Found" });
    }
  } catch (e) {
    return res
      .status(400)
      .send({ success: false, msg: "Cannot get All Movies" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const result = await actress.deleteOne(filter);
  try {
    if (result) {
      return res.status(200).send({
        success: true,
        msg: "Data Deleted Successfully",
        data: result,
      });
    } else {
      return res.status(400).send({ success: false, msg: "Data Not Found" });
    }
  } catch (e) {
    return res
      .status(400)
      .send({ success: false, msg: "Cannot delete the movie" });
  }
});


module.exports = router;
