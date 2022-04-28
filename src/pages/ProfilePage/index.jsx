import React, {useEffect, useRef, useState} from "react";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {Dropdown} from "primereact/dropdown";
import { Button } from 'primereact/button';
import {Toast} from "primereact/toast";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserService from '../../services/httpService/user'
import UploadService from '../../services/httpService/upload'
import './styles.css'

const ProfilePage = () => {

    const melUserData = useSelector((state) => state.melUserData)

    const userData = useSelector((state) => state.userData)

    const [selectedRole, setSelectedRole] = useState(null);
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
                setSelectedRole(roles.find(item => item.name === userData.user?.role))
            }
        },[userData]
    )

    const onRoleChange = (e) => {
        localStorage.setItem("selectedRole", e.value.keyword)
        setSelectedRole(e.value);
        console.log(userData.user.userId, e.value.name, userData.user.website, userData.user.organizationLogo)
        UserService.editUser(userData.user.userId, e.value.name, userData.user.website, userData.user.organizationLogo)
    }

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Profile Saved Successfully ', life: 3000});
    }

    const uploadFiles = (event)=>{

        event.files.map(item => {

            var data = new FormData();
            data.append("file", item);

            UploadService.upload(data)
                .then(res =>  {
                    console.log(res.filename)
                    UserService.editUser(userData.user.userId, userData.user.role, userData.user.website, res.filename)
                })
        })
    }

    const renderLogo = (e) => {
        return (
            <img src={`${process.env.REACT_APP_RELAY_URL}/static/${userData.user?.organizationLogo}`} alt={'logo'} />
        )
    }

    if (melUserData.first_name !== '') {
        return(
            <div>
                <Toast ref={toast} />
                <div className="peach-background-container">
                    <h3>My profile</h3>
                </div>
                <div className="p-grid p-justify-center margin-top-80 margin-bottom-80">
                    <Card className="padding-50">
                        <div className="p-grid p-justify-center vertical-container">
                            <div className="-p-col-6 p-col-align-start margin-right">
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
                                        <label htmlFor="organization">Role</label>
                                    </div>
                                    <Dropdown className="input-profile"  value={selectedRole} options={roles} onChange={onRoleChange} optionLabel="name" placeholder="Choose your role"></Dropdown>
                                </div>
                                {/*<div className="margin-bottom-40 margin-top-55">*/}
                                {/*    <FileUpload className="upload-profile-image" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Your Profile Image" />*/}
                                {/*</div>*/}
                            </div>
                            <div className="-p-col-6 p-col-align-start margin-left-40">

                                <div className="margin-bottom-40 margin-top-20">
                                    <div>
                                        <label htmlFor="website">Website</label>
                                    </div>
                                    <InputText id="website" className="input-profile"></InputText>
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
                                {/*<Dropdown className="input-profile" value={selectedOrganization} options={organizations} onChange={onOrganizationChange} optionLabel="name" placeholder="Select Organization"></Dropdown>*/}
                                <div className="margin-bottom-40 margin-top-55">
                                    <FileUpload
                                        className="upload-organization-logo"
                                        mode="basic"
                                        customUpload
                                        url={`${process.env.REACT_APP_RELAY_URL}/rtb-refactored/api/upload`}
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        auto
                                        chooseLabel="Upload Organization Logo"
                                        uploadHandler={(event) => uploadFiles(event)}
                                    />
                                    {renderLogo()}
                                </div>
                            </div>
                        </div>
                        <div className="margin-bottom-40 margin-top-55">
                            <div style={{marginBottom: '10px'}}>
                                <label htmlFor="website">Profile Image</label>
                            </div>
                            <img src={`https://mel.cgiar.org/graph/getcimage/width/500/height/500/image/-user-${melUserData.photo}`} alt='profile' style={{width:'50%'}} />
                        </div>
                        <div className="p-grid p-justify-center margin-top-20">
                            <div className="save-profile-button">
                                <Button icon="fad fa-check" label="Save" onClick={showSuccess}></Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    } else return null

}

export default ProfilePage
