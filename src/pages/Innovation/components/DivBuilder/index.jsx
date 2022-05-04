import React, {useEffect, useState} from "react";
import ReactHtmlParser from 'react-html-parser';
import goal1 from "../../../../assets/sdg/E-WEB-Goal-01.png";
import goal2 from "../../../../assets/sdg/E-WEB-Goal-02.png";
import goal3 from "../../../../assets/sdg/E-WEB-Goal-03.png";
import goal4 from "../../../../assets/sdg/E-WEB-Goal-04.png";
import goal5 from "../../../../assets/sdg/E-WEB-Goal-05.png";
import goal6 from "../../../../assets/sdg/E-WEB-Goal-06.png";
import goal7 from "../../../../assets/sdg/E-WEB-Goal-07.png";
import goal8 from "../../../../assets/sdg/E-WEB-Goal-08.png";
import goal9 from "../../../../assets/sdg/E-WEB-Goal-09.png";
import goal10 from "../../../../assets/sdg/E-WEB-Goal-10.png";
import goal11 from "../../../../assets/sdg/E-WEB-Goal-11.png";
import goal12 from "../../../../assets/sdg/E-WEB-Goal-12.png";
import goal13 from "../../../../assets/sdg/E-WEB-Goal-13.png";
import goal14 from "../../../../assets/sdg/E-WEB-Goal-14.png";
import goal15 from "../../../../assets/sdg/E-WEB-Goal-15.png";
import goal16 from "../../../../assets/sdg/E-WEB-Goal-16.png";
import goal17 from "../../../../assets/sdg/E-WEB-Goal-17.png";
import cgiar1 from "../../../../assets/cgiar/ICONS CGIAR-01.png";
import cgiar2 from "../../../../assets/cgiar/ICONS CGIAR-02.png";
import cgiar3 from "../../../../assets/cgiar/ICONS CGIAR-03.png";
import cgiar4 from "../../../../assets/cgiar/ICONS CGIAR-09.png";
import cgiar5 from "../../../../assets/cgiar/ICONS CGIAR-05.png";
import cgiar6 from "../../../../assets/cgiar/ICONS CGIAR-06.png";
import cgiar7 from "../../../../assets/cgiar/ICONS CGIAR-07.png";
import cgiar8 from "../../../../assets/cgiar/ICONS CGIAR-08.png";
import {Divider} from "primereact/divider";

