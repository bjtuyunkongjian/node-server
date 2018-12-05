/**
 * 提供道路数据接口
 */
const express = require('express');
const router = express.Router();

const emptyRoad = {
  type: 'FeatureCollection',
  features: []
};

router.post('/', (req, res) => {
  const {
    bounds,
    zoom
  } = req.body;
  console.log('received!');
  res.json({
    data: 'response-data', // 返回的数据
    statusInfo: null,
    ok: true
  });
});

module.exports = router;