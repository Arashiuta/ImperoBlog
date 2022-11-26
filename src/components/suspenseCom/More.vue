<template>
    <div class="container-more">
        <div class="middle">
            <div class="head">
                <div class="hedaImg">
                    <img :src="pinia.apiRoot + myInfo.headImg" alt="headImg">
                </div>
                <h2>{{ myInfo.nickName }}</h2>
                <div>

                </div>
            </div>
            <div class="info">
                <p class="p">首先!关于我的审美，有一说一，太垃圾了</p>
                <p>设计对于我来说实在是太难了，网站的ui设计来来回回缝合了几个其他网站，<span
                        style="text-decoration: line-through">算是勉强能看,</span>总算是做到了取其糟粕去其精华</p>
                <p>太丑了😭</p>
                <h2>关于网站</h2>
                <p>学完vue3做的练习网站，打算维护一段时间试试看，服务器买了不用做什么😋</p>
                <p>服务器使用的阿里云新人打折的那个服务器，小水管<span style="text-decoration: line-through">勉强够用</span>不够用啦</p>
                <p>前端使用vue3 + ts + pinia，打包工具使用vite</p>
                <p>后端使用node + express编写的接口，使用了MongoDB数据库，上传使用formidable插件</p>
                <p>尝试使用了一些库，除了element-plus，试着使用了gasp动画库，md-editor-v3富文本编辑器</p>
                <p>代码放在了github的仓库中 <a href="https://github.com/1209058433/imperoBlog" target="_blank">前端代码仓库</a> <a
                        href="https://github.com/1209058433/ImperoBlog_Api" target="_blank">后端代码仓库</a></p>
                <p>这也是第一次做响应式的页面，css这东西不简单的🤔，写的比较乱</p>
                <h2>关于我</h2>
                <p>我喜欢猫猫!没有猫猫的世界是不完美的,🤗想在页面上放一只猫猫宠物，有时间看看有没有类似的库</p>
                <p>大三财务狗一枚</p>
                <p>不会有人真的喜欢填报表吧，我的评价是不如写bug</p>
            </div>
        </div>
        <Suspense>
            <template #default>
                <Right></Right>
            </template>
            <template #fallback>
                <div class="window">
                    <Loading class="winLoad"></Loading>
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import gsap from 'gsap'
import useAxios from '../../hooks/axios/axios'
import { useStore } from '../../store/count'
import Loading from "@/components/loading/loading2.vue";
const Right = defineAsyncComponent(() => import('@/components/coverDown/ArticleRight.vue'))

const pinia = useStore()

onMounted(() => {
    gsap.from('p', {
        y: 15,
        duration: 0.4
    })
})

//请求自己的信息
const { data: res } = await useAxios.get('/userinfo', {
    params: {
        account: 'admin123'
    }
})
const myInfo = res.data[0]

</script>

<style scoped lang="less">
.container-more {
    width: 70%;
    margin: 5rem auto;
    display: flex;

    .middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        border-radius: .6rem;
        background-color: #fff;
        border-radius: 1rem;

        .head {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: .2rem solid var(--gray-sahdow);
            padding: 2rem 0;

            .hedaImg {
                width: 15rem;
                height: 15rem;
                overflow: hidden;
                border-radius: 50%;

                img {
                    width: 100%;
                }
            }

            h2 {
                font-size: 3rem;
            }
        }

        .info {
            padding: 1rem;

            h2 {
                font-size: 2rem;
                padding: .8rem 0;
                border-bottom: .2rem solid var(--border-line);
            }

            p {
                font-size: 1.4rem;
                padding: .6rem 0;
            }
        }
    }

    .right {
        box-sizing: border-box;
        padding: 1rem;
        border-radius: .5rem;
    }


}

@media only screen and (max-width: 1300px) {
    .container-more {
        width: 100%;
        border: none;
    }
}
</style>