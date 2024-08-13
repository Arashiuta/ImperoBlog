import useAxios from "@/hooks/axios/axios";
import {
  Article,
  ArticleEditor,
  Comment,
  ReplyComment,
  SetNewLog,
  User,
  WriteArticle,
  RegisterInfo,
  LoginInfo,
  ChangeIntroduce,
} from "@/api/indexType";

//文章相关api
export const ArticleApi = {
  //获取文章列表
  getArticlList: async () => {
    const res = await useAxios.get("/getarticle");
    return res.data;
  },
  //请求对应id的文章
  getIdArticle: async (id: number) => {
    const res = await useAxios.get("/getidarticle", {
      params: {
        id: id,
      },
    });
    return res.data;
  },
  //删除对应id的文章
  delIdArticle: async (id: number) => {
    const res = await useAxios.get("/delarticle", {
      params: {
        id: id,
      },
    });
    return res.data;
  },
  //置顶对应id的文章
  topIdArticle: async (id: number) => {
    const res = await useAxios.get("/toparticle", {
      params: {
        id: id,
      },
    });
    return res.data;
  },
  //查询用户是否给某个文章点赞了
  getUserIfParise: async (account: string, articleId: string) => {
    const res = await useAxios.get("/ifparise", {
      params: {
        account: account,
        articleId: articleId,
      },
    });
    return res.data;
  },
  //查询用户是否给某个文章收藏了
  getUserIfCollection: async (account: string, articleId: string) => {
    const res = await useAxios.get("/ifcollection", {
      params: {
        account: account,
        articleId: articleId,
      },
    });
    return res.data;
  },
  //点赞相应文章
  pariseArticle: async (account: string, articleId: string) => {
    const res = await useAxios.get("/parisearticle", {
      params: {
        account: account,
        articleId: articleId,
      },
    });
    return res.data;
  },
  //收藏相应的文章
  collectionArticle: async (account: string, articleId: string) => {
    const res = await useAxios.get("/collectionarticle", {
      params: {
        account: account,
        articleId: articleId,
      },
    });
    return res.data;
  },
  //发布文章评论
  addArticleComment: async (
    articleId: number,
    account: string,
    content: string
  ) => {
    const res = await useAxios.get("/articleaddcomment", {
      params: {
        articleId: articleId,
        account: account,
        content: content,
      },
    });
    return res.data;
  },
  //删除文章评论
  delArticleComment: async (articleId: number, commentId: number) => {
    const res = await useAxios.get("/articledelcomment", {
      params: {
        articleId: articleId,
        commentId: commentId,
      },
    });
    return res.data;
  },
  //回复评论
  replyComment: async (info: ReplyComment) => {
    const res = await useAxios.post("/replycomment", info);
    return res.data;
  },
  //请求置顶的文章
  getTopArticle: async () => {
    const res = await useAxios.get("/gettoparticle");
    return res.data;
  },
  //md上传图片
  mdImgUpload: async (form: FormData) => {
    const res = await useAxios.post("/uploadmdimg", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  },
  //编辑文章内容
  editorArticle: async (postData: ArticleEditor) => {
    const res = await useAxios.post("/articleeditor", postData);
    return res.data;
  },
  //上传文章
  uploadArticle: async (formArticle: WriteArticle) => {
    const res = await useAxios.post("/uploadarticle", formArticle);
    return res.data;
  },
};

//标签相关api
export const TagApi = {
  //请求所有标签
  getAllTag: async () => {
    const res = await useAxios.get("/gettags");
    return res.data;
  },
};

//用户相关的api
export const UserApi = {
  //获取用户信息
  getUserInfo: async (userAccount: string) => {
    const res = await useAxios.get("/userinfo", {
      params: {
        account: userAccount,
      },
    });
    return res.data;
  },
  //获取默认头像
  getDefaultHead: async () => {
    const res = await useAxios.get("/getdefaulthead");
    return res.data;
  },
  //用户登录
  userLogin: async (userLogInfo: LoginInfo) => {
    const res = await useAxios.post("/login", userLogInfo);
    return res.data;
  },
  //用户注册
  userRegiser: async (registerform: RegisterInfo) => {
    const res = await useAxios.post("/register", registerform);
    return res.data;
  },
  //更新用户昵称
  updataNickName: async (account: string, nickname: string) => {
    const res = await useAxios.get("/updatanicknane", {
      params: {
        account: account,
        nickName: nickname,
      },
    });
    return res.data;
  },
  //查询发布了哪些文章
  getPushArticleNum: async (account: string) => {
    const res = await useAxios.get("/pusharticlenum", {
      params: {
        account: account,
      },
    });
    return res.data;
  },
  //关注用户
  focusUser: async (
    account: string,
    focusAccount: string,
    ifFocus: boolean
  ) => {
    const res = await useAxios.get("/focususers", {
      params: {
        account: account, //谁要关注
        focus: focusAccount, //关注谁
        ifFocus: ifFocus, //是否已经关注了
      },
    });
    return res.data;
  },
  //上传头像
  uploadHeadImg: async (formHead: FormData) => {
    await useAxios.post("/uploadhead", formHead);
  },
  //更新用户资料
  updataUserInfo: async (changeIntroduceJson: ChangeIntroduce) => {
    const res = await useAxios.post(
      "/changepersonalintroduce",
      changeIntroduceJson
    );
    return res.data;
  },
  //修改密码
  changePassword: async (account: string, newPassword: string) => {
    const res = await useAxios.get("/changepassword", {
      params: {
        account: account,
        newPassword: newPassword,
      },
    });
    return res.data;
  },
};

//聊天室相关api
export const ChatApi = {
  //获取房间列表
  getAllRooms: async () => {
    const res = await useAxios.get("/getallroomsname");
    return res.data;
  },
  //获取对应房间的消息记录
  getRoomChatLog: async (name: string) => {
    const res = await useAxios.get("/getchatlog", {
      params: { name: name },
    });
    return res.data;
  },
  //添加新的房间
  addNewRoom: async (roomName: string) => {
    const res = await useAxios.get("/setnewchatroom", {
      params: { name: roomName },
    });
    return res.data;
  },
  //删除房间
  delRoom: async (roomName: string) => {
    const res = await useAxios.get("/delroom", {
      params: { name: roomName },
    });
    return res.data;
  },
  //发送消息
  setNewLog: async (newLog: SetNewLog) => {
    const res = await useAxios.post("/setnewlog", newLog);
    return res.data;
  },
};

//留言相关api
export const MessageApi = {
  //删除留言
  delMessage: async (messageId: number) => {
    const res = await useAxios.get("/delmessage", {
      params: {
        id: messageId,
      },
    });
    return res.data;
  },
  //获取指定id的留言
  getIdMessage: async (messageId: number) => {
    const res = await useAxios.get("/getidmessage", {
      params: {
        id: messageId,
      },
    });
    return res.data;
  },
  //请求留言列表
  getAllMessage: async () => {
    const res = await useAxios.get("/getmessages");
    return res.data;
  },
  //上传留言
  uploadMessage: async (account: string, content: string) => {
    const res = await useAxios.get("/uploadmessage", {
      params: {
        account: account,
        content: content,
      },
    });
    return res.data;
  },
};

//搜索相关的api
export const SearchApi = {
  //搜索文章
  searchArticle: async (title: string) => {
    const res = await useAxios.get("/searcharticle", {
      params: {
        title: title,
      },
    });
    return res.data;
  },
  //搜索用户
  searchUser: async (account: string) => {
    const res = await useAxios.get("/searchuser", {
      params: {
        account: account,
      },
    });
    return res.data;
  },
};
