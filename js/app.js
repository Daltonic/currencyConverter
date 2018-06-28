// ................................................IDB START...........................................................
import idb from 'idb';

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
const dbPromise = idb.open('currency-Store', 1, upgradeDB => {
  upgradeDB.createObjectStore('currencies');
});
const currencies = [];
 // Getting our currencies from our free api
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
  });


// ................................................APP START...........................................................
class AppComponent {
    constructor() {
        this.currencies = [];
        // Defining the forEach function
        this.dbPromise = idb.open('currency-Store', 1, upgradeDB => {
          upgradeDB.createObjectStore('currencies');
        });
        this.main = document.querySelector("main");
        this.getCurrencies();
    }

    changeView() {
        this.main.innerHTML = `
            <div class="row">
                <div class="col-md-6 ml-auto mr-auto">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="card-title text-muted">Convert Now!</h4>
                            <p class="card-subtitle text-muted">Challenge 2.0</p>
                            <hr>
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <label class="text-left">From</label>
                                    <br />
                                    <select class="form-control" id="fromCurrency">
                                        ${this.currencies.map((currency) => {
                                            return `<option value="${currency.id}">${currency.id}</option>`
                                        })}
                                    </select>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="form-group">
                                     <br />
                                        <input type="number" placeholder="Amount" value="1" class="form-control" id="fromAmount">
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                <label class="text-left">To</label>
                                    <br />
                                    <select class="form-control" id="toCurrency">
                                        ${this.currencies.map((currency) => {
                                            return `<option value="${currency.id}">${currency.id}</option>`
                                        })}
                                    </select>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="form-group">
                                     <br />
                                        <input type="number" placeholder="Amount" class="form-control" id="toAmount">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <br>
                                    <button class="btn btn-info">Convert Me!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    getCurrencies() {
        setTimeout(() => {
            this.dbPromise.then(db => {
              return db.transaction('currencies')
                .objectStore('currencies').getAll();
            }).then(allObjs => {
                this.currencies = allObjs;
                this.changeView();
                this.usd = document.querySelector("#fromCurrency option[value='USD']").setAttribute('selected', '');
                this.ngn = document.querySelector("#toCurrency option[value='NGN']").setAttribute('selected', '');
            });
        }, 500);
    }
    getOnline() {
        const dbPromise = idb.open('currency-Store', 1, upgradeDB => {
          upgradeDB.createObjectStore('currencies');
        });
        const currencies = [];
        // Getting our currencies from our free api
        fetch('https://free.currencyconverterapi.com/api/v5/currencies')
          .then((response) => {
            return response.json();
          })
          .then((myJson) => {
            myJson.results.forEach((value, key) => {
                this.currencies.push(value);
            });
          });
    }


   
}

new AppComponent();