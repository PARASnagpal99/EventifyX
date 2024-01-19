const express = require("express");

const cityIdMappingCity = {
  1001: "Mumbai",
  1002: "Delhi",
  1003: "Bangalore",
  1004: "Hyderabad",
  1005: "Chennai",
  1006: "Kolkata",
  1007: "Pune",
  1008: "Ahmedabad",
  1009: "Jaipur",
  1010: "Surat",
};

const cityMappingCityId = {
    "Mumbai": 1001,
    "Delhi": 1002,
    "Bangalore": 1003,
    "Hyderabad": 1004,
    "Chennai": 1005,
    "Kolkata": 1006,
    "Pune": 1007,
    "Ahmedabad": 1008,
    "Jaipur": 1009,
    "Surat": 1010
  }  


module.exports = {cityIdMappingCity, cityMappingCityId};
