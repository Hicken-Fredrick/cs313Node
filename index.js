const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/USPSCalc'))
  .post('/getRate', (req, res) => {
    var data = $("#calcRates :input").serializeArray();
    console.log(data);
    res.render('pages/USPSCalcResult');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function calcRate(weight, type) {
  
}

.post('/math', (req, res) => {
        var data = req.body;
        var result = math(Number(data.num1), Number(data.num2), data.operator);
        console.log(result);
        res.render('pages/result', { result: result });
    })