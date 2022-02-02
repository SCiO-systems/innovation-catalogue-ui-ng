import React, {useEffect} from "react";
// import * as am4core from "@amcharts/amcharts4/.internal/core/utils/Instance";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const BarChart = (props) => {

    useEffect(() => {

        const stringDivider = (str, width, spaceReplacer) => {

            if (!str.includes(spaceReplacer)) {

                if (str.length>width) {
                    let p=width
                    for (;p>0 && str[p]!=' ';p--) {
                    }
                    if (p>0) {
                        let left = str.substring(0, p);
                        let right = str.substring(p+1);
                        return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
                    }
                }

            }

            return str;
        }


        const simpleSDG = props.chartData.map(
            (item)=>{
                let simple = "N/A";
                if(item.value === "End poverty in all its forms everywhere"){
                    simple = "Goal 1";
                }else if(item.value === "End hunger, achieve food security and improved nutrition and promote sustainable agriculture"){
                    simple = "Goal 2";
                }else if(item.value === "Ensure healthy lives and promote well-being for all at all ages"){
                    simple = "Goal 3";
                }else if(item.value === "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all"){
                    simple = "Goal 4";
                }else if(item.value === "Achieve gender equality and empower all women and girls"){
                    simple = "Goal 5";
                }else if(item.value === "Ensure availability and sustainable management of water and sanitation for all"){
                    simple = "Goal 6";
                }else if(item.value === "Ensure access to affordable, reliable, sustainable and modern energy for all"){
                    simple = "Goal 7";
                }else if(item.value === "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all"){
                    simple = "Goal 8";
                }else if(item.value === "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation"){
                    simple = "Goal 9";
                }else if(item.value === "Reduce inequality within and among countries"){
                    simple = "Goal 10";
                }else if(item.value === "Make cities and human settlements inclusive, safe, resilient and sustainable"){
                    simple = "Goal 11";
                }else if(item.value === "Ensure sustainable consumption and production patterns"){
                    simple = "Goal 12";
                }else if(item.value === "Take urgent action to combat climate change and its impacts[b]"){
                    simple = "Goal 13";
                }else if(item.value === "Conserve and sustainably use the oceans, seas and marine resources for sustainable development"){
                    simple = "Goal 14";
                }else if(item.value === "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss"){
                    simple = "Goal 15";
                }else if(item.value === "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels"){
                    simple = "Goal 16";
                }else if(item.value === "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development"){
                    simple = "Goal 17";
                }

                const sdg = {
                    value:simple,
                    freq:item.freq
                }

                return sdg

            }
        )





        //-----------------------
        am4core.useTheme(am4themes_animated);
        //-----------------------
        let chart = am4core.create(props.chartId, am4charts.XYChart);
        //-----------------------

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "value";
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "value";
        series.dataFields.valueX = "freq";

        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        if(props.callback) {

            series.columns.template.tooltipText = "{categoryY}: {valueX} \n\n (click to filter)";
            series.columns.template.adapter.add('tooltipText', function(text, target) {

                if (props.useNAME == "true") {

                    let data = target.tooltipDataItem.dataContext;
                    let wrap_name = stringDivider(data.name, 20, "\n");
                    return "[bold]{valueX}[/] \n"+wrap_name+"\n\n (click to filter)";

                }else{
                    return "[bold]{valueX}[/] \n{categoryY}\n\n (click to filter)";
                }

            });

            series.columns.template.events.on("hit", function (ev) {

                let resultCHARTClick = {
                    term: ev.target.dataItem.categoryY,
                    type: props.filterType
                };

                if (props.useVOC == "true") {

                    resultCHARTClick = {
                        term: ev.target.dataItem.dataContext.voc_code,
                        type: props.filterType
                    };
                }

                if (props.callback) {
                    props.callback(resultCHARTClick);
                }
            });

        } else {

            series.columns.template.tooltipText = "{categoryY}: {valueX}";
            series.columns.template.adapter.add('tooltipText', function(text, target) {

                if (props.useNAME == "true") {

                    let data = target.tooltipDataItem.dataContext;
                    let wrap_name = stringDivider(data.name, 20, "\n");
                    return "[bold]{valueX}[/] \n"+wrap_name;

                }else{
                    return "[bold]{valueX}[/] \n{categoryY}";
                }

            });

        }


        let labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
            return chart.colors.getIndex(target.dataItem.index);
        });

        if(simpleSDG[0].value === "N/A"){
            // categoryAxis.sortBySeries = series;
            chart.data = props.chartData.filter(
                (x)=>{return x.value !== ""}
            );
        }else{
            // categoryAxis.sortBySeries = series;
            chart.data = simpleSDG.filter(
                (x)=>{return x.value !== ""}
            );
        }





        //----------------
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.startGrip.disabled = true;
        chart.scrollbarY.endGrip.disabled = true;
        //----------------
        categoryAxis.showOnInit = false;
        chart.events.on("ready", function () {

            let snum = parseInt(props.showNUM);
            categoryAxis.zoomToIndexes(0, snum,false,true);

        });
        //----------------
        chart.zoomOutButton.disabled = true;
        //----------------

    }, [props.chartData]);


        return (
            <div>
                <div id={props.chartId} style={{height: props.chartHeight}}></div>
            </div>
        );
}

export default BarChart
