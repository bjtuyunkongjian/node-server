const express = require('express');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const app = express();
// 路由
// const roadRouter = require('./routers/road');
const testRouter = require('./routers/test');

// 支持跨域配置
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); // 和客户端对应，必须设置以后，才能接收cookie.
  next();
};

app.use(allowCrossDomain); // 可以跨域

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// app.use(cookieParser());

// 路由
// app.use('/road', roadRouter);
app.use('/test', testRouter);
app.use('/static', express.static('static'));

app.listen(3000);