<template>
    <div class="nav" v-show="media">
        <div class="navList">
            <ul>
                <div class="logoImg" @click="clickLogo">
                    <img src="@/imgs/logo.png" alt="Impero's Blog">
                </div>
                <li>
                    <router-link to="/index">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouye1"></use>
                        </svg>
                        <span>首页</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/article">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wenzhang1"></use>
                        </svg>
                        <span>文章</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/archive">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-rili"></use>
                        </svg>
                        <span>留言</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/write">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-24"></use>
                        </svg>
                        <span>写文</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/chat', query: { name: '默认房间' } }">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-liaotian"></use>
                        </svg>
                        <span>聊天室</span>
                    </router-link>
                </li>
                <li>
                    <router-link to="/more">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gengduo4"></use>
                        </svg>
                        <span>更多</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <SearchInput :clearIpt="true">
            <template #submitBtn>
                <p style="font-size: 1.2rem; font-weight: 700; padding: .5rem;">></p>
            </template>
        </SearchInput>
        <div class="navRight">
            <div class="login" @click="login" v-if="ifLog">登录/注册</div>
            <NavUserInfo class="welcome" v-else></NavUserInfo>
        </div>
    </div>

    <!-- v-else -->
    <div v-show="media2" class="media2">
        <div class="moreMediaNav">
            <p v-if="ifLog">Impero's Blog</p>
            <NavUserInfo class="welcome" v-else></NavUserInfo>
            <svg class="icon" aria-hidden="true" @click="drawer = true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
        <el-drawer v-model="drawer" title="快捷导航" direction="ttb" size="50%">
            <div class="openDrawer">
                <div class="drawerBox">
                    <router-link to="/index">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shouye"></use>
                        </svg>
                        <span>首页</span>
                    </router-link>
                </div>
                <div class="drawerBox">
                    <router-link to="/article">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wenzhang"></use>
                        </svg>
                        <span>文章</span>
                    </router-link>
                </div>
                <div class="drawerBox">
                    <router-link to="/archive">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-rili2"></use>
                        </svg>
                        <span>留言</span>
                    </router-link>
                </div>
                <div class="drawerBox">
                    <router-link to="/write">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-shuxie"></use>
                        </svg>
                        <span>写文</span>
                    </router-link>
                </div>
                <div class="drawerBox">
                    <router-link to="/more">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gengduo1"></use>
                        </svg>
                        <span>更多</span>
                    </router-link>
                </div>
                <div class="drawerBox" v-if="ifLog">
                    <router-link to="/login">
                        <span>登录/注册</span>
                    </router-link>
                </div>
                <div class="drawerBox" v-else>
                    <router-link to="/personalcenter">
                        <span>个人中心</span>
                    </router-link>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineAsyncComponent } from 'vue'
import { useStore } from '../../store/count'
import { useRouter } from 'vue-router'
import SearchInput from '@/components/searchCom/searchInput.vue'
const NavUserInfo = defineAsyncComponent(() => import('@/components/userInfo/navUserInfo.vue')) //要在组件里面使用useAxios要异步引入组件
const router = useRouter()
const pinia = useStore()

const media = ref(true)  //根据页面响应使用哪个样式的标题栏
const media2 = ref(false)

//登录
const ifLog = ref(true)  //当它是false时是已登录
const login = () => {
    router.push('/login')
}

watchEffect(async () => {
    if (pinia.bodyWidth < 1050) {
        media.value = false
        media2.value = true
    } else {
        media.value = true
        media2.value = false
    }

    //登录了!修改状态
    if (pinia.sessionInfo) {
        ifLog.value = false
    } else {
        ifLog.value = true
    }
})


//是否打开抽屉
const drawer = ref(false)

//点击logo
const clickLogo = () => {
    router.push('/index')
}

</script>

<style scoped lang="less">
.nav {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 4.5rem;
    margin-bottom: 1rem;
    transition: all .5s;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: var(--nav-background-color);

    .navList {
        text-shadow: .1rem .1rem .2rem rgb(61, 61, 61);
        margin-left: 15rem;

        ul {
            display: flex;
            align-items: center;
            // padding-left: 14rem;

            .logoImg {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 15rem;
                height: 4.5rem;
                margin-right: 2rem;
                cursor: pointer;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }

            // &:last-child {
            //     border-right: 0.1rem solid rgba(255, 255, 255, .1);
            // }

            li {
                &:hover {
                    cursor: pointer;
                    background-color: rgba(245, 245, 245, 0.1);
                    border-radius: .7rem;
                    transition: all .2s;
                }

                a {
                    color: #fff;
                    // font-size: 1.2rem;
                    padding: .4rem 1rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    :nth-child(1) {
                        font-size: 1.1rem;
                        color: rgb(255, 255, 255);
                        margin-right: .5rem;
                    }

                    :nth-child(2) {
                        font-size: 1.1rem;
                        font-weight: 700;
                    }

                    // &:hover {
                    //     color: var(--box-shadow);
                    // }
                }
            }
        }

    }

    .navRight {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .login {
            color: rgb(224, 224, 224);
            margin-right: 2rem;
            text-shadow: .1rem .1rem var(--gray-sahdow);

            &:hover {
                cursor: pointer;
                color: var(--special-font-color);
            }
        }
    }

    .welcome {
        margin-right: 3rem;
    }
}




.media2 {
    :deep(.el-drawer__header) {
        margin-bottom: 0;
    }

    .moreMediaNav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow-x: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 104%;
        box-sizing: border-box;
        padding: 1rem;
        z-index: 3;
        transition: all .5s;
        font-size: 3rem;
        color: var(--white-font-color);
        background-color: var(--nav-background-color);
    }


    .openDrawer {
        border-top: .1rem solid var(--gray-sahdow);
        display: flex;
        flex-direction: column;
        justify-content: center;

        .drawerBox {

            border-bottom: .2rem dashed var(--special-font-color);
            padding: 0 1rem;
            height: 5rem;
            font-size: 2rem;

            a {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: flex-end;
                color: var(--black-font-color);
            }
        }
    }
}

@media screen and (max-width: 1200px) {
    .moreMediaNav {
        .icon {
            margin-right: 8vw;
        }
    }
}
</style>