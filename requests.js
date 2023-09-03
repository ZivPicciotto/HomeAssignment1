//Import relevant modules
const axios = require("axios");

const limit = 300;

//Returns total number of flights
async function numOfFlightsRequest() {
  try {
    //Get data from api
    const response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );

    //Returns total number of records - each record is a flight
    return response.data.result.total;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

// Returns the total number of outbound flights
async function numOfOutBoundFlights() {
  try {
    let count = 0; // Amount of total outbound flights

    // Gets first chunk of data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );

    const totalNum = response.data.result.total; // Total number of records

    for (let i = 0; i < totalNum; i++) {
      //Moves to next chunk of data when reaching limit
      response =
        i > 0 && i % limit == 0 // i%limit is used to know when the last cord has been acssesed
          ? await getNext(response.data.result._links.next) //Helper function
          : response;

      //Accessing each record
      record = response.data.result.records[i % limit];

      //Increasing count of outbound flights when record is not null
      count += record.CHCINT != undefined;
    }

    return count;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Returns total number of inbound flights
async function numOfInBoundFlights() {
  try {
    let count = 0; // Amount of total inbound flights

    // Gets first chunk of data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );

    const totalNum = response.data.result.total; // Total number of records

    for (let i = 0; i < totalNum; i++) {
      //Moves to next chunk of data when reaching limit
      response =
        i > 0 && i % limit == 0
          ? await getNext(response.data.result._links.next) // Helper function
          : response;

      //Accessing each record
      record = response.data.result.records[i % limit];

      //Increasing count of outbound flights when record is null
      count += record.CHCINT == undefined;
    }
    return count;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Returns total number of flights to and from a country
async function numOfFlightsCountry(country) {
  try {
    let count = 0; // Amount of total inbound flights

    // Gets data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}&q=${country}`
    );

    const totalNum = response.data.result.total; // Total number of records after applying the country filter
    return totalNum;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Returns total number of in bound flights from a country
async function numOfInBoundCountry(country) {
  try {
    let count = 0; // Amount of total inbound flights

    // Gets first chunk of data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}&q=${country}`
    );

    const totalNum = response.data.result.total; // Total number of records filtered with country

    for (let i = 0; i < totalNum; i++) {
      //Moves to next chunk of data when reaching limit
      response =
        i > 0 && i % limit == 0
          ? await getNext(response.data.result._links.next)
          : response;

      //Accessing each record
      record = response.data.result.records[i % limit];

      //Increasing count of inbound flights when record is null
      count += record.CHCINT == undefined;
    }
    return count;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Returns total number of outbound flights to a country
async function numOfOutBoundCountry(country) {
  try {
    let count = 0; // Amount of total inbound flights

    // Gets first chunk of data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}&q=${country}`
    );

    const totalNum = response.data.result.total; // Total number of records

    for (let i = 0; i < totalNum; i++) {
      //Moves to next chunk of data when reaching limit
      response =
        i > 0 && i % limit == 0
          ? await getNext(response.data.result._links.next)
          : response;

      //Accessing each record
      record = response.data.result.records[i % limit];

      //Increasing count of inbound flights when record is null
      count += record.CHCINT != undefined;
    }
    return count;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Returns total number of delayed flights
async function numOfDelayedFlights() {
  try {
    let count = 0; // Amount of total inbound flights

    // Gets data that includes "DELAYED"
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}&q=DELAYED`
    );
    // Total number of records
    const totalNum = response.data.result.total;
    return totalNum;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Returns the most popular destination
async function mostPopular() {
  try {
    //Object to hold the amount of flights of each dest.
    let destinations = {
      max: "",
      maxAmount: 0,
    };

    // Gets first chunk of data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );

    const totalNum = response.data.result.total; // Total number of records

    for (let i = 0; i < totalNum; i++) {
      //Moves to next chunk of data when reaching limit
      response =
        i > 0 && i % limit == 0
          ? await getNext(response.data.result._links.next)
          : response;

      //Accessing each record
      record = response.data.result.records[i % limit];

      //Retrieving city name and uppercase it (to avoid inaccuracy if some country's name is not always in same format)
      const city = ("" + record.CHLOC1T).toUpperCase();

      //Increasing count per city
      incCount(destinations, `${city}`);
    }
    //Returns the max field of destinations, maintained in incCount function
    return destinations.max;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//Handles quick Getaway
async function quickGetaway() {
  try {
    //Initializes a set of destinations (to avoid duplicates)
    let destinations = new Set();
    //Initializes an array to hold all responses, to prevent loss of info if data updates mid-run
    let dataFetched = [];

    // Gets first chunk of data
    let response = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=${limit}`
    );

    const totalNum = response.data.result.total; // Total number of records

    for (let i = 0; i < totalNum; i++) {
      //Moves to next chunk of data when reaching limit
      response =
        i > 0 && i % limit == 0
          ? await getNext(response.data.result._links.next)
          : response;

      // In order to fetch data only once - so it wont change in the process
      if (i % limit == 0) {
        dataFetched.push(response);
      }
      //Accessing each record
      record = response.data.result.records[i % limit];

      //Destination name
      const dest = ("" + record.CHLOC1T).toUpperCase();

      //adds city to destination set
      destinations.add(`${dest}`);
    }

    //Makes an obj to organize data from set of destinations
    let flightsObj = setToObj(destinations);

    //Iterates over all responses obtained from previous for-loop
    for (let j = 0; j < dataFetched.length; j++) {
      response = dataFetched[j];

      //total number of records
      const recordsNum = dataFetched[j].data.result.total;

      //Loops through all records
      for (let i = 0; i < limit; i++) {
        //Break condition to prevent out of bounds error when (total records)%limit != 0
        if (j == dataFetched.length - 1) {
          const lastRecordsNum = recordsNum % limit;
          if (i == lastRecordsNum) break;
        }

        record = response.data.result.records[i];
        const dest = ("" + record.CHLOC1T).toUpperCase(); // city name
        const dateString = ("" + record.CHSTOL).slice(0, 10); // retrieving date only
        const date = new Date(`${dateString}`);
        const flightCode = "" + record.CHOPER; // flight code
        const flightNum = "" + record.CHFLTN; // flight number
        const flightName = flightCode + flightNum; // flight name to be returned if exists pair

        if (isOutBound(record)) {
          //Inserts flight name with date into object
          flightsObj[`${dest}`].to[`${flightName}`] = date;

          if (flightsObj[`${dest}`].to.min === "") {
            //Updates fields in case it's empty
            flightsObj[`${dest}`].to.min = flightName;
            flightsObj[`${dest}`].to.minDate = date;
          } else if (date < flightsObj[`${dest}`].to.minDate) {
            //Updates Fields when neccessary
            flightsObj[`${dest}`].to.min = flightName;
            flightsObj[`${dest}`].to.minDate = date;
          }
        } else {
          //Inbound flights
          //Inserts flight name with date into object
          flightsObj[`${dest}`].from[`${flightName}`] = date;

          if (flightsObj[`${dest}`].from.max === "") {
            //Updates fields in case it's empty
            flightsObj[`${dest}`].from.max = flightName;
            flightsObj[`${dest}`].from.maxDate = date;
          } else if (date > flightsObj[`${dest}`].from.maxDate) {
            //Updates Fields when neccessary
            flightsObj[`${dest}`].from.max = flightName;
            flightsObj[`${dest}`].from.maxDate = date;
          }
        }
      }
    }

    let outBoundFlight = "",
      inBoundFlight = "";

    // For each destination in our data, check if exists a pair which holds the conditions
    for (let dest of destinations) {
      //Only check if both min and max values have been changed
      if (
        flightsObj[`${dest}`].to.min !== "" &&
        flightsObj[`${dest}`].from.max !== ""
      ) {
        //Checks if there exists at least one day difference between min and max flights
        if (
          flightsObj[`${dest}`].to.minDate < flightsObj[`${dest}`].from.maxDate
        ) {
          outBoundFlight = flightsObj[`${dest}`].to.min;
          inBoundFlight = flightsObj[`${dest}`].from.max;
          const pair = { departure: outBoundFlight, arrival: inBoundFlight };
          return pair;
        }
      }
    }
    //Returns null in case no pair exists
    return null;
  } catch (error) {
    // Error in case fetching data failed
    throw new Error(`Error fetching data: ${error.message}`);
  }
}

//simple function to get the next chunk of data
const getNext = async (link) => {
  try {
    const response = await axios.get(`https://data.gov.il/${link}`);
    return response;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

/*
Helper function for mostPopular
Increases the count of the flights in to or out of each country 
*/
function incCount(obj, comp) {
  if (!obj[`${comp}`]) {
    //if the country does not exist yet, initialize it
    obj[`${comp}`] = 1;
  } else {
    //In case already exists
    obj[`${comp}`]++;
  }
  //Keeping track of the country with the most flights and updates accordingly
  if (obj[`${comp}`] > obj["maxAmount"]) {
    obj["maxAmount"] = obj[`${comp}`];
    obj["max"] = comp;
  }
}

/*
Helper function for quickGetaway
Intializes an obj to the following structure: Assume set= (x,y), Then:
builtObj = {
  x: {
    to: {min: "", minDate:0001-01-01}, 
    from: {max: "", maxDate: 0001-01-01}
  },
  y: {
    to: {min: "", minDate:0001-01-01},
    from: {max: "", maxDate: 0001-01-01}
  },
}

**to - outbound, from: inbound
*/
function setToObj(set) {
  let builtObj = {};
  for (let val of set) {
    builtObj[`${val}`] = {};
    builtObj[`${val}`].to = {};
    builtObj[`${val}`].from = {};
    const initDate = new Date("0001-01-01");
    builtObj[`${val}`].to.min = "";
    builtObj[`${val}`].from.max = "";
    builtObj[`${val}`].from.maxDate = initDate;
    builtObj[`${val}`].to.minDate = initDate;
  }
  return builtObj;
}

/*
Helper function for quickGetaway
Returns true if is an outbound flight and false otherwise.
*/
const isOutBound = (record) => (record.CHCINT != undefined ? true : false);

//Exports relevant functions
module.exports = {
  numOfFlightsRequest,
  numOfOutBoundFlights,
  numOfInBoundFlights,
  numOfInBoundCountry,
  numOfOutBoundCountry,
  numOfFlightsCountry,
  numOfDelayedFlights,
  mostPopular,
  quickGetaway,
};
