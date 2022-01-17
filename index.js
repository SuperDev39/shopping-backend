const axios = require('axios');
const Nightmare = require('nightmare')

require('dotenv').config();

const CoinMarketCap = require('coinmarketcap-api');
const cmc_key = process.env.CMC_API_KEY;
const cmcClient = new CoinMarketCap(cmc_key);

const { getLiqProviders } = require('../controllers/audit_controller');
const { add } = require('nodemon/lib/rules');

module.exports = (app) => {

    // app.get('/tokentx', (req, res) => {
    //     const params = {}
    //     params.module = 'account'
    //     params.action = 'tokentx'
    //     params.contractaddress = process.env.CONTRACT_ADDRESS
    //     params.page = 1
    //     params.offset = 50
    //     params.startblock = 0
    //     params.endblock = 99999999
    //     params.sort = 'desc'
    //     params.apikey = process.env.BSC_API_KEY

    //     axios.get(process.env.BSC_API_URL, { params: params })
    //     .then(transactions => {            
    //         console.log(transactions);
    //         if (transactions.data.message === 'OK') {
    //             res.json({transactions: transactions.data.result});
    //         } else {
    //             res.status(404).send({message: transactions.data.result});
    //         }
    //     })
    //     .catch(err => {
    //         res.status(404).send({message: err});
    //     })
    // })

    // app.get('/tokeninfo', (req, res) => {
    //     const params = {}
    //     params.module = 'token'
    //     params.action = 'tokeninfo'
    //     params.contractaddress = process.env.CONTRACT_ADDRESS
    //     params.apikey = process.env.BSC_API_KEY

    //     axios.get(process.env.BSC_API_URL, { params: params })
    //     .then(info => {
    //         console.log(info);
    //         if (info.data.message === 'OK') {
    //             console.log(info.data.result);
    //             res.json({token_info: info.data.result});
    //         } else {
    //             res.status(404).send({message: info.data.result});
    //         }
    //     })
    //     .catch(err => {
    //         res.status(404).send({message: err});
    //     })
    // })

    // app.get('/coininfo', (req, res) => {        
    //     cmcClient.getQuotes({id: '11603'}).then(info => {
    //         console.log(info);
    //         res.json({coin_info: info.data['11603']});
    //     }).catch(err => {
    //         res.status(404).send({message: err});
    //     })
    // })

    // app.get('/historical', (req, res) => {
    //     const params = {}
    //     params.ids = 'marketmove'
    //     params.vs_currency = 'usd'

    //     const headers = {'accept': 'application/json'}

    //     axios.get(`${process.env.CGK_API_URL}/coins/markets`, { params: params, headers: headers })
    //     .then(info => {
    //         if (info.statusText === 'OK') {
    //             console.log(info.data[0]);
    //             res.json({historical_states: info.data[0]});
    //         } else {
    //             res.status(404).send({message: info.statusText});
    //         }
    //     })
    //     .catch(err => {
    //         res.status(404).send({message: err});
    //     })
    // })

    // app.get('/audit/holders', (req, res) => {
    //     const { address } = req.query;
    //     const url = `${process.env.BSC_MAIN_URL}/${address}#balances`;
    //     const nightmare = Nightmare();

    //     nightmare
    //     .goto(url)
    //     .wait('#tokeholdersiframe')
    //     .evaluate(() => {
    //         const total = document.querySelector('#ContentPlaceHolder1_tr_tokenHolders div.mr-3').innerText;
    //         const holders = [];

    //         document.querySelector('#tokeholdersiframe').contentWindow.document.querySelectorAll('tbody>tr').forEach((v, i) => {
    //             holders.push({
    //                 id: i,
    //                 address: v.querySelectorAll('td')[1].querySelector('a').innerText,
    //                 quantity: v.querySelectorAll('td')[2].innerText,
    //                 percentage: v.querySelectorAll('td')[3].innerText,
    //                 value: v.querySelectorAll('td')[4].innerText,
    //             })
    //         })
    //         return {
    //             total: total, 
    //             holders: holders
    //         }
    //     })
    //     .end()
    //     .then(info => {
    //         console.log(info);
    //         res.json(info);            
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(404).send({message: err});
    //     })
    // })

    // app.get('/audit/liqproviders', (req, res) => {
    //     const { address } = req.query;
    //     const arrAddress = address.split(',');
        
    //     getLiqProviders(arrAddress).then(providers => {
    //         console.log(providers);
    //         res.json(providers);  
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.status(404).send({message: err});
    //     })
    // }) 

    app.get('/marketmove/safety', (req, res) => {
        const { address } = req.query;
        const url = `${process.env.MARKET_MOVE_URL}/token/${address}/safety`
        axios.get(url)
        .then(info => {
            console.log(info);
            if (info.statusText === 'OK') {
                console.log(info.data.value);
                res.json({value: info.data.value});
            } else {
                res.status(404).send({message: info.statusText});
            }
        })
        .catch(err => {
            res.status(404).send({message: err});
        })
    })

    app.get('/marketmove/token', (req, res) => {
        const { address } = req.query;
        const url = `${process.env.MARKET_MOVE_URL}/token/${address}`
        axios.get(url)
        .then(info => {
            console.log(info);
            if (info.statusText === 'OK') {
                console.log(info.data);
                res.json({data: info.data});
            } else {
                res.status(404).send({message: info.statusText});
            }
        })
        .catch(err => {
            res.status(404).send({message: err});
        })
    })

    app.get('/marketmove/trending', (req, res) => {
        const url = `${process.env.MARKET_MOVE_URL}/token/trending`
        axios.get(url)
        .then(info => {
            console.log(info);
            if (info.statusText === 'OK') {
                console.log(info.data);
                res.json({data: info.data});
            } else {
                res.status(404).send({message: info.statusText});
            }
        })
        .catch(err => {
            res.status(404).send({message: err});
        })
    })

    app.get('/marketmove/holdings', (req, res) => {
        const params = {};
        params.address = req.query.address;
        axios.get(`${process.env.MARKET_MOVE_URL}/holdings`, { params: params })
        .then(info => {
            console.log(info);
            if (info.statusText === 'OK') {
                console.log(info.data.data);
                res.json({data: info.data.data});
            } else {
                res.status(404).send({message: info.statusText});
            }
        })
        .catch(err => {
            res.status(404).send({message: err});
        })
    })

    app.get('/marketmove/pair', (req, res) => {
        const params = {};
        params.fromDate = req.query.fromDate;
        params.toDate = req.query.toDate;
        params.interval = req.query.interval;
        params.limit = req.query.limit;
        params.pairBase = req.query.pairBase;
        params.pairQuote = req.query.pairQuote;
        params.factoryAddress = req.query.factoryAddress;
        axios.get(`${process.env.MARKET_MOVE_URL}/pair/${req.query.address}/trades`, { params: params })
        .then(info => {
            console.log(info);
            if (info.statusText === 'OK') {
                console.log(info.data);
                res.json({data: info.data});
            } else {
                res.status(404).send({message: info.statusText});
            }
        })
        .catch(err => {
            res.status(404).send({message: err});
        })
    })
}