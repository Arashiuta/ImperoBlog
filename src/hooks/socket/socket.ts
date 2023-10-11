import { io } from 'socket.io-client'
import { ElMessage } from 'element-plus'

//连接服务器
// const socket = io("http://127.0.0.1:3030", ({
//     autoConnect: false,
//     auth: {
//         userInfo: window.atob(localStorage.getItem('userAccount')!)
//     }
// }))
const socket = io("https://impero.top:3031", ({
    autoConnect: false,
    auth: {
        userInfo: window.atob(localStorage.getItem('userAccount')!)
    }
}))
//监听器，啥都监听
socket.onAny((event, ...args) => {
    // console.log(event, args);
});

socket.on('connect', () => { }) //连接socket
socket.io.on('error', (error) => {
    ElMessage.error('网络连接错误' + error)
})
socket.io.on("reconnect", (attempt) => {
    ElMessage({
        message: '重新连接成功',
        type: 'success',
    })
});


export {
    socket
}

