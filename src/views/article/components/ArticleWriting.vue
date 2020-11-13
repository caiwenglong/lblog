<template>
  <div class='wgt-article-writing'>
    <el-form
      ref="formArticleWriting"
      :inline="true"
      :model="formData"
      :rules="rules"
    >
      <div class='article-writing__header clearfix'>
        <div class='article-writing__title'>
          <el-form-item
            label="文章标题"
            prop="articleTitle"
          >
            <el-input
              v-model="formData.articleTitle"
              class="input-middle"
              :placeholder="titlePlaceholder"
            />
          </el-form-item>
          <el-form-item
            label="文章分类"
            prop="articleCategory"
          >
            <el-select
              v-model="categoryValue"
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
@Component({
  name: 'ArticleWriting'
})

export default class extends Vue {
  private multipleLimit = 1
  /* vditor */
  private articleWritingHeaderHeight = 64
  private contentEditor: any
  private titlePlaceholder = '请输入文章标题'
  private toolbarItem = [
    {
      icon: '<svg><use xlink:href="#vditor-icon-export"></use></svg>',
      name: 'export',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-E',
      icon: '<svg><use xlink:href="#vditor-icon-emoji"></use></svg>',
      name: 'emoji',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-H',
      icon: '<svg><use xlink:href="#vditor-icon-headings"></use></svg>',
      name: 'headings',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-B',
      icon: '<svg><use xlink:href="#vditor-icon-bold"></use></svg>',
      name: 'bold',
      prefix: '**',
      suffix: '**',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-I',
      icon: '<svg><use xlink:href="#vditor-icon-italic"></use></svg>',
      name: 'italic',
      prefix: '*',
      suffix: '*',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-D',
      icon: '<svg><use xlink:href="#vditor-icon-strike"></use></svg>',
      name: 'strike',
      prefix: '~~',
      suffix: '~~',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-K',
      icon: '<svg><use xlink:href="#vditor-icon-link"></use></svg>',
      name: 'link',
      prefix: '[',
      suffix: '](https://)',
      tipPosition: 'e'
    }, {
      name: '|'
    }, {
      hotkey: '⌘-L',
      icon: '<svg><use xlink:href="#vditor-icon-list"></use></svg>',
      name: 'list',
      prefix: '* ',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-O',
      icon: '<svg><use xlink:href="#vditor-icon-ordered-list"></use></svg>',
      name: 'ordered-list',
      prefix: '1. ',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-J',
      icon: '<svg><use xlink:href="#vditor-icon-check"></use></svg>',
      name: 'check',
      prefix: '* [ ] ',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-⇧-I',
      icon: '<svg><use xlink:href="#vditor-icon-outdent"></use></svg>',
      name: 'outdent',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-⇧-O',
      icon: '<svg><use xlink:href="#vditor-icon-indent"></use></svg>',
      name: 'indent',
      tipPosition: 'e'
    }, {
      name: '|'
    }, {
      hotkey: '⌘-;',
      icon: '<svg><use xlink:href="#vditor-icon-quote"></use></svg>',
      name: 'quote',
      prefix: '> ',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-⇧-H',
      icon: '<svg><use xlink:href="#vditor-icon-line"></use></svg>',
      name: 'line',
      prefix: '---',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-U',
      icon: '<svg><use xlink:href="#vditor-icon-code"></use></svg>',
      name: 'code',
      prefix: '```',
      suffix: '\n```',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-G',
      icon: '<svg><use xlink:href="#vditor-icon-inline-code"></use></svg>',
      name: 'inline-code',
      prefix: '`',
      suffix: '`',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-⇧-B',
      icon: '<svg><use xlink:href="#vditor-icon-before"></use></svg>',
      name: 'insert-before',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-⇧-E',
      icon: '<svg><use xlink:href="#vditor-icon-after"></use></svg>',
      name: 'insert-after',
      tipPosition: 'e'
    }, {
      name: '|'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-upload"></use></svg>',
      name: 'upload',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-record"></use></svg>',
      name: 'record',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-M',
      icon: '<svg><use xlink:href="#vditor-icon-table"></use></svg>',
      name: 'table',
      prefix: '| col1',
      suffix: ' | col2 | col3 |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |',
      tipPosition: 'e'
    }, {
      name: '|'
    }, {
      hotkey: '⌘-Z',
      icon: '<svg><use xlink:href="#vditor-icon-undo"></use></svg>',
      name: 'undo',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-Y',
      icon: '<svg><use xlink:href="#vditor-icon-redo"></use></svg>',
      name: 'redo',
      tipPosition: 'e'
    }, {
      name: '|'
    }, {
      hotkey: "⌘-'",
      icon: '<svg><use xlink:href="#vditor-icon-fullscreen"></use></svg>',
      name: 'fullscreen',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-edit"></use></svg>',
      name: 'edit-mode',
      tipPosition: 'e'
    }, {
      hotkey: '⌘-P',
      icon: '<svg><use xlink:href="#vditor-icon-both"></use></svg>',
      name: 'both',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-preview"></use></svg>',
      name: 'preview',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-align-center"></use></svg>',
      name: 'outline',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-theme"></use></svg>',
      name: 'content-theme',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-code-theme"></use></svg>',
      name: 'code-theme',
      tipPosition: 'e'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-bug"></use></svg>',
      name: 'devtools',
      tipPosition: 'e'
    }, {
      name: 'br'
    }, {
      icon: '<svg><use xlink:href="#vditor-icon-more"></use></svg>',
      name: 'more',
      tipPosition: 'e'
    }]

  /* 文章分类 */
  private categoryValue = []
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

  private formData = {
    articleTitle: '',
    articleCategory: '',
    articleContent: ''
  }

  private rules = {
    articleTitle: []
  }

  private calculateEditorHeight() {
    return this.$el.clientHeight - this.articleWritingHeaderHeight
  }

  mounted() {
    this.calculateEditorHeight()
    this.contentEditor = new Vditor('vditor', {
      minHeight: this.calculateEditorHeight(),
      toolbar: this.toolbarItem,
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
