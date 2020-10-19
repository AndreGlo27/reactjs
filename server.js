const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const promisify = require('util').promisify;

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

app.get('/api/read', (req, res) => {
  fs.readFile('users.json', function (err, data) {
    var json = JSON.parse(data)
    res.send(json);
  })
  
});

app.post('/api/write', async (req, res) => {
  console.log(req.body);
  try {
    fs.readFile('users.json', function (err, data) {
      var json = JSON.parse(data)
      json.push(req.body)

      fs.writeFile("users.json", JSON.stringify(json),function(err, result){
        if(err) console.log('error', err);
      })
    })
    return res.status(200).send()
  } catch (err) {
    throw new Error(`Could not write file because of {err}`);
  }
});


app.post('/api/subscribe', async (req, res) => {
  console.log(req.body);
  try {
    fs.readFile('users.json', function (err, data) {
      var json = JSON.parse(data)
      var index = json.findIndex(p => p.email === req.body.userLogin)
      if(json[index].newsletter){
        json[index].newsletter = false;
      }
      else
      {
        json[index].newsletter = true;
      }

      fs.writeFile("users.json", JSON.stringify(json),function(err, result){
        if(err) console.log('error', err);
      })
    })
    return res.status(200).send()
  } catch (err) {
    throw new Error(`Could not write file because of {err}`);
  }
});

app.post('/api/addtofav', async (req, res) => {
  console.log(req.body);
  try {
    fs.readFile('users.json', function (err, data) {
      const json = JSON.parse(data)
      let isExist = false;
      let iUni = 0;
      const index = json.findIndex(p => p.email === req.body.userLogin)
      json[index].favUni.forEach((item,i) => {
        if(item.name === req.body.uni.name)
        {
          isExist = true;
          iUni = i;
        }
      });
      if (isExist) {
        json[index].favUni.splice(iUni, 1);
      }
      else{
        json[index].favUni.push(req.body.uni)
      }
      fs.writeFile("users.json", JSON.stringify(json),function(err, result){
        if(err) console.log('error', err);
      })
    })
    return res.status(200).send()
  } catch (err) {
    throw new Error(`Could not write file because of {err}`);
  }
});


app.listen(port, () => console.log(`Listening on port ${port}`));