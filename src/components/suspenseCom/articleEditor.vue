<template>
    <div class="container">
        <div class="title">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24"></use>
            </svg>
            <span>编辑文章</span>
        </div>
        <div class="oneSentence">
            <label for="oneSentence">引言:</label>
            <el-input v-model="theEditor.oneSentence" maxlength="60" show-word-limit type="text" name="oneSentence" />
        </div>
        <div class="ediotr">
            <md-editor v-model="theEditor.mdContent" style="height: 80rem ;" @onUploadImg="onUploadImg" />
        </div>
        <div class="submit">
            <div @click="sendEditor">提交修改</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useAxios from '../../hooks/axios/axios'
import { useStore } from '../../store/count'
import qs from "qs";

const pinia = useStore()
const route = useRoute()
const router = useRouter()
//传过来的文章id
const contentId = route.query.id

//更新后的文章
const theEditor = reactive({
    mdContent: '',
    oneSentence: ''
})

//请求过来要修改的文章

const { data: res } = await useAxios.get('/getidarticle', {
    params: {
        id: contentId
    }
})
theEditor.mdContent = res.data.content
theEditor.oneSentence = res.data.oneSentence

//md上传图片
const onUploadImg = async (files: any, callback: any) => {
    const res = await Promise.all(
        files.map((file: any) => {
            return new Promise((rev, rej) => {
                const form = new FormData();
                form.append('file', file);

                useAxios
                    .post(pinia.apiRoot + '/api/uploadmdimg', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((res) => rev(res))
                    .catch((error) => rej(error));
            });
        })
    );

    callback(res.map((item) => pinia.apiRoot + item.data.url));
};



//发送修改的文章内容
const sendEditor = async () => {
    const sendEditro = toRaw(theEditor)
    const { data: res } = await useAxios.post('/articleeditor', qs.stringify({
        id: contentId,
        data: sendEditro
    }))
    if (res.status === 0) {
        alert('修改成功')
        router.replace({
            path: '/articlebrowse',
            query: {
                id: contentId
            }
        })
    } else {
        alert('修改失败')
    }

}


</script>

<style scoped lang="less">
.container {
    width: 65%;
    margin: 0 auto;
    margin-top: 5rem;
    border: .1rem solid var(--gray-sahdow);
    border-radius: .5rem;
    background-color: var(--backgeound-color);

    .title {
        font-size: 2.5rem;
        padding: 1rem 2rem;
        border-bottom: .2rem solid var(--border-line);
    }

    .ediotr {
        padding: 2rem 1rem;
    }

    .oneSentence {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 2rem;

        label {
            width: 5rem;
            font-size: 1.4rem;
        }
    }

    .submit {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 2rem;

        div {
            border: .1rem solid #000;
            padding: .5rem 1rem;
            font-size: 1.2rem;
            margin-right: 1.2rem;
            border-radius: .3rem;
            transition: all .1s;

            &:hover {
                cursor: pointer;
                background-color: var(--border-line);
                color: #fff;
            }
        }
    }
}

@media only screen and (max-width: 1050px) {
    .container {
        width: 100%;
        margin-top: 7rem;
        border: none;
    }
}
</style>