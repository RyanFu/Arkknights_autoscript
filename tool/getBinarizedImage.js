"ui";

let _imgs_path = files.join(files.getSdcardPath(), "Autojs/ArkKnights/tool/tmp/");
let imgs = files.listDir(_imgs_path, function (name) {
  return name.endsWith(".png");
});
let result = {};

if (imgs.length === 0) {
  console.log("未找到图片文件");
  exit();
}

ui.layout('<scroll>\
    <vertical id="main" w="*" padding="0 40px">\
    </vertical>\
  </scroll>');

function _readImage(path, binary) {
  if (binary) {
    return images.threshold(images.grayscale(images.read(path)), 100, 255);
  }
  return images.read(path);
}

imgs.forEach(function (img, index) {
  let img_name = img.replace(".png", "");
  let img_tmp = _readImage(files.join(_imgs_path, img), true);

  result[img_name] = images.toBase64(img_tmp);
  ui.main.addView(
    ui.inflate(
      "<vertical>" +
        '<img marginTop="30px" marginBottom="10px" w="400px" h="400px" id="' +
        img_name +
        '" layout_gravity="center" />' +
        '<text text="' +
        img_name +
        '" gravity="center" />' +
        "</vertical>"
    )
  );
  ui[img_name].setImageBitmap(img_tmp.bitmap);
});

if (Object.keys(result).length !== 0) {
  console.log(result);
}
