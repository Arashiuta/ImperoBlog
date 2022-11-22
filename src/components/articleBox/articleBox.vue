<template>
    <div class="articleBox" @click="goBrowse(info.id)">
        <div class="cover">
            <img :src="pinia.apiRoot + info.cover" alt="cover" class="coverImg">
            <div class="mask">
                <span v-for="tag in info.tag" :key="tag">#{{ tag }}</span>
            </div>
        </div>
        <div class="coverBottom">
            <div class="title">{{ info.title }}</div>
            <div class="content">
                {{ info.oneSentence }}
            </div>
            <div class="authorInfo">
                <div class="head">
                    <img :src="pinia.apiRoot + authorInfo.headImg" alt="head">
                </div>
                <div class="nickName">{{ authorInfo.nickName }}</div>
                <div class="time">发布于:{{ info.time }}</div>
            </div>
            <div class="interaction">
                <div class="praise">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-31dianzan"></use>
                    </svg>
                    <span>{{ pariseNum }}</span>
                </div>
                <div class="collection">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-shoucang"></use>
                    </svg>
                    <span>{{ collectionNum }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "../../store/count";
import { useRouter } from "vue-router";
import useAxios from '../../hooks/axios/axios';

const router = useRouter()
const pinia = useStore()

type Props = {
    info: any
}

const props = defineProps<Props>()


const pariseNum = props.info.parise.length //点赞数量
const collectionNum = props.info.collections.length


//请求文章作者信息
const { data: res } = await useAxios.get('/userinfo', {
    params: {
        account: props.info.author
    }
})
const authorInfo = res.data[0]


//点击浏览文章
const goBrowse = (id: number) => {
    router.push({
        path: '/articlebrowse',
        query: {
            id: id
        }
    })
}

</script>

<style scoped lang="less">
.articleBox {
    width: 50rem;
    height: 40rem;
    background-color: rgb(170, 229, 247);
    border-radius: 2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: .5rem .5rem 1rem var(--gray-light-sahdow);
    transition: all 0.2s;

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 1rem .1rem var(--special-font-color);
        transform: translateY(-0.4rem);

        .cover {
            transform: scale(1.1);
        }
    }

    .cover {
        width: 100%;
        height: 50%;
        background-color: lightblue;
        position: relative;
        transition: all .3s;

        .coverImg {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .mask {
            width: 100%;
            height: 30%;
            position: absolute;
            bottom: 0;
            left: 0;
            background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255));
            display: flex;
            align-items: flex-end;

            span {
                font-style: italic;
                color: var(--special-font-color);
                font-size: 1.3rem;
                font-weight: 500;
                margin: .5rem;
            }
        }

    }


    .coverBottom {
        width: 100%;
        flex: 1;
        background-color: #fff;
        box-sizing: border-box;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        .title {
            font-size: 2rem;
            font-weight: 700;
        }

        .content {
            width: 100%;
            max-height: 6.5rem;
            overflow: hidden;
            font-size: 1.4rem;
        }

        .authorInfo {
            width: 100%;
            height: 2.5rem;
            display: flex;
            align-items: center;
            font-size: 1.3rem;

            .head {
                width: 2.5rem;
                height: 2.5rem;
                background-color: rgb(156, 202, 255);
                border-radius: 50%;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .nickName {
                margin-left: 1rem;
                margin-right: 1.5rem;
            }

            .time {
                color: var(--font-gray-color);
            }
        }

        .interaction {
            display: flex;
            align-items: center;
            font-size: 1.4rem;

            .collection {
                margin-left: 1rem;
            }
        }
    }
}
</style>
