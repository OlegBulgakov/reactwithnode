import axios from 'axios';

export default () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/todos/all')
            .then(data => {
                resolve(data);
            }, (err) => {
                console.warn(err);
                reject(err);
            })
    })
};


