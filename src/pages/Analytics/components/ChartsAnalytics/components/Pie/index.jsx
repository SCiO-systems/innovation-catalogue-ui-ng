import React, {useEffect} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


const Pie = (props) => {

    useEffect(() => {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create(props.pieId, am4charts.PieChart);

        chart.data = props.pieData;

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "freq";
        pieSeries.dataFields.category = "value";

        chart.innerRadius = am4core.percent(30);


        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.propertyFields.fill = "color";
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template
            .cursorOverStyle = [
            {
                "property": "cursor",
                "value": "pointer"
            }
        ];

        // pieSeries.alignLabels = false;
        // pieSeries.labels.template.bent = true;
        // pieSeries.labels.template.radius = 3;
        // pieSeries.labels.template.padding(0,0,0,0);
        pieSeries.labels.template.events.on("ready", hide);

        pieSeries.labels.template.text = "{category}: {value.value}";
        pieSeries.slices.template.tooltipText = "{category}: {value.value}";


        function hide(ev) {
                ev.target.hide();
        }

        pieSeries.ticks.template.disabled = true;

        let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
        shadow.opacity = 0;

        let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

        let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
        hoverShadow.opacity = 0.7;
        hoverShadow.blur = 5;

        chart.legend = new am4charts.Legend();
        chart.legend.valueLabels.template.text = "{value.value}";

        return () => chart.dispose()

    }, [props.pieData]);

    return(
        <>
            <div id={props.pieId} style={{height: "400px"}}></div>
        </>
    );
}

export default Pie
