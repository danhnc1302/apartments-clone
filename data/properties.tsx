import { Property } from "../types/property";

export const properties: Property[] = [
  {
    ID: 1,
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3FID%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sN1pVaQ7SMfmzIydnPSKcgHaH1%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Q5Eunmn9ENDDwvQPZBCRdwHaE7%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Oe74GIp-Ini-tIVYe0bH6wHaE7%26pid%3DApi&f=1",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "The Hamilton",
    street: "555 NE 34th St",
    city: "Miami",
    state: "Florida",
    zip: 33137,
    tags: ["Parking"],
    lat: 25.80913,
    lng: -80.186363,
  },
  {
    ID: 2,
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Q5Eunmn9ENDDwvQPZBCRdwHaE7%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sN1pVaQ7SMfmzIydnPSKcgHaH1%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Oe74GIp-Ini-tIVYe0bH6wHaE7%26pid%3DApi&f=1",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "Riverhouse at 11th",
    street: "1170 NW 11th St",
    city: "Miami",
    state: "Florida",
    zip: 33136,
    tags: ["Parking"],
    lat: 25.78354,
    lng: -80.21391,
  },
  {
    ID: 5,
    images: [
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Q5Eunmn9ENDDwvQPZBCRdwHaE7%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sN1pVaQ7SMfmzIydnPSKcgHaH1%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Oe74GIp-Ini-tIVYe0bH6wHaE7%26pid%3DApi&f=1",
    ],
    rentLow: 3750,
    rentHigh: 31054,
    bedroomLow: 1,
    bedroomHigh: 5,
    name: "ParkLine Miami",
    street: "100 NW 6th St",
    city: "Miami",
    state: "Florida",
    zip: 33136,
    tags: ["Parking"],
    lat: 25.7804316,
    lng: -80.1962652,
  },
];

/*
 This function is here for testing purposes, you wouldn't use this in prod. 
 However, you would use similar logic on the backend to get the areas in your
 db that are within a certain lat and lng range
 */

export const getPropertiesInArea = (boundingBox: number[]): Property[] => {
  const minLat = boundingBox[0];
  const maxLat = boundingBox[1];
  const minLng = boundingBox[2];
  const maxLng = boundingBox[3];

  const propertiesInArea: Property[] = [];

  for (let i in properties) {
    if (
      properties[i].lat <= maxLat &&
      properties[i].lat >= minLat &&
      properties[i].lng <= maxLng &&
      properties[i].lng >= minLng
    )
      propertiesInArea.push(properties[i]);
  }

  return propertiesInArea;
};