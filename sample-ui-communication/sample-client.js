const axios = require('axios');

axios.get('http://localhost:3000/gateway').then(resp => {
    console.log(resp.data);
});