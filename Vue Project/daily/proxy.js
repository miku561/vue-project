const http = require('http');
const request = require('request');
const port = 8081;
// const imgPort = 8082;

const apiServer = http.createServer((req, res) => {
  const url = 'http://news-at.zhihu.com/api/4' + req.url;
  const options = {
    url: url
  };
  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(body)
    }
  }
  request.get(options, callback)
});
apiServer.listen(port, () => {
  console.log(`接口已运行在 ${port}端口`);
})

// const imgServer = http.createServer((req, res) => {
//   const url = req.url.split('/img/')[1];
//   const options = {
//     url: url,
//     enconding: null
//   };
//   function callback (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const contentType = response.headers['content-type'];
//       res.setHeader('Content-Type', contentType);
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       res.end(body);
//     }
//   }
//   request.get(options, callback)
// });

// imgServer.listen(imgPort, hostname, () => {
//   console.log(`图片代理运行在http://${hostname}:${imgPort}/`);
// })