import { createWebHistory, createRouter } from "vue-router";
import { useStore } from '../store/count'

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/utils/Index.vue'),
        meta: {
            title: '首页'
        }
    }, {
        path: '/articlebrowse',
        name: 'articlebrowse',
        component: () => import('@/utils/ArticleBrowse.vue'),
        meta: {
            title: '浏览文章'
        }
    }, {
        path: '/article',
        name: 'article',
        component: () => import('@/utils/Article.vue'),
        meta: {
            title: '文章列表'
        }
    }, {
        path: '/write',
        name: 'write',
        component: () => import('@/utils/Write.vue'),
        meta: {
            title: '写作'
        }
    }, {
        path: '/archive',
        name: 'archive',
        component: () => import('@/utils/Archive.vue'),
        meta: {
            title: '留言板'
        }
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/utils/Login.vue'),
        meta: {
            title: '登录'
        }
    }, {
        path: '/more',
        name: 'more',
        component: () => import('@/utils/More.vue'),
        meta: {
            title: '更多'
        }
    }, {
        path: '/articleeditor',
        name: 'articleeditor',
        component: () => import('@/utils/Editor.vue'),
        meta: {
            title: '编辑文章'
        }
    }, {
        path: '/personalcenter',
        name: 'personalcenter',
        component: () => import('@/utils/PersonalCenter.vue'),
        meta: {
            title: '个人中心'
        }
    }, {
        path: '/otherspersonalcenter',
        name: 'otherspersonalcenter',
        component: () => import('@/utils/OthersPersonalCenter.vue'),
        meta: {
            title: '个人中心'
        }
    }, {
        path: '/userfocus',
        name: 'userfocus',
        component: () => import('@/utils/UserFocus.vue'),
        meta: {
            title: '关注列表'
        },
        children: [
            {
                path: "allfocus",
                name: 'allfocus',
                component: () => import('@/components/userfocus/userfocusShow.vue')
            },
            {
                path: "fans",
                name: 'fans',
                component: () => import('@/components/userfocus/userfocusShow.vue')
            }
        ]
    }, {
        path: '/search',
        name: 'search',
        component: () => import('@/utils/Search.vue'),
        meta: {
            title: '搜索'
        }
    }, {
        path: '/chat/:roomName',
        name: 'chat',
        component: () => import('@/utils/Chat.vue'),
        meta: {
            title: '聊天室'
        }
    }
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
    //判断是否是登录状态
    const sessionAccount = localStorage.getItem('userAccount')
    if (sessionAccount) {
        const pinia = useStore()
        pinia.sessionInfo = sessionAccount
    }

    //进入写文页面，判断是否有权限
    if (to.path === '/write') {
        if (!sessionAccount) {
            alert('还没有登录，去登录吧')
            router.push('/login')
        }
    }

    window.document.title = to.meta.title as string
    //到新页面要把页面滚动到最顶
    window.scrollTo({
        top: 0,
    })
    next()
})

router.afterEach((to, from) => {
    /*
        const nav = document.querySelector('.nav') as HTMLElement
        const navMedia = document.querySelector('.moreMediaNav') as HTMLElement
        //判断进入的地址，如果不是index则添加nav的底色
        if (to.path === '/index') {
            nav.style.backgroundColor = ''
            navMedia.style.backgroundColor = ''
        } else {
            nav.style.backgroundColor = 'var(--nav-background-color)'
            navMedia.style.backgroundColor = 'var(--nav-background-color)'
        }
    */

    //从login跳转到index时候要刷新一下页面，连接socket
    if (from.path === '/login' && to.path === '/index') {
        router.go(0)
    }
})


export default router