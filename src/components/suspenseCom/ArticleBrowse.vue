<template>
    <Transition @enter="gsapEnterCover" :css="false">
        <div class="coverImg" v-if="ifCover">
            <el-image :src="pinia.apiRoot + browseArticle.cover" fit="cover" />
            <div class="mask">
                <div class="title">{{ browseArticle.title }}</div>
                <div class="author" @click="goToPersonalCenter">
                    <div class="head">
                        <img :src="pinia.apiRoot + authorInfo.headImg" alt="head">
                    </div>
                    <div class="nickName">{{ authorInfo.nickName }}</div>
                </div>
                <div class="time">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-rili"></use>
                    </svg>
                    <span>{{ browseArticle.time }}</span>
                </div>
            </div>
        </div>
    </Transition>

    <div class="articleMd">
        <div class="contaier">
            <div class="mdTextTop">
                <div class="info">
                    <div class="editor">
                        <svg class="icon" aria-hidden="true" @click="ifEditor = !ifEditor">
                            <use xlink:href="#icon-gengduo2"></use>
                        </svg>
                        <div class="moreEditor" v-if="ifEditor">
                            <div class="moreEditor2"></div>
                            <ul>
                                <li @click="openEditor">编辑</li>
                                <li @click="openDel">删除</li>
                            </ul>
                        </div>
                        <Teleport to="body">
                            <el-dialog v-model="dialogFormVisible" title="删除文章">
                                <div style="margin-bottom: 2rem ;">如果要删除此文章，请输入以下验证码数字：{{ randomNum }}</div>
                                <el-input v-model="code" placeholder="Please input" />
                                <template #footer>
                                    <span class="dialog-footer">
                                        <el-button type="primary" @click="dialogFormVisible = false">取消</el-button>
                                        <el-button @click="trueDel">确定</el-button>
                                    </span>
                                </template>
                            </el-dialog>
                        </Teleport>
                    </div>
                    <!-- 如果没有封面 -->
                    <div class="noCover" v-if="!ifCover">
                        <div class="title">{{ browseArticle.title }}</div>
                        <div class="author" @click="goToPersonalCenter">
                            <div class="head">
                                <img :src="pinia.apiRoot + authorInfo.headImg" alt="head">
                            </div>
                            <div class="nickName">{{ authorInfo.nickName }}</div>
                        </div>
                        <div class="time">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-rili"></use>
                            </svg>
                            <span>{{ browseArticle.time }}</span>
                            <span class="lastUpdataTime"><span>最后修改:</span>{{ browseArticle.lastUpdataTime }}</span>
                        </div>
                        <div>
                            <span class="labelTag" v-for="tag in browseArticle.tag" :key="tag">{{ tag }}</span>
                        </div>
                    </div>
                    <!--  -->
                    <div class="oneSentence">
                        <span>引言:</span>
                        <span>{{ browseArticle.oneSentence }}</span>
                    </div>
                </div>
                <div class="articleIndex">
                    <md-editor editor-id="articleBrowse" v-model="browseArticle.content" preview-only class="mdText" />
                </div>
            </div>

            <!-- 点赞收藏数量显示组件 -->
            <BrowserBottom :articleInfo="browseArticle"></BrowserBottom>

            <!-- 评论区组件 -->
            <Suspense>
                <template #default>
                    <browserComment :articleId="articleId"></browserComment>
                </template>

                <template #fallback>
                    <Loading2></Loading2>
                </template>
            </Suspense>
        </div>
        <div class="catalog">
            <div class="cataSide" ref="sticky">
                <div class="titleTop">文章目录</div>
                <md-catalog editor-id="articleBrowse" class="browserCatalog" :scrollElement="scrollElement" />
                <BrowserSide class="browserSide" :id="(articleId as string)"></BrowserSide>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent, provide } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useRoute, useRouter } from "vue-router";
import useAxios from "../../hooks/axios/axios";
import gsap from 'gsap'
//用pinia拼接图片地址
import { useStore } from "../../store/count";
import { ElMessage } from 'element-plus'
import BrowserSide from '../browse/browserSide.vue';
import BrowserBottom from '../browse/browserBottom.vue';
import Loading2 from "@/components/loading/loading2.vue";
const browserComment = defineAsyncComponent(() => import('@/components/browse/browserComments.vue'))

const pinia = useStore()
const router = useRouter()
const MdCatalog = MdEditor.MdCatalog

const ifCover = ref(false)

