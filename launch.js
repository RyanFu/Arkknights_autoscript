/**
 * 先运行config_main.js加载配置，避免忘记手动运行
 */
try {
  engines.execScriptFile("./config_main.js");
} catch (error) {
  toastLog(error);
  exit();
}

/**
 * 检查无障碍服务和截图服务
 */
let ispt = require("./lib/Inspector");
ispt.checkA11yService(true);
ispt.checkScreenCapture(true);

/**
 * 加载模块
 */
let atmt = require("./lib/Automator");
let funcs = require("./lib/CommonFuncs");
let unlocker = require("./lib/Unlock");

/**
 * 加载资源
 */
let imgs_main = require("./asset/IMAGES_MAIN");
let imgs_mtrl = require("./asset/IMAGES_MATERIAL");
let objs_mtrl = require("./asset/OBJECTS_MATERIAL");
let rgns_main = require("./asset/REGIONS_MAIN");

/**
 * 加载配置
 */
let config = storages.create("arkknights_configs");

let configs = {
  base_ratio: undefined,
  max_running_times: undefined,
  last_running_time: undefined,
  using_sanity_potion: undefined,
  using_originite_prime: undefined,
  target_material: undefined,
  target_quantity: undefined,
  last_areas: undefined,
};

for (let key in configs) {
  configs[key] = config.get(key);
}

//console.log(configs);

/**
 * 全局变量
 */
let tg_mtrl = objs_mtrl[configs.target_material];
let rgn_vals = rgns_main[configs.base_ratio];

let rewards = {}; // 统计最终龙门币和材料数量

/**
 * 主程序
 */
