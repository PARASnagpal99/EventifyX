const axios = require('axios');
const mongoose = require('mongoose');
const Event = require('../models/Event');
const URL = `https://www.eventbriteapi.com/v3/organizations/${process.env.ORG_ID}/events/`;

const getAllEvents = async (req, res) => {
 console.log(URL);
 try {
    const headers = {
      Authorization: `Bearer ${process.env.TOKEN}`,
    }
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
        });

        const savedEvent = await newEvent.save();
        savedEvents.push(savedEvent);
      }
    }

    console.log('Events fetched and saved successfully.');

    const allEvents = await Event.find();

    return res.json(allEvents);
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  } finally {
    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError.message);
    }
  }
};

module.exports = { getAllEvents };
