const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser'); // 미들웨어
const dotenv = require('dotenv');
// dotenv 패키지는 .env 파일을 읽어서 process.env로 만듭니다.
// dotenv = .env
// process.env.COOKIE_SECRET 에 cookiesecret 값이 할당된다.
const session = require('express-session');
const {urlencoded} = require("express");  // 미들웨어

dotenv.config();
const app = express();

app.set('port', process.env.PORT || 3000);
// 서버가 실행될 포트를 설정 Port가 있다면 port 사용 없으면 3000 사용
// app.set(키, 값) 을 사용해서 데이터를 저장할 수 있다. -> app.get(key)로 가져올 수 있다.

// app.get('/', (req, res) => {
// // get 요청이 올 때 어떤 동작을 할지 적는 부분
// // app(주소, router()=> {})
// // 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분
//     //res.send('Hello, Express!!!!');
//     res.sendfile(path.join(__dirname, '/index.html'));
//
// });

// 미들웨어는 app.use와 함께 사용된다.
// app.use(미들웨어) : 모든 요청의 미들웨어 실행
// app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
// app.post('/abc', 미들웨어) : abc로 시작하는 POST요청에서 미들웨어 실행
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use('요청 경로', express.static('실제 경로'));
// static 미들웨어는 정적인 파일들을 제공하는 라우터 역할을 한다.
// public/stylesheets/style.css 는 http://localhost:3000/stylesheets/style.css 로 접근 가능하다.
// public 폴더에 넣으면 브라우저에서 접근할 수 있다.
app.use(express. json);
app.use(express, urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});
app.use(express.json);
app.use(express.urlencoded({extended: false}));
// extended option이 false 이면 노드의 querystring 모듈을 사용하여 쿼리스트링을 해석하고, true면 qs 모듈을 사용하여 쿼리스트링을 해석한다.
app.use(bodyParser.raw());
app.use(bodyParser.text());


app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

// 에러처리 미들웨어는 마지막에 위치하는 것이 좋다.
app.use((err, req, res, next) => {
    // 에러처리 미들웨어는 매개변수가 err, req, res, next 로 사용하지 않더라도 매개변수가 네개여야한다.
    console.error(err);
    res.status(500).send(err.message); // res.status 메서드로 HTTP 상태 코드를 지정할 수 있다. DEFAULT : 200
});


// express 모듈을 실행해 app 변수에 할당
// express 내부에 http 모듈이 내장되어 있으므로 서버의 역할을 할 수 있다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
