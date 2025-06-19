---
title: 'WeWin标签打印机'
date: '2025-06-19'
description: '关于wewin品牌打印机调用 支持批量打印'
tags: ['WEWIN', '打印机']
author: 'Thomas che'
cover: 'https://chemingqiang.oss-cn-shenzhen.aliyuncs.com/img/432368739_1369650111097904_677170420998236901_n.jpg'
---



# WeWin打印机使用

1. 先按插件 [官网文档](https://soft-makeid.yuque.com/wwprint/api) 上面有
2. 跑官网上demo测试打印机联通
3. 根据打印内容设计打印模板建议以下步骤：1、code文件设置模板预览代码 可写死数据 2、在浏览器调用看是否调起 2、再设计代码打印模板 也就是浏览器调起后选择打印会出现的预览界面 也就是打印界面（如果未出现建议调整参数 我也是这么过来的~）



## code文件配置设置


````
/**
 * 导出版本：v1.0
 * 导出时间：6/29/2021, 8:57:28 AM
 */

//初始化WewinPrintService API
var wps = typeof require !== 'undefined' ? require("./labelimage/static/WewinPrintService")() : WewinPrintService();
window.wewin = wps;
wps.fontname = "黑体";

//修改-标签预览
wps.PageViewPrint = function () {
    wps.StartPreviewTag(
        {
            title: "重庆品胜 - 资管打印 - 打印预览",
            version: "v2.0.9",
        },
        function (i) {
            var labelType = wps.ParseElement(i, "EntityTypeId");
            var Texts = wps.ParseElement(i, "Text");

            if (labelType[0] == "1001") {
                // 注册标签模板名称及编号
                wps.SetLabelName({
                    "P50-70": "0",
                });

                var selValue = wps.GetLabelName();

                if (selValue == "0") {
                    // 只允许 WEWIN H50 打印机打印
                    wps.SetPrintInfo("WEWIN H50");

                    // 定死的预览数据，格式为“字段名:字段值”
                    var fixedTexts = [
                        "设备名称:设备A",
                        "备注:无"
                    ];

                    var leftX = 10;            //左侧字段偏移
                    var rightX = 36;            // 右侧字段值适当右移
                    var startY =0;            // 起始Y坐标
                    var lineGap = 16;           // 行间距适中
                    var fontSize = 4.2;         // 字体大小
                    var underlineStr = "________________________"; // 统一长度

                    for (var idx = 0; idx < fixedTexts.length; idx++) {
                        var text = fixedTexts[idx];
                        var parts = text.split(":");
                        var fieldLabel = parts[0] + "：";
                        var fieldValue = parts[1] || "";

                        var y = startY + idx * lineGap;

                        // 左侧字段名，右对齐
                        wps.AddPreviewText({
                            str: [fieldLabel],
                            fontHeight: fontSize,
                            printWidth: 120, // 适当加宽，保证右对齐有效
                            x: leftX,
                            y: y,
                            maxH: 16.0,
                            xoffset: 0.25,
                            loffset: 0.13,
                            horizontal: wps.horizontal.right, // 右对齐
                            vertical: wps.vertical.center,
                            rotate: false,
                            rotateLowIE: { x: 0, y: 0 },
                            debug: false
                        });

                        // 右侧字段值，左对齐
                        wps.AddPreviewText({
                            str: [fieldValue],
                            fontHeight: fontSize,
                            printWidth: 80,
                            x: rightX,
                            y: y,
                            maxH: 16.0,
                            xoffset: 0.25,
                            loffset: 0.13,
                            horizontal: wps.horizontal.left, // 保持左对齐
                            vertical: wps.vertical.center,
                            rotate: false,
                            rotateLowIE: { x: 0, y: 0 },
                            debug: false
                        });


                        // 右侧字段下划线（只画一次，紧贴字段值下方）
                        wps.AddPreviewText({
                            str: [underlineStr],
                            fontHeight: 3.2,
                            printWidth: 50,
                            x: rightX,
                            y: y + fontSize + 1, // 紧贴字段值下方
                            maxH: 16.0,
                            xoffset: 0.25,
                            loffset: 0.13,
                            horizontal: wps.horizontal.left,
                            vertical: wps.vertical.center,
                            rotate: false,
                            rotateLowIE: { x: 0, y: 0 },
                            debug: false
                        });
                    }
                }
            }
        },
        function (i) {
            var labelType = wps.ParseElement(i, "EntityTypeId");
            var Codes = wps.ParseElement(i, "Code");
            var selValue = wps.GetLabelName();

            if (labelType[0] == "1001") {
                if (selValue == 0) {
                    var printTexts = Codes.slice(0, 1);
                    wps.GenerateQrcode({
                        qrcodeName: ".qrcode" + i + "1",
                        str: printTexts[0],
                        width: 21,
                        height: 21,
                    });
                }
            }
        }
    );
};
//修改-标签打印
wps.PageDoLabelPrint = function () {

    //开始调用标签打印函数
    wps.StartPrintTag(function (i) {

        //解析数据
        //EntityTypeId节点
        var labelType = wps.ParseElement(i, "EntityTypeId");
        //Text节点
        var Texts = wps.ParseElement(i, "Text");
        // 标签1(1001)
        if (labelType[0] == '1001') {
            wps.SetPrintFunc(i, print_tag1001, [Texts]);
        }
    });

}
function print_tag1001(Texts) {
    var selValue = wps.GetLabelName();

    var label = new wps.Label();
    label.labelWidth = 100;   // 标签宽度
    label.labelHeight = 70;   // 标签高度
    label.rotate = wps.rotate.rotate90; // 横向打印

    if (selValue == 0) {
        wps.StartTag(label);
        var leftX = 6;        // 左侧字段名X坐标，整体向中间偏移
        var rightX = 30;       // 右侧字段值X坐标，整体向中间偏移
        var startY = 0;       // 起始Y坐标
        var lineGap = 8;      // 行间距
        var fontSize = 4.2;    // 字体大小
        var underlineLength = 24; // 下划线长度
        var labelWidth=30;

        for (var idx = 0; idx < Texts.length; idx++) {
            var text = Texts[idx] || "";
            var parts = text.split(":");
            var fieldLabel = parts[0] + "：";
            var fieldValue = parts.length > 1 ? parts.slice(1).join(":") : "";

            var y = startY + idx * lineGap;

            // 左侧字段名，右对齐
            var leftText = new wps.TextBlock();
            leftText.str = [fieldLabel];
            leftText.x = leftX;
            leftText.y = y;
            leftText.fontHeight = fontSize;
            leftText.printWidth = labelWidth;   // 控制右对齐区域宽度 38
            leftText.maxH = 16.0;
            leftText.xoffset = 0.25;
            leftText.loffset = 0.13;
            leftText.rotate = wps.rotate.rotate0;
            leftText.horizontal = wps.horizontal.left; // 左对齐
            leftText.vertical = wps.vertical.center;
            wps.PrintText(leftText);

            // 右侧字段值，左对齐
            var rightText = new wps.TextBlock();
            rightText.str = [fieldValue];
            rightText.x = rightX;
            rightText.y = y;
            rightText.fontHeight = fontSize;
            rightText.printWidth = underlineLength;
            rightText.maxH = 16.0;
            rightText.xoffset = 0.25;
            rightText.loffset = 0.13;
            rightText.rotate = wps.rotate.rotate0;
            rightText.horizontal = wps.horizontal.left; // 左对齐
            rightText.vertical = wps.vertical.center;
            wps.PrintText(rightText);

            // 右侧字段值下方画下划线
            var underlineStr = "_________________________";
            var underlineText = new wps.TextBlock();
            underlineText.str = [underlineStr];
            underlineText.x = rightX;
            underlineText.y = y + fontSize + 2;
            underlineText.fontHeight = fontSize - 1;
            underlineText.printWidth = underlineLength ;
            underlineText.horizontal = wps.horizontal.left;
            underlineText.vertical = wps.vertical.center;
            wps.PrintText(underlineText);
        }

        wps.EndTag();
    }
}
````

## 封装XML打印体

`

```
// 里面标明使用1001模板
export default    function generatePrintXML(dataList) {
    var xml = '<Data>';
    for (var i = 0; i < dataList.length; i++) {
        var data = dataList[i];
        xml += '<Print><EntityTypeId>1001</EntityTypeId>';
        if (data.name) xml += '<Text>设备名称:' + data.name + '</Text>';
        if (data.remark) xml += '<Text>备注:' + data.remark + '</Text>';
        xml += '</Print>';
    }
    xml += '</Data>';
    return xml;
}
````

## 页面调用 支持批量


根据对象长度决定打印个数

````
            var dataList = [
                {
                    name: "设备A",
                    remark: "备注1344"
                },
                {
                    name: "设备B",
                    remark: "备注2"
                }
            ];
            
checkAndPrint(dataList)

function checkAndPrint(data) {
	console.log([data], '标签打印数据');
	const printXML = generatePrintXML(data)
	wewin.LabelPrint(printXML, {
		debug: false,//是否预览打印内容
		modal: false,
		alert: false,
		isToCDATA: false,
		imgPath: ''
	}, function (data) {
		console.log("打印回调：", data);
	});
}
````
