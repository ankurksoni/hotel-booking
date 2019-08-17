process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const axios = require('axios');
const config = require('../src/config/config.json');

describe('POST /book-by-bonus-points', () => {
    it('Must book hotel by bonus points', (done) => {
        axios.post('http://localhost:'+ config.serverPort + '/book-by-bonus-points', {
            "userid": "5d57e928a60a996e54afada0",
            "roomid": "2"
        })
        .then((response) => {
            expect(response.data).to.equal('Booking successful');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });

    it('Must Not book hotel as no hotel room identified', (done) => {
        axios.post('http://localhost:'+ config.serverPort + '/book-by-bonus-points', {
            "userid": "5d57e928a60a996e54afada0",
            "roomid": "2"
        })
        .then((response) => {
            console.log(response.data);
            expect(response.data).to.equal('No Hotel Room identified.');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });

    it('Must show booking in Pending Approval Stage.', (done) => {
        axios.post('http://localhost:'+ config.serverPort + '/book-by-bonus-points', {
            "userid": "5d57e928a60a996e54afada0",
            "roomid": "3"
        })
        .then((response) => {
            console.log(response.data);
            expect(response.data).to.equal('Booking pending for approval');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });
}); 

describe('GET /get-all-users', () => {
    it('Must show all users available', (done) => {
        axios.get('http://localhost:'+ config.serverPort + '/get-all-users')
        .then((response) => {
            expect(response.data).to.contain.property('records');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });
}); 

describe('POST /get-user', () => {
    it('Must show a user available', (done) => {
        axios.post('http://localhost:'+ config.serverPort + '/get-user', {
            "_id": "5d57e928a60a996e54afada0"
        })
        .then((response) => {
            expect(response.data).to.contain.property('record');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });
}); 

describe('GET /get-hotels', () => {
    it('Must show all users available', (done) => {
        axios.get('http://localhost:'+ config.serverPort + '/get-hotels')
        .then((response) => {
            expect(response.data).to.contain.property('records');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });
}); 

describe('POST /get-hotel', () => {
    it('Must show a hotel available', (done) => {
        axios.post('http://localhost:'+ config.serverPort + '/get-hotel', {
            "_id": "5d5793b607e1912cd4f94565"
        })
        .then((response) => {
            expect(response.data).to.contain.property('record');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });
}); 

describe('POST /get-hotel-room', () => {
    it('Must show a hotel room available', (done) => {
        axios.post('http://localhost:'+ config.serverPort + '/get-hotel-room', {
            "_id": "2"
        })
        .then((response) => {
            expect(response.data).to.contain.property('record');
            done();
        })
        .catch((error) => {
            done(error);
        });
    });
}); 