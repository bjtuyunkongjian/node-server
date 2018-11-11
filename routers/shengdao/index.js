const express = require('express');
const router = express.Router();
const shengGDBt = require('../../geojson/shengGDBt');
const xdzgdGDB = require('../../geojson/xdzgdGDB');

router.post('/', (req, res) => {
  const {
    arr = [
      [116.56832363498273, 36.104387027438925],
      [116.57637449251177, 36.09966251261839]
    ]
  } = req.body;

  const startTime = (new Date()).getTime();
  const features = [];
  for (let item of xdzgdGDB.features) {

    const coordinates = item.geometry.coordinates.filter(coordinate => { // coordinates是数组
      return coordinate[0] > arr[0][0] &&
        coordinate[0] < arr[1][0] &&
        coordinate[1] < arr[0][1] &&
        coordinate[1] > arr[1][1]
    });
    if (coordinates.length > 0) {
      // coordStart 记录 coordinates第一位 在 item.geometry.coordinates 的位置
      const coordStart = item.geometry.coordinates.indexOf(coordinates[0]);
      // coordEnd 记录 coordinates最后一位 在 item.geometry.coordinates 的位置
      const coordEnd = item.geometry.coordinates.indexOf(coordinates[coordinates.length - 1]);
      if (coordStart > 0) {
        coordinates.push(item.geometry.coordinates[coordStart - 1]);
      }
      if (coordEnd < item.geometry.coordinates.length - 1) {
        coordinates.push(item.geometry.coordinates[coordEnd + 1]);
      }
      coordinates.push()
      features.push({
        "type": "Feature",
        "geometry": {
          type: item.geometry.type,
          coordinates
        },
        "properties": item.properties
      });
    }
  }
  const endTime = (new Date()).getTime();
  console.log('执行时间 ===> ', endTime - startTime);

  res.json({
    data: {
      "type": xdzgdGDB.type,
      features
    }, // 返回的数据
    statusInfo: null,
    ok: true
  });
});
/**
 * [116.56667692349092, 36.10530937161843]
 * [116.578109076461, 36.098600592587104]
 *  */

module.exports = router;