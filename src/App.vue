<template>
  <!-- 导航栏 -->
  <Nav></Nav>
  <router-view></router-view>
  <MiniBox @click="loadChatClient"></MiniBox>
  <div class="chatMask" v-if="openChat"></div>
  <Chatclient v-if="openChat"></Chatclient>
  <Foot></Foot>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Nav from "@/components/Nav/Nav.vue";
import { useStore } from './store/count'
import Foot from '@/components/foot/foot.vue'
import MiniBox from '@/components/chatClient/miniBox.vue'
import Chatclient from '@/components/chatClient/chatclient.vue'
import { socket } from './hooks/socket/socket'
const pinia = useStore()

const userStorage = localStorage.getItem('userAccount')
if (userStorage) {  //如果用户是登录状态
  socket.connect()  //连接socket服务器,登陆者账号也被发送到后端
}


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

//网页彩蛋
const easterKey = ['w', 'z', 'f'];  //彩蛋秘籍
let easterArr = new Array<string>;  //存放按键记录
window.addEventListener('keyup', key => {
  if (easterKey.includes(key.key)) {  //按键属于目标字母
    easterArr.push(key.key)  //存放
    if (easterArr.length === easterKey.length) {  //字母到目标秘籍长度
      let str = easterArr.join("") // 转为字符串
      if (str === 'wzf') {
        //召唤彩蛋！
        alert("我超，丰😨");
        easterArr = [] //清空
      }
    }
  } else {
    easterArr = []  //清空
  }
})

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

.default-theme {

  img {
    width: 20rem;
  }
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