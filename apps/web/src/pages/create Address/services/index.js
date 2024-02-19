import axios from "axios";
import * as Yup from 'yup';

export const CreateUserAddress = async (id, specificAddress, cityId, fullName, phoneNumber, postalCode,latitude,longitude) => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}user-address/create-user-address?id=${id}`, {
        specificAddress,
        cityId,
        fullName,
        phoneNumber,
        postalCode,
        latitude,
        longitude,
      });
      console.log('User address created successfully');
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create user address');
    }
  };


export const validationSchema = Yup.object().shape({
  location: Yup.string().required('Location is required'),
  cityId: Yup.number().required('City is required'),
  postalCode: Yup.string().required('Postal code is required'),
  name: Yup.string().required('Name is required'),
  phoneNumber: Yup.string().required('Phone number is required'),
});