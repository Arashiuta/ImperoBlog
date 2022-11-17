<template>
  <!-- 导航栏 -->
  <Nav></Nav>
  <router-view></router-view>
  <Foot></Foot>

</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Nav from "@/components/Nav/Nav.vue";
import { useStore } from './store/count'
import Foot from '@/components/foot/foot.vue'
import axios from 'axios';
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


//这个时候使用封装过的useAxios会报错pinia未安装，所以使用未封装的axios发送请求
// 不过可以使用pinia的baseurl，并没有多出一个步骤来，没有不良影响
axios.get(`${pinia.apiRoot}/api/getcover`).then((res) => {
  const body = document.querySelector('body') as HTMLElement
  body.style.backgroundImage = `url(${pinia.apiRoot + res.data.coverUrl})`
})
</script>

<style lang="less">
@font-face {
  font-family: "思源黑体 Normal";
  font-weight: 350;
  src: url("@/font-family/YkF40zSSGGwEVPSKgCFB7.woff2") format("woff2"),
    url("@/font-family/YkF40zSSGGwEVPSKgCFB7.woff") format("woff");
  font-display: swap;
}

body,
html,
#app {
  font-size: 14px;
  font-family: '思源黑体 Normal';
  background-color: var(--html-background-color);
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
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




//标签tag的通用样式
.labelTag {
  display: inline-block;
  font-size: 1.3rem;
  background-color: rgb(0, 162, 184);
  color: #fff;
  margin: .2rem;
  padding: .5rem 1rem;
  border-radius: .5rem;
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
  background-color: rgba(73, 90, 156);
  transition: all .2s;
  border-radius: .5rem;

  &:hover {
    background-color: rgba(104, 164, 255, 0.7);
  }
}
</style>