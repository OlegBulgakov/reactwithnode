import axios from 'axios';

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('/all')
            .then(data => {
                resolve(data);
            }, (err) => {
                console.warn(err);
                reject(err);
            })
    })
};


