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

// Print data from DB on html.ejs file
app.get('/list', (req, res) => {
  // data 가져오기
  // meta data제외한 모든 데이터 가져오는 식
  db.collection('post')
    .find()
    .toArray((error, result) => {
      console.log(result);
      // 가져온 data를 포함해서 render하기
      res.render('list.ejs', { todos: result });
    });
});

///////////////// POST
// list.ejs의 form에서 submit 됐을 때 (간단히 DB에 저장하는 과정)
app.post('/post', (req, res) => {
  // DB의 counter collection 내 amountOfPost를 찾아 totalPost 값을 가져오기
  db.collection('counter').findOne(
    { name: 'amountOfPost' },
    (error, result) => {
      const { totalPost } = result; // 가져온 totalPost

      // totalPost로 _id 추가
      // post된 data를 body-parser(express 안에 있음)로 전환
      // post란 db의 collection을 찾아 하나의 데이터를 insert(insertOne)함
      db.collection('post').insertOne(
        {
          _id: totalPost + 1,
          title: req.body.title,
          detail: req.body.detail,
        },
        (error, result) => {
          if (error) return console.log(error);
          // counter collection의 amountOfPost 내 totalPost값을 +1씩 해줘야 함
          // 이를 위해 .updateOne을 사용
          // $inc는 operator 라는 것. 여러가지 종류가 있음 $inc는 정한 값만큼 증가시킴
          db.collection('counter').updateOne(
            { name: 'amountOfPost' },
            { $inc: { totalPost: 1 } },
            (error, result) => {
              // 이 콜백함수는 생략가능하지만 바람직하지는 않음
              if (error) return console.log(error);
              console.log('saved data successfully'.toUpperCase());
              res.send('DONE');
            }
          );
        }
      );
    }
  );
});
