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
        id: 1,
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
];

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
};





