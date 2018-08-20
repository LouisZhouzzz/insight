# Insight 后台性能监控小程序

本项目是本人在珠海工行软开中心实习期间的课题，主要是研究在微信小程序上实施性能监控的可行性。
项目实践中使用 eCharts 组件对后台数据进行可视化处理，实时监控捕获后台的异常信息，
充分利用微信的消息推送机制来发送后台预警信息。

## 主要功能
* 使用图表展示后台数据
* 用户可以对图表进行收藏操作
* 提供意见反馈与留言板功能

## 组件
* 使用 sass 作为 css 的预处理器 
* 使用 gulp 作为项目自动化构建工具
* 使用 eCharts 实施数据可视化

## 体验

项目尚未发布，敬请期待。

## 项目使用

下载安装 nodejs 与 npm，运行如下指令进行构建：

````
npm install

npm run build
````

随后使用微信开发者工具打开 dist 文件夹即可。


## 微信版本要求

支持微信版本 >= 6.6.3，对应基础库版本 >= 1.9.91。

调试的时候，需要在微信开发者工具中，将“详情”下的“调试基础库”设为 1.9.91 及以上版本。

发布前，需要在 [https://mp.weixin.qq.com](https://mp.weixin.qq.com) 的“设置”页面，将“基础库最低版本设置”设为 1.9.91。当用户微信版本过低的时候，会提示用户更新。

## TODO
* 实现图表分享功能
* 意见反馈、留言板功能重构