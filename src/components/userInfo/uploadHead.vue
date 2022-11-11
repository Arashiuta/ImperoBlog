<template>
    <span>上传一个新的头像吧,若头像加载失败请刷新页面</span>
    <el-upload class="avatar-uploader" method="post" :action="pinia.apiRoot + '/api/uploadhead'" show-file-list
        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false" list-type="picture"
        ref="uploadRef" :limit="1">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>
  
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadInstance } from 'element-plus'
import { useStore } from "../../store/count";
import useAxios from '../../hooks/axios/axios';

const pinia = useStore()
const emit = defineEmits(['uploadHeadSuccess'])

type Props = {
    ifsendHead: boolean
}
const props = defineProps<Props>()

//获取上传的表单元素dom
const uploadRef = ref<UploadInstance>()
//上传头
//获取当前登录的账号
const session = JSON.parse(window.atob(localStorage.getItem('userAccount')!))

watchEffect(() => {
    if (props.ifsendHead === true) {
        uploadRef.value!.submit()
        //上传图片成功后调用修改用户信息的接口修改头像图片的位置
    }
})

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)

    //使用setTimeout将第二个请求改为异步，因为这里是上传成功时的回调，这时候还没有写入新头像地址，所以要异步
    setTimeout(async () => {
        const { data: res } = await useAxios.get('/uploadheadjson', {
            params: {
                account: session.account
            }
        })
        if (res.status === 0) {
            alert('修改成功')
            //当上传完成头像后，更改pinia内的ifUploadHeadImg值，当监听到更改后重新渲染头像组件完成更新
            pinia.ifUploadHeadImg += 1
            const successUp = false
            emit('uploadHeadSuccess', successUp)

        } else {
            alert('修改失败')
        }
    }, 0)

}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
</script>
  
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
  