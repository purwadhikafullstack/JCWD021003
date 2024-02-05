import axios from "axios";

// Function to get city name from cityId
export const getCityName = async (cityId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/user-address/specific-city/${cityId}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get city name');
  }
};

// Function to get coordinates from city name
export const getCoordinates = async (cityName) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/user-address/city?city=${cityName}`);
    const { lat, lng } = response.data.data; 
    return { latitude: lat, longitude: lng };  } 
    catch (error) {
    console.error(error);
    throw new Error('Failed to get coordinates');
  }
};

export const CreateUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode,openSuccessModal, openErrorModal) => {
  try {
    const cityName = await getCityName(cityId);
    console.log('cityName',cityName);

    const { latitude, longitude } = await getCoordinates(cityName);
    console.log(latitude, longitude);

    await axios.post(`http://localhost:8000/api/user-address/create-user-address?id=${id}`, {
      specificAddress,
      cityId,
      fullName,
      phoneNumber,
      postalCode,
      latitude,
      longitude,
    });
    openSuccessModal();
    console.log('User address created successfully');
  } catch (err) {
    openErrorModal();
    console.error(err);
    throw new Error('Failed to create user address');
  }
};
