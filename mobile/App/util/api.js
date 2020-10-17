const BASE_URL = "http://192.168.0.27:3000";

export const geoFetch = (path, options = {}) => {
  return fetch(`${BASE_URL}/api${path}`, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // console.log("res", res);
      throw new Error("Something went wrong... please try again.");
    })
    .catch((error) => {
      console.warn("ERROR: ", `${BASE_URL}/api${path}`, error);

      throw new Error(error);
    });
};
