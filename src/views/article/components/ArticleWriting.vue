<template>
  <div class='wgt-article-writing'>
    <el-form
      ref="formArticleWriting"
      :inline="true"
      :model="formArticle"
      :rules="rules"
    >
      <div class='article-writing__header clearfix'>
        <div class='article-writing__title'>
          <el-form-item
            label="文章标题"
            prop="articleTitle"
          >
            <el-input
              v-model="formArticle.articleTitle"
              class="input-middle"
              :placeholder="titlePlaceholder"
            />
          </el-form-item>
          <el-form-item
            label="文章分类"
            prop="articleCategory"
          >
            <el-select
              v-model="formArticle.categoryValue"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章分类"
              :multiple-limit=multipleLimit>
              <el-option
                v-for="item in categoryOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class='article-writing__buttons'>
          <el-button
            type="primary"
            icon="el-icon-s-promotion"
            size="small"
            @click='handlePublicArticle'
          >
            发布
          </el-button>
        </div>
      </div>
      <div ref='articleWritingContent' class='article-writing__content'>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <div class='wgt-editor'>
            <div id="vditor" />
          </div>
        </el-scrollbar>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import Vditor from 'vditor'
import { ElForm } from 'element-ui/types/form'
import { ArticleModule } from '@/store/modules/articles'

@Component({
  name: 'ArticleWriting'
})

export default class extends Vue {
  private multipleLimit = 1
  /* vditor */
  private articleWritingHeaderHeight = 64
  private contentEditor: any
  private titlePlaceholder = '请输入文章标题'

  /* 文章分类 */
  private categoryOption = [
    {
      value: 'HTML',
      label: 'HTML'
    }, {
      value: 'CSS',
      label: 'CSS'
    }, {
      value: 'JavaScript',
      label: 'JavaScript'
    }]

  private formArticle = {
    articleTitle: '',
    categoryValue: '',
    articleContent: ''
  }

  private rules = {
    articleTitle: []
  }

  private calculateEditorHeight() {
    return this.$el.clientHeight - this.articleWritingHeaderHeight
  }

  private handlePublicArticle() {
    this.formArticle.articleContent = this.contentEditor.getValue();
    (this.$refs.formArticleWriting as ElForm).validate(async(valid: boolean) => {
      if (valid) {
        await ArticleModule.addArticle(this.formArticle)
      }
    })
  }

  mounted() {
    this.calculateEditorHeight()
    this.contentEditor = new Vditor('vditor', {
      preview: {
        hljs: {
          enable: true, // 代码高亮
          lineNumber: true, // 显示行号
          style: 'monokai'
        }
      },
      minHeight: this.calculateEditorHeight(),
      after: () => {
        this.contentEditor.setValue('')
      }
    })
  }
}

</script>

<style lang="scss" scoped>
  $headerHeight: 64px;
  $contentHeight: calc(100% - #{$headerHeight});
  .wgt-article-writing {
    height: 100%;
  }
  .article-writing__header {
    padding: 12px 20px;
  }
  .article-writing__title {
    float: left;
  }
  .article-writing__buttons {
    float: right;
  }
  .article-writing__content {
    height: $contentHeight;
    margin-left: -1px;
  }
  ::v-deep {
    .el-form {
      height: 100%;
    }
    .el-form-item {
      margin: 0;
      & + .el-form-item {
        margin-left: 20px;
      }
    }
    .el-scrollbar {
      height: 100%;
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
    .vditor {
      text-align: center;
    }
  }
</style>
