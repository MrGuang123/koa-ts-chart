/*
 * @Description: 处理图表列表数据
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-25 20:47:53
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-15 23:18:01
 */

const chartList = require('./db')
import { AddParam, ListParam } from './model'

export default {
async add(param: AddParam) {
  return chartList.add(param)
},
async update(param) {
  return chartList.update(param)
},
async delete(chartId: string) {
  return chartList.delete(chartId)
},
async getChartList(param: ListParam) {
  return chartList.getChartList(param)
},
async getChartById(chartId) {
  return chartList.getChartById(chartId)
},
async getDeletedList() {
  return chartList.getDeletedList()
},
}
