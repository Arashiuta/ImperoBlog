<template>
    <div class="container">
        <div class="loginImgBox">
            <div class="loginImg">
                <img src="@/imgs/loginBg.webp" alt="loginImg">
            </div>
        </div>

        <div class="logBox" v-if="ifLog">
            <div class="top">
                <div class="title">
                    <h5>登录</h5>
                    <p>Login to Impero's Blog</p>
                </div>
                <div class="box">
                    <div class="iptUser">
                        <label for="username">用户名</label>
                        <el-input v-model.trim="logInfo.username" maxlength="16" placeholder="输入用户名" show-word-limit
                            type="text" name="username" />
                    </div>
                    <div class="iptUser">
                        <label for="password">密码</label>
                        <el-input v-model.trim="logInfo.password" maxlength="16" placeholder="输入密码" show-word-limit
                            type="text" name="password" :show-password="true" />
                    </div>
                </div>
                <div class="logBtn">
                    <div @click="login">登录</div>
                    <span @click="goRegister">没有账号？点击注册</span>
                </div>
            </div>
            <div class="message">
                <div>登录后可在留言板块发布留言</div>
                <div>点击背景可进行互动(功能开发中)</div>
                <img src="@/imgs/logo.png" alt="logo">
            </div>
        </div>

        <div class="registerBox logBox" v-else>
            <div class="top">
                <div class="title">
                    <h5>注册</h5>
                    <p>Register to Impero's Blog</p>
                </div>
                <div v-if="name">
                    <div class="box">
                        <div class="iptUser">
                            <label for="registerUsername">用户名</label>
                            <el-input v-model.trim="registerInfo.username" maxlength="16" placeholder="输入注册账号"
                                show-word-limit type="text" name="registerUsername"
                                onkeyup="this.value=this.value.replace(/[^a-z0-9]/g,'');" />
                        </div>
                        <div class="iptUser">
                            <label for="registerPassword">密码</label>
                            <el-input v-model.trim="registerInfo.password" maxlength="16" placeholder="输入注册密码"
                                show-word-limit type="text" name="registerPassword" :show-password="true" />
                        </div>
                        <div class="iptUser">
                            <label for="registerPasswordAgain">确认密码</label>
                            <el-input v-model.trim="registerInfo.againPassword" maxlength="16" placeholder="再次输入注册密码"
                                show-word-limit type="text" name="registerPasswordAgain" :show-password="true" />
                        </div>
                    </div>
                    <div class="logBtn">
                        <div @click="register">注册</div>
                        <span @click="goLogin">已有账号，点击登录</span>
                    </div>
                </div>
                <div v-else>
                    <div class="nickName">
                        <label for="nickname">昵称:</label>
                        <el-input v-model.trim="nickname" :maxlength="pinia.nickNameLength" placeholder="起个昵称吧！"
                            show-word-limit type="text" name="nickname" />
                    </div>
                    <div class="logBtn nickNameBtn">
                        <div @click="updateNickName">完成</div>
                        <div @click="skipNickName">跳过</div>
                    </div>
                </div>
            </div>
            <div class="message">
                <div>登录后可在留言板块发布留言</div>
                <div>用户名只能输入小写字母和数字</div>
                <div>密码只能输入大小写字母、数字、下划线</div>
                <div>用户名和密码都要至少6位</div>
                <img src="@/imgs/logo.png" alt="logo">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from 'vue'
import getMouse from '../../hooks/getMouseLocation/getMouseLocation'
import { useStore } from '../../store/count'
import { useRouter } from 'vue-router'
import useAxios from "../../hooks/axios/axios";
import qs from "qs";

const pinia = useStore()
const router = useRouter()
const mouse = getMouse()
const ifLog = ref(true)
const name = ref(true)

onMounted(() => {
    const img = document.querySelector('.loginImg') as HTMLElement
    document.addEventListener('mousemove', () => {
        if (mouse.x < 960 && mouse.y < 540) {
            img.style.transform = `rotateX(-${mouse.y / 100}deg) rotateY(${(mouse.x - 960) / 100}deg)`
        } else if (mouse.x > 960 && mouse.y < 540) {
            img.style.transform = `rotateX(-${mouse.y / 100}deg) rotateY(${(mouse.x - 960) / 100}deg)`
        } else if (mouse.x < 960 && mouse.y > 540) {
            img.style.transform = `rotateX(-${mouse.y / 100}deg) rotateY(${(mouse.x - 960) / 100}deg)`
        } else {
            img.style.transform = `rotateX(-${mouse.y / 100}deg) rotateY(${(mouse.x - 960) / 100}deg)`
        }
    })
})

