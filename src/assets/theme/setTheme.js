/*
 * @Author: yzh
 * @Date: 2020-08-28 16:22:09
 * @Description: file content
 */
/**
 * 使用此方法设置主题
 *
 * 新增主题需先在此处引入新主题的.scss文件，再在themeConfig里配置主题相关组件颜色
 */

import '@/assets/styles/base.css';
import '@/assets/styles/common.css';
// import '@/assets/styles/login.css';
// import '@/assets/styles/map.css';
// import '@/assets/styles/echarts.less';
// import "./default/styls.scss";
// import './dark/styls.scss';

// 默认主题
export const defaultTheme = 'dark';
export const themeList = [
  {name: '深色', key: 'dark'},
  {name: '浅色', key: 'default'}
];

export const setTheme = (themeName = defaultTheme) => {
    // 把该主题的所有属性存到缓存
    document.body.className = themeName;
}
