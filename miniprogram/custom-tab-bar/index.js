// custom-tab-bar/index.js
const util = require('../utils/util.js');
Component({
  properties: {},
  data: {
    selected: 0,
    color: '#AAB5D1',
    selectedColor: '#2B66FF',
    list: [{
      pagePath: '/pages/index/index',
      iconPath: util.imgUrl+'home/home.png',
      selectedIconPath: util.imgUrl+'home/homeSelected.png',
      text: '首页'
    }, {
      pagePath: '/pages/logs/logs',
      iconPath: util.imgUrl+'mine/mine.png',
      selectedIconPath: util.imgUrl+'mine/mineSelected.png',
      text: '我的'
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      if (e.currentTarget.dataset.index==this.data.selected && wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        });
        return;
      }
      const path = e.currentTarget.dataset.path;
      wx.switchTab({
          url:path,
        });
    }
  }
})