let ak = {
  launch: function () {
    let is_running = false;
    
    if (!unlocker.is_init_screen_on) {
      unlocker.unlock();
      console.log("手机已解锁");
    }

    toastLog("即将运行游戏");
    sleep(3e3);

    let _thrd = threads.start(function () {
      try {
        is_running = app.launch("com.hypergryph.arknights");
      } catch (error) {
        toastLog(error);
        exit();
      }
    });
    _thrd.join();
    if (!is_running) {
      toastLog("运行游戏失败，结束执行");
      exit();
    }

    return this;
  },
  login: function () {
    if (funcs.loopUntilFind(imgs_main.sign_enter, true)) {
      funcs.findAndClick(imgs_main.sign_enter, true);
    } else {
      exitGame("加载游戏失败，结束执行");
    }

    if (funcs.loopUntilFind(imgs_main.text_arouse, true)) {
      funcs.findAndClick(imgs_main.text_arouse, true);
    } else {
      exitGame("唤醒账号失败，结束执行");
    }

    return this;
  },
  dismiss: function () {
    // 等待直到进入游戏主界面
    funcs.loopUntilFind(imgs_main.sign_lv, true);

    sleep(2e3);

    // 当日首次登录领取签到奖励
    if (checkFisrtRunningToday()) {
      console.log("今天第一次运行");

      if (funcs.loopUntilFind(imgs_main.text_supply, true, {
        options: {
          extras: [imgs_main.sign_dismiss]
        },
        process: function (result) {
          let close = result.extras[0];
          if (close) atmt.click(close.x, close.y);
        },
        interval: 1e3
      })) {
        funcs.findAndClick(imgs_main.text_supply, true);
      }
    }

    // 关闭公告/签到弹窗
    if (funcs.loopUntilFind(imgs_main.sign_lv, true, {
      options: {
        extras: [imgs_main.sign_dismiss]
      },
      process: function (result) {
        let close = result.extras[0];
        if (close) atmt.click(close.x, close.y);
      },
      interval: 1e3
    })) {
      toastLog("成功进入游戏主界面");
    } else {
      exitGame("进入游戏主界面失败，结束执行", true);
    }

    return this;
  },
  ready: function () {
    let current_area = 0;
    let last_area = 0;

    if (tg_mtrl.update) {
      current_area = +extractNum(tg_mtrl.area)[1];
      last_area = +extractNum(configs.last_areas[tg_mtrl.episode])[1];
    }
    
    // 点击作战按钮
    funcs.findAndClick(imgs_main.sign_lv, true, {
      coord: rgn_vals.coord_battle
    });

    // 进入顶级区域
    if (tg_mtrl.top_area) {
      sleep(2e3);

      switch (tg_mtrl.top_area) {
        case "supplies":
          atmt.click(rgn_vals.coord_supplies.x, rgn_vals.coord_supplies.y);
          toastLog("进入物资筹备");
          sleep(1e3);
          break;
        case "chips":
          atmt.click(rgn_vals.coord_chips.x, rgn_vals.coord_chips.y);
          toastLog("进入芯片搜索");
          sleep(1e3);
          break;
        case "annihilation":
          atmt.click(rgn_vals.coord_annihilation.x, rgn_vals.coord_annihilation.y);
          toastLog("进入剿灭作战");
          sleep(1e3);
          break;
        case "event_1":
          atmt.click(rgn_vals.coord_event_1.x, rgn_vals.coord_event_1.y);
          toastLog("进入活动1");
          sleep(1e3);
          break;
        case "event_2":
          atmt.click(rgn_vals.coord_event_2.x, rgn_vals.coord_event_2.y);
          toastLog("进入活动2");
          sleep(1e3);
          break;
        default:
          throw new Error("Cannot recognize this top area");
      }
    }

    if (tg_mtrl.episode) {
      if (extractNum(tg_mtrl.episode).length === 0 ?
        funcs.swipeUntilFind(imgs_main[tg_mtrl.episode], true, rgn_vals.coords_episode):
        funcs.swipeUntilFind(imgs_main[tg_mtrl.episode], true, rgn_vals.coords_episode_r)) {
        funcs.findAndClick(imgs_main[tg_mtrl.episode], true, {
          wait: 500
        });
      } else {
        exitGame("进入游戏章节失败，结束执行", true);
      }
    }
    
    if (tg_mtrl.area) {
      if (current_area >= last_area ?
        funcs.swipeUntilFind(imgs_main[tg_mtrl.area], true, rgn_vals.coords_area):
        funcs.swipeUntilFind(imgs_main[tg_mtrl.area], true, rgn_vals.coords_area_r)) {
        funcs.findAndClick(imgs_main[tg_mtrl.area], true, {
          wait: 500
        });
      } else {
        exitGame("进入游戏关卡失败，结束执行", true);
      }
    }

    return this;
  },
  start: function () {
    let current = 0;

    while (configs.max_running_times--) {
      if (tg_mtrl.count &&
        rewards[configs.target_material] >= configs.target_quantity) {
        console.log(rewards);
        updateConfig();
        exitGame("任务完成，结束游戏");
      }

      // 第一步，进入干员确认界面
      if (funcs.loopUntilFind(imgs_main.start_step_1, true)) {
        funcs.findAndClick(imgs_main.auto_deploy, true); // 代理指挥
        funcs.findAndClick(imgs_main.start_step_1, true);
      } else {
        exitGame("干员确认失败，结束执行", true);
      }

      // 第二步，正式开始游戏
      if (funcs.loopUntilFind(imgs_main.start_step_2, true, {
          options: {
            extras: [
              imgs_main.text_potion,
              imgs_main.text_prime,
              imgs_main.sign_confirm
            ]
          },
          process: function (result) {
            let ets = result.extras; // et = extra targets
            let confirm = ets[2];
            if (ets[0] || ets[1]) {
              if ((ets[0] && configs.using_sanity_potion) ||
                (ets[1] && configs.using_originite_prime)) {
                if (confirm) {
                  atmt.click(confirm.x, confirm.y);
                  toastLog("理智已补充");
                }
                funcs.findAndClick(imgs_main.start_step_1, true, {
                  wait: 1e3
                });
              } else {
                console.log(rewards);
                updateConfig();
                exitGame("理智不足，结束执行");
              }
            }
          }
        })) {
        toastLog("第" + ++current + "次运行");
        funcs.findAndClick(imgs_main.start_step_2, true);
      } else {
        exitGame("开始游戏失败，结束执行", true);
      }

      // 第三步，结算（剿灭模式的结算界面与普通关卡不同）
      if (configs.target_material === "合成玉") {
        if (funcs.loopUntilFind(imgs_main.sign_defeat, true, {
            bound: 1800e3,
            interval: 3e3,
            options: {
              extras: [imgs_main.text_levelup]
            },
            process: function (target) {
              let tmp = target.extras[0];
              if (tmp) atmt.click(tmp.x, tmp.y);
            }
          })) {
          funcs.findAndClick(imgs_main.sign_defeat, true);
        } else {
          exitGame("游戏结算失败，结束执行", true);
        }

        if (funcs.loopUntilFind(imgs_main.text_reward, true)) {
          funcs.findAndClick(imgs_main.text_reward, true)
        } else {
          exitGame("游戏结算失败，结束执行", true);
        }
      } else {
        if (funcs.loopUntilFind(imgs_main.text_reliance, true, {
            bound: 300e3,
            interval: 3e3,
            options: {
              extras: [imgs_main.text_levelup]
            },
            process: function (target) {
              let tmp = target.extras[0];
              if (tmp) atmt.click(tmp.x, tmp.y);
            }
          })) {
          if (tg_mtrl.count) {
            sleep(3e3); // 等待结算动画结束
            runCount(getRewards(captureScreen()));
          }
          funcs.findAndClick(imgs_main.text_reliance, true);
        } else {
          updateConfig();
          exitGame("游戏结算失败，结束执行");
        }
      }
    }

    console.log(rewards);
    updateConfig();
    exitGame("超出最大次数，脚本运行结束");
    return this;
  },
};

