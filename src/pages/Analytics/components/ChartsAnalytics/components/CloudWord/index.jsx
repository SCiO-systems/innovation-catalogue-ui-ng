import React, {useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";

const CloudWord = (props) => {

    useEffect( () => {
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create(props.cloudId, am4plugins_wordCloud.WordCloud);
        chart.fontFamily = "Courier New";
        let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
        series.randomness = 0.1;
        series.rotationThreshold = 0.5;
        series.data = props.dataCloud;

        series.dataFields.word = "value";
        series.dataFields.value = "freq";

        series.heatRules.push({
            "target": series.labels.template,
            "property": "fill",
            "min": am4core.color("#8884d8"),
            "max": am4core.color("#82ca9d"),
            "dataField": "value"
        });

        series.labels.template.tooltipText = "{word}: {value}";

        let hoverState = series.labels.template.states.create("hover");
        hoverState.properties.fill = am4core.color("#ffc657");

        let title = chart.titles.create();
        // title.text = props.cloudTitle;
        title.fontSize = 19;
        title.fontWeight = "800";
        // title.color = "#fff";
        // title.backgroundColor = "#6d6e71";
        // title.textTransform = "Uppercase";

        return () => chart.dispose()

    }, [props.dataCloud])

    return (
        <div>
            <div id={props.cloudId} style={{height:"400px"}}></div>
        </div>
    )
}

export default CloudWord
