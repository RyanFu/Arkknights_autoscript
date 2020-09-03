let DEFAULT_CONFIG = {
  // 配置已初始化
  initialized: true,
  // 分辨率比率
  base_ratio: "16:9",
  // 最大运行次数，超出次数直接结束
  max_running_times: 999,
  // 脚本上次运行的时间，用来判断是否当天首次运行
  last_running_time: new Date(),
  // 是否使用理智药剂补充理智
  using_sanity_potion: false,
  // 是否使用源石补充理智
  using_originite_prime: false,
  // 要刷取的目标材料
  target_material: "",
  // 要刷取的目标资源数量
  target_quantity: 0,
  // 每个章节最后进入的关卡，用来确定左/右滑动
  last_areas: {
    episode_1: "area_1_1",
    episode_2: "area_2_1",
    episode_3: "area_3_1",
    episode_4: "area_4_1",
    episode_5: "area_5_1",
    episode_6: "area_6_1",
    episode_7: "area_7_1",
  },
};

// 创建本地存储
var config = storages.create("arkknights_configs");

// 第一次运行初始化配置
if (!config.get("initialized")) {
  Object.keys(DEFAULT_CONFIG).forEach(function (key) {
    config.put(key, DEFAULT_CONFIG[key]);
  });
}

// 无UI界面，暂时手动配置
config.put("base_ratio", "16:9");
config.put("max_running_times", 999);
config.put("using_sanity_potion", true);
config.put("target_material", "event_RMA7012");
config.put("target_quantity", 5);

console.log("配置已加载");
