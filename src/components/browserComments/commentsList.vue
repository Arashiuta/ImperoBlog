<template>
    <CommentBox v-if="ifHaveComments" v-for="item in commentsList.comments" :key="item.id" :item="item"></CommentBox>
    <div v-else class="noComment">
        <span>还没有评论，来写一条吧~</span>
    </div>
    <el-pagination small background layout="prev, pager, next" :total="commentsList.comments.length" class="mt-4" />
</template>

<script setup lang="ts">
import { ref, inject, watchEffect, reactive } from "vue";
import CommentBox from "@/components/browserComments/commentBox.vue";
import { useStore } from "../../store/count";
import useAxios from "../../hooks/axios/axios";

const pinia = useStore()

type Comments = {
    id: number,
    account: string,
    time: string,
    content: string
}
type Inject = {
    id: string,
    comments: Array<Comments>
}

const ifHaveComments = ref(true)   //是否有评论
const commentsInject: Inject = inject('comments')!  //拿到祖组件依赖注入传过来的数据(文章id和评论列表)
const commentsList = reactive(commentsInject)
console.log(commentsList);

if (commentsList.comments.length === 0) {   //如果没有评论
    ifHaveComments.value = false
}

watchEffect(() => {
    if (pinia.articleCommentsAdd) {  //如果评论更新了就重新请求评论列表
        useAxios.get('/getidarticle', {
            params: {
                id: commentsList.id
            }
        }).then(res => {
            commentsList.comments = res.data.data.comments
        })
    }
})
</script>

<style scoped lang="less">
.noComment {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    font-size: 1.4rem;
    color: rgb(168, 168, 168);
}
</style>