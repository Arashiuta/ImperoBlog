<template>
  <div>
    <!-- 导航栏 -->
    <Nav></Nav>
    <router-view></router-view>
    <!-- <BtnBox @click="loadChatClient"></BtnBox>
    <div class="chatMask" v-if="openChat"></div>
    <Chatclient v-if="openChat"></Chatclient> -->
    <Foot></Foot>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Nav from "@/components/Nav/Nav.vue";
import { useStore } from './store/count'
import Foot from '@/components/foot/foot.vue'

const pinia = useStore()

onMounted(() => {
  const bodyWidth = ref(document.querySelector('body')?.clientWidth)
  pinia.setBodyWidth(bodyWidth.value!)

  window.onresize = () => {
    return (() => {
      bodyWidth.value = document.querySelector('body')?.clientWidth
      pinia.setBodyWidth(bodyWidth.value!)
    })()
  }
})

//弹出聊天室
let openChat = ref(false)
const loadChatClient = () => {
  openChat.value = !openChat.value
}

//随机图片背景（已弃用）
//这个时候使用封装过的useAxios会报错pinia未安装，所以使用未封装的axios发送请求
// 不过可以使用pinia的baseurl，并没有多出一个步骤来，没有不良影响
// axios.get(`${pinia.apiRoot}/api/getcover`).then((res) => {
//   const body = document.querySelector('body') as HTMLElement
//   body.style.backgroundImage = `url(${pinia.apiRoot + res.data.coverUrl})`
// })

</script>

<style lang="less">
@font-face {
  font-family: "思源黑体 Normal";
  font-weight: 350;
  src: url("@/font-family/YkF40zSSGGwEVPSKgCFB7.woff2") format("woff2"),
    url("@/font-family/YkF40zSSGGwEVPSKgCFB7.woff") format("woff");
  font-display: auto;
}

body,
html,
#app {
  font-size: 13px;
  font-family: '思源黑体 Normal', 'Microsoft YaHei', '黑体';
  // background-color: var(--html-background-color);
  // background-size: cover;
  // background-attachment: fixed;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #ffee03 100%);
  background-image: linear-gradient(to top, #FFE6FA 65%, #2580B3 100%);
  // background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
}


* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

button {
  border: none;
  outline: none;
}

.default-theme p .figure img {
  // p .figure {
  //   padding: 0;
  //   border: none;
  // }
  display: inline-block;
  width: 20rem;
  margin: 0;
  border: none;
}

.chatMask {
  width: 100%;
  height: 100%;
  background-color: rgba(61, 61, 61, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}

//标签tag的通用样式
.labelTag {
  display: inline-block;
  font-size: 1.2rem;
  background-color: var(--light-gray-blue);
  color: #000;
  margin: .2rem;
  padding: .3rem 1rem;
  border-radius: .7rem;
  cursor: pointer;
}

//弹出的消息框通用样式
.el-dialog {
  width: 50rem;
}

@media only screen and (max-width: 800px) {

  body,
  html,
  #app {
    font-size: 10px;
    overflow-x: hidden;
  }

  .el-dialog {
    width: 80%;
  }

}

//阿里巴巴图标库必需的css
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

//滚动条样式
::-webkit-scrollbar {
  width: .5rem;
  height: .5rem;
  background: rgba(255, 255, 255, 0.6);
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  background-color: rgb(218, 218, 218);
  transition: all .2s;
  border-radius: .5rem;

  &:hover {
    background-color: rgb(172, 172, 172);
  }
}
</style>