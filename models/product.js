// const products = [];
const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  // const p = path.join(
  //   path.dirname(process.mainModule.filename),
  //   "data",
  //   "products.json"
  // );
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // return [];
      return cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
    //return JSON.parse(fileContent);
  });
  // return products;
};

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
  save() {
    this.id = Math.random().toString(); //Now all our products will have new id
    //products.push(this);
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    // const p = path.join(
    //   path.dirname(process.mainModule.filename),
    //   "data",
    //   "products.json"
    // ); //Here in the data folder we need to have our products saved as json file so we added this path
    //fs.readFile(p, (err, fileContent) => {
    //console.log(err);
    // let products = [];
    // if (!err) {
    //   products = JSON.parse(fileContent);
    // }
    // products.push(this);
    // fs.writeFile(p, JSON.stringify(products), (err) => {
    //   console.log(err);
    // });
    // });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
    //   const p = path.join(
    //     path.dirname(process.mainModule.filename),
    //     "data",
    //     "products.json"
    //   );
    //   fs.readFile(p, (err, fileContent) => {
    //     if (err) {
    //       // return [];
    //       cb([]);
    //     }
    //     //return JSON.parse(fileContent);
    //     cb(JSON.parse(fileContent));
    //   });
    //   // return products;
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};