const DivBuilder = (props) => {

    const [div, setDiv] = useState(null);

    useEffect(() => {

        if(props.data){
            if(props.type === "action-areas"){
                displayDivs(props.data);
            }
            if(props.type === "keywords"){
                displayDivs(props.data);
            }
            if(props.type === "business-category"){
                displayDivs(props.data);
            }
            if(props.type === "technical-field"){
                displayDivs(props.data);
            }
            if(props.type === "type-of-innovation-old"){
                displayDivs(props.data);
            }
            if(props.type === "type-of-innovation-new"){
                displayDivs(props.data);
            }
            if(props.type === "administrative-scale"){
                displayDivs(props.data);
            }
            if(props.type === "governance-type"){
                displayDivs(props.data);
            }
            if(props.type === "environmental-benefits"){
                displayDivs(props.data);
            }
            if(props.type === "sdg-target"){
                displayDivs(props.data);
            }
            if(props.type === "impact-target"){
                displayDivs(props.data);
            }
            if(props.type === "reference-materials"){
                displayDivs(props.data);
            }
            if(props.type === "intervention-name"){
                displayDivs(props.data);
            }
            if(props.type === "intervention-budget"){
                displayDivs(props.data);
            }
            if(props.type === "team-members"){
                displayDivs(props.data);
            }
            if(props.type === "type-sought"){
                displayDivs(props.data);
            }
            if(props.type === "type-sought"){
                displayDivs(props.data);
            }
            if(props.type === "users-innovation"){
                displayDivs(props.data);
            }
            if(props.type === "beneficiaries-innovation"){
                displayDivs(props.data);
            }
            if(props.type === "key-innovation-partners"){
                displayDivs(props.data);
            }
            if(props.type === "key-scaling-partners"){
                displayDivs(props.data);
            }
            if(props.type === "key-demand-partners"){
                displayDivs(props.data);
            }
            if(props.type === "intervention-name-long"){
                displayDivs(props.data);
            }
        }

    },[props.data]);

    const displayDivs = (data) => {


        let list = [];
        {
            if(Array.isArray(data)){
                let _data = data.filter(
                    (x)=>{ if (x!==''){
                        return x;
                    }}
                )
                _data.forEach(element => {
                    if (props.type === "action-areas") {
                        if(element === "Systems Transformation"){
                            list.push(<div className="margin-right display-inline"><img src={cgiar6} width={60}/></div>)
                        }
                        if(element === "Resilient Agrifood Systems"){
                            list.push(<div className="margin-right display-inline"><img src={cgiar7} width={60}/></div>)
                        }
                        if(element === "Genetic Innovation"){
                            list.push(<div className="margin-right display-inline"><img src={cgiar8} width={60}/></div>)
                        }
                    }
                    if (props.type === "keywords") {
                        list.push(<div className="margin-right-7 margin-left-5 display-inline-block selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "business-category") {
                        list.push(<div className="margin-top-20 margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "technical-field") {
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "type-of-innovation-old") {
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "type-of-innovation-new") {
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "administrative-scale") {
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "governance-type") {
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element} </div>)
                    }
                    if (props.type === "environmental-benefits") {
                        list.push(
                            <div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation">
                                {element}
                            </div>)
                    }
                    if (props.type === "sdg-target") {
                        if(element.code === "1.1" || element.code === "1.2" || element.code === "1.3" || element.code === "1.4" || element.code === "1.5" || element.code === "1.a" || element.code === "1.b") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal1} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "2.1" || element.code === "2.2" || element.code === "2.3" || element.code === "2.4" || element.code === "2.5" || element.code === "2.a" || element.code === "2.b" || element.code === "2.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal2} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "3.1" || element.code === "3.2" || element.code === "3.3" || element.code === "3.4" || element.code === "3.5" || element.code === "3.6" || element.code === "3.7" || element.code === "3.8" || element.code === "3.9" || element.code === "3.a" || element.code === "3.b" || element.code === "3.c" || element.code === "3.d") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal3} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "4.1" || element.code === "4.2" || element.code === "4.3" || element.code === "4.4" || element.code === "4.5" || element.code === "4.6" || element.code === "4.7" || element.code === "4.a" || element.code === "4.b" || element.code === "4.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal4} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "5.1" || element.code === "5.2" || element.code === "5.3" || element.code === "5.4" || element.code === "5.5" || element.code === "5.6" || element.code === "5.a" || element.code === "5.b" || element.code === "5.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal5} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "6.1" || element.code === "6.2" || element.code === "6.3" || element.code === "6.4" || element.code === "6.5" || element.code === "6.6" || element.code === "6.a" || element.code === "6.b") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal6} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "7.1" || element.code === "7.2" || element.code === "7.3" || element.code === "7.a" || element.code === "7.b") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal7} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "8.1" || element.code === "8.2" || element.code === "8.3" || element.code === "8.4" || element.code === "8.5" || element.code === "8.6" || element.code === "8.7" || element.code === "8.8" || element.code === "8.9" || element.code === "8.10" || element.code === "8.a" || element.code === "8.b") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal8} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "9.1" || element.code === "9.2" || element.code === "9.3" || element.code === "9.4" || element.code === "9.5" || element.code === "9.a" || element.code === "9.b" || element.code === "9.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal9} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "10.1" || element.code === "10.2" || element.code === "10.3" || element.code === "10.4" || element.code === "10.5" || element.code === "10.6" || element.code === "10.7" || element.code === "10.a" || element.code === "10.b" || element.code === "10.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal10} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "11.1" || element.code === "11.2" || element.code === "11.3" || element.code === "11.4" || element.code === "11.5" || element.code === "11.6" || element.code === "11.7" || element.code === "11.a" || element.code === "11.b" || element.code === "11.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal11} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "12.1" || element.code === "12.2" || element.code === "12.3" || element.code === "12.4" || element.code === "12.5" || element.code === "12.6" || element.code === "12.7" || element.code === "12.8" || element.code === "12.a" || element.code === "12.b" || element.code === "12.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal12} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "13.1" || element.code === "13.2" || element.code === "13.3" || element.code === "13.a" || element.code === "13.b") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal13} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "14.1" || element.code === "14.2" || element.code === "14.3" || element.code === "14.4" || element.code === "14.5" || element.code === "14.6" || element.code === "14.7" || element.code === "14.a" || element.code === "14.b" || element.code === "14.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal14} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "15.1" || element.code === "15.2" || element.code === "15.3" || element.code === "15.4" || element.code === "15.5" || element.code === "15.6" || element.code === "15.7" || element.code === "15.8" || element.code === "15.9" || element.code === "15.a" || element.code === "15.b" || element.code === "15.c") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal15} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "16.1" || element.code === "16.2" || element.code === "16.3" || element.code === "16.4" || element.code === "16.5" || element.code === "16.6" || element.code === "16.7" || element.code === "16.8" || element.code === "16.9" || element.code === "16.10" || element.code === "16.a" || element.code === "16.b") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal16} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                        if(element.code === "17.1" || element.code === "17.2" || element.code === "17.3" || element.code === "17.4" || element.code === "17.5" || element.code === "17.6" || element.code === "17.7" || element.code === "17.8" || element.code === "17.9" || element.code === "17.10" || element.code === "17.11" || element.code === "17.12" || element.code === "17.13" || element.code === "17.14" || element.code === "17.15" || element.code === "17.16" || element.code === "17.17" || element.code === "17.18" || element.code === "17.19") {
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"><img src={goal17} width={60}/></div>
                                    <span>{element.code} {element.value}</span>
                                </div>
                            )
                        }
                    }

                    if (props.type === "impact-target") {
                        if(element.CGIAR_impact_area === "Nutrition, health and food security"){
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> <img src={cgiar1} width={70}/> </div>
                                    <span>{element.value}</span>
                                </div>
                            )
                        }
                        if(element.CGIAR_impact_area === "Poverty reduction, livelihoods and jobs"){
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> <img src={cgiar2} width={70}/> </div>
                                    <span>{element.value}</span>
                                </div>
                            )
                        }
                        if(element.CGIAR_impact_area === "Gender equality, youth and social inclusion"){
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> <img src={cgiar3} width={70}/> </div>
                                    <span>{element.value}</span>
                                </div>
                            )
                        }
                        if(element.CGIAR_impact_area === "Climate adaptation and mitigation"){
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> <img src={cgiar4} width={70}/> </div>
                                    <span>{element.value}</span>
                                </div>
                            )
                        }
                        if(element.CGIAR_impact_area === "Environmental health and biodiversity"){
                            list.push(
                                <div className="margin-bottom-20">
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> <img src={cgiar5} width={70}/> </div>
                                    <span>{element.value}</span>
                                </div>
                            )
                        }
                    }
                    if(props.type === "reference-materials"){
                        //list.push(<div className="margin-right-7 margin-bottom-10 margin-left-5"> <a href={element} target="_blank"> Reference URL</a></div>)
                        list.push(<div className="margin-right-7 margin-bottom-10 margin-left-5"> {ReactHtmlParser(element)}</div>)
                    }
                    if (props.type === "intervention-name") {
                        list.push(
                            <div className="p-grid">
                                <div className="p-col">
                                    <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Name:</p>
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> {element.long} </div>
                                </div>
                                <div className="p-col">
                                    <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Acronym:</p>
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> {element.short} </div>
                                </div>
                                <Divider></Divider>
                            </div>
                        )
                    }
                    if (props.type === "intervention-name-long") {
                        list.push(
                            <div >
                                <div>
                                    <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Name:</p>
                                    <div className="margin-right-7 display-inline margin-left-5 margin-bottom-20"> {element.long} </div>
                                </div>
                            </div>
                        )
                    }
                    if(props.type === "intervention-budget"){
                        list.push(<div className="margin-right-7 margin-bottom-10 margin-left-5"> {element}</div>)
                    }
                    if(props.type === "team-members"){
                        list.push(<div className="margin-right-7 margin-bottom-10 margin-left-5"> {element}</div>)
                    }
                    if(props.type === "type-sought"){
                        list.push(<div className="margin-right-7 margin-bottom-10 margin-left-5"> {element}</div>)
                    }
                    if(props.type === "users-innovation"){
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element}</div>)
                    }
                    if(props.type === "beneficiaries-innovation"){
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element}</div>)
                    }
                    if(props.type === "key-innovation-partners"){
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element}</div>)
                    }
                    if(props.type === "key-scaling-partners"){
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element}</div>)
                    }
                    if(props.type === "key-demand-partners"){
                        list.push(<div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation"> {element}</div>)
                    }

                })
            }
        }


        return setDiv(list);

    }

    return (
        <>
            {div}
        </>
    );

}
export default DivBuilder
