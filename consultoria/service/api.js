import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3003/admin', // Ajuste a baseURL conforme necessário
});

const api = {
  postUsers: async (payload) => {
    try {
      const response = await http.post('login',payload, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }

      
      }
      )

      return response;
    }catch(err){

      console.error(err)
    }

    }
  }


export default api;