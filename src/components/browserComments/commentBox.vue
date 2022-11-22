<template>
    <div>
        123
        <!-- 头像 -->
        <div></div>
        <!-- 内容 -->
        <div>
            <!-- 昵称 -->
            <div></div>
            <!-- 内容 -->
            <div></div>
            <!-- 时间 -->
            <div></div>
        </div>
    </div>
</template>

<script setup lang="ts">

type Comments = {
    id: number,
    account: string,
    time: string,
    content: string
}
type Props = {
    item: Comments
}
const props = defineProps<Props>()
console.log(props.item);


</script>

<style scoped lang="less">

</style>