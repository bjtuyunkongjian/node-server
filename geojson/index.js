const gaoguoGDB = require('./gaoguoGDB'); // 国道的geojson数据
const gaoguoGDB_cx = require('./gaoguoGDB_50'); // 抽稀过的国道的geojson数据
// 9级显示
const shengGDBt = require('./shengGDBt'); // 省道的geojson数据
const shengGDBt_cx = require('./shengGDBt_5'); // 省道抽稀过后的geojson数据
// 12级显示
const zgdGDB = require('./zgdGDB'); // 主干道
const zgdGDB_cx = require('./zgdGDB_5'); // 主干道
const xiandaoGDB = require('./xiandaoGDB'); // 县道
const xiandaoGDB_cx = require('./xiandaoGDB_5'); // 县道
const gjlGDB = require('./gjlGDB'); // 高架路
const gjlGDB_cx = require('./gjlGDB_20'); // 高架路
// 13级显示
const xiangdaoGDB = require('./xiangdaoGDB'); // 乡道
const xiangdaoGDB_cx = require('./xiangdaoGDB_5'); // 乡道
const kslGDB = require('./kslGDB'); // 快速路
const kslGDB_cx = require('./kslGDB'); // 快速路
const zadaoGDBt = require('./zadaoGDBt'); // 匝道
// const zadaoGDBt_cx = require('./zadaoGDBt_cx'); // 匝道
const cgdGDB = require('./cgdGDB'); // 次干道
const cgdGDB_cx = require('./cgdGDB_5'); // 次干道
// 14级显示
const zxGDB = require('./zxGDB'); // 支线
const zxGDB_cx = require('./zxGDB_10'); // 支线

module.exports = {
  gaoguoGDB,
  gaoguoGDB_cx,
  shengGDBt,
  shengGDBt_cx,
  zgdGDB,
  zgdGDB_cx,
  xiandaoGDB,
  xiandaoGDB_cx,
  gjlGDB,
  gjlGDB_cx,
  xiangdaoGDB,
  xiangdaoGDB_cx,
  kslGDB,
  kslGDB_cx,
  zadaoGDBt,
  cgdGDB,
  cgdGDB_cx,
  zxGDB,
  zxGDB_cx
};