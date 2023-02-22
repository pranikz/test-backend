const vaclist = require("../models/entryType.js");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

router.get("/data", async (req, res) => {
  try {
    const list = await vaclist.find().sort();
    res.send(list);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

router.post("/vote", async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      is_Vaccinated: Joi.boolean(),
      birthdate: Joi.date(),
      gender: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const { name, is_Vaccinated, birthdate, gender, uid } = req.body;

    let list = new vaclist({ name, is_Vaccinated, birthdate, gender, uid });

    list = await list.save();
    res.send(list);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});
module.exports=router;
