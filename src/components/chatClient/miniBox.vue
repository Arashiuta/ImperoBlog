<template>
    <div class="chatClientMiniBox-container">
        <button class="btn"> 聊天室</button>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.chatClientMiniBox-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 5;

    .btn {
        padding: 1.1em 2em;
        background: none;
        border: 2px solid #fff;
        font-size: 15px;
        color: #131313;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.3s;
        border-radius: 12px;
        background-color: #ecd448;
        font-weight: bolder;
        box-shadow: 0 2px 0 2px #000;
    }

    .btn:before {
        content: "";
        position: absolute;
        width: 100px;
        height: 120%;
        background-color: #ff6700;
        top: 50%;
        transform: skewX(30deg) translate(-150%, -50%);
        transition: all 0.5s;
    }

    .btn:hover {
        background-color: #4cc9f0;
        color: #fff;
        box-shadow: 0 2px 0 2px #0d3b66;
    }

    .btn:hover::before {
        transform: skewX(30deg) translate(150%, -50%);
        transition-delay: 0.1s;
    }

    .btn:active {
        transform: scale(0.9);
    }
}
</style>