import axios from 'axios';

const EcommerceFetch = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
    return response.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export default EcommerceFetch;
