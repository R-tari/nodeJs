// 익스프레스로 서버개체 생성
const express = require('express');
const app = express();
//mongodb 생성
const MongoClient = require('mongodb').MongoClient;
// post로 자료 전송을 위한 body parser (middleware) 설정
app.use(express.json());
app.use(express.urlencoded({extended:true}));


let schDB;

MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.1nmtr.mongodb.net/schedule?retryWrites=true&w=majority',(err,client)=>{
  if(err) return console.log('데이터베이스 오류 관리자에게 문의하세요');
  
    schDB=client.db('schedule');


  app.listen(8080,()=>{
    console.log('8080포트 오픈');
  })
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
  });


app.get('/write',(req,res)=>{
  res.sendFile(__dirname + '/write.html');
})


app.post('/add',(req,res)=>{
  schDB.collection('today').insertOne(
      {
          title:req.body.title,
          order:req.body.order,
          _id:100
      },(err,result)=>
      {
          if(err) return console.log('오류발생');
      }
  );
  res.sendFile(__dirname+'/index.html');
})



//mongodb+srv://admin:qwer1234@cluster0.1nmtr.mongodb.net/schedule?retryWrites=true&w=majority