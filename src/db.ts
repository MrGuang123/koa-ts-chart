/*
 * @Description: 定义数据库模型
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-25 16:58:35
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-22 13:52:38
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const model = mongoose.model
const fs = require('fs')
const path = require('path')
import { AddParam, ListParam } from './model'

// 图片列表模型
const chartListSchema = new Schema({
  chartId: {
    type: Schema.Types.ObjectId,
    // 是否创建索引
    index: true,
    // 是否创建唯一索引
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastModify: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    index: true
  },
  poster: {
    type: String,
  },
  chartType: {
    type: String,
    index: true
  },
  description: {
    type: String
  },
  option: {
    type: String
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false
})

// 图表详情模型
// const chartDetailScheme = new Schema({
//   option: {
//     type: String
//   },
//   lastModify: {
//     type: Date,
//     default: Date.now
//   }
// })

const ChartList = model('ChartList', chartListSchema)

module.exports = {
  // 添加图表
  async add(param: AddParam) {
    if(!param.option) return

    let chart = await ChartList.create({
      option: param.option,
      poster: param.posterPath,
      name: param.chartName,
      description: param.description,
      chartType: param.chartType
    })
    // console.log('*************')
    // console.log(chart)
    // console.log('*************')

    // await ChartList.updateOne({
    //   _id: chart._id
    // }, {
    //   chartId: chart._id
    // })
  },
  // 更新图表
  async update(param) {
    console.log(param)
    let { poster } = await ChartList.findOne({chartId: param.chartId})
    let posterPathArr = poster.split('/')
    let posterName = posterPathArr[posterPathArr.length - 1]
    let delPath = `${path.resolve(__dirname, '../public/upload')}/${posterName}`

    if(fs.existsSync(delPath)) {
      fs.unlinkSync(delPath)
    }else {
      console.log('删除地址错误：'+delPath)
    }
    
    return await ChartList.updateOne({
      // chartId: mongoose.Types.ObjectId(chartId)
      chartId: param.chartId
    },{
      chartId: param.chartId,
      option: param.option,
      poster: param.posterPath,
      name: param.chartName,
      chartType: param.chartType,
      lastModify: new Date().toISOString()
    })
  },
  // 删除图表
  async delete(chartId) {
    let result = await ChartList.find({chartId: chartId})
    console.log(chartId)
    console.log(result)
    return await ChartList.updateOne({
      chartId: chartId
    }, {
      isDelete: true
    })
  },
  // 获取图表列表
  async getChartList(param: ListParam) {
    let queryObj = {
      isDelete: false
    }
    if(param.chartType && param.chartType !== 'all') {
      Object.assign(queryObj, {
        chartType: param.chartType
      })
    }
    return await ChartList.find(queryObj, { _id: 0 }).sort({'created': -1})
    // .skip((pageIndex - 1) * pageSize).limit(pageSize)
  },
  // 根据chartID获取chart
  async getChartById(chartId) {
    return await ChartList.findOne({
      chartId,
      isDelete: false
    })
  },
  // 获取已经删除的列表
  async getDeletedList() {
    return await ChartList.find({
      isDelete: true
    })
  }
}