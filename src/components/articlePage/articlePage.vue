<template>
    <div class="page">
        <div class="dataNum">共{{ allArticles }}条数据</div>
        <div class="turn">
            <div class="goUpOrDown" @click="goUpOrDown(false)">上一页</div>
            <div>
                <ul class="pageIndex">
                    <li v-for="item in pages" :key="item" @click="jumpPage(item)">{{ item }}</li>
                </ul>
            </div>
            <div class="goUpOrDown" @click="goUpOrDown(true)">下一页</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, watchEffect } from "vue";

type Props = {
    pages: Array<number>
    allArticles: number
}
defineProps<Props>()

//编码角度的第0页，页面显示的第一页
//当前页码
type Page = {
    nowPage: number
}
let page = reactive<Page>({
    nowPage: 0
})
//创建emit给父组件传参
const emit = defineEmits(['on-nowPage'])
onMounted(() => {
    watchEffect(() => {
        //页码的编号li们
        const childPageNum = document.querySelector('.pageIndex')?.querySelectorAll('li')!
        for (let i = 0; i < childPageNum.length; i++) {
            childPageNum[i].classList.remove('nowPage')
        }
        childPageNum[page.nowPage].classList.add('nowPage')
        //把当前的页码传给父组件
        emit('on-nowPage', page.nowPage)

    })
})
//上一页或下一页的按钮
const goUpOrDown = (flag: boolean) => {
    const childPageNum = document.querySelector('.pageIndex')?.querySelectorAll('li')!
    if (flag) {
        if (page.nowPage < childPageNum.length - 1) {
            page.nowPage += 1
        } else {
            alert('已经是最后一页了')
        }
    } else {
        if (page.nowPage > 0) {
            page.nowPage -= 1
        } else {
            alert('已经是第一页了')
        }
    }
}

const jumpPage = (val: number) => {
    page.nowPage = val - 1
}


</script>

<style scoped lang="less">
.page {
    padding: 1rem;
    border-radius: 1rem;
    background-color: #fff;

    .dataNum {
        font-size: 1.6rem;
        padding: 1rem;
    }

    .turn {
        display: flex;
        align-items: center;

        .goUpOrDown {
            padding: .4rem;
            border: .1rem solid black;
            border-radius: .3rem;
            transition: all .1s;

            &:hover {
                box-shadow: .15rem .15rem var(--box-shadow);
                cursor: pointer;
                transform: translateY(-0.1rem);
            }
        }

        .pageIndex {
            padding: 0 .5rem;
            display: flex;
            align-items: center;

            li {
                padding: .2rem .6rem;
                font-size: 1.1rem;
                margin: 0 .2rem;
                border: .2rem solid var(--border-line);
                cursor: pointer;
                border-radius: .5rem;
            }

            //页码被选中后加个样式
            .nowPage {
                background-color: var(--special-font-color);
                color: #fff;
            }
        }
    }

}
</style>