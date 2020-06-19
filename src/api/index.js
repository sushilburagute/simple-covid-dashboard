import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    // we destruct the data right away while getting it.
    //moding data so we just get these 4 parameters.

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

// export const xyz = async () => {
//   try {
//     const  {
//       data: { countries },
//     } = await axios.get(`${url}/countries`);
//     console.log("API xyz called");

//     return countries.map((country) => country.name);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    console.log("Fetch coutries has worked");
    const xyz = countries.map((country) => country.name);
    return xyz;
  } catch (error) {
    console.log(error);
  }
};
