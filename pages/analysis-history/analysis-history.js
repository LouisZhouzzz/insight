// pages/analysis-history/analysis-history.js
Page({
    data: {
        date: {
            day1: "2018-7-12",
            day2: "2018-7-08",
            day3: "2018-7-03"

        },
        items: [
            {yc: "时间1，异�"},
            {yc: "时间2，异�"},
            {yc: "时间3，异�"},
            {yc: "时间4，异�"},
            {yc: "时间5，异�"},
            {yc: "时间6，异�"},
            {yc: "时间7，异�"},
            {yc: "时间8，异�"}
        ],
        items2: [
            {yc: "时间1，异�"},
            {yc: "时间2，异�"},
            {yc: "时间3，异�"},
            {yc: "时间4，异�"}
        ],
        items3: [
            {yc: "时间1，异�"},
            {yc: "时间2，异�"},
            {yc: "时间3，异�"}
        ],
        toggle: false
    },
    navigate: function () {
        this.setData({
            toggle: !this.data.toggle
        })
    }
});