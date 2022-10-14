import React, {useEffect, useRef, useState} from "react";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {Dropdown} from "primereact/dropdown";
import { Button } from 'primereact/button';
import {Toast} from "primereact/toast";
import { Chips } from 'primereact/chips';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Dialog } from 'primereact/dialog';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserService from '../../services/httpService/user'
import UploadService from '../../services/httpService/upload'
import './styles.css'
import {Actions} from "../../reducer/actions";
import noImage from '../../assets/noImage.jpg'

const ProfilePage = () => {

    const dispatch = useDispatch();

    const melUserData = useSelector((state) => state.melUserData)

    const userData = useSelector((state) => state.userData)

    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    const [selectedRole, setSelectedRole] = useState('');
    const [website, setWebsite] = useState('')
    const [organizationLogo, setOrganizationLogo] = useState('')
    const [invalidImageDialog, setInvalidImageDialog] = useState(false)

    const toast = useRef(null);

    const roles = [
        { name: 'Innovation User', code: '1',keyword: 'user' },
        { name: 'Investor/Donor', code: '2',keyword: 'donor'  },
        { name: 'Evaluator', code: '3',keyword: 'evaluator' },
        { name: 'Monitoring Officer', code: '4' ,keyword: 'monitoring_officer'},
        { name: 'Impact Assessment Officer', code: '5' ,keyword: 'impact_officer'},
        { name: 'Knowledge Sharing and Communication Officer', code: '6',keyword: 'km_officer' },
        { name: 'Project/Program Manager', code: '7',keyword: 'project_manager' }
    ];

    useEffect(
        () => {
            const temp = localStorage.getItem("selectedRole")
            if (temp) {
                setSelectedRole(roles.find(item => item.keyword === temp ))
            } else {
                if (userData.user?.role !== '') {
                    setSelectedRole(roles.find(item => item.name === userData.user?.role))
                } else {
                    setSelectedRole({keyword: ''})
                }
            }
            setWebsite(userData.user?.website)
            setOrganizationLogo(userData.user?.organizationLogo)
            console.log(userData)
        },[userData]
    )

    const onRoleChange = (e) => {
        setSelectedRole(e.value);
    }

    const saveChanges = () => {
        localStorage.setItem("selectedRole", selectedRole.keyword)
        UserService.editUser(userData.user.userId, selectedRole.name, website, organizationLogo)
            .then(res => {
                setUserData(res)
            })
        toast.current.show({severity:'success', summary: 'Profile Saved Successfully ', life: 3000});
    }

    const uploadFiles = (event)=>{

        console.log(event)

        event.files.map(item => {

            var data = new FormData();
            data.append("file", item);

            UploadService.upload(data)
                .then(res =>  {
                    setOrganizationLogo(res.filename)
                    event.options.clear()
                })
        })
    }

    const onValidationFail = (event) => {
        console.log(event)
        // confirmPopup({
        //     target: document.getElementById('upload'),
        //     message: "The image provided was invalid",
        //     icon: 'pi pi-info-circle',
        //     acceptClassName: 'p-button-danger',
        //     // accept: () => {},
        //     reject: () => {},
        // })
        setInvalidImageDialog(true)
    }

    const invalidImageDialogFooter = () => {
        return (
            <Button label="Ok" onClick={() => setInvalidImageDialog(false)}/>
        )

    }

    if (melUserData.first_name !== '') {
        return(
            <div className="profile-page">
                <Toast ref={toast} />
                <div className="peach-background-container">
                    <h3>My profile</h3>
                </div>
                <div className="p-grid p-justify-center margin-top-20">
                    <Card className='padding-50'>
                        <div style={{maxWidth: '60%'}}>
                            <p>User information is derived from MEL. In case if any updates are needed, please log in to MEL profile <a href={"https://mel.cgiar.org"}>https://mel.cgiar.org</a> to make changes</p>
                        </div>
                        <div className="p-grid p-justify-center vertical-container">
                            <div className="-p-col-6 p-col-align-start margin-right" style={{maxWidth: '50%'}}>
                                <div className="margin-bottom-40 margin-top-20">
                                    <div>
                                        <label htmlFor="firstName">First Name</label>
                                    </div>
                                    <InputText disabled value={melUserData.first_name} id="firstName" className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                    <InputText disabled value={melUserData.last_name} id="lastName" className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <InputText id="email" disabled value={melUserData.email} className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="email">Privileges</label>
                                    </div>
                                    <Chips id="privileges" disabled value={userData.user?.permissions} className="input-profile"></Chips>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="organization">Role</label>
                                    </div>
                                    <Dropdown className="input-profile"  value={selectedRole} options={roles} onChange={onRoleChange} optionLabel="name" placeholder="Choose your role"></Dropdown>
                                </div>
                                <div className="margin-bottom-40">
                                    <div style={{marginBottom: '10px'}}>
                                        <label htmlFor="website">Profile Image</label>
                                    </div>
                                    <img className='profile-image' src={`https://mel.cgiar.org/graph/getcimage/width/500/height/500/image/-user-${melUserData.photo}`} alt='profile' />
                                </div>
                            </div>
                            <div className="-p-col-6 p-col-align-start" style={{maxWidth: '50%'}}>

                                <div className="margin-bottom-40 margin-top-20">
                                    <div>
                                        <label htmlFor="website">Website</label>
                                    </div>
                                    <InputText value={website} onChange={(e) => setWebsite(e.target.value)} id="website" className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="country">Country</label>
                                    </div>
                                    <InputText id="country" className="input-profile" placeholder={melUserData.country} disabled/>
                                </div>
                                <div>
                                    <label htmlFor="organization">Organization</label>
                                </div>
                                <InputText id="website" className="input-profile" placeholder={melUserData.organization} disabled/>
                                <div className="margin-bottom-40 margin-top-55">
                                    <ConfirmPopup />
                                    <label htmlFor="organization">Upload Organization Logo - Up to 2MB</label>
                                    <FileUpload
                                        if="upload"
                                        className="upload-organization-logo"
                                        mode="basic"
                                        customUpload
                                        url={`${process.env.REACT_APP_RELAY_URL}/rtb-refactored/api/upload`}
                                        accept="image/*"
                                        maxFileSize={2000000}
                                        auto
                                        chooseLabel="Upload Organization Logo"
                                        uploadHandler={(event) => uploadFiles(event)}
                                        invalidFileSizeMessageSummary="Invalid Size"
                                        invalidFileSizeMessageDetail="Maximum Size is 2MB"
                                        onValidationFail={onValidationFail}
                                    />
                                    <Dialog header="Invalid Image" visible={invalidImageDialog} style={{ width: '50vw' }} footer={invalidImageDialogFooter} onHide={() => setInvalidImageDialog(false)}>
                                        <p>The image provided exceeded the size restriction</p>
                                    </Dialog>
                                </div>
                                <div className="margin-bottom-40">
                                    <div style={{marginBottom: '10px'}}>
                                        <label htmlFor="country">Organization Logo</label>
                                    </div>
                                    {organizationLogo ?
                                        <img className='organization-logo'
                                          src={`${process.env.REACT_APP_RELAY_URL}/static/${organizationLogo}`}
                                          alt={'logo'}/> :
                                        <img className='organization-logo'
                                            src={noImage}
                                            alt={'logo'}/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="p-grid p-justify-center margin-top-20">
                            <div className="save-profile-button">
                                <Button icon="fad fa-check" label="Save" onClick={saveChanges}></Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else return null

}

export default ProfilePage