//右侧的md-catalog目录的监听设置
const scrollElement = document.documentElement

//准备route发送带id的请求获取对应的文章
const route = useRoute()
const articleId = route.query.id

//请求相应的id的文章
const { data: res } = await useAxios.get('/getidarticle', {
    params: {
        id: articleId
    }
})

const browseArticle = res.data  //拿到了相应的文章

const commentsList = {
    id: articleId,
    comments: browseArticle.comments
}  //拿到评论列表
provide('comments', commentsList)  //依赖注入给孙组件评论列表

//获取作者的信息
const { data: author } = await useAxios.get('/userinfo', {
    params: {
        account: browseArticle.author
    }
})
const authorInfo = author.data[0]

//编辑文章
const openEditor = async () => {
    const session = localStorage.getItem('userAccount')
    if (session) {
        const sessionInfo = JSON.parse(window.atob(session))
        if (sessionInfo.root === true) {  //拥有管理员权限，可以直接编辑文章
            router.push({
                path: '/articleeditor',
                query: {
                    id: articleId,
                }
            })
        } else {   //没有权限，判断是否是自己写的文章
            const { data: res } = await useAxios.get('/getidarticle', {
                params: {
                    id: articleId
                }
            })

            if (res.data.author === sessionInfo.account) {
                router.push({
                    path: '/articleeditor',
                    query: {
                        id: articleId,
                    }
                })
            } else {
                ElMessage.error('只能编辑自己写的文章')
            }

        }
    } else {
        alert('只有管理员权限可以操作')
        router.push('/login')
    }


}

const containerGsap = () => {
    gsap.from('.contaier', {
        y: 50,
        duration: 0.3
    })
}

const gsapEnterCover = (el: any, done: any) => {
    gsap.from(el, {
        y: -50,
        duration: 0.3
    })
    done()
}

onMounted(() => {
    containerGsap()
    if (browseArticle.cover) {
        ifCover.value = true
    } else {
        const coverImg = document.querySelector('.contaier') as HTMLElement
        coverImg.style.marginTop = '5rem'
    }
})


//是否展开编辑
const ifEditor = ref(false)
//删除文章的弹出框
const dialogFormVisible = ref(false)
const randomNum = ref<string>()
const code = ref<string>()
const openDel = async () => {
    const session = localStorage.getItem('userAccount')
    if (session) {
        const sessionInfo = JSON.parse(window.atob(session))
        if (sessionInfo.root === true) {   //有权限，直接删除
            dialogFormVisible.value = true
            randomNum.value = Math.floor(Math.random() * 10000).toString()
        } else {   //没权限，判断是不是自己的文章
            const { data: res } = await useAxios.get('/getidarticle', {
                params: {
                    id: articleId
                }
            })

            if (res.data.author === sessionInfo.account) {
                dialogFormVisible.value = true
                randomNum.value = Math.floor(Math.random() * 10000).toString()
            } else {
                ElMessage.error('只能删除自己写的文章')
            }
        }
    } else {
        alert('只有管理员权限可以操作')
        router.push('/login')
    }
}


const trueDel = async () => {
    if (code.value === randomNum.value) {
        code.value = ''
        dialogFormVisible.value = false
        const { data: res } = await useAxios.get('/delarticle', {
            params: {
                id: articleId
            }
        })
        if (res.status === 0) {
            alert('删除成功')
            router.replace('/article')
        }
    } else {
        alert('验证码错误')
        code.value = ''
    }
}

const goToPersonalCenter = () => {
    const token = localStorage.getItem('userAccount')
    if (token) {
        const tokenInfo = JSON.parse(window.atob(token))
        if (tokenInfo.account === authorInfo.account) {   //如果点击的是自己的留言的头像，就跳转到自己的个人中心
            router.push('/personalcenter')
        } else {    //不是就正常跳转到别人的个人中心
            router.push({
                path: '/otherspersonalcenter',
                query: {
                    account: authorInfo.account
                }
            })
        }
    } else {    //未登录，直接跳转到别人的个人中心
        router.push({
            path: '/otherspersonalcenter',
            query: {
                account: authorInfo.account
            }
        })
    }
}

</script>

<style scoped lang="less">
@keyframes ifEditor {
    0% {
        opacity: 0.2;
    }

    100% {
        opacity: 1;
    }
}

