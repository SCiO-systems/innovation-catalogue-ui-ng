import React, {useState,useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_unRegionsHigh from "@amcharts/amcharts4-geodata/unRegionsHigh";

const MapChart = (props) => {

    const {mapData} = props

    const [finalData, setFinalData] = useState([])

    useEffect(
        () => {
            let temp = [...mapData]
            temp = temp.map(obj => {return {id: obj.code,value: obj.freq}})
            setFinalData([...temp])
        },[mapData]
    )

    useEffect(() => {
        console.log(finalData)
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create(props.mapId, am4maps.MapChart);
        chart.geodata = am4geodata_worldHigh;
        chart.projection = new am4maps.projections.Miller();

        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.exclude = ["AQ"];

        polygonSeries.useGeodata = true;

        polygonSeries.data = [...finalData];

        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "";
        polygonTemplate.strokeWidth = 0.6;

        let as = polygonTemplate.states.create("active");
        as.properties.tooltipText = "{name} {value}";
        as.properties.fill = am4core.color("#5583C4");

        let north, south, west, east;

        chart.events.on("ready", function(ev) {
            if(finalData){
                finalData.forEach(
                    (item)=>{
                        if(!item.madeFromGeoData){
                            let country = polygonSeries.getPolygonById(item.id)
                            if (north == undefined || (country.north > north)) {
                                north = country.north;
                            }
                            if (south == undefined || (country.south < south)) {
                                south = country.south;
                            }
                            if (west == undefined || (country.west < west)) {
                                west = country.west;
                            }
                            if (east == undefined || (country.east > east)) {
                                east = country.east;
                            }
                            country.isActive = true;

                        }
                    }
                )

            }

        });

        chart.zoomToRectangle(north, east, south, west, 1, true);

        chart.smallMap = new am4maps.SmallMap();
        chart.smallMap.series.push(polygonSeries);

        chart.smallMap.rectangle.stroke = am4core.color("#5583C4");
        chart.smallMap.rectangle.strokeWidth = 2;

        chart.smallMap.background.stroke = am4core.color("#666666")
        chart.smallMap.background.strokeOpacity = 0.9;
        chart.smallMap.background.strokeWidth = 1;

        chart.smallMap.align = "left";
        chart.smallMap.valign = "top";

        let smallSeries = chart.smallMap.series.getIndex(0);
        smallSeries.mapPolygons.template.stroke = smallSeries.mapPolygons.template.fill;
        smallSeries.mapPolygons.template.strokeWidth = 1;

        chart.zoomControl = new am4maps.ZoomControl();

        let homeButton = new am4core.Button();
        homeButton.events.on("hit", function(){
            //chart.goHome();
            chart.zoomToRectangle(north, east, south, west, 1, true);

        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = chart.zoomControl;
        homeButton.insertBefore(chart.zoomControl.plusButton);

        return () => chart.dispose()

    }, [finalData]);

    return (
        <>
            <div id={props.mapId} style={{height:"400px"}}></div>
        </>
    );

}

export default MapChart
