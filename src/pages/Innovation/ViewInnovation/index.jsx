import React, {useEffect, useRef, useState} from "react";
import {Card} from "primereact/card";
import {PreviewMapChart, DivBuilder} from '../components'
import { Button } from 'primereact/button';
import {TabPanel, TabView} from "primereact/tabview";
import {Link, useLocation} from "react-router-dom";
import {Divider} from "primereact/divider";
import {Galleria} from "primereact/galleria";
import {Panel} from "primereact/panel";
import ReactHtmlParser from "react-html-parser";
import {ProgressBar} from "primereact/progressbar";
import {Dialog} from "primereact/dialog";
import {useDispatch, useSelector} from "react-redux";
import UserService from '../../../services/httpService/user'
import {Actions} from "../../../reducer/actions";
import axios from "axios";

const DetailedInnovation = () => {

    const dispatch = useDispatch();

    const results = useSelector((state) => state.results)

    const previewedInnovation = useSelector((state) => state.previewedInnovation)
    const setPreviewedInnovation = (payload) => dispatch({ type: Actions.SetPreviewedInnovation, payload });

    const [downloadPDF,setDownloadPDF] = useState(false)
    const [galleriaIndex, setGalleriaIndex] = useState(0)
    const [formData, setFormData] = useState([])
    const [submitter, setSubmitter] = useState({})

    let innovationUrl = "/innovation/";

    useEffect(
        () => {
            if (!previewedInnovation) {
                const temp = window.localStorage.getItem('previewedInnovation')
                if (temp) {
                    setPreviewedInnovation(JSON.parse(temp))
                }
            }
        },[]
    )

    useEffect(
        () =>{
            if (previewedInnovation) {
                setFormData(previewedInnovation.formData)
                UserService.getUserDataById(previewedInnovation.userIds[0])
                    .then(res => {
                        setSubmitter(res.user)
                    })
            }
        }, [previewedInnovation]
    )

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item margin-top-20 margin-bottom-20">
                    <h3>{data.title}</h3>
                    <div className="product-list-detail">
                        <div className="margin-bottom-20" style={{display: "flex"}}>
                            <div className="margin-right">
                                <p> <i className="fad fa-user fa-lg" style={{color: "#aa671d"}}></i> {data.submitter?.submitter_first_name} {data.submitter?.submitter_last_name}</p>
                            </div>
                            <div className="margin-right">
                                <p> <i className="fad fa-envelope fa-lg" style={{color: "#aa671d"}}></i> {data.submitter?.submitter_email}</p>
                            </div>
                            <div className="margin-right">
                                <p><i className="fad fa-calendar-edit fa-lg" style={{color: "#aa671d"}}></i> {data.last_updated}</p>
                            </div>
                        </div>
                        <p className="text-align-justify">{data.summary}</p>
                    </div>
                    <div className="product-list-action p-grid p-justify-end">
                        <Link to={innovationUrl + data.innovation_id}>
                            <Button  label="View" className="button-view-results"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if(product){
            if (layout === 'list'){
                return renderListItem(product);
            }
        }else{
            return <></>
        }
    }

    const itemTemplate2 = (item) => {
        return <img src={item} alt={item.alt} className="img-width" style={{display: 'block' }} />;
    }

    const onHide = () => {
        setDownloadPDF(false)
    }


    const onItemChange = (e) => {
        setGalleriaIndex(e.index)
    }

    const renderField = (id) => {
        const temp = formData.find(item => item.id === id)
        if (temp) {
            return temp.value
        } else {
            return ''
        }
    }

    const downloadFile = (item) => {
        axios.get(`${process.env.REACT_APP_RELAY_URL}/static/${item.name}`, {
            responseType: 'blob'
        })
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob.data]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    item.name,
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    }

    const renderAssests = (id) => {
        const temp = formData.find(item => item.id === id)
        if (temp) {
            return temp.value?.map(item => {
                if (item.type === 'image') {
                    return (
                        <div className='uploaded-image'>
                            <img src={`${process.env.REACT_APP_RELAY_URL}/static/${item.name}`} alt={'logo'} className="img-width"/>
                        </div>
                    )
                } else if (item.type === 'url') {
                    return (
                        <div className='uploaded-file'>
                            <a href={item.name} target="_blank">
                                <p>{item.title || item.name}</p>
                            </a>
                        </div>
                    )
                } else {
                    return (
                        <div className='uploaded-file'>
                            <i className="fa-solid fa-file-arrow-down" onClick={() => downloadFile(item)}/>
                            {/*<p>{item.name.split('(')[0]}</p>*/}
                            <p>{item.title || item.name?.split('(')[0]}</p>
                        </div>
                    )
                }
            })
        } else {
            return ''
        }
    }

    const renderComplex = (id) => {
        const temp = formData.find(item => item.id === id)
        if (temp) {
            if (id === '6.1') {
                return temp.value?.map(item => {
                    if (item.value?.length !== 0) {
                        return (
                            <p>{item.value[0] + ' - ' + item.value[1]}</p>
                        )
                    } else {
                        return (
                            <p></p>
                        )
                    }

                })
            } else {
                return temp.value?.map(item => {
                    if (item.value?.length !== 0) {
                        if (item.value[0]) {
                            return (
                                <p>{item.value[0].name || ''}</p>
                            )
                        }
                    } else {
                        return (
                            <p></p>
                        )
                    }
                })
            }
        }
    }

    const renderSdg = (id) => {
        const temp = formData.find(item => item.id === id)
        let allData = []
        if (temp) {
            temp.value?.map(item => {
                allData = [...allData,...item.value]
            })
            allData = allData.map(item => {
                if (item.value[0] && item.value[1] && item.value[2]) {
                    const temp2 = {code: `${item.value[0]+item.value[1]+item.value[2]}`,value: item.value?.split('-')[1]}
                    return temp2
                }
                else return {}
            })
        }
        return allData
    }

    const renderImpact = (id) => {
        const temp = formData.find(item => item.id === id)
        let allData = []
        if (temp) {
            temp.value?.map(item => {
                const temp2 = item.value?.map(it => {
                    return {value: it.value, CGIAR_impact_area: item.title}
                })
                allData = [...allData,...temp2]
            })
        }
        return allData
    }

    const countryData = (id) => {
        const temp = formData.find(item => item.id === id)
        let x
        if (temp) {
            if (results.length) {
                const countries = results.find(item => item.header === 'clarisa_countries')
                if (countries) {
                    x = countries.value?.filter(item => item.value === temp.value?.find(country => country === item.value))
                }
                return x
            } else return []
        } else {
            return []
        }

    }

    const renderPage = () => {

        let step;
        return(
            <>
                <div className="p-grid p-dir-rev innovation-container">
                    <div className="p-col innovation-col-width">
                        <Card className="margin-bottom-40">
                            <h4 className="innovation-title">{renderField('1.1')}</h4>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Summary</h2>
                            <div>{renderField('1.2')}</div>
                        </Card>
                        <Card className="margin-bottom-40">
                            <TabView>
                                <TabPanel header="Benefit/Impact">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Description of the problem the innovation provides a solution:</p>
                                        <div>{renderField('2.5')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Environmental Benefits:</p>
                                        <DivBuilder type="environmental-benefits" data={renderField('2.9')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block mini-headings-innovation">SDG Target Addressed:</p>
                                        <DivBuilder type="sdg-target" data={renderSdg('2.6')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block mini-headings-innovation">CGIAR Impact Target:</p>
                                        <DivBuilder type="impact-target" data={renderImpact('2.7')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block mini-headings-innovation">Initiative/Project outcome addressed:</p>
                                        <div>{ReactHtmlParser(renderField('2.8'))}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Value added of the innovation:</p>
                                        <div>{renderField('2.2')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Main Advantages:</p>
                                        <div>{ReactHtmlParser(renderField('2.3'))}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Main Disadvantages:</p>
                                        <div>{ReactHtmlParser(renderField('2.4'))}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Context">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Start Date:</p>
                                        <div>{renderField('3.2')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">End Date:</p>
                                        <div>{renderField('3.3')}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Evidence">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Reference Materials:</p>
                                        {/*<DivBuilder type="reference-materials" data={renderField('4.1')}></DivBuilder>*/}
                                        {renderAssests('4.1')}
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Appraisal:</p>
                                        <div>{renderField('4.2')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Appraisal Image:</p>
                                        <div>
                                            <img src={`${process.env.REACT_APP_RELAY_URL}/static/${renderField('4.3')[0]?.name}`} alt={'logo'} className="img-width" width={400}/>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Documentation available upon request to potential investors:</p>
                                        <p>{renderField('4.4')}</p>
                                        {
                                            formData.documentation_to_pottential_investors?.map(
                                                (item)=>{
                                                    return <div className="p-mb-2">{ReactHtmlParser(item)}</div>
                                                }
                                            )
                                        }

                                    </div>
                                </TabPanel>
                                <TabPanel header="Intellectual Property">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Type of Patent Number:</p>
                                        <div>{renderField('5.1')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Patent Number:</p>
                                        <div>{renderField('5.2')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Patent Office:</p>
                                        <div>{renderField('5.3')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Patent Know-How Information:</p>
                                        <a href={renderField('5.5')} target="_blank">Information URL</a>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Interventions">
                                    <div>
                                        {/*<DivBuilder type="intervention-name" data={renderField('6.1')}></DivBuilder>*/}
                                        {renderComplex('6.1')}
                                    </div>
                                    <div>
                                        <p className="display-inline-block  mini-headings-innovation">Total budget of Intervention(s):</p>
                                        <div className="margin-right-7 margin-bottom-10 margin-left-5"> {renderField('6.2')}</div>
                                    </div>
                                    <div className="margin-top-20">
                                        <Divider></Divider>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Challenge Statement:</p>
                                        <Panel toggleable>
                                            <p>{renderField('6.4')}</p>
                                        </Panel>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Objective Statement: </p>
                                        <div className="p-mb-2">{ReactHtmlParser(renderField('6.5'))}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Description: </p>
                                        <Panel toggleable>
                                            <div className="p-mb-2" style={{textAlign:"justify"}}>{ReactHtmlParser(renderField('6.6'))}</div>
                                        </Panel>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Intervention Team Members: </p>
                                        {renderComplex('6.3')}
                                        {/*<DivBuilder type="team-members" data={renderField('6.3')}></DivBuilder>*/}
                                    </div>
                                </TabPanel>
                                <TabPanel header="Investment">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Investment Sought: </p>
                                        <div>{renderField('7.1')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Type of Investment Sought:  </p>
                                        <DivBuilder type="type-sought" data={renderField('7.2')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Estimated Amount Sought in USD:  </p>
                                        <div> {renderField('7.3')}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Readiness">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Development Stage:  </p>
                                        <div className="margin-right-7 display-inline-block margin-left-5 selected-words-innovation">
                                            {renderField('8.1')}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Technology Development Project Summary:  </p>
                                        <div>{renderField('8.2')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Innovation Readiness levels of the components:  </p>
                                        {renderField('8.3')}
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Innovation Use levels of the components:  </p>
                                        <DivBuilder type="beneficiaries-innovation" data={renderField('8.4')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Scaling Readiness Level:  </p>
                                        <div>{renderField('8.5')}</div>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Scaling Readiness Score:  </p>
                                        <div>{renderField('8.6')}</div>
                                    </div>
                                </TabPanel>
                                <TabPanel header="Stakeholders">
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Users of the Innovation:</p>
                                        <DivBuilder type="users-innovation" data={renderField('9.1')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Beneficiaries of the Innovation:</p>
                                        <DivBuilder type="beneficiaries-innovation" data={renderField('9.2')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Sponsors of the Innovation:</p>
                                        <DivBuilder type="beneficiaries-innovation" data={renderField('9.3')}></DivBuilder>
                                    </div>
                                    <div className="margin-top-35">
                                        <Divider></Divider>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Innovation Partners:</p>
                                        <DivBuilder type="key-innovation-partners" data={renderField('9.4')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Scaling Partners:</p>
                                        <DivBuilder type="key-scaling-partners" data={renderField('9.5')}></DivBuilder>
                                    </div>
                                    <div>
                                        <p className="display-inline-block margin-top-20 mini-headings-innovation">Key Demand Partners:</p>
                                        <DivBuilder type="key-demand-partners" data={renderField('9.6')}></DivBuilder>
                                    </div>
                                </TabPanel>
                            </TabView>
                        </Card>
                        <Card className="margin-bottom-40 ">
                            <h2 className="innovation-heading">Image of the Innovation</h2>
                            <center>
                                {(() => {
                                    if (renderField('1.7')instanceof Array) {
                                        return renderField('1.7').map(item => {
                                            return <img src={`${process.env.REACT_APP_RELAY_URL}/static/${item.name}`}
                                                        alt={'logo'} className="img-width"/>
                                        })
                                    } else return null
                                    }
                                )()}
                            </center>

                        </Card>
                        <Card className="margin-bottom-40"  >
                            <h2 className="innovation-heading">Image of the Innovation Components</h2>
                            <Galleria
                                activeIndex={galleriaIndex}
                                value={(renderField('1.8')instanceof Array) ? renderField('1.8').map(item => {
                                    return `${process.env.REACT_APP_RELAY_URL}/static/${item.name}`
                                }) : []}
                                numVisible={5} circular
                                showIndicators
                                onItemChange={(e)=>onItemChange(e)}
                                showItemNavigators showThumbnails={false} item={itemTemplate2}/>
                        </Card>
                        {/*<Card>*/}
                        {/*    <h2 className="innovation-heading">Related Innovation(s)</h2>*/}
                        {/*    <DataView style={{padding: "10px"}} value={renderField('1.13')} layout="list"*/}
                        {/*              itemTemplate={itemTemplate}/>*/}
                        {/*</Card>*/}
                    </div>

                    <div className="p-col-fixed sidebar-container">
                        <div className="margin-bottom-40">
                            <div className="innovation-submitter-background">
                                <div style={{paddingLeft:"25px",paddingTop:"15px"}}>
                                    <h2 className="innovation-heading" style={{color:"white"}}>Innovation Submitter</h2>
                                    <div className="margin-top-20">
                                        <i className="fad fa-user fa-lg margin-right-7 white-icons-innovation" />
                                        <strong>
                                            <a href={submitter.website} target="_blank" style={{color:"#56323d"}}>
                                                {submitter.fullName}
                                            </a>
                                        </strong>
                                    </div>
                                    <div className="margin-top-20"><i className="fad fa-envelope fa-lg margin-right-7 white-icons-innovation" />
                                        <strong><span style={{color:"#56323d"}}>{submitter.email}</span>
                                        </strong>
                                    </div>
                                    <div className="margin-top-20 company-submitter-innovation">
                                        <div className="display-inline"><i className="margin-right-7" /><img src={`${process.env.REACT_APP_RELAY_URL}/static/${submitter.organizationLogo}`} width={70}/> </div>
                                        <div className="company-name-submitter-innovation margin-left-20 display-inline ">
                                            <strong><span style={{color:"#56323d"}}>{submitter.organization}</span></strong>
                                        </div>
                                    </div>
                                    <div className="margin-top-20"><i className="fad fa-globe fa-lg margin-right-7 white-icons-innovation" />
                                        <strong>
                                            <span style={{color:"#56323d"}}>{submitter.country}</span></strong>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">CGIAR Action Areas</h2>
                            <DivBuilder type="action-areas" data={renderField('2.1')}></DivBuilder>
                        </Card>
                        <Card className="margin-bottom-40">
                            <div>
                                <p className="mini-headings-innovation margin-bottom-0">Keywords:</p>
                                <DivBuilder type="keywords" data={renderField('1.5')}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Business Category:</p>
                                <DivBuilder type="business-category" data={renderField('1.3')}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Technical Field:</p>
                                <DivBuilder type="technical-field" data={renderField('1.9')}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Type of Innovation (Initially Reported):</p>
                                <DivBuilder type="type-of-innovation-old" data={renderField('1.10')}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Type of Innovation:</p>
                                <DivBuilder type="type-of-innovation-new" data={renderField('1.11')}></DivBuilder>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Administrative Scale:</p>
                                <DivBuilder type="administrative-scale" data={renderField('1.4')}></DivBuilder>
                            </div>
                            <div className="margin-top-35">
                                <Divider></Divider>
                            </div>
                            <div className="margin-top-20">
                                <p className="mini-headings-innovation margin-bottom-0">Governance Type:
                                    <span className="selected-words-innovation">{renderField('1.12')}</span></p>
                                <DivBuilder type="governance-type" data></DivBuilder>
                            </div>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Applied Evidence</h2>
                            <PreviewMapChart mapData={countryData('3.4')} mapId="map1-innovation"/>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Implementation</h2>
                            <PreviewMapChart mapData={countryData('3.1')} mapId="map2-innovation"></PreviewMapChart>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Experimental Evidence</h2>
                            <PreviewMapChart mapData={countryData('3.5')} mapId="map3-innovation"></PreviewMapChart>
                        </Card>
                        <Card className="margin-bottom-40">
                            <h2 className="innovation-heading">Locations of Impact/Profit Evidence</h2>
                            <PreviewMapChart mapData={countryData('3.6')} mapId="map4-innovation"></PreviewMapChart>
                        </Card>
                    </div>
                </div>
            </>

        );
    }

    return(

        <>

            <Dialog header="Compiling PDF ..." visible={downloadPDF}
                    position={"top"} modal style={{ width: '50vw' }}
                    onHide={() => onHide('displayPosition')}
                    draggable={false} resizable={false}
                    closable = {false}
            >
                <ProgressBar mode="indeterminate" />
            </Dialog>

            <div  id="detailed_innovation">
                {formData?renderPage():console.log()}
            </div>
        </>


    );
}

export default DetailedInnovation
