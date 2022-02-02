import React, {useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_unRegionsHigh from "@amcharts/amcharts4-geodata/unRegionsHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const RegionsMapChart = (props) => {

    useEffect(() => {

        am4core.useTheme(am4themes_animated);
        let chart = am4core.create(props.mapId, am4maps.MapChart);

        let data = props.regionMapData;

        let sanityData = data.map(
            (item)=>{
                let obj = {
                    name:item.name,
                    value:item.value
                }

                if(item.id === "easternAfrica"){
                    obj.id = "eastAfrica";
                    return  obj;
                }else if(item.id === "westernAfrica"){
                    obj.id = "westAfrica";
                    return  obj;
                }else if(item.id === "southernAsia"){
                    obj.id = "southAsia";
                    return  obj;
                }else if(item.id === "southernAsia"){
                    obj.id = "southAsia";
                    return  obj;
                }else if(item.id === "south-EasternAsia"){
                    obj.id = "southeastAsia";
                    return  obj;
                }else if(item.id === "easternAsia"){
                    obj.id = "eastAsia";
                    return  obj;
                }else if(item.id === "easternEurope"){
                    obj.id = "eastEurope";
                    return  obj;
                }else if(item.id === "northernAfrica"){
                    obj.id = "northAfrica";
                    return  obj;
                }else if(item.id === "westernAsia"){
                    obj.id = "westAsia";
                    return  obj;
                }else if(item.id === "westernEurope"){
                    obj.id = "westEurope";
                    return  obj;
                }else{
                    obj.id = item.id;
                    return obj;
                }

            }
        )
        chart.geodata = am4geodata_unRegionsHigh

        chart.projection = new am4maps.projections.Miller();

        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["antarctica"];

        polygonSeries.heatRules.push({
            property: "fill",
            target: polygonSeries.mapPolygons.template,
            min: chart.colors.getIndex(1).brighten(1),
            max: chart.colors.getIndex(1).brighten(-0.3)
        });

        polygonSeries.useGeodata = true;
        polygonSeries.data = sanityData;

        let heatLegend = chart.createChild(am4maps.HeatLegend);
        heatLegend.series = polygonSeries;
        heatLegend.align = "right";
        heatLegend.valign = "bottom";
        heatLegend.width = am4core.percent(20);
        heatLegend.marginRight = am4core.percent(4);
        heatLegend.minValue = 0;
        heatLegend.maxValue = 40000000;

        let minRange = heatLegend.valueAxis.axisRanges.create();
        minRange.value = heatLegend.minValue;
        minRange.label.text = "Min";
        let maxRange = heatLegend.valueAxis.axisRanges.create();
        maxRange.value = heatLegend.maxValue;
        maxRange.label.text = "Max";

        heatLegend.valueAxis.renderer.labels.template.adapter.add("text", function(labelText) {
            return "";
        });

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name} {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeWidth = 0.5;

        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#3c5bdc");

    }, [props.regionMapData]);

    return (
        <>
            <div id={props.mapId} style={{height:"400px"}}></div>
        </>
    );

}

export default RegionsMapChart
