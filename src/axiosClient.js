import axios from "axios";

  const axiosclient = axios.create({
    baseURL:'https://smart-farming-api.onrender.com/'
  })
  axiosclient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('Token')}`
    return config
  });
  
  axiosclient.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('Token')
    
      return error;
    }
    throw error;
  })

  export default axiosclient