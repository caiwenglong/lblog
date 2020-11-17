import request from '@/utils/request'
import {IArticleData} from '@/api/type'

export const articleData: IArticleData = {
  id: '',
  title: '',
  content: '',
  category: '',
  author: '',
  gmtCreate: '',
  gmtModified: ''
}

export const apiAddArticle = (article: any) => {
  request({
    url: '/article-api/sr-article/add',
    method: 'post',
    data: article
  })
}
