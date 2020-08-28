
import Vue from 'vue';
import fetch from '@/util/axios/fetch';
import store from '@/store';
import {defaultTheme} from '@/assets/theme/setTheme.js'
import vm from '@/main.js'

export default {
    getTheme(){
        var themeV = localStorage.getItem("theme");
        if(themeV == null){
            themeV = defaultTheme;
        }
        return themeV;
    },
    lget(name) {
        return localStorage.getItem(name);
    },
    lset(name, val) {
        localStorage.setItem(name, val);
    },
    removeSet(name) {
        localStorage.removeItem(name);
    },
    removeLoginInfo(name) {
        this.lset("username", "");
        store.dispatch('siteConfig/invokeUserID', "");
        store.dispatch('siteConfig/invokeUserName', "");
        store.dispatch('siteConfig/invokeUserRole', "");
        store.dispatch('siteConfig/invokeUserLastLoginTime', "");
    },
    IEVersion() {
        const userAgent = navigator.userAgent, //取得浏览器的userAgent字符串
            isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1, //判断是否IE<11浏览器
            isEdge = userAgent.indexOf("Edge") > -1 && !isIE, //判断是否IE的Edge浏览器
            isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;

        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6; //IE版本<=7
            }
        } else if (isEdge) {
            return 222; //edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1; //不是ie浏览器
        }
    },

    /**
     * 单位显示
     */
    unitShow(unit) {
        return unit ? '(' + unit + ')' : '';
    },
    
    /**
     *[单站-新-各种图初始化函数 2020年5月14日 15:21:30 lly]
     * xdata 数组 x轴的刻度 ["01:00","01:05","01:10"]
     * name  数组 每组数据的名字
     * ydata 数组 具体数据 二维数组 
     * type  line 曲线 pie 饼图 bar 柱状图
     * barwidth 数字 曲线 柱状 宽度
     */
    initECharts(xdata, name, ydata, colorGroup, type, barWidth) {
        let length = ydata.length;
        var data = [];
        var zoom = [];
        if (type == 'line') {
            zoom = [{
                    type: 'inside',
                    zoomOnMouseWheel: false,
                    start: 0,
                    end: 100,
                }

            ]
        } else {
            [{
                    type: 'inside',
                    zoomOnMouseWheel: false,
                    start: 0,
                    end: 100,
                }

            ]
        }

        for (var i = 0; i < length; i++) {
            let temp = {
                name: name[i],
                type: type,
                smooth: true, //是否平滑处理
                barGap: 0,
                barWidth: barWidth,
                symbol: 'circle',
                symbolSize: 0,
                cursor: 'default',
                data: ydata[i],
                lineStyle: {
                    width: 2,
                    shadowColor: 'rgba(37,130,247,0.2)',
                    shadowBlur: 0,
                    shadowOffsetY: 0
                },
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0,
                            color: colorGroup[i][0] // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: colorGroup[i][1] // 100% 处的颜色
                        }]
                    }
                },

            }
            data.push(temp);
        };

        return {
            grid: {
                left: '0%',
                right: 16,
                top: 7,
                bottom: '1%',
                show:false,
                containLabel: true
            },
            color: ['#FF6C15', '#2582F7'],
            tooltip: {
                // confine:true,
                trigger: 'axis',
                axisPointer: {
                    type: ''
                },
            },
            xAxis: {
                type: 'category',
                data: xdata,
                boundaryGap:false,
                axisLabel: {
                    margin: 8,
                    interval: 'auto', //type == 'year'?0:3
                    fontSize: 14,
                    color: '#757D88',
                    
                },
                axisTick: {
                    show: true,
                    interval :24
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            // dataZoom: zoom,
            yAxis: {
                type: 'value',
                minInterval: 1,
                splitNumber: 2,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    fontSize: 14,
                    margin: 30,
                    color: '#757D88'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#F3F5F9',
                        width: 1
                    }
                }
            },
            series: data
        };
    },
    
    /**
     * 处理数字小数点 
     */
    roundFun(numberRound, roundDigit) {
        if (numberRound >= 0) {
            var tempNumber = parseInt((numberRound * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
            return tempNumber;
        } else {
            var numberRound1 = -numberRound
            var tempNumber = parseInt((numberRound1 * Math.pow(10, roundDigit) + 0.5)) / Math.pow(10, roundDigit);
            return -tempNumber;
        }
    },
    
    //判断是否为设备技术运维人员
    isSupportRole(){
        let userRole = store.getters["siteConfig/renderUserRole"];//账号角色
        let roleType = store.getters["siteConfig/renderRoleType"];//角色类型
        return userRole == 2 && roleType == 2;
    },

    //判断账号是否为管理员
    isAdmin(){
        let userRole = store.getters["siteConfig/renderUserRole"];//账号角色
        return !userRole || userRole == 1;
    },

    getRoleType(type){
        if(type == "1"){
            return "水站生产管理";
        }else if(type == "2"){
            return "水站技术支持";
        }
    },
    showToastErrmsg(errmsg,defultmsg){
        // if(errmsg != null && errmsg != ""){
        //     vm.$toast(errmsg);
        // }else if(defultmsg != null && defultmsg != ""){
        //     vm.$toast(defultmsg);
        // }else{
        //     vm.$toast("获取数据失败");
        // }
    },
    /**
     * [数据回显格式化]
     * @param  {[type]} transValue [description]
     * @return {[type]}            [description]
     */
    nullValueFormat(transValue){
        return transValue ? transValue : "--";
    },
    testapi() {
        console.log('userId :>> ', store.state.settings.userId);
    }
}