if (funcs.findOnly(imgs_main.start_step_1, true)) {
  ak.start(); // 手动进入具体关卡后运行
} else if (funcs.findOnly(imgs_main.sign_lv, true)) {
  ak.ready().start(); // 在游戏主界面运行
} else {
  ak.launch().login().dismiss().ready().start(); // 默认运行
}

/**
 * 工具函数
 */
// 提取字符串中的数字
function extractNum(str) {
  return str.split("_").filter(word => word.match(/\d+/));
}

// 格式化日期字符串
function dateFormat(fmt, date) {
  let reg;
  let padStr = str => str.length === 1 ? "0" + str : str;

  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    reg = new RegExp("(" + k + ")").exec(fmt);
    if (reg) {
      fmt = fmt.replace(reg[0], (reg[0].length === 1) ? opt[k] : padStr(opt[k]));
    };
  };
  return fmt;
}

// 检查是否当天第一次运行
function checkFisrtRunningToday() {
  let now = new Date();
  let lrt = new Date(configs.last_running_time);
  let base_time = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4); // 当天4点

  if (now - base_time > 0 && (now - lrt) > (now - base_time)) {
    return true;
  } else {
    return false;
  }
}

// 更新配置
function updateConfig(lrt_only) {
  config.put("last_running_time", new Date());
  if (!lrt_only && tg_mtrl.update) {
    if (configs.last_areas[tg_mtrl.episode]) {
      configs.last_areas[tg_mtrl.episode] = tg_mtrl.area;
      config.put("last_areas", configs.last_areas);
    }
  }
  console.log("配置已更新");
}

// 模拟退出应用
function exitGame(err_msg, update_lrt) {
  if (err_msg) toastLog(err_msg);
  if (update_lrt) updateConfig(true);
  home() && exit();
}

// 获取所有的结算奖励（经验除外）
function getRewards(img) {
  let img_gray, img_blur, circles;
  let results = [];

  img_gray = images.grayscale(img);
  img_blur = images.medianBlur(img_gray, 7);

  circles = images.findCircles(img_blur, {
    region: rgn_vals.region_rewards,
    minDst: 250,
    param1: 100,
    param2: 30,
    minRadius: 120,
    maxRadius: 120,
  });

  // 对找到的圆按x坐标的大小进行升序排序
  circles.sort((a, b) => a.x - b.x);

  circles.forEach((circle, i) => {
    if (i < 1) return;
    let radius = circle.radius;
    let x = rgn_vals.region_rewards[0] + circle.x - radius;
    let y = rgn_vals.region_rewards[1] + circle.y - radius;
    results[i-1] = images.clip(img_gray, x, y, 2 * radius, 2 * radius);
  });

  return results;
}

// 在材料库中查找给定材料
function findMaterial(img) {
  let _getBinary = img => images.threshold(images.grayscale(img), 100, 255);
  for (let name in imgs_mtrl) {
    if (images.findImage(
      _getBinary(imgs_mtrl[name]), 
      _getBinary(img), 
      {threshold: 0.88})) {
      return name;
    }
  }
  return false;
}

// 统计龙门币和材料
function runCount(imgs) {
  let _trimNum = string => string.replace(/\*\d+/g, "");
  let _getNum = string => string.replace(/[^(\d+)]/g, "");
  let name, count;

  if (!rewards["龙门币"]) rewards["龙门币"] = 0;
  rewards["龙门币"] += +_getNum(funcs.baiduOCR(imgs.shift()));

  imgs.forEach((img, index) => {
    if (name = findMaterial(img)) {
      name = _trimNum(name);
      count = ~name.indexOf("*") ? +_getNum(name) : 1;
      if (!rewards[name]) rewards[name] = 0;
      rewards[name] += count;
    } else {
      // 保存未识别到的材料图片，然后手动添加到 IMAGES_MATERIAL.js
      //let tmp_path = files.join(files.getSdcardPath(), "Autojs/ArkKnights/tool/tmp/")
      //let date = dateFormat("ddHHMM", new Date());
      //images.save(img, tmp_path + '/' + date + '_' + index + ".png");
    }
  });
}