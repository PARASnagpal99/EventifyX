const express = require("express");

const InterestIdMappingInterest = {
  101: "Music",
  102: "Dance",
  103: "Visual Arts",
  104: "Literature",
  105: "Sports",
  106: "Cooking",
  107: "Photography",
  108: "Travel",
  109: "Gardening",
  110: "Technology",
};

const InterestMappingInterestId = {
    "Music": 101,
    "Dance": 102,
    "Visual Arts": 103,
    "Literature": 104,
    "Sports": 105,
    "Cooking": 106,
    "Photography": 107,
    "Travel": 108,
    "Gardening": 109,
    "Technology": 110
  }
  

module.exports = {InterestIdMappingInterest,InterestMappingInterestId};