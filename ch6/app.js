const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트를 설정 Port가 있다면 port 사용 없으면 3000 사용

// get 요청이 올 때 어떤 동작을 할지 적는 부분
app.get('/', (req, res) => {
    //res.send('Hello, Express!!!!');
    res.sendfile(path.join(__dirname, '/index.html'));

});

app.listen(app.get('port'), () => {
   console.log(app.get('port'), '번 포트에서 대기 중');
});

// express 모듈을 실행해 app 변수에 할당
// express 내부에 http 모듈이 내장되어 있으므로 서버의 역할을 할 수 있다.