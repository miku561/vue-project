<template>
  <div class="daily">
      <div class="daily-menu">
        <div class="daily-menu-item"
            :class="{ on: type === 'recommend' }"
            @click="handleToRecommend">每日推荐</div>
        <div class="daily-menu-item"
            :class="{ on: type === 'daily' }"
            @click="showThemes = !showThemes">主题日报</div>
        <ul v-show="showThemes">
          <li v-for="item in themes" :key="item.id">
            <a :class="{ on: item.id === themeId && type === 'daily' }"
               @click="handleToTheme(item.id)">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="daily-list" ref="list" @scroll="handleScroll">
        <template v-if="type === 'recommend'">
          <div v-for="list in recommendList" :key="list.id">
            <div class="daily-date">{{ formatDay(list.date) }}</div>
            <Item
                v-for="item in list.stories"
                :data="item"
                :key="item.id"
                @click.native="handleClick(item.id)"></Item>
          </div>
        </template>
        <template v-if="type === 'daily'">
          <Item
              v-for="item in list"
              :data="item"
              :key="item.id"
              @click.native="handleClick(item.id)"></Item>
        </template>
      </div>
      <dailyArticle :id="articleId"></dailyArticle>
  </div>
</template>

<script>
import $ from '../../libs/utils'
import Item from '../Item/Item'
import dailyArticle from '../ArticleDetail/ArticleDetail'
export default {
  components: {
    Item,
    dailyArticle
  },
  data () {
    return {
      themes: [],
      showThemes: false,
      type: 'recommend',
      list: [],
      themeId: 0,
      recommendList: [],
      dailyTime: $.getTodayTime(),
      isLoading: false,
      articleId: 0
    }
  },
  methods: {
    getThemes () {
      $.ajax.get('themes').then(res => {
        this.themes = res.others
      })
    },
    handleToRecommend () {
      this.type = 'recommend'
      this.recommendList = []
      this.dailyTime = $.getTodayTime()
      this.getRecommendList()
    },
    getRecommendList () {
      this.isLoading = true
      const prevDay = $.prevDay(this.dailyTime + 86400000)
      $.ajax.get('news/before/' + prevDay).then(res => {
        if (this.articleId === 0) {
          this.articleId = res.stories[0].id
        }
        this.recommendList.push(res)
        this.isLoading = false
      })
    },
    handleToTheme (id) {
      this.type = 'daily'
      this.themeId = id
      this.list = []
      $.ajax.get('theme/' + id).then(res => {
        this.list = res.stories.filter(item => item.type !== 1)
      })
    },
    formatDay (date) {
      let month = date.substr(4, 2)
      let day = date.substr(6, 2)
      if (month.substr(0, 1) === '0') month = month.substr(1, 1)
      if (day.substr(0, 1) === '0') day = day.substr(1, 1)
      return `${month} 月 ${day} 日`
    },
    handleScroll () {
      const $list = this.$refs.list
      if (this.type === 'daily' || this.isLoading) return
      if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
        this.dailyTime -= 86400000
        this.getRecommendList()
      }
    },
    handleClick (id) {
      this.articleId = id
    }
  },
  watch: {
    showThemes (val) {
      this.getThemes()
    }
  },
  mounted () {
    this.getRecommendList()
  }
}

</script>
<style lang='scss' scoped>
</style>
