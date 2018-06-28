import idb from 'idb';
const dbPromise = idb.open('currency-Store', 1, upgradeDB => {
  upgradeDB.createObjectStore('currencies');
});


// Defining the forEach function
if (!Object.prototype.forEach) {
    Object.defineProperty(Object.prototype, 'forEach', {
        value: function (callback, thisArg) {
            if (this == null) {
                throw new TypeError('Not an object');
            }
            thisArg = thisArg || window;
            for (var key in this) {
                if (this.hasOwnProperty(key)) {
                    callback.call(thisArg, this[key], key, this);
                }
            }
        }
    });
}

// Getting our currencies from our free api
let currencies = [];
fetch('https://free.currencyconverterapi.com/api/v5/currencies')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    myJson.results.forEach((value, key) => {
        currencies.push(value);
    });
  })
  .then(() => {
    // Set data on IndexBD
     dbPromise.then((db) => {
      const tx = db.transaction('currencies', 'readwrite');
      const currenciesStore = tx.objectStore('currencies');
      currencies.forEach((value, key) => {
        currenciesStore.put(value, value.id);
      })
      return tx.complete;
    });
  })
  .then(() => {
    dbPromise.then(db => {
      return db.transaction('currencies')
        .objectStore('currencies').getAll();
    }).then(allObjs => console.log(allObjs));
  });

