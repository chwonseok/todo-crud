// Express
const express = require('express');
const app = express();

// body-parser
// 2021년 이후에는 express에 body-parser 기본 포함. 새로 설치 필요 X
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB setup
// 라이브러리 설치 및 몽고DB사이트에서 cluster와 연결할 수 있는 연결코드가 필요
const MongoClient = require('mongodb').MongoClient;

// EJS 라이브러리 설치 후 사용하기 (/list.html 관련)
// 사용이유: 그냥 html 파일만 보내면 DB를 넣을 수 없기에 static페이지임
// 그래서 EJS, Pug같은 템플릿엔진 사용함
// EJS는 서버데이터를 html에 쉽게 넣을 수 있는 html렌더링 엔진임
// react같은 것은 ejs없이 html에 데이터 삽입 가능
app.set('view engine', 'ejs');

let db;
MongoClient.connect(
  'mongodb+srv://chws:rkskekfk12@cluster0.sc83b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (error, client) => {
    if (error) return console.log(error); // 에러검출
    db = client.db('todoapp'); // database폴더안 todoapp에 연결

    app.listen(8080, () => {
      console.log('Server is listening on 8080');
    });
  }
);

// GET
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/write', (req, res) => {
  res.sendFile(__dirname + '/write.html');
});

// POST
// post된 data 사용하기 위해 body-parser 라이브러리 필요
// 그 data는 아래 req로 가져올 수 있음
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

// Print data from DB w/ EJS file
// EJS사용하기 위해서는 list.ejs를 views라는 폴더에 반드시 넣어야 함
app.get('/list', (req, res) => {
  res.render('list.ejs');
});
