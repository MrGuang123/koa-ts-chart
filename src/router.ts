/*
 * @Description: 路由文件
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-26 09:57:19
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-03-01 12:19:11
 */

import Router from 'koa-router';
import chartList from './action'

import fs from 'fs'
import path from 'path'

const router = new Router();

const serverPath = 'http://localhost:5656'

// 添加图表
router.post('/chartList/add', async (ctx, next) => {
  let returnImgPath, img, option, chartName
  if(ctx.request.files && ctx.request.body) {
    img = ctx.request.files.img
    option = ctx.request.body.option
    chartName = ctx.request.body.chartName

    console.log(img)
    console.log(option)
    console.log(chartName)

    const name = 'img' + Date.now()
    let imgPath = `${path.resolve(__dirname, '../public/upload')}/${name}.jpeg`
    returnImgPath = `${serverPath}/upload/${name}.jpeg`
    
    // 创建读写流，创建图片
    const reader = fs.createReadStream(img.path)
    const upStream = fs.createWriteStream(imgPath)
    reader.pipe(upStream)
  }

  chartList.add(option, returnImgPath, chartName)

  ctx.body = {
    status: 1,
    data: returnImgPath
  }
})

// 更新图表
router.post('/chartList/update', async (ctx, next) => {
  console.log(ctx.request.body)
  const param = ctx.request.body
  chartList.update(param.chartId, param.option)
  ctx.body = {
    status: 1,
    data: 'success'
  }
})

// 删除图标
router.del('/chartList/:id', async (ctx, next) => {
  const { id } = ctx.params.id
  await chartList.delete(id)
  ctx.body = {
    status: 1,
    data: ''
  }
})

// 获取图表列表
router.get('/chartList', async (ctx, next) => {
  const lists = await chartList.getChartList()
  ctx.body = {
    status: 1,
    data: lists
  }
})

// 通过ID获取单个图表
router.get('/chartList/:id', async (ctx, next) => {
  console.log(ctx)
  const { id } = ctx.params
  let chart = await chartList.getChartById(id)
  ctx.body = {
    status: 1,
    data: chart
  }
})

// 获取已删除图表列表
router.get('/deletedList', async (ctx, next) => {
  let lists = await chartList.getDeletedList()
  ctx.body = {
    status: 1,
    data: lists
  }
})

export default router
