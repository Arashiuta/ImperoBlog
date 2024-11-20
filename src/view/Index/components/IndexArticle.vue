<template>
  <div class="middle">
    <div class="leftFace">
      <!-- 置顶文章盒子 -->
      <div>
        <Suspense>
          <template #default>
            <topArticleBox
              class="itemBox"
              :info="topArticleInfo"
            ></topArticleBox>
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

    <div class="articleRight">
      <ArticleRight></ArticleRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted } from "vue";
import { ArticleApi } from "@/api/index";
import { useRouter } from "vue-router";
import Loading from "@/components/loading/loading2.vue";
import ArticleRight from "@/components/rightToolsBox/ArticleRight.vue";
import axios from "axios";
const ArticleBox = defineAsyncComponent(
  () => import("@/components/utils/articleBox.vue")
);
const topArticleBox = defineAsyncComponent(
  () => import("@/view/Index/components/topArticleBox.vue")
);

const router = useRouter();
//请求文章列表
const res = await ArticleApi.getArticlList();
const list = res.data;

//新文章在上，所以要先反过来
const reverseList = list.reverse();
const showList = reverseList.slice(0, 4); //限制主页显示的文章个数

//请求置顶文章信息
const topRes = await ArticleApi.getTopArticle();
const topArticleInfo = topRes.data;

onMounted(() => {});
</script>

<style scoped lang="less">
.middle {
  margin: 0 auto;
  width: 70%;
  border-radius: 0.5rem;
  display: flex;
  // background-color: var(--backgeound-color);

  .leftFace {
    flex: 1;
    border-radius: 0.2rem;
    padding: 0 0.5rem;

    .articleBoxes {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
      row-gap: 1rem;
      justify-content: center;

      .itemBox {
        width: 100%;
        height: 40rem;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 1rem;
    background-color: #ffffff;
    min-height: 5rem;
    border-radius: 0.8rem;
    color: var(--special-font-color);
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 1400px) {
  .middle {
    width: 90%;

    .leftFace {
      .articleBoxes {
        grid-template-columns: repeat(1, 1fr);
      }
    }

    .articleRight {
      display: block;
    }
  }
}

@media screen and (max-width: 800px) {
  .middle {
    width: 100%;

    .articleRight {
      display: none;
    }
  }
}
</style>
