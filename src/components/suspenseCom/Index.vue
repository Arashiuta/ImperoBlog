<template>
    <!-- 大封面 -->
    <!-- <div class="cover">
        <div class="font">
            <div class="welcome">
                <div class="textInfo">
                    <span>{{ res.hitokoto }}</span>
                    <span>——{{ res.from }}</span>
                </div>
            </div>

            <div class="more" @click="goMore">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangxia"></use>
                </svg>
            </div>
        </div>
    </div> -->
    <div>
        <Suspense>
            <template #default>
                <!-- 下面的其他内容 -->
                <IndexArticle></IndexArticle>
            </template>

            <!-- 加载完成前的载入动画 -->
            <template #fallback>
                <div class="window">
                    <Loading class="winLoad"></Loading>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import Loading from "@/components/loading/loading.vue";
// import { onMounted } from "vue";
// import { gsap } from "gsap";
// import useAxios from "../../hooks/axios/axios";
//Suspense要异步引入组件
const IndexArticle = defineAsyncComponent(() => import('@/components/coverDown/IndexArticle.vue'))

// onMounted(async () => {
//     xiangxia()
// })
// 小动画
// const xiangxia = () => {
//     gsap.to(".more", { y: 8, duration: 1 }).yoyo(true).repeat(-1);
// }

// 点击滚动到cover下的位置
// const goMore = () => {
//     //获取cover的高度
//     const coverHeight = document.querySelector('.cover')?.clientHeight
//     window.scrollTo({
//         top: coverHeight,
//         // behavior: "smooth"为平滑滚动
//         behavior: "smooth"
//     })
// }

// 加载时请求一言句子的内容
// const { data: res } = await useAxios.get("https://v1.hitokoto.cn/")

</script>

<style scoped lang="less">
@fontColor: #fff;

// .cover {
//     width: 100vw;
//     height: 100vh;
//     position: relative;

//     .font {
//         width: 80%;
//         height: 100%;
//         position: absolute;
//         top: 0;
//         left: 50%;
//         transform: translateX(-50%);
//         display: flex;
//         flex-direction: column;
//         align-items: center;
//         justify-content: space-between;


//         .welcome {
//             width: 70%;
//             min-height: 5rem;
//             margin-top: 24rem;
//             padding: 1rem 3rem;
//             border-radius: 1.5rem;
//             color: @fontColor;
//             text-shadow: .1rem .1rem .1rem rgb(105, 105, 105);

//             .textInfo {
//                 max-width: 100%;
//                 overflow-wrap: break-word;
//                 display: flex;
//                 align-items: center;
//                 flex-direction: column;

//                 :nth-child(1) {
//                     font-size: 2.4rem;
//                 }

//                 :nth-child(2) {
//                     font-size: 1.8rem;
//                     align-self: flex-end;
//                 }
//             }
//         }



//         .more {
//             cursor: pointer;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             margin-bottom: 2%;
//             font-size: 3rem;
//             color: @fontColor;
//             opacity: .5;

//             &:nth-child(2) {
//                 margin-top: 5%;
//             }
//         }
//     }
// }


// @media screen and (max-width: 800px) {
//     .cover {
//         display: none;
//     }
// }

.window {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>