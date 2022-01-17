const http = require("http");
// const socketio = require('socket.io');
const express = require('express')
const Nightmare = require('nightmare')
const axios = require('axios')
const nightmare = Nightmare({ show: true })
const connectDB = require("./db");
const Product = require("./model/products");
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());

connectDB();

function getProductList () {
  const url = `https://www.google.com/shopping/storefront?hl=en&sts=11&lsf=seller:8598733,store:11032523978609016215,s:l`;

//   const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: true })
 city = 'saltlakecity'
  nightmare
    .goto(url)
    .wait('#popular-items-cont')
    .evaluate(() => {
      const holders = [];
      var elements = document.querySelectorAll('#popular-items-cont li.p-item')
      for (var i = 0, element; element = elements[i]; i++) {
        // console.log(element)
        holders.push({
            id: i,
            link_url: element.querySelector('a.sh-ri__item-image').href,
            // image_url: v.querySelector('div>div')[0].querySelector('a').querySelector("img").src,
            image_url: element.querySelector('a.sh-ri__item-image img').src,
            // anchor_url: v.querySelector('div>div')[1].querySelector('a').href,
            // percentage: v.querySelectorAll('td')[3].innerText,
            // value: v.querySelectorAll('td')[4].innerText,
        })

        // holders.push(element)
      }

      // .forEach((v, i) => {
      //     holders.push({
      //         id: i,
      //         // image_url: v.querySelector('div>div')[0].querySelector('a').querySelector("img").src,
      //         image_url: v.querySelector('a.sh-ri__item-image')[0].querySelector("img").src,
      //         // anchor_url: v.querySelector('div>div')[1].querySelector('a').href,
      //         // percentage: v.querySelectorAll('td')[3].innerText,
      //         // value: v.querySelectorAll('td')[4].innerText,
      //     })
      // })

      return {
          holders: holders
      }
    })
    .end()
    .then(info => {
        console.log(info)
        info.holders.map(async (item) => {
          const product = new Product({
            id: item.id,
            image_url: item.image_url
          })
          await product.save()
        })
    })
    .catch(err => {
        console.error(err);
        // res.status(404).send({message: err});
    })
}

app.get("/shopping", (req,res) => {
  getProductList()
})
app.get("/list", async (req, res) => {
  const products = await Product.find()
  console.log(products)
  res.send(products)
})

// Port Environment variable
const PORT = process.env.PORT || 3000;

// Creating the node server
const SERVER = http.createServer(app);

// Firing up the server on selected port
SERVER.listen(PORT);

SERVER.on("listening", () => {
    console.log("[Server]::LISTEN:%s", PORT);
});

// Callback function for checking connecting or error
SERVER.on("error", error => {
    throw new Error(`[Server]::ERROR:${error.message}`);
});