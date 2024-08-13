// Article.ts
export interface Article {
  id: number;
  title: string;
  content: string;
  // 根据实际数据结构添加其他字段
}

// User.ts
export interface User {
  id: number;
  account: string;
  password: string;
  nickName: string;
  headImg: string;
  headImgName: string;
  root: boolean;
  personalCover: string;
  createDate: string;
  collectionArticles: string[];
  pariseArticles: string[];
  sex: string;
  eMail: string;
  personalWeb: string;
  focus: string[];
  introduce: string;
  fans: string[];
  pushArticleNum: number;
}

// Comment.ts
export interface Comment {
  articleId: number;
  commentId: number;
  account: string;
  content: string;
  time: string;
  reply: ReplyComment[];
}

// ReplyComment.ts
export interface ReplyComment {
  id: number;
  replyTo: string;
  account: string;
  content: string;
  time: string;
}

// Room.ts
export interface RoomName {
  id: number;
  name: string;
}

// Other relevant types...
export interface EditorInfo {
  content: string;
}

export interface ArticleEditor {
  id: number;
  info: EditorInfo;
}

export interface WriteArticle {
  articleTitle: string;
  articleText: string;
  articleTags: string[];
  author: string;
}

export interface SetNewLog {
  id: number;
  roomName: string;
  account: string;
  content: string;
}

export interface RegisterInfo {
  username: string;
  password: string;
  againPassword: string;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export interface ChangeIntroduce {
  account: string;
  data: NewIntroduce;
}

export interface NewIntroduce {
  nickName: string;
  sex: string;
  eMail: string;
  personalWeb: string;
  introduce: string;
}
