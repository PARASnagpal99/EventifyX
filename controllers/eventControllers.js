const axios = require("axios");
const mongoose = require("mongoose");
const Event = require("../models/Event");
const URL = `https://www.eventbriteapi.com/v3/organizations/${process.env.ORG_ID}/events/`;

const { cityMappingCityId } = require("../utils/city");
const {InterestMappingInterestId , InterestIdMappingInterest} = require("../utils/interest");


const getAllEvents = async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${process.env.TOKEN}`,
    };
    const response = await axios.get(URL, { headers });
    const eventsData = response.data.events;

    const savedEvents = [];

    for (const eventData of eventsData) {
      const existingEvent = await Event.findOne({ event_id: eventData.id });

      if (!existingEvent) {
        const newEvent = new Event({
          event_name: eventData.name.text,
          event_description: eventData.description.text,
          event_id: eventData.id,
          event_url: eventData.url,
          category_id: eventData.category_id,
          venue_id: eventData.venue_id,
          logo_id : eventData.logo_id 
        });

        const savedEvent = await newEvent.save();
        savedEvents.push(savedEvent);
      }
    }

    console.log("Events fetched and saved successfully.");

    const allEvents = await Event.find();

    return res.json(allEvents);
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  } 
};

const getEventByCity = async (req, res) => {
  try {
    const city = req.params.cityName;
    const cityId = cityMappingCityId[city];
    console.log(cityId);
    const event = await Event.find({ venue_id: cityId });
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};




const getEventByInterest = async (req, res) => {
  try {
    const interest = req.params.interestName;
    const interestId = InterestMappingInterestId[interest];
    // console.log(cityId);
    const event = await Event.find({ category_id: interestId });
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error:", error.message);
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};


const getEventByCityAndInterest = async (req, res) => {
  try {
    const {cityName, interestName} = req.params;
    console.log(cityName, interestName);
    const cityId = cityMappingCityId[cityName];
    const interestId = InterestMappingInterestId[interestName];
    // console.log(cityId);
    const event = await Event.find({ category_id: interestId, venue_id: cityId });
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error:", error.message);
    return res
     .status(500)
     .json({ error: "Internal Server Error", details: error.message });
  }
}

const searchEventByEventName = async (req, res) => {
  console.log(req.query);
  try {
    const { query } = req.query;
    const results = await Event.find({ event_name: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getEventByEventId = async (req, res) => {
  console.log(req.params.event_id)
  try {
    const event_id = req.params.event_id;
    const event = await Event.findOne({ event_id: event_id });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (error) {
    console.error("Error:", error.message);

    // Check for specific Mongoose validation error
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid eventId format" });
    }

    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};


module.exports = { 
  getAllEvents, 
  getEventByCity ,
  getEventByInterest,
  getEventByCityAndInterest,
  searchEventByEventName ,
  getEventByEventId
};

