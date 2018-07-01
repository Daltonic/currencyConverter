// ................................................APP IMPORTING LIB...........................................................
import idb from 'idb';

// ................................................APP START...........................................................
class AppComponent {

// ................................................APP CONSTUCTOR SETUP...........................................................    
    constructor() {
        this.url = 'https://free.currencyconverterapi.com/api/v5/';
        this.currencies = [];
        this.dbName = 'currency-Store';
        this.dbPromise = idb.open(this.dbName, 1, upgradeDB => {
            upgradeDB.createObjectStore('currencies');
            upgradeDB.createObjectStore('rates');
        });
        this.main = document.querySelector("main");
        this.getFromApi();
        this.serviceWorkerRegister();
    }
// ................................................APP RENDER VIEW...........................................................

    changeView() {
        this.main.innerHTML = `
            <div class="row">
                <div class="col-lg-12 col-md-6 ml-auto mr-auto">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="card-title text-muted">Convert Now!</h4>
                            <p class="card-subtitle text-muted">ALC Challenge 2.0</p>
                            <hr>
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <label class="text-left">From</label>
                                    <br />
                                    <select class="form-control" id="fromCurrency">
                                        ${this.currencies.map((currency) => {
                                            return `<option value="${currency.id}">${currency.id} - ${currency.currencyName}</option>`
                                        })}
                                    </select>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="form-group">
                                     <br />
                                        <input type="number" value="1" class="form-control" id="fromAmount">
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                <label class="text-left">To</label>
                                    <br />
                                    <select class="form-control" id="toCurrency">
                                        ${this.currencies.map((currency) => {
                                            return `<option value="${currency.id}">${currency.id} - ${currency.currencyName}</option>`
                                        })}
                                    </select>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="form-group">
                                     <br />
                                        <input type="text" disabled value="" class="form-control" id="toAmount">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <br>
                                    <button class="btn btn-info" id="convertMe">Convert Me!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
// ................................................APP CALL TO API...........................................................

    getFromApi() {
        // Defining the forEach iterator function...
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
        fetch(this.url + 'currencies')
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            res.results.forEach((value, key) => {
                this.currencies.push(value);
            });
          })
          .then(() => {
            // Setting data on IndexBD
             this.dbPromise.then((db) => {
              const tx = db.transaction('currencies', 'readwrite');
              const currenciesStore = tx.objectStore('currencies');
              this.currencies.forEach((value, key) => {
                currenciesStore.put(value, value.id);
              })
              return tx.complete;
            }).then(() => {
                this.getFromIDB();
            });
          })
          .catch((error) => {
            this.getFromIDB();
          });
    }
// ................................................APP CALL TO IDB...........................................................
    getFromIDB() {
        // Getting data from indexDB and populate the this.currencies array
        return this.dbPromise.then(db => {
          return db.transaction('currencies')
            .objectStore('currencies').getAll();
        }).then(allCurrencies => {
            this.currencies = allCurrencies;
            this.changeView();
            this.usd = document.querySelector("#fromCurrency option[value='USD']").setAttribute('selected', '');
            this.ngn = document.querySelector("#toCurrency option[value='NGN']").setAttribute('selected', '');
            this.getDefaultConvert();
            this.onConvert();
        });
    }
// ................................................APP EXTRA SETUP...........................................................

    onConvert() {
        // On convert function....
        const button = document.querySelector('button');
        button.addEventListener("click", () => { 
            // Getting values from options
            const req = this.apiRequstParams();

            // Setting an event listener for a click event
            fetch(this.url + `convert?q=${req.query}&compact=ultra`)
            .then((res) => {
                return res.json();
              })
            .then((res) => {
                let rateVal = res[`${req.query}`];
                this.dbPromise.then(db => {
                  const tx = db.transaction('rates', 'readwrite');
                  tx.objectStore('rates').put(rateVal, req.query);
                  return tx.complete;
                }).then(() => {
                    rateVal = document.getElementById('fromAmount').value * rateVal;
                    document.getElementById('toAmount')
                      .setAttribute('value', `${req.toCurrency}${rateVal.toFixed(2)}`);
                });
              })
            .catch(() => {
                this.getOfflineRate(req.query, req.toCurrency);
            });
        });
    }
// ................................................APP INITIAL CONVERSION...........................................................

    getDefaultConvert() {
        // Getting values from options
        const req = this.apiRequstParams();

        // Setting an event listener for a click event
        fetch(this.url + `convert?q=${req.query}&compact=ultra`)
        .then((res) => {
            return res.json();
          })
        .then((res) => {
            let rateVal = res[`${req.query}`];
            this.dbPromise.then(db => {
              const tx = db.transaction('rates', 'readwrite');
              tx.objectStore('rates').put(rateVal, req.query);
              return tx.complete;
            }).then(() => {
                rateVal = document.getElementById('fromAmount').value * rateVal;
                document.getElementById('toAmount')
                  .setAttribute('value', `${req.toCurrency}${rateVal.toFixed(2)}`);
            });
            
          })
        .catch((error) => {
            this.getOfflineRate(req.query, req.toCurrency);
        });
    }
// ................................................APP REQUEST PARAMETER...........................................................
    apiRequstParams() {
        const f = document.getElementById('fromCurrency');
        const t = document.getElementById('toCurrency');
        return {
            fromCurrency: f.options[f.selectedIndex].value,
            toCurrency: t.options[t.selectedIndex].value,
            query: `${f.options[f.selectedIndex].value}_${t.options[t.selectedIndex].value}`
        };
    }
// ................................................APP OFFLINE RATE EXTRACTION ...........................................................

    getOfflineRate(query, toCurrency) {
        return this.dbPromise.then(db => {
          return db.transaction('rates')
            .objectStore('rates').get(query);
        }).then((val) => {
            const value = document.getElementById('fromAmount').value * val;
            document.getElementById('toAmount')
              .setAttribute('value', `${toCurrency}${value.toFixed(2)}`);
        });
    }
    serviceWorkerRegister() {
        if (!navigator.serviceWorker) return;
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then((reg) => {
                console.log('service Worker Registered...')
            });
        });
    }
}
// ................................................APP INSTANTIATION...........................................................

new AppComponent();