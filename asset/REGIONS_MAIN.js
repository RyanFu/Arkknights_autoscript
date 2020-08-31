var base_rslt = {
  "16:9": [2560, 1440],
  // 其他分辨率比例和对应分辨率
  // ...
}

module.exports = {
  "16:9": {
    coord_battle: scaleCoord({x: 1940, y: 310}, base_rslt["16:9"]),
    coord_supplies: scaleCoord({x: 470, y: 1330}, base_rslt["16:9"]),
    coord_chips: scaleCoord({x: 770, y: 1330}, base_rslt["16:9"]),
    coord_annihilation: scaleCoord({x: 1070, y: 1330}, base_rslt["16:9"]),
    coord_event_1: scaleCoord({x: 1690, y: 1330}, base_rslt["16:9"]),
    coord_event_2: scaleCoord({x: 1990, y: 1330}, base_rslt["16:9"]),
    coords_episode: scaleCoords({x1: 2048, y1: 720, x2: 512, y2: 720}, base_rslt["16:9"]),
    coords_episode_r: scaleCoords({x1: 512, y1: 720, x2: 2048, y2: 720}, base_rslt["16:9"]),
    coords_area: scaleCoords({x1: 1330, y1: 1152, x2: 1230, y2: 1152}, base_rslt["16:9"]),
    coords_area_r: scaleCoords({x1: 1230, y1: 1152, x2: 1330, y2: 1152}, base_rslt["16:9"]),
    region_rewards: scaleRegion([930, 1025, 1580, 300], base_rslt["16:9"]),
  },
  // 其他分辨率比例和对应数据
  // ...
};

function scaleCoord(coord, base_rslt) {
  let ratio = device.height / base_rslt[0];
  return {x: coord.x * ratio, y: coord.y * ratio}
}

function scaleCoords(coords, base_rslt) {
  let ratio = device.height / base_rslt[0];
  for (let el in coords) {
    coords[el] = coords[el] * ratio;
  }
  return coords;
}

function scaleRegion(region, base_rslt) {
  let ratio = device.height / base_rslt[0];
  return region.map(x => x * ratio);
}