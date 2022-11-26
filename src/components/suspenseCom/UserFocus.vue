<template>
    <div class="userfocus-container">
        <div class="titleList">
            <div class="focus ">
                <div class="focusTitle">{{ staticText.focus }}</div>
                <div class="focusList" id="allfocus" @click="pushRoute(0)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-yonghu1"></use>
                    </svg>
                    <p>{{ staticText.allFocus }}</p>
                </div>
            </div>
            <div class="focus">
                <div class="focusTitle">{{ staticText.fans }}</div>
                <div class="focusList" id="fans" @click="pushRoute(1)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-fensi"></use>
                    </svg>
                    <p>{{ staticText.allFans }}</p>
                </div>
            </div>
        </div>
        <div class="userList">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

const routeAccount = route.query.account
const staticText = reactive({
    focus: "我的关注",
    allFocus: "全部关注",
    fans: "我的粉丝",
    allFans: "我的粉丝"
})

const urlToTag = () => {   //根据url路径判断tag高亮函数
    const urlPath = route.path
    const tagAll = document.querySelectorAll('.focusList')
    switch (urlPath) {
        //根据url的路径判断哪个tag需要高亮
        case '/userfocus/allfocus':  //全部关注
            //先把所有tag的choose属性去掉
            for (let i = 0; i < tagAll.length; i++) {
                tagAll[i].classList.remove('choose')
            }
            //给相应的tag加上choose属性
            const allfocus = document.getElementById('allfocus')
            allfocus?.classList.add('choose')
            break;
        case '/userfocus/fans':   //全部粉丝
            for (let i = 0; i < tagAll.length; i++) {
                tagAll[i].classList.remove('choose')
            }
            const fans = document.getElementById('fans')
            fans?.classList.add('choose')
            break;
        default:
            break;
    }
}

const fromWhere = () => {
    if (route.query.from) {
        staticText.focus = "Ta的关注",
            staticText.allFocus = "全部关注",
            staticText.fans = "Ta的粉丝",
            staticText.allFans = "Ta的粉丝"
    }
}

watchEffect(() => {
    urlToTag()
})

onMounted(() => {
    urlToTag()
    fromWhere()
})

const pushRoute = (tag: number) => {
    //有一个共用的路由组件，根据传过来的tag值判断加载什么数据
    switch (tag) {
        case 0:
            //进入全部关注路由
            router.replace({
                path: "/userfocus/allfocus",
                query: {
                    account: routeAccount,
                    tag: 0
                }
            })
            break;
        case 1:
            //进入粉丝路由
            router.replace({
                path: "/userfocus/fans",
                query: {
                    account: routeAccount,
                    tag: 1
                }
            })
            break;
        default:
            break;
    }
}
</script>

<style scoped lang="less">
.userfocus-container {
    width: 60%;
    margin: 5rem auto;
    min-height: 70rem;
    max-height: 120rem;
    display: flex;
    background-color: var(--white-background-color);
    border-radius: .5rem;
    border: .1rem solid var(--gray-light-border);
    overflow: hidden;

    a {
        color: #000;
    }

    .titleList {
        width: 18rem;
        min-width: 10rem;
        border-right: .1rem solid var(--gray-light-border);

        .focus {
            width: 100%;
            border-bottom: .15rem solid var(--gray-light-border);
            box-sizing: border-box;
            padding-bottom: 1rem;

            .focusTitle {
                width: 100%;
                height: 4.5rem;
                display: flex;
                align-items: center;
                text-indent: 1rem;
                font-size: 1.4rem;
                font-weight: 600;
            }

            .focusList {
                width: 100%;
                display: flex;
                font-size: 1.3rem;
                font-weight: 500;
                box-sizing: border-box;
                padding: 1rem;
                transition: all .2s;

                &:hover {
                    cursor: pointer;
                    background-color: rgb(236, 236, 236);
                    color: var(--special-font-color);
                }

                :nth-child(1) {
                    margin-right: .5rem;
                }
            }

            .choose {
                background-color: var(--box-shadow);
                color: #fff;

                &:hover {
                    background-color: var(--box-shadow);
                    color: #fff;
                }
            }
        }


    }

    .userList {
        flex: 1;
    }
}

@media screen and (max-width: 800px) {

    .userfocus-container {
        width: 100%;
        margin-top: 8rem;
    }
}
</style>