///////////////////////////
// 过滤函数
// 循环里面套了循环，时间充沛可以做些改进

module.exports = function (data, bounds) {
  const features = [];
  for (let item of data.features) {
    if (item.geometry.type.indexOf('Multi') === -1) { // 单数据

      const coordinates = _filterCoordinates(item.geometry.coordinates, bounds);
      coordinates.length > 0 && features.push({
        "type": "Feature",
        "geometry": {
          type: item.geometry.type,
          coordinates
        },
        "properties": item.properties
      });

    } else { // 多数据，例如 MultiLineString
      const coordArr = [];
      for (let coordinateArr of item.geometry.coordinates) { // coordinateArr 是二维数组
        const coordinates = _filterCoordinates(coordinateArr, bounds);
        coordinates.length > 0 && coordArr.push(coordinates);
      }

      coordArr.length > 0 && features.push({
        "type": "Feature",
        "geometry": {
          type: item.geometry.type,
          coordinates: coordArr
        },
        "properties": item.properties
      });
    }
  }

  return {
    "type": data.type,
    features
  };
}

// 过滤坐标
function _filterCoordinates(coordinates, bounds) {
  const _coordinates = coordinates.filter(coordinate => { // coordinate是数组
    return coordinate[0] >= bounds[0][0] &&
      coordinate[0] <= bounds[1][0] &&
      coordinate[1] <= bounds[0][1] &&
      coordinate[1] >= bounds[1][1]
  });

  if (_coordinates.length > 0) {
    // _coordStart 记录 _coordinates 第一位 在 coordinates 的位置
    const _coordStart = coordinates.indexOf(_coordinates[0]);
    // coordEnd 记录 _coordinates 最后一位 在 coordinates 的位置
    const _coordEnd = coordinates.indexOf(_coordinates[_coordinates.length - 1]);
    if (_coordStart > 0) { // 如果 _coordinates 的第一位不是 coordinates 第一位，_coordinates向前添加值
      _coordinates.unshift(coordinates[_coordStart - 1]);
    }
    if (_coordEnd < coordinates.length - 1) { // 如果 _coordinates 的最后一位不是 coordinates 最后一位，_coordinates向后添加值
      _coordinates.push(coordinates[_coordEnd + 1]);
    }
  }
  return _coordinates;
}