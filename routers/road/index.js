/**
 * 提供道路数据接口
 */
const express = require('express');
const router = express.Router();

const geojson = require('../../geojson');
const computerFeatures = require('./filter');

const emptyRoad = {
  type: 'FeatureCollection',
  features: []
};

router.post('/', (req, res) => {
  const {
    bounds,
    zoom
  } = req.body;
  const startTime = (new Date()).getTime();
  // console.log('开始时间 ===> ', startTime);

  const road = {}; // 所有道路信息数据
  // 国道
  if(zoom >= 15) {
    road.guodao = computerFeatures(geojson.gaoguoGDB, bounds); // 国道
    road.shengdao = computerFeatures(geojson.shengGDBt, bounds); // 省道
    road.zgd = computerFeatures(geojson.zgdGDB, bounds); // 主干道
    road.xiandao = computerFeatures(geojson.xiandaoGDB, bounds); // 县道
    road.gjl = computerFeatures(geojson.gjlGDB, bounds); // 高架路
    road.xiangdao = computerFeatures(geojson.xiangdaoGDB, bounds); // 乡道
    road.ksl = computerFeatures(geojson.kslGDB, bounds); // 快速路
    road.zadao = computerFeatures(geojson.zadaoGDBt, bounds); // 匝道
    road.cgd = computerFeatures(geojson.cgdGDB, bounds); // 次干道
    road.zx = computerFeatures(geojson.zxGDB, bounds); // 支线
  } else if (zoom >= 14) { 
    road.guodao = computerFeatures(geojson.gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(geojson.shengGDBt_cx, bounds); // 省道
    road.zgd = computerFeatures(geojson.zgdGDB_cx, bounds); // 主干道
    road.xiandao = computerFeatures(geojson.xiandaoGDB_cx, bounds); // 县道
    road.gjl = computerFeatures(geojson.gjlGDB_cx, bounds); // 高架路
    road.xiangdao = computerFeatures(geojson.xiangdaoGDB_cx, bounds); // 乡道
    road.ksl = computerFeatures(geojson.kslGDB_cx, bounds); // 快速路
    road.zadao = computerFeatures(geojson.zadaoGDBt, bounds); // 匝道
    road.cgd = computerFeatures(geojson.cgdGDB_cx, bounds); // 次干道
    road.zx = computerFeatures(geojson.zxGDB_cx, bounds); // 支线
  } else if (zoom >= 13) {
    road.guodao = computerFeatures(geojson.gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(geojson.shengGDBt_cx, bounds); // 省道
    road.zgd = computerFeatures(geojson.zgdGDB_cx, bounds); // 主干道
    road.xiandao = computerFeatures(geojson.xiandaoGDB_cx, bounds); // 县道
    road.gjl = computerFeatures(geojson.gjlGDB_cx, bounds); // 高架路
    road.xiangdao = computerFeatures(geojson.xiangdaoGDB_cx, bounds); // 乡道
    road.ksl = computerFeatures(geojson.kslGDB_cx, bounds); // 快速路
    road.zadao = computerFeatures(geojson.zadaoGDBt, bounds); // 匝道
    road.cgd = computerFeatures(geojson.cgdGDB_cx, bounds); // 次干道
    road.zx = emptyRoad; // 支线
  }  else if (zoom >= 12) {
    road.guodao = computerFeatures(geojson.gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(geojson.shengGDBt_cx, bounds); // 省道
    road.zgd = computerFeatures(geojson.zgdGDB_cx, bounds); // 主干道
    road.xiandao = computerFeatures(geojson.xiandaoGDB_cx, bounds); // 县道
    road.gjl = computerFeatures(geojson.gjlGDB_cx, bounds); // 高架路
    road.xiangdao = emptyRoad; // 乡道
    road.ksl = emptyRoad; // 快速路
    road.zadao = emptyRoad; // 匝道
    road.cgd = emptyRoad; // 次干道
    road.zx = emptyRoad; // 支线
  } else if (zoom >= 9) { // 显示抽稀过的国道和省道数据
    road.guodao = emptyRoad; // 国道
    road.shengdao = computerFeatures(geojson.shengGDBt_cx, bounds); // 省道
    road.zgd = emptyRoad; // 主干道
    road.xiandao = emptyRoad; // 县道
    road.gjl = emptyRoad; // 高架路
    road.xiangdao = emptyRoad; // 乡道
    road.ksl = emptyRoad; // 快速路
    road.zadao = emptyRoad; // 匝道
    road.cgd = emptyRoad; // 次干道
    road.zx = emptyRoad; // 支线
  } else { // 显示抽稀过的国道数据
    road.guodao = emptyRoad; // 国道
    road.shengdao = emptyRoad; // 省道
    road.zgd = emptyRoad; // 主干道
    road.xiandao = emptyRoad; // 县道
    road.gjl = emptyRoad; // 高架路
    road.xiangdao = emptyRoad; // 乡道
    road.ksl = emptyRoad; // 快速路
    road.zadao = emptyRoad; // 匝道
    road.cgd = emptyRoad; // 次干道
    road.zx = emptyRoad; // 支线
  }

  const endTime = (new Date()).getTime();
  // console.log('结束时间 ===> ', endTime);
  console.log(endTime - startTime);
  res.json({
    data: road, // 返回的数据
    statusInfo: null,
    ok: true
  });
});

module.exports = router;