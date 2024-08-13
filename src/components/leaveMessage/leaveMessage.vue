<template>
  <div class="messageBox" ref="container">
    <div class="headImg">
      <div class="mesageHead" @click="goToPersonalCenter">
        <img :src="info.headImg" alt="head" />
      </div>
    </div>
    <div class="messageInfo">
      <div class="messageName">
        <span>{{ info.nickName }}</span>
        <div class="brand" v-if="root">咕咕</div>
      </div>
      <div class="messageContent">
        {{ item.content }}
      </div>
      <div class="messageTime">{{ item.time }}</div>
    </div>
    <div class="delMessage">
      <span @click="delMessage">删除</span>
    </div>
    <!-- 确定是否删除的弹窗 -->
    <el-dialog v-model="ifDelMessage" title="Tips" width="20%">
      <span>确定要删除吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="ifDelMessage = false">取消</el-button>
          <el-button type="primary" @click="delMessageY(item.id)"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { MessageApi, UserApi } from "@/api/index";
import { useStore } from "@/store/count";
import { ElMessage } from "element-plus";
import { goToPersonalCenterHook } from "@/hooks/goToPersonalCenter/goToPersonalCenter";

const pinia = useStore();
const root = ref(false);
const ifDelMessage = ref(false);

type Message = {
  id: number;
  account: string;
  time: string;
  content: string;
};

type Props = {
  item: Message;
};
const props = defineProps<Props>();

//请求此条留言对应account的信息
const res = await UserApi.getUserInfo(props.item.account);
const info = res.data;
if (info.root === true) {
  //是否显示狗牌
  root.value = true;
}

//删除留言  (看登录的用户是否拥有root权限)
const delMessage = () => {
  const session = localStorage.getItem("userAccount");
  if (session) {
    ifDelMessage.value = true;
  } else {
    ElMessage.error("没有登录，不可操作");
  }
};

const delMessageY = async (id: number) => {
  const session = localStorage.getItem("userAccount");
  if (session) {
    const sessionInfo = JSON.parse(window.atob(session));
    if (sessionInfo.root === true) {
      //管理员权限，直接删除
      const res = await MessageApi.delMessage(id);
      if (res.status === 0) {
        ElMessage({
          message: "删除成功",
          type: "success",
        });
        pinia.ifDelMessage += 1;
      } else {
        alert("删除失败");
      }
    } else {
      //判断是否是自己发的留言，是自己的才可以删除
      const res = await MessageApi.getIdMessage(id);
      const getIdMessage = res.data;
      if (sessionInfo.account === getIdMessage.account) {
        //留言是自己写的
        //可以删除这个留言
        const res = await MessageApi.delMessage(id);
        if (res.status === 0) {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
          pinia.ifDelMessage += 1;
        } else {
          alert("删除失败");
        }
      } else {
        ElMessage.error("只能删除自己写的留言");
      }
    }
  } else {
    ElMessage.error("没有登录，不可操作");
  }
};

const goToPersonalCenter = () => {
  goToPersonalCenterHook(props.item.account);
};

const container = ref();
onMounted(() => {
  container.value.classList.add("enterAni");
});
</script>

<style scoped lang="less">
.messageBox {
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-top: 1rem;
  background-color: var(--light-gray-blue);
  border-radius: 1rem;
  padding: 0 1rem;
  box-sizing: border-box;
  transition: all 0.3s;

  .delMessage {
    display: none;
    font-size: 1.4rem;
    color: var(--special-font-color);
    cursor: pointer;
  }

  &:hover {
    background-color: rgb(245, 245, 245);

    .delMessage {
      display: block;
    }
  }

  .headImg {
    display: flex;
    justify-content: center;
    align-items: center;

    .mesageHead {
      width: 5rem;
      height: 5rem;
      background-color: aquamarine;
      border-radius: 50%;
      margin-right: 1rem;
      overflow: hidden;
      transition: all 0.5s;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      &:hover {
        transform: rotateZ(360deg);
        cursor: pointer;
      }
    }
  }

  .messageInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 1rem 0;

    .messageName {
      font-size: 1.4rem;
      color: rgb(46, 46, 46);
      font-weight: 600;
      display: flex;

      .brand {
        font-size: 1.1rem;
        width: 3rem;
        height: 1.5rem;
        color: var(--white-font-color);
        background-color: rgb(101, 183, 250);
        border-radius: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        font-weight: 400;
      }
    }

    .messageContent {
      padding: 0.5rem 0;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .messageTime {
      color: rgb(126, 126, 126);
      font-size: 1.2rem;
    }
  }
}

.enterAni {
  animation: identifier 0.5s ease;
}

@keyframes identifier {
  0% {
    transform: translateX(-1000px) scale(0);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}
</style>
