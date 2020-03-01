/*
 * @Description: 处理图表列表数据
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-02-25 20:47:53
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-02-26 15:02:09
 */

 const chartList = require('./db')

 export default {
  async add(option, poster, name = '默认图表', description = '', chartType = 'line') {
    return chartList.add(option, poster, name, description, chartType)
  },
  async update(chartId, option) {
    return chartList.update(chartId, option)
  },
  async delete(chartId) {
    return chartList.delete(chartId)
  },
  async getChartList(chartType: string = '', pageIndex = 1, pageSize = 10) {
    return chartList.getChartList(chartType, pageIndex, pageSize)
  },
  async getChartById(chartId) {
    return chartList.getChartById(chartId)
  },
  async getDeletedList() {
    return chartList.getDeletedList()
  },
 }
