<template>
  <div style="background: #fff" v-show="show & loaded">
    <Transition name="fadeIn" enter-active-class="animated fadeIn">
      <div class="guide-slides" v-if="loaded && show">
        <div class="skip-btn" @click="skip" v-if="showSkip">跳过</div>
        <Swiper ref="swiper" :options="swiperOption" @slideChange="slideChange">
          <SwiperSlide>
            <img :src="require('./images/slide01.png')" alt="guide">
          </SwiperSlide>
          <SwiperSlide>
            <img :src="require('./images/slide02.png')" alt="guide">
          </SwiperSlide>
          <SwiperSlide>
            <img :src="require('./images/slide03.png')" alt="guide">
          </SwiperSlide>
          <SwiperSlide>
            <img :src="require('./images/slide04.png')" alt="guide">
          </SwiperSlide>
          <SwiperSlide>
            <img :src="require('./images/slide05.png')" alt="guide">
          </SwiperSlide>
          <SwiperSlide>
            <img :src="require('./images/slide06.png')" alt="guide">
          </SwiperSlide>
          <SwiperSlide>
            <div class="skip-btn2" @click="skip">欢迎进入移动灯塔</div>
            <img :src="require('./images/slide07.png')" alt="guide">
          </SwiperSlide>
          <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
      </div>
    </Transition>
  </div>
</template>

<script>

import {Swiper as SwiperClass, Pagination} from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

SwiperClass.use([Pagination])
const {Swiper, SwiperSlide} = getAwesomeSwiper(SwiperClass)


const load_img = (url) => {
  return new Promise((resolve) => {
    const img = new Image(url)
    img.onload = () => {
      resolve()
    }
    img.src = url
  })
}

export default {
  name: "GuideSlides",
  components: {Swiper, SwiperSlide},
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loaded: false,
      showSkip: true,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
        },
      }
    }
  },
  created() {
    Promise.allSettled([load_img(require('./images/slide01.png'))]).then(() => {
      this.loaded = true
    })
    this.recordLog('guide_slides__v001__' + '0')
  },
  methods: {
    slideChange(swiper) {
      this.recordLog('guide_slides__v001__' + swiper.realIndex)
      this.showSkip = swiper.realIndex !== swiper.slides.length - 1;
    },
    skip() {
      this.saveMark()
      this.$emit('update:show', false)
      this.$EventBus.$emit("entry_f", {
        Loading: true,
      });
    },
    saveMark() {
      this.$axios.get('/api/admin/common/mark/insert', {
        params: {
          markNo: 'guide_slides__v001', // 此标记为固定值 v
        },
        failedTip: false
      })
    },
    recordLog(key) {
      this.$axios('/api/admin/common/log/save', {
        params: {
          logLevel: 'Info',
          logSource: 'ReleaseVersion',
          logType: 'Web',
          description: '访问',
          extAssociationKey: key,
          // methodName: '',
          qualifiedName: '定推'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-pagination {
  --swiper-theme-color: #23b0a8;
}

.guide-slides {
  position: relative;
  background: #fff;

  .skip-btn {
    position: absolute;
    color: #fff;
    z-index: 999;
    letter-spacing: .3em;
    text-indent: .3em;
    top: 2%;
    right: .8em;
    background: rgba(0, 0, 0, .1);
    border: 1px solid #fff;
    border-radius: 20px;
    padding: 0 .8em;
    text-align: center;
    line-height: 2;

    &:active {
      background: rgba(0, 0, 0, .3);
    }
  }

  .skip-btn2 {
    position: absolute;
    z-index: 999;
    color: #23b0a8;
    bottom: 6%;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    border: 2px solid #23b0a8;
    line-height: 2.2;
    border-radius: 20px;
    padding: 0 1.5em;
  }

  /deep/ .swiper-slide {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-device-height: 736px) {
  .guide-slides /deep/ .swiper-slide img {
    height: 100%;
  }
}

</style>

<style lang="scss">
.fadeBounceIn {
  animation-duration: .5s;
  animation-name: fadeBounceIn
}

@keyframes fadeBounceIn {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0)
  }

  to {
    opacity: 1;
    transform: translateZ(0)
  }
}


.fadeIn {
  animation-duration: 1.5s;
  animation-name: fadeIn
}

@keyframes fadeIn {
  0% {
    opacity: 0.1;
  }

  100% {
    opacity: 1;
  }
}
</style>
