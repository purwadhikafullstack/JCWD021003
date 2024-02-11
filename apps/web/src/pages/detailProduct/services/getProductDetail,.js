import axios from 'axios'

export const getProductDetails = async (id, setProduct) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}product/details/${id}`)
    return setProduct(res?.data?.data[0])
  } catch (err) {
    throw err
  }
}