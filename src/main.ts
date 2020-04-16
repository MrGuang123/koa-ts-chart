/*
 * @Description: 图表服务主文件
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-24 17:01:15
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-16 21:51:59
 */
import Koa from 'koa';
import koaBody from 'koa-body'
import KoaStatic from 'koa-static'
import dbConnect from './connect'
import cors from '@koa/cors'

import path from 'path'

import router from './router'

dbConnect.open()

const app = new Koa();

app.use(koaBody({
  multipart: true,
  // formidable: {
  //   uploadDir: path.join(__dirname, './public/upload/'),
  //   keepExtensions: true,
  //   // maxFieldsSize: 2 * 1024 * 1024,
  // }
}))

// app.use(cors({
//   origin: '*',
//   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
// }))

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

app.use(KoaStatic(path.resolve(__dirname, '../public')))

app.use(async (ctx, next) => {
  ctx.type = 'application/json'
  await next()
})

app.use(async (ctx, next) => {
  try {
    await next()
  }catch(e) {
    ctx.body = {
      status: 0,
      msg: e.message || e
    }
  }
})


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5656)
console.log('server is start at 5656')