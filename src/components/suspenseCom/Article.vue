<template>
    <div class="contaier">
        <div class="filter">
            <div class="title">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-16"></use>
                </svg>
                <div class="titleChild">
                    <span>文章列表</span>
                    <span>ARTICLE LIST</span>
                </div>
            </div>
            <div class="funnel">
                <div>
                    <div>筛选 TAGS </div>
                    <div class="funnel-info-maring">
                        <span class="labelTag no-choose" @click="chooseTag(tag.content)" v-for="tag in tags"
                            :key="tag.id">{{
                            tag.content
                            }}</span>
                    </div>
                </div>
                <div>
                    <div>已选 CHOOSE </div>
                    <div class="funnel-info-maring">
                        <el-tag class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)"
                            type="success" v-for="tag in filterTags.filterTag" :key="tag">{{
                            tag
                            }}
                        </el-tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="list" :key="pages.nowPage">
            <ArticleBox v-for="item in showArticles.showArticle" :key="item.id" class="articleBox" :info="item">
            </ArticleBox>
        </div>
        <div class="page">
            <div class="allPage">共有{{showArticle.length}}条数据</div>
            <el-pagination background layout="prev, pager, next" :page-count="pages.page.length"
                :current-page="pages.nowPage" @update:current-page="updataPage" />
        </div>
    </div>

</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import useAxios from "../../hooks/axios/axios";
import { useRoute } from 'vue-router'
import { useStore } from "../../store/count";
import ArticleBox from '@/components/articleBox/articleBox.vue'

const pinia = useStore()
const route = useRoute()
//文章列表
const { data: res } = await useAxios.get('./getarticle')
const articles = res.data

const showArticle = articles.reverse()


//应该有的页数
type Page = {
    page: Array<number>
    pageNums: number
    nowPage: number
}
let pages = reactive<Page>({
    page: [],
    pageNums: articles.length,
    nowPage: 1
})

// 当前展示页
//不能使用let来定义reactive，这样在重新赋值的时候内存地址会变，无法实现响应式
const showArticles = reactive({
    showArticle: showArticle.slice(12 * (pages.nowPage - 1), 12 * (pages.nowPage - 1) + 12)
})
watchEffect(() => {
    //先清空一下数组，再计算页数
    pages.page = []
    if (pages.pageNums % 12 === 0) {
        for (let i = 0; i < Math.floor(pages.pageNums / 12); i++) {
            pages.page.push(i + 1)
        }
    } else {
        for (let i = 0; i < Math.floor(pages.pageNums / 12) + 1; i++) {
            pages.page.push(i + 1)
        }
    }

})
const updataPage = (val: number) => {
    pages.nowPage = val
}


type Article = {
    id: number
    title: string
    author: string
    tag: Array<string>
    cover: string
    time: string
    oneSentence: string
    content: string
}

//所有的tag
//请求所有标签
const { data: allTag } = await useAxios.get('/gettags')
const tags = allTag.data


//选中的筛选条件tags
type Tag = {
    filterTag: Array<string>
}
//选中标签的数组
const filterTags = reactive<Tag>({
    filterTag: []
})

//如果是从首页选择标签快速跳转进来，接收一个选择的筛选标签添加到筛选列表中
const quickTag = route.query.quickTag?.toString()
//如果传参了，就加进去，没穿就不用管
if (quickTag) {
    filterTags.filterTag.push(quickTag)
}

//选中筛选标签有变化就要重新过滤文章，展示符合条件的
watchEffect(() => {
    showArticles.showArticle = showArticle.filter((item: Article) => {
        return filterTags.filterTag.every(val => item.tag.includes(val))
    })
    pages.pageNums = showArticles.showArticle.length
    showArticles.showArticle = showArticles.showArticle.slice(12 * (pages.nowPage - 1), 12 * (pages.nowPage - 1) + 12)
})


//筛选标签被删掉
const handleClose = (tagName: string) => {
    filterTags.filterTag.splice(filterTags.filterTag.indexOf(tagName), 1)
}

//选中筛选tag
const chooseTag = (tagName: string) => {
    //如果已经选中了则不要重复选中
    if (filterTags.filterTag.indexOf(tagName) !== -1) {
        return
    } else {
        filterTags.filterTag.push(tagName)
    }
}

</script>

<style scoped lang="less">
.funnel-info-maring {
    margin-left: 2rem;

    :deep(.mx-1) {
        padding: .6rem;
        margin: 0 .3rem;
    }
}

.no-choose {
    color: black;
    background-color: #fff;
    border: .1rem solid black;
    cursor: pointer;
    transition: all .1s;

    &:hover {
        box-shadow: .1rem .1rem .2rem var(--box-shadow);
        transform: translateY(-0.1rem);
    }
}

.contaier {
    width: 80%;
    box-sizing: border-box;
    margin: 0 auto;
    margin-top: 4.6rem;
    border: .1rem solid black;
    box-shadow: .1rem .1rem .5rem var(--gray-sahdow);
    border-radius: .5rem;
    padding: 1.5rem;
    padding-top: 3rem;
    background-color: var(--backgeound-color);

    .filter {
        padding-bottom: 2rem;

        .title {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 4rem;
            padding: 2rem;
            background-color: #fff;
            border-radius: 1rem;

            .titleChild {
                margin-left: 1rem;
                font-size: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
        }

        .funnel {
            font-size: 2rem;
            margin-top: 2rem;
            background-color: #fff;
            border-radius: 1rem;
            padding: 1rem 2rem;

            >div {
                padding: 1rem 0;
                display: flex;
                align-items: center;
            }

        }

    }

    .list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 1rem;
        justify-content: center;
        justify-items: center;

        .articleBox {
            width: 100%;
            margin: 1rem;
        }
    }

    .page {
        .allPage {
            font-size: 1.4rem;
            margin: .5rem;
        }
    }
}

@media screen and (max-width:1250px) {
    .contaier {
        .list {
            grid-template-columns: repeat(2, 1fr);
        }
    }

}

@media screen and (max-width:800px) {
    .contaier {
        width: 100%;

        .list {
            grid-template-columns: repeat(1, 1fr);
        }
    }

}
</style>