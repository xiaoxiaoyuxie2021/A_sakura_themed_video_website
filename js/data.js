/* ===== 数据定义 ===== */
// 分类数据
const categories = [
  { name: "动漫", id: "anime" ,page:"anime.html"},
  { name: "游戏", id: "game",page:"game.html" },
  { name: "电影", id: "movie",page:"movie.html" },
  { name: "美食", id: "food",page:"food.html" },
  { name: "音乐", id: "music",page:"music.html" },
  { name: "运动", id: "sports",page:"sports.html" },
  { name: "舞蹈", id: "dance",page:"dance.html" }
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
    {
        id: 2,
        title: "舞蹈表演精选",
        author: "用户B",
        date: "2024-12-19",
        plays: "2.5万",
        category: "dance",
        duration: "05:20",
        thumb: "resource/pic/video_cover/2.jpg",
        url: "resource/video/demo2.mp4",
        description: "精彩的舞蹈表演合集"
    },
    {
        id: 3,
        title: "美食制作教程",
        author: "用户C",
        date: "2024-12-18",
        plays: "3.1万",
        category: "food",
        duration: "08:15",
        thumb: "resource/pic/video_cover/3.jpg",
        url: "resource/video/demo3.mp4",
        description: "教你制作美味佳肴的详细教程"
    },
    {
        id: 4,
        title: "游戏精彩瞬间",
        author: "用户D",
        date: "2024-12-17",
        plays: "4.7万",
        category: "game",
        duration: "12:30",
        thumb: "resource/pic/video_cover/4.jpg",
        url: "resource/video/demo4.mp4",
        description: "游戏中的精彩操作和高光时刻"
    },
    {
        id: 5,
        title: "运动健儿风采",
        author: "用户E",
        date: "2024-12-16",
        plays: "1.9万",
        category: "sports",
        duration: "06:45",
        thumb: "resource/pic/video_cover/5.jpg",
        url: "resource/video/demo5.mp4",
        description: "展现运动员的拼搏精神和精彩瞬间"
    },
    {
        id: 6,
        title: "电影经典片段",
        author: "用户F",
        date: "2024-12-15",
        plays: "5.3万",
        category: "movie",
        duration: "04:22",
        thumb: "resource/pic/video_cover/6.jpg",
        url: "resource/video/demo6.mp4",
        description: "收录了多部经典电影的精彩片段"
    },
    {
        id: 7,
        title: "音乐MV欣赏",
        author: "用户G",
        date: "2024-12-14",
        plays: "2.8万",
        category: "music",
        duration: "03:58",
        thumb: "resource/pic/video_cover/7.jpg",
        url: "resource/video/demo7.mp4",
        description: "高质量音乐MV欣赏"
    },
    {
        id: 8,
        title: "动漫推荐",
        author: "用户H",
        date: "2024-12-13",
        plays: "6.2万",
        category: "anime",
        duration: "07:18",
        thumb: "resource/pic/video_cover/8.jpg",
        url: "resource/video/demo8.mp4",
        description: "推荐优秀的动漫作品"
    }
];




