/**
 * 提供道路数据接口
 */
const express = require('express');
const router = express.Router();

const computerFeatures = require('./filter');

const gaoguoGDB = require('../../geojson/gaoguoGDB'); // 国道的geojson数据
const gaoguoGDB_cx = require('../../geojson/gaoguoGDB_cx'); // 抽稀过的国道的geojson数据
const shengGDBt = require('../../geojson/shengGDBt'); // 省道的geojson数据
const shengGDBt_cx = require('../../geojson/shengGDBt_cx'); // 省道抽稀过后的geojson数据
const xdzgdGDB = require('../../geojson/xdzgdGDB'); // 县道、主干道数据
const xdzgdGDB_cx = require('../../geojson/xdzgdGDB_cx'); // 抽稀后的县道、主干道的geojson数据

const shengVisible = 9; // 省道显示的层级
const xdzgdVisible = 11; // 县道、主干道显示层级
const cxZoom = 12; // 区分是否显示抽稀后的数据

router.post('/', (req, res) => {
  const {
    bounds,
    zoom
  } = req.body;
  const startTime = (new Date()).getTime();
  console.log('开始时间 ===> ', startTime);

  const road = {}; // 所有道路信息数据
  // 国道
  if (zoom >= cxZoom) { // 显示所有未抽稀过的数据
    road.guodao = computerFeatures(gaoguoGDB, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt, bounds); // 省道
    road.xdzgd = computerFeatures(xdzgdGDB, bounds); // 县道、主干道
  } else if (zoom >= xdzgdVisible) { // 显示所有抽稀过的数据
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt_cx, bounds); // 省道
    road.xdzgd = computerFeatures(xdzgdGDB_cx, bounds); // 县道、主干道
  } else if (zoom >= shengVisible) { // 显示抽稀过的国道和省道数据
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt_cx, bounds); // 省道
    road.xdzgd = {
      "type": xdzgdGDB_cx.type,
      features: []
    }; // 县道、主干道
  } else { // 显示抽稀过的国道数据
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = {
      "type": shengGDBt_cx.type,
      features: []
    }; // 省道
    road.xdzgd = {
      "type": xdzgdGDB_cx.type,
      features: []
    }; // 县道、主干道
  }

  const endTime = (new Date()).getTime();
  console.log('结束时间 ===> ', endTime);
  res.json({
    data: road, // 返回的数据
    statusInfo: null,
    ok: true
  });
});

module.exports = router;