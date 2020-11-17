import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { apiAddArticle, articleData } from '@/api/articles'
import { IArticleData } from '@/api/type'

@Module({dynamic: true, store, name: 'articleModule'})
class Article extends VuexModule implements IArticleData {
  public id = ''
  public title = ''
  public content = ''
  public author = ''
  public category =''
  public gmtCreate = ''
  public gmtModified = ''


  @Mutation
  public SET_ID(id: string) {
    this.id = id
  }

  @Mutation
  public SET_TITLE(title: string) {
    this.title = title
  }

  @Mutation
  public SET_CONTENT(content: string) {
    this.content = content
  }

  @Mutation
  public SET_AUTHOR(author: string) {
    this.author = author
  }

  @Mutation
  public SET_CATEGORY(category: string) {
    this.category = category
  }

  @Mutation
  public SET_GMT_CATEGORY(gmtCreate: string) {
    this.gmtCreate = gmtCreate
  }

  @Mutation
  public SET_GMT_MODIFIED(gmtModified: string) {
    this.gmtModified = gmtModified
  }

  @Action
  public async addArticle(formArticle: any) {
    articleData.title = formArticle.articleTitle
    articleData.content = formArticle.articleContent
    articleData.category = formArticle.categoryValue[0]
    console.log(articleData)
    await apiAddArticle(articleData)
  }
}

export const ArticleModule = getModule(Article)
