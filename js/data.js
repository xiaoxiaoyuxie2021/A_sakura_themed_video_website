/* ===== 数据定义 ===== */
// 分类数据
const categories = [
  { name: "动漫", id: "anime" ,page:"category.html?type=anime"},
  { name: "游戏", id: "game",page:"category.html?type=game" },
  { name: "电影", id: "movie",page:"category.html?type=movie" },
  { name: "美食", id: "food",page:"category.html?type=food" },
  { name: "音乐", id: "music",page:"category.html?type=music" },
  { name: "运动", id: "sports",page:"category.html?type=sports" },
  { name: "舞蹈", id: "dance",page:"category.html?type=dance" }
];

// 视频数据 - 添加一些示例数据用于搜索功能
let videos = [
    {
        id: "ev1",
        title: "樱花飞舞的春天",
        author: "用户A",
        date: "2024-12-20",
        plays: "1.2万",
        category: "anime",
        duration: "03:45",
        thumb: "resource/pic/video_cover/1.jpg",
        url: "resource/video/demo1.mp4",
        description: "美丽的樱花飞舞场景，春天的气息扑面而来"
    },
    {
        id: "ev2",
        title: "游戏精彩瞬间",
        author: "玩家B",
        date: "2024-12-21",
        plays: "2.5万",
        category: "game",
        duration: "05:30",
        thumb: "resource/pic/video_cover/2.jpg",
        url: "resource/video/demo2.mp4",
        description: "精彩的游戏操作和高光时刻"
    },
    {
        id: "ev3",
        title: "美食制作教程",
        author: "美食家C",
        date: "2024-12-22",
        plays: "8500",
        category: "food",
        duration: "08:15",
        thumb: "resource/pic/video_cover/3.jpg",
        url: "resource/video/demo3.mp4",
        description: "教你制作美味的樱花主题甜点"
    },
    {
        id: "ev4",
        title: "动感音乐MV",
        author: "音乐D",
        date: "2024-12-23",
        plays: "3.1万",
        category: "music",
        duration: "04:20",
        thumb: "resource/pic/video_cover/4.jpg",
        url: "resource/video/demo4.mp4",
        description: "节奏感强烈的音乐视频"
    },
    {
        id: "ev5",
        title: "体育赛事集锦",
        author: "体育E",
        date: "2024-12-24",
        plays: "1.8万",
        category: "sports",
        duration: "06:45",
        thumb: "resource/pic/video_cover/5.jpg",
        url: "resource/video/demo5.mp4",
        description: "精彩体育赛事回顾"
    },
    {
        id: "ev6",
        title: "舞蹈表演欣赏",
        author: "舞者F",
        date: "2024-12-25",
        plays: "9200",
        category: "dance",
        duration: "07:10",
        thumb: "resource/pic/video_cover/6.jpg",
        url: "resource/video/demo6.mp4",
        description: "优美的舞蹈表演"
    },
    {
        id: "ev7",
        title: "经典电影回顾",
        author: "影评G",
        date: "2024-12-26",
        plays: "4.3万",
        category: "movie",
        duration: "12:30",
        thumb: "resource/pic/video_cover/7.jpg",
        url: "resource/video/demo7.mp4",
        description: "经典电影片段回顾与分析"
    }
];

// 保存原始的categories对象，避免覆盖
const originalCategories = [...categories];

// js/data.js
window.categories = {
  game: {
    title: '游戏',
    header: '🎮 游戏',
  },
  sports: {
    title: '运动',
    header: '⚽ 运动',
  },
  anime: {
    title: '动漫',
    header: '🎌 动漫',
  },
    movie: {
      title: '电影',
      header: '🎬 电影',
    },
    food: {
      title: '美食',
      header: '🍜 美食',
    },  
    dance: {
      title: '舞蹈',
      header: '💃 舞蹈',
    }
};

// 确保全局videos变量可用
window.videos = videos;

// 同时保留原始categories数组
window.categoriesList = categories;
