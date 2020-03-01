/*
 * @Description: 数据库连接方法
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-25 17:22:21
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-27 22:37:07
 */
const mongoose = require('mongoose')

const dbUrl = 'mongodb://localhost/chartData'

mongoose.set('useCreateIndex', true)

export default {
  open() {
    return mongoose.connect(dbUrl, { 
      useNewUrlParser: true,
      useUnifiedTopology: true
     })
  },
  close() {
    if(mongoose.connection) {
      return mongoose.connection.close()
    }
  }
}