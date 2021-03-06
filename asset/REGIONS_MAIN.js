module.exports = {
  "16:9": {
    coord_battle: scaleCoord({ x: 1940, y: 310 }, [2560, 1440]),
    coord_supplies: scaleCoord({ x: 470, y: 1330 }, [2560, 1440]),
    coord_chips: scaleCoord({ x: 770, y: 1330 }, [2560, 1440]),
    coord_annihilation: scaleCoord({ x: 1070, y: 1330 }, [2560, 1440]),
    coord_event_1: scaleCoord({ x: 1690, y: 1330 }, [2560, 1440]),
    coord_event_2: scaleCoord({ x: 1990, y: 1330 }, [2560, 1440]),
    coords_episode: scaleCoords({ x1: 2048, y1: 720, x2: 512, y2: 720 }, [2560, 1440]),
    coords_episode_r: scaleCoords({ x1: 512, y1: 720, x2: 2048, y2: 720 }, [2560, 1440]),
    coords_area: scaleCoords({ x1: 1330, y1: 1152, x2: 1230, y2: 1152 }, [2560, 1440]),
    coords_area_r: scaleCoords({ x1: 1230, y1: 1152, x2: 1330, y2: 1152 }, [2560, 1440]),
    region_rewards: scaleRegion([930, 1025, 1580, 300], [2560, 1440]),
  },
  "20:9": {
    coord_battle: scaleCoord({ x: 1830, y: 240 }, [2400, 1080]),
    coord_supplies: scaleCoord({ x: 350, y: 990 }, [2400, 1080]),
    coord_chips: scaleCoord({ x: 580, y: 990 }, [2400, 1080]),
    coord_annihilation: scaleCoord({ x: 810, y: 990 }, [2400, 1080]),
    coord_event_1: scaleCoord({ x: 1260, y: 990 }, [2400, 1080]),
    coord_event_2: scaleCoord({ x: 1490, y: 990 }, [2400, 1080]),
    coords_episode: scaleCoords({ x1: 1920, y1: 540, x2: 480, y2: 540 }, [2400, 1080]),
    coords_episode_r: scaleCoords({ x1: 480, y1: 540, x2: 1920, y2: 540 }, [2400, 1080]),
    coords_area: scaleCoords({ x1: 1100, y1: 864, x2: 1300, y2: 864 }, [2400, 1080]),
    coords_area_r: scaleCoords({ x1: 1300, y1: 864, x2: 1100, y2: 864 }, [2400, 1080]),
    region_rewards: scaleRegion([700, 770, 1700, 230], [2400, 1080]),
  },
};

// 按宽高比缩放坐标
function scaleCoord(coord, base_rslt) {
  let ratio = device.height / base_rslt[0];
  return { x: coord.x * ratio, y: coord.y * ratio };
}

// 按宽高比缩放坐标
function scaleCoords(coords, base_rslt) {
  let ratio = device.height / base_rslt[0];
  for (let el in coords) {
    coords[el] = coords[el] * ratio;
  }
  return coords;
}

// 按宽高比缩放区域
function scaleRegion(region, base_rslt) {
  let ratio = device.height / base_rslt[0];
  return region.map((x) => x * ratio);
}
