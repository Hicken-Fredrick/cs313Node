const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')
 

express()
  .use( bodyParser.json() )
  .use(bodyParser.urlencoded({     
  extended: true
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/USPSCalc'))
  .post('/getRate', (req, res) => {
    var weight = req.body.weight;
    var type = req.body.type;
    var result = calcRate(Number(weight), type);
    res.render('pages/USPSCalcResult', { result: result });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calcRate(weight, type) {
  costWeight = Math.round(weight);
  switch(type) {
    case'letterStamp':
      if (costWeight < 1) {
        return "Shipping Cost: $" + .55; 
      } else if (costWeight < 5) {
        return "Shipping Cost: $" + (.4 + (costWeight * .15)); 
      } else {
        return "TOO HEAVY!"; 
      }
      break;
    case'letterMeter':
      if (costWeight < 1) {
        return "Shipping Cost: $"  + .50; 
      } else if (costWeight < 5) {
        return "Shipping Cost: $"  + (.35 + (costWeight * .15)); 
      } else {
        return "TOO HEAVY!";
      }
      break;
    case'largeEnvelope':
      if (costWeight < 1) {
        return "Shipping Cost: $"  + 1; 
      } else if (costWeight < 14) {
        return "Shipping Cost: $"  + (1 + (costWeight * .2)); 
      } else {
        return "TOO HEAVY!";
      }
      break;
    case'package':
      if (costWeight < 5) {
        return "Shipping Cost: $"  + 3.80; 
      } else if (costWeight < 9) {
        return "Shipping Cost: $"  + 4.60; 
      } else if (costWeight < 13){
        return "Shipping Cost: $"  + 5.30; 
      } else if (costWeight < 14) {
        return "Shipping Cost: $"  + 5.90; 
      } else {
        return "TOO HEAVY!"; 
      }
      break;
    default:
      
  }
}