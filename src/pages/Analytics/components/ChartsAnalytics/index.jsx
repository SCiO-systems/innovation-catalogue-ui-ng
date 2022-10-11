import React, {useEffect, useState} from "react";
import {Card} from "primereact/card";
import {Pie, BarChart, MapChart, CloudWord, RegionsMapChart} from './components'

const ChartsAnalytics = (props) =>{

    const {filterRegions, filterCountries, result} = props

    const [chartResults, setChartResults] = useState(null);
    const [charts, setCharts] = useState(null);

    const [regions, setRegions] = useState([])
    const [countries, setCountries] = useState([])

    useEffect(
        () => {
            if (result?.summaries?.regionsAnalytics && filterRegions.length) {
                let temp = [...result.summaries.regionsAnalytics]
                temp = temp.filter(item => item.name === filterRegions.find(region => item.name === region))
                setRegions([...temp])
            }
        },[filterRegions]
    )

    useEffect(
        () => {
            if (result?.summaries?.Countries && filterCountries.length) {
                let temp = [...result?.summaries?.Countries]
                temp = temp.filter(item => item.value === filterCountries.find(country => item.value === country))
                setCountries([...temp])
            }
        },[filterCountries]
    )

    useEffect(() => {
        if(props.charts && !chartResults){
            const simpleSDG = props.charts.sdg.map(
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

            let cleanImpactArea = props.charts.CGIAR_impact_area.filter(
                (x)=>{return x.value!==""}
            );
            props.charts.CGIAR_impact_area = cleanImpactArea;
            let data = props.charts;

            data.sdg = simpleSDG;

            setChartResults({...data});
        }
        console.log(countries)
        if(chartResults){

            let selectedRole = localStorage.getItem("selectedRole");
            if(selectedRole){
                if(selectedRole === "donor" || selectedRole === "project_manager"){
                    setCharts(donorAndProjectManagerCharts);
                }else if(selectedRole === "evaluator" || selectedRole === "km_officer") {
                    setCharts(evaluatorAndKmCharts);
                }else if(selectedRole === "monitoring_officer") {
                    setCharts(monitoringOfficerCharts);
                }else if(selectedRole === "impact_officer") {
                    setCharts(impactOfficerCharts);
                }else if(selectedRole === "user") {
                    setCharts(userCharts);
                }
            }

            setChartResults(chartResults)
        }

    }, [props.charts,chartResults,regions,countries]);

    //...Donor and Project Manager Displaying Charts Function...

    const donorAndProjectManagerCharts = () => {

        return (
            <>
                <div className="p-col-4 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">CGIAR Action Areas</h4>
                        <Pie pieData={props.charts.CGIAR_Action_Areas} pieId="pie-action1"></Pie>
                    </Card>
                </div>
                <div className="p-col-8 responsive-chart-100-width environmental-div-chart">
                    <Card>
                        <h4 className="analytics-h4">Environmental Benefits</h4>
                        {/*barData={chartResults.Environmental_benefits} chartId="bar-chart2"*/}
                        <BarChart
                            chartId="bar-chart2"
                            chartData={props.charts.Environmental_benefits}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>

                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">Regions of Implementation</h4>
                        {/*<BarChart barData={chartResults.Regions} chartId="bar-chart1" ></BarChart>*/}
                        <RegionsMapChart result={result} regions={regions} filterRegions={filterRegions} mapId="regions-map"></RegionsMapChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card>
                        <h4 className="analytics-h4">Countries of Implementation</h4>
                        <MapChart mapData={countries} mapId="map-id1"></MapChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Type of Innovation</h4>
                        {/*<BarChart barData={chartResults.Type_of_innovation} chartId="bar-chart3"></BarChart>*/}
                        <BarChart
                            chartId="bar-chart3"
                            chartData={props.charts.Type_of_innovation}
                            useVOC="false"
                            useNAME="false"
                            showNUM="3"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Business Category</h4>
                        {/*<BarChart barData={chartResults.Business_category} chartId="bar-chart4"></BarChart>*/}
                        <BarChart
                            chartId="bar-chart4"
                            chartData={props.charts.Business_category}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Governance Type</h4>
                        <Pie pieData={props.charts.Gοvernance_type} pieId="pie-governance1"></Pie>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Technical Field</h4>
                        {/*<BarChart barData={chartResults.Technical_field} chartId="bar-chart5"></BarChart>*/}
                        <BarChart
                            chartId="bar-chart5"
                            chartData={props.charts.Technical_field}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Keywords Trends</h4>
                        <CloudWord dataCloud={props.charts.keywords} cloudId="cloud1-id"></CloudWord>
                    </Card>
                </div>
            </>
        );
    }

    //...Evaluator and Km Officer Displaying Charts Function...

    const evaluatorAndKmCharts = () => {

        return (
            <>
                <div className="p-col-4 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">CGIAR Action Areas</h4>
                        <Pie pieData={props.charts.CGIAR_Action_Areas} pieId="pie-action2"></Pie>
                    </Card>
                </div>
                <div className="p-col-8 responsive-chart-100-width environmental-div-chart">
                    <Card>
                        <h4 className="analytics-h4">Environmental Benefits</h4>
                        <BarChart
                            chartId="bar-chart7"
                            chartData={props.charts.Environmental_benefits}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">Regions of Implementation</h4>
                        <RegionsMapChart result={result} regions={regions} filterRegions={filterRegions}  mapId="regions-map1"></RegionsMapChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card>
                        <h4 className="analytics-h4">Countries of Implementation</h4>
                        <MapChart mapData={countries} mapId="map-id2"></MapChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Type of Innovation</h4>
                        <BarChart
                            chartId="bar-chart8"
                            chartData={props.charts.Type_of_innovation}
                            useVOC="false"
                            useNAME="false"
                            showNUM="3"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Technical Field</h4>
                        <BarChart
                            chartId="bar-chart9"
                            chartData={props.charts.Technical_field}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Governance Type</h4>
                        <Pie pieData={props.charts.Gοvernance_type} pieId="pie-governance2"></Pie>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">CGIAR Impact Areas</h4>
                        {/*<BarChart barData={chartResults.CGIAR_impact_area} chartId="bar-chart10"></BarChart>*/}
                        <BarChart
                            chartId="bar-chart10"
                            chartData={props.charts.CGIAR_impact_area}
                            useVOC="false"
                            useNAME="false"
                            showNUM="4"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Sustainable Development Goals</h4>
                        <BarChart
                            chartId="bar-chart11"
                            chartData={props.charts.sdg}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Keywords Trends</h4>
                        <CloudWord dataCloud={props.charts.keywords} cloudId="cloud2-id"></CloudWord>
                    </Card>
                </div>
            </>
        );
    }

    //...Monitoring Officer Displaying Charts Function...

    const monitoringOfficerCharts = () => {

        return (
            <>
                <div className="p-col-4 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">CGIAR Action Areas</h4>
                        <Pie pieData={props.charts.CGIAR_Action_Areas} pieId="pie-action3"></Pie>
                    </Card>
                </div>
                <div className="p-col-8 responsive-chart-100-width type-innovation-div-chart">
                    <Card >
                        <h4 className="analytics-h4">Type of Innovation</h4>
                        <BarChart
                            chartId="bar-chart13"
                            chartData={props.charts.Type_of_innovation}
                            useVOC="false"
                            useNAME="false"
                            showNUM="3"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">Regions of Implementation</h4>
                        <RegionsMapChart result={result} regions={regions} filterRegions={filterRegions}  mapId="regions-map2"></RegionsMapChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card>
                        <h4 className="analytics-h4">Countries of Implementation</h4>
                        <MapChart mapData={countries} mapId="map-id3"></MapChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">CGIAR Impact Areas</h4>
                        <BarChart
                            chartId="bar-chart14"
                            chartData={props.charts.CGIAR_impact_area}
                            useVOC="false"
                            useNAME="false"
                            showNUM="4"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Sustainable Development Goals</h4>
                        <BarChart
                            chartId="bar-chart15"
                            chartData={props.charts.sdg}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Keywords Trends</h4>
                        <CloudWord dataCloud={props.charts.keywords} cloudId="cloud3-id"></CloudWord>
                    </Card>
                </div>
            </>
        );
    }

    //...Impact Officer Displaying Charts Function...

    const impactOfficerCharts = () => {

        return(
            <>
                <div className="p-col-4 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">CGIAR Action Areas</h4>
                        <Pie pieData={props.charts.CGIAR_Action_Areas} pieId="pie-action4"></Pie>
                    </Card>

                </div>
                <div className="p-col-8 responsive-chart-100-width technical-div-chart">
                    <Card>
                        <h4 className="analytics-h4">Technical Field</h4>
                        <BarChart
                            chartId="bar-chart17"
                            chartData={props.charts.Technical_field}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">Regions of Implementation</h4>
                        <RegionsMapChart result={result} regions={regions} filterRegions={filterRegions}  mapId="regions-map3"></RegionsMapChart>
                    </Card>

                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card>
                        <h4 className="analytics-h4">Countries of Implementation</h4>
                        <MapChart mapData={countries} mapId="map-id4"></MapChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">CGIAR Impact Areas</h4>
                        <BarChart
                            chartId="bar-chart18"
                            chartData={props.charts.CGIAR_impact_area}
                            useVOC="false"
                            useNAME="false"
                            showNUM="4"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Sustainable Development Goals</h4>
                        <BarChart
                            chartId="bar-chart19"
                            chartData={props.charts.sdg}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Keywords Trends</h4>
                        <CloudWord dataCloud={props.charts.keywords} cloudId="cloud4-id"></CloudWord>
                    </Card>
                </div>
            </>

        );

    }

    //...User Charts Displaying Function...

    const userCharts = () => {

        return(
            <>
                <div className="p-col-4 responsive-chart-100-width">
                    <Card className="margin-right card-chart">
                        <h4 className="analytics-h4">CGIAR Action Areas</h4>
                        <Pie pieData={props.charts.CGIAR_Action_Areas} pieId="pie-action5"></Pie>
                    </Card>
                </div>
                <div className="p-col-8 responsive-chart-100-width technical-div-chart">
                    <Card>
                        <h4 className="analytics-h4">Technical Field</h4>
                        <BarChart
                            chartId="bar-chart21"
                            chartData={props.charts.Technical_field}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card  className="margin-right card-chart">
                        <h4 className="analytics-h4">Regions of Implementation</h4>
                        <RegionsMapChart result={result} regions={regions} filterRegions={filterRegions}  mapId="regions-map4"></RegionsMapChart>
                    </Card>
                </div>
                <div className="p-col-6 margin-top-40 responsive-chart-100-width">
                    <Card>
                        <h4 className="analytics-h4">Countries of Implementation</h4>
                        <MapChart mapData={countries} mapId="map-id5"></MapChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">CGIAR Impact Areas</h4>
                        <BarChart
                            chartId="bar-chart22"
                            chartData={props.charts.CGIAR_impact_area}
                            useVOC="false"
                            useNAME="false"
                            showNUM="4"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Sustainable Development Goals</h4>
                        <BarChart
                            chartId="bar-chart23"
                            chartData={props.charts.sdg}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Environmental Benefits</h4>
                        <BarChart
                            chartId="bar-chart24"
                            chartData={props.charts.Environmental_benefits}
                            useVOC="false"
                            useNAME="false"
                            showNUM="5"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Type of Innovation</h4>
                        <BarChart
                            chartId="bar-chart25"
                            chartData={props.charts.Type_of_innovation}
                            useVOC="false"
                            useNAME="false"
                            showNUM="3"
                            chartHeight="400px">
                        </BarChart>
                    </Card>
                </div>
                <div className="p-col-12 margin-top-40">
                    <Card>
                        <h4 className="analytics-h4">Keywords Trends</h4>
                        <CloudWord dataCloud={props.charts.keywords} cloudId="cloud5-id"></CloudWord>
                    </Card>
                </div>
            </>
        );
    }

    return(
        <>
            {chartResults?charts:console.log()}
        </>
    );
}

export default ChartsAnalytics
