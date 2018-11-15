/**
 * 提供道路数据接口
 */
const express = require('express');
const router = express.Router();

const computerFeatures = require('./filter');

const gaoguoGDB = require('../../geojson/gaoguoGDB'); // 国道的geojson数据
const gaoguoGDB_cx = require('../../geojson/gaoguoGDB_cx'); // 抽稀过的国道的geojson数据
//////////////////
// 9级显示
const shengGDBt = require('../../geojson/shengGDBt'); // 省道的geojson数据
const shengGDBt_cx = require('../../geojson/shengGDBt_cx'); // 省道抽稀过后的geojson数据
//////////////////
// 12级显示
const zgdGDB = require('../../geojson/zgdGDB'); // 主干道
const zgdGDB_cx = require('../../geojson/zgdGDB_cx'); // 主干道
const xiandaoGDB = require('../../geojson/xiandaoGDB'); // 县道
const xiandaoGDB_cx = require('../../geojson/xiandaoGDB_cx'); // 县道
const gjlGDB = require('../../geojson/gjlGDB'); // 高架路
const gjlGDB_cx = require('../../geojson/gjlGDB_cx'); // 高架路
//////////////////
// 13级显示
const xiangdaoGDB = require('../../geojson/xiangdaoGDB'); // 乡道
const xiangdaoGDB_cx = require('../../geojson/xiangdaoGDB_cx'); // 乡道
const kslGDB = require('../../geojson/kslGDB'); // 快速路
const kslGDB_cx = require('../../geojson/kslGDB_cx'); // 快速路
const zadaoGDBt = require('../../geojson/zadaoGDBt'); // 匝道
// const zadaoGDBt_cx = require('../../geojson/zadaoGDBt_cx'); // 匝道
const cgdGDB = require('../../geojson/cgdGDB'); // 次干道
const cgdGDB_cx = require('../../geojson/cgdGDB_cx'); // 次干道
//////////////////
// 14级显示
const zxGDB = require('../../geojson/zxGDB'); // 支线
const zxGDB_cx = require('../../geojson/zxGDB_cx'); // 支线

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
    road.guodao = computerFeatures(gaoguoGDB, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt, bounds); // 省道
    road.zgd = computerFeatures(zgdGDB, bounds); // 主干道
    road.xiandao = computerFeatures(xiandaoGDB, bounds); // 县道
    road.gjl = computerFeatures(gjlGDB, bounds); // 高架路
    road.xiangdao = computerFeatures(xiangdaoGDB, bounds); // 乡道
    road.ksl = computerFeatures(kslGDB, bounds); // 快速路
    road.zadao = computerFeatures(zadaoGDBt, bounds); // 匝道
    road.cgd = computerFeatures(cgdGDB, bounds); // 次干道
    road.zx = computerFeatures(zxGDB, bounds); // 支线
  } else if (zoom >= 14) { 
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt_cx, bounds); // 省道
    road.zgd = computerFeatures(zgdGDB_cx, bounds); // 主干道
    road.xiandao = computerFeatures(xiandaoGDB_cx, bounds); // 县道
    road.gjl = computerFeatures(gjlGDB_cx, bounds); // 高架路
    road.xiangdao = computerFeatures(xiangdaoGDB_cx, bounds); // 乡道
    road.ksl = computerFeatures(kslGDB_cx, bounds); // 快速路
    road.zadao = computerFeatures(zadaoGDBt, bounds); // 匝道
    road.cgd = computerFeatures(cgdGDB_cx, bounds); // 次干道
    road.zx = computerFeatures(zxGDB_cx, bounds); // 支线
  } else if (zoom >= 13) {
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt_cx, bounds); // 省道
    road.zgd = computerFeatures(zgdGDB_cx, bounds); // 主干道
    road.xiandao = computerFeatures(xiandaoGDB_cx, bounds); // 县道
    road.gjl = computerFeatures(gjlGDB_cx, bounds); // 高架路
    road.xiangdao = computerFeatures(xiangdaoGDB_cx, bounds); // 乡道
    road.ksl = computerFeatures(kslGDB_cx, bounds); // 快速路
    road.zadao = computerFeatures(zadaoGDBt, bounds); // 匝道
    road.cgd = computerFeatures(cgdGDB_cx, bounds); // 次干道
    road.zx = {
      type: zxGDB_cx.type,
      features: []
    }; // 支线
  }  else if (zoom >= 12) {
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt_cx, bounds); // 省道
    road.zgd = computerFeatures(zgdGDB_cx, bounds); // 主干道
    road.xiandao = computerFeatures(xiandaoGDB_cx, bounds); // 县道
    road.gjl = computerFeatures(gjlGDB_cx, bounds); // 高架路
    road.xiangdao = {
      type: xiangdaoGDB_cx.type,
      features: []
    }; // 乡道
    road.ksl = {
      type: kslGDB_cx.type,
      features: []
    }; // 快速路
    road.zadao = {
      type: zadaoGDBt.type,
      features: []
    }; // 匝道
    road.cgd = {
      type: cgdGDB_cx.type,
      features: []
    }; // 次干道
    road.zx = {
      type: zxGDB_cx.type,
      features: []
    }; // 支线
  } else if (zoom >= 9) { // 显示抽稀过的国道和省道数据
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = computerFeatures(shengGDBt_cx, bounds); // 省道
    road.zgd = {
      "type": zgdGDB_cx.type,
      features: []
    }; // 主干道
    road.xiandao = {
      type: xiandaoGDB_cx.type,
      features: []
    }; // 县道
    road.gjl = {
      type: gjlGDB_cx.type,
      features: []
    }; // 高架路
    road.xiangdao = {
      type: xiangdaoGDB_cx.type,
      features: []
    }; // 乡道
    road.ksl = {
      type: kslGDB_cx.type,
      features: []
    }; // 快速路
    road.zadao = {
      type: zadaoGDBt.type,
      features: []
    }; // 匝道
    road.cgd = {
      type: cgdGDB_cx.type,
      features: []
    }; // 次干道
    road.zx = {
      type: zxGDB_cx.type,
      features: []
    }; // 支线
  } else { // 显示抽稀过的国道数据
    road.guodao = computerFeatures(gaoguoGDB_cx, bounds); // 国道
    road.shengdao = {
      "type": shengGDBt_cx.type,
      features: []
    }; // 省道
    road.zgd = {
      "type": zgdGDB_cx.type,
      features: []
    }; // 主干道
    road.xiandao = {
      type: xiandaoGDB_cx.type,
      features: []
    }; // 县道
    road.gjl = {
      type: gjlGDB_cx.type,
      features: []
    }; // 高架路
    road.xiangdao = {
      type: xiangdaoGDB_cx.type,
      features: []
    }; // 乡道
    road.ksl = {
      type: kslGDB_cx.type,
      features: []
    }; // 快速路
    road.zadao = {
      type: zadaoGDBt.type,
      features: []
    }; // 匝道
    road.cgd = {
      type: cgdGDB_cx.type,
      features: []
    }; // 次干道
    road.zx = {
      type: zxGDB_cx.type,
      features: []
    }; // 支线
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