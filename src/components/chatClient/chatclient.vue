<template>
    <Teleport to="body">
        <!-- backgroundBorder用来做彩色边框的 -->
        <div class="backgroundBorder">
            <!-- chatbox才是正常的盒子 -->
            <div class="chatBox">
                <!-- 标题 -->
                <div class="title">
                    <span>这里是聊天室标题</span>
                </div>
                <!-- 内容 -->
                <div class="content">
                    <!-- 左侧聊天区域 -->
                    <div class="chat">
                        <!-- 聊天内容 -->
                        <div></div>
                        <!-- 发送消息 -->
                        <div></div>
                    </div>
                    <!-- 右侧在线列表 -->
                    <div class="users">
                        <div>在线列表</div>
                        <div class="userBox">
                            <!-- 头像 -->
                            <div></div>
                            <!-- 昵称 -->
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.backgroundBorder {
    width: 80rem;
    height: 60rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg, #EF33B1 0%, #dfe9f3 35%, #54befc 65%, #F6E6BC 100%);
    border-radius: .5rem;
    z-index: 5;

    .chatBox {
        width: 79rem;
        height: 59rem;
        background-color: #fff;
        display: flex;
        flex-direction: column;

        .title {
            height: 1.6rem;
            background-color: var(--light-gray-blue);
            text-align: center;
        }

        .content {
            // background-color: #48c3d3;
            flex: 1;
            display: flex;

            .chat {
                flex: 1;
            }

            .users {
                width: 16rem;
                // background-color: #801e1e;
                border-left: .2rem solid black;
            }

        }
    }
}
</style>