/*
 * @Description: 接口数据参数模型
 * @Autor: yantingguang@tusdao.com
 * @Date: 2020-04-12 15:10:09
 * @LastEditors: yantingguang@tusdao.com
 * @LastEditTime: 2020-04-12 15:19:15
 */
export interface AddParam {
  option: string;
  posterPath: string;
  chartName: string;
  description ?: string;
  chartType: string;
}

export interface ListParam {
  chartType: string;
  pageIndex?: number;
  pageSize?: number;
}