.coverImg {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    height: 40rem;
    position: relative;

    .el-image {
        width: 100%;
    }

    .mask {
        width: 100%;
        height: 50%;
        background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(43, 43, 43));
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: rgb(245, 245, 245);

        .title {
            font-size: 3.5rem;
            font-weight: 600;
        }

        .author {
            display: flex;
            align-items: center;
            font-size: 1.5rem;
            padding: 1rem 0;

            &:hover {
                cursor: pointer;
            }


            .head {
                width: 3.5rem;
                height: 3.5rem;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 1rem;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }

        .time {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;

            :nth-child(1) {
                padding: 0;
                font-size: 2.6rem;
            }

            span {
                margin-left: .2rem;
                font-size: 1.6rem;
            }

            .lastUpdataTime {
                margin-left: 3rem;

                &>span {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--special-font-color);
                }
            }
        }

    }
}

.articleMd {
    display: flex;
    width: 70%;
    margin: 0 auto;

    .contaier {
        width: 80%;

        .mdTextTop {
            background-color: #fff;
            padding: 1.4rem;
            border-radius: .5rem;
            box-shadow: .1rem .1rem .5rem var(--gray-sahdow);

            .info {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .noCover {
                    font-size: 1.6rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .author {
                        display: flex;
                        align-items: center;
                        font-size: 1.5rem;
                        padding: 1rem 0;

                        &:hover {
                            cursor: pointer;
                        }


                        .head {
                            width: 3.5rem;
                            height: 3.5rem;
                            border-radius: 50%;
                            overflow: hidden;
                            margin-right: 1rem;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                    }

                    .title {
                        font-size: 3rem;
                        font-weight: 500;
                    }

                    .time {
                        margin-top: 1rem;
                        margin-bottom: 1rem;

                        .lastUpdataTime {
                            margin-left: 2rem;

                            span {
                                color: var(--special-font-color);
                            }
                        }
                    }
                }

                .editor {
                    position: relative;
                    align-self: flex-end;
                    font-size: 2.5rem;
                    color: var(--border-line);
                    cursor: pointer;
                    transform-style: preserve-3d;

                    .moreEditor {
                        position: absolute;
                        top: 3rem;
                        left: -1rem;
                        width: 4.5rem;
                        height: 5rem;
                        background-color: rgb(231, 235, 238);
                        border-radius: .5rem;
                        animation: ifEditor .3s;

                        .moreEditor2 {
                            position: absolute;
                            top: -.5rem;
                            left: 50%;
                            width: 1rem;
                            height: 1rem;
                            transform: translateX(-50%) rotateZ(45deg) translateZ(-1rem);
                            background-color: rgb(231, 235, 238);
                        }

                        ul {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;

                            li {
                                font-size: 1.4rem;
                                width: 100%;
                                padding: .2rem 0;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                transition: all .2s;


                                &:hover {
                                    background-color: var(--special-font-color);
                                    color: #fff;
                                }
                            }
                        }
                    }
                }

                .oneSentence {
                    width: 100%;
                    display: flex;
                    align-items: flex-end;
                    font-size: 1.4rem;
                    padding: 2rem 0;
                    border-bottom: .3rem solid var(--border-line);

                    span {
                        padding: 0;
                    }

                    :nth-child(1) {
                        color: var(--special-font-color);
                        font-size: 1.8rem;
                        font-weight: 600;
                    }

                    :nth-child(2) {
                        margin-left: 1rem;
                        font-size: 1.6rem;
                    }
                }
            }
        }


        .articleIndex {
            margin: 2rem 0;
            min-height: 80rem;

            .mdText {
                background-color: transparent;
            }
        }

        .mdTextBottom {
            background-color: aquamarine;
        }
    }

    .catalog {
        margin-top: 6rem;
        flex: 1;
        margin-left: 2rem;

        .cataSide {
            max-width: 20rem;
            position: sticky;
            top: 1rem;

            .titleTop {
                width: 100%;
                background-color: rgb(255, 255, 255);
                margin-bottom: .5rem;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                font-size: 1.7rem;
                font-weight: 600;
                padding: 1rem;
                border-radius: .5rem;

            }

            .browserCatalog {
                width: 100%;
                background-color: rgb(255, 255, 255);
                border-radius: .5rem;
                box-shadow: 0 0 .3rem .1rem rgba(255, 255, 255, 0.4);
                box-sizing: border-box;
                padding: 2rem 1rem;
                font-size: 1.2rem;
            }
        }
    }


}





@media screen and (max-width: 800px) {
    .contaier {
        width: 100%;
        border: none;
    }
}
</style>