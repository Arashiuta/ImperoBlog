<template>
    <div class="middle">
        <div class="leftFace">
            <div class="title">
                <div class="recently">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-zuijin"></use>
                    </svg>
                    <div>最近更新</div>
                </div>
                <!-- <div @click="goArticle" class="watchMore">查看更多</div> -->
                <BtnLearnMore class="watchMore" @click="goArticle"></BtnLearnMore>
            </div>
            <!-- 置顶文章盒子 -->
            <div>
                <Suspense>
                    <template #default>
                        <topArticleBox class="itemBox" :info="topArticleInfo"></topArticleBox>
                    </template>

                    <!-- 加载完成前的载入动画 -->
                    <template #fallback>
                        <div class="window">
                            <Loading class="winLoad"></Loading>
                        </div>
                    </template>
                </Suspense>
            </div>
            <!-- 首页文章盒子 -->
            <div class="articleBoxes">
                <!-- 使用了异步加载并且加上了加载动画的文章盒子 -->
                <Suspense v-for="item in showList" :key="item.id">
                    <template #default>
                        <ArticleBox :info="item" class="itemBox"></ArticleBox>
                    </template>

                    <!-- 加载完成前的载入动画 -->
                    <template #fallback>
                        <div class="window">
                            <Loading class="winLoad"></Loading>
                        </div>
                    </template>
                </Suspense>
            </div>
        </div>

        <Suspense>
            <template #default>
                <ArticleRight></ArticleRight>
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
import useAxios from "../../hooks/axios/axios";
import { useRouter } from "vue-router";
import Loading from "@/components/loading/loading2.vue";
import BtnLearnMore from "@/components/UIVerse/btn-learnMore.vue";
const ArticleBox = defineAsyncComponent(() => import('@/components/articleBox/articleBox.vue'))
const ArticleRight = defineAsyncComponent(() => import('@/components/coverDown/ArticleRight.vue'))
const topArticleBox = defineAsyncComponent(() => import('@/components/articleBox/topArticleBox.vue'))

const router = useRouter()

//请求文章列表
const { data: res } = await useAxios.get('/getarticle')
const list = res.data

//新文章在上，所以要先反过来
const reverseList = list.reverse()
const showList = reverseList.slice(0, 4) //限制主页显示的文章个数

//查看更多文章
const goArticle = () => {
    router.push('/article')
}

//请求置顶文章信息
const { data: topRes } = await useAxios.get("/gettoparticle")
const topArticleInfo = topRes.info[0]

</script>


<style scoped lang="less">
.middle {
    margin: 1% auto;
    width: 80%;
    padding: 2%;
    border-radius: .5rem;
    display: flex;
    background-color: var(--backgeound-color);

    .leftFace {
        flex: 1;
        border-radius: .2rem;
        padding: 0 .5rem;

        .title {
            height: 3rem;
            padding: 1rem 2rem;
            margin-bottom: .8rem;
            font-weight: 700;
            font-size: 1.7rem;
            box-shadow: 0 .1rem .5rem var(--gray-sahdow);
            border-radius: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;

            .recently {
                display: flex;
                justify-self: center;
                align-items: center;

                .icon {
                    font-size: 2.2rem;
                    margin-right: .3rem;
                }
            }

            .watchMore {
                font-size: 1.1rem;
                // border: .2rem solid rgb(47, 196, 255);
                // padding: .6rem 1.4rem;
                // border-radius: 5rem;
                // font-size: 1.3rem;
                // transition: all .2s;

                // &:hover {
                //     cursor: pointer;
                //     background-color: rgb(54, 181, 255);
                //     font-weight: 500;
                //     color: #fff;
                // }
            }
        }

        .articleBoxes {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 1rem;
            row-gap: 1rem;
            justify-content: center;

            .itemBox {
                width: 100%;
            }
        }

    }



}

@media screen and (max-width: 1200px) {
    .middle {
        width: 90%;

        .leftFace {
            margin-right: 2rem;

            .articleBoxes {
                grid-template-columns: repeat(1, 1fr);
            }
        }
    }
}

@media screen and (max-width: 800px) {
    .middle {
        width: 100%;
        flex-direction: column;
        margin-top: 6.5rem;
    }
}
</style>