//登录信息
const logInfo = reactive({
    username: '',
    password: '',
})

//注册信息
const registerInfo = reactive({
    username: '',
    password: '',
    againPassword: '',
})

//昵称信息
const nickname = ref()

//点击登录
const login = async () => {
    const userLogInfo = toRaw(logInfo)
    const { data: res } = await useAxios.post('/login', qs.stringify(userLogInfo))
    if (res.status === 2) {
        alert('用户名不存在')
    } else if (res.status === 0) {
        //session里面存上登录的account
        const accountInfo = {
            account: res.data.account,
            root: res.data.root,
        }
        // sessionStorage
        localStorage.setItem('userAccount', window.btoa(JSON.stringify(accountInfo)))
        pinia.sessionInfo = window.btoa(JSON.stringify(accountInfo))
        alert('登录成功')
        router.replace('/index')
    } else {
        alert('密码错误')
    }
}

//点击注册
const register = async () => {
    const registerform = toRaw(registerInfo)
    if (registerform.password.length < 6 || registerform.username.length < 6) {
        alert('用户名和密码都不能小于6位')
    } else {
        if (registerform.password === registerform.againPassword) {
            const { data: res } = await useAxios.post('/register', qs.stringify(registerform))
            if (res.status === 0) {
                alert('注册成功!')
                name.value = false
            } else if (res.status === 1) {
                alert('用户名已被注册')
            } else {
                alert('失败了..')
            }
        } else {
            alert('两次输入的密码不一致 ')
        }
    }

}


const goRegister = () => {
    ifLog.value = false
}

const goLogin = () => {
    ifLog.value = true
}

const skipNickName = () => {
    registerInfo.password = ''
    registerInfo.username = ''
    nickname.value = ''
    name.value = true
    ifLog.value = true
}

//更新昵称
const updateNickName = async () => {
    if (nickname.value === '') {
        alert('昵称不能为空')
    } else {
        const uploadNick = toRaw(nickname.value)
        const { data: res } = await useAxios.get('/updatanicknane', {
            params: {
                account: registerInfo.username,
                nickName: uploadNick
            }
        })
        if (res.status === 0) {
            alert('昵称更新成功')
            registerInfo.password = ''
            registerInfo.username = ''
            nickname.value = ''
            name.value = true
            ifLog.value = true
        } else {
            alert('昵称更新失败')
            nickname.value = ''
        }
    }

}

</script>

<style scoped lang="less">
.container {
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
    background-color: var(--white-background-color);

    .loginImgBox {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        perspective: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;

        .loginImg {
            margin-top: 4.5rem;

            img {
                border-radius: 2rem;
            }
        }
    }


    .logBox {
        position: absolute;
        top: 50%;
        right: 20rem;
        transform: translateY(-50%);
        width: 40rem;
        height: 45rem;
        border-radius: 1rem;
        background-color: #fff;
        border: .1rem solid black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: .1rem .1rem .5rem var(--gray-sahdow);

        .top {
            display: flex;
            flex-direction: column;

            .title {
                padding: 2rem;

                h5 {
                    font-size: 3.5rem;
                }
            }

            .box {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;

                .iptUser {
                    display: flex;
                    align-items: center;
                    padding: .5rem 1.5rem;

                    label {
                        width: 20%;
                        font-size: 1.4rem;
                    }
                }
            }

            .logBtn {
                margin-top: 2rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 0 1rem;

                div {
                    width: 100%;
                    border: .1rem solid black;
                    border-radius: .4rem;
                    box-shadow: .1rem .1rem .3rem var(--gray-sahdow);
                    padding: .5rem 0;
                    font-size: 1.5rem;
                    transition: all .1s;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:hover {
                        background-color: var(--box-shadow);
                        color: #fff;
                        cursor: pointer;
                    }
                }

                span {
                    margin-top: .5rem;
                    color: var(--special-font-color);
                    cursor: pointer;
                }
            }

            .nickName {
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                padding: 0 1rem;

                label {
                    width: 4rem;
                    font-size: 1.4rem;
                }
            }

            .nickNameBtn {
                div {
                    margin: .5rem 0;
                }
            }

        }


        .message {
            justify-content: flex-end;
            font-size: 1.2rem;
            padding: 1rem;
            color: var(--font-gray-color);

            img {
                width: 70%;
                margin-top: 2rem;
            }
        }
    }


}


@media screen and (max-width: 800px) {
    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        .loginImgBox {
            display: none;
        }

        .logBox {
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translateX(50%) translateY(-50%);
            width: 80%;
        }
    }
}
</style>