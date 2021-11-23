const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let db;
MongoClient.connect(
  'mongodb+srv://chws:rkskekfk12@cluster0.sc83b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (error, client) => {
    if (error) return console.log(error); // 에러 검출
    db = client.db('todoapp'); // database폴더안 todoapp에 연결

    app.listen(8080, () => {
      console.log('Server is listening on 8080');
    });
  }
);

///////////////// GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

// Print data from DB w/EJS file (하는 중)
app.get('/list', (req, res) => {
  // data 가져오기
  // meta data제외한 모든 데이터 가져오는 식
  db.collection('post')
    .find()
    .toArray((error, result) => {
      console.log(result);
      // 가져온 data를 포함해서 render하기
      res.render('list.ejs', { post: result });
    });
});

///////////////// POST
// Form에서 submit된 데이터를 DB로 보내기
// 이때 post된 data를 body-parser(express 안에 있음)로 전환
app.post('/post', (req, res) => {
  res.send('DONE');
  db.collection('post').insertOne(
    {
      title: req.body.title,
      detail: req.body.detail,
    },
    (error, result) => {
      if (error) return console.log(error);
      console.log('saved data successfully'.toUpperCase());
    }
  );
});
