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
                <!-- 随便写什么 -->
                <p>相邀一个 黄昏晚风</p>
                <p>弄堂青葱 正落幕中</p>
                <p>鸽过芦丛 划破天空</p>
                <p>岁月峥嵘 四季鱼虫</p>
                <p>褪去懵懂 走过朦胧</p>
                <p>繁华怂恿 去看星空</p>
                <p>看鹊桥中 情有独钟</p>
                <p>誓言庄重 刹那心动</p>
                <p>划舟过洲 戏水小童</p>
                <p>涟漪淙淙 云淡意浓</p>
                <p>山水一重 星子坠梦</p>
                <p>点点花灯 合手祈愿</p>
                <p>愿君颜悦 常健常见</p>
                <p>共赏婵娟 放灯岸边</p>
                <p>戏水涓涓 也如初见</p>
                <p>笑闹间 谁正相恋相枕藉 正待明天</p>
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
import useAxios from '@/hooks/axios/axios'
import { useStore } from '@/store/count'
import Loading from "@/components/loading/loading2.vue";
const Right = defineAsyncComponent(() => import('@/components/rightToolsBox/ArticleRight.vue'))

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
    margin: 1rem auto;
    display: flex;

    .middle {
        flex: 1;
        display: flex;
        flex-direction: column;
        border-radius: .6rem;
        background-color: #fff;
        border-radius: 1rem;
        margin-right: 1rem;

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