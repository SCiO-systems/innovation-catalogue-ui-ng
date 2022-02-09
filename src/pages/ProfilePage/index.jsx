import React, {useEffect, useRef, useState} from "react";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {Dropdown} from "primereact/dropdown";
import { Button } from 'primereact/button';
import {Toast} from "primereact/toast";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector((state) => state.userData)
    const setUserData = (payload) => dispatch({ type: Actions.SetUserData, payload });

    // useEffect(
    //     () => {
    //         if (userData.name === '') {
    //             navigate('/login')
    //         }
    //     }, [userData]
    // )

    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const toast = useRef(null);

    const roles = [
        { name: 'Innovation User', code: '1' },
        { name: 'Investor/Donor', code: '2' },
        { name: 'Evaluator', code: '3' },
        { name: 'Monitoring Officer', code: '4' },
        { name: 'Impact Assessment Officer', code: '5' },
        { name: 'Knowledge Sharing and Communication Officer', code: '6' },
        { name: 'Project/Program Manager', code: '7' }
    ];

    const organizations = [
        { name: 'Wageningen University and Research Centre', code: '1' },
        { name: 'Mikocheni Agricultural Research Institute', code: '2' },
        { name: 'Institut National de Recherche Agricole du Benin', code: '3' },
        { name: 'Georg-August-Universität Göttingen', code: '4' },
        { name: 'International Rice Research Institute', code: '5' },
        { name: 'National Agricultural Research Organisation (Uganda)', code: '6' },
        { name: 'Mbeya Agricultural Research and Training Institute', code: '7' },
    ];

    const onRoleChange = (e) => {
        setSelectedRole(e.value);
    }

    const onOrganizationChange = (e) => {
        setSelectedOrganization(e.value);
    }

    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Profile Saved Successfully ', life: 3000});
    }

    if (userData.first_name !== '') {
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
                                    <InputText disabled value={userData.first_name} id="firstName" className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="lastName">Last Name</label>
                                    </div>
                                    <InputText disabled value={userData.last_name} id="lastName" className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <InputText id="email" disabled value={userData.email} className="input-profile"></InputText>
                                </div>
                                <div className="margin-bottom-40">
                                    <div>
                                        <label htmlFor="organization">Role</label>
                                    </div>
                                    <Dropdown className="input-profile"  value={selectedRole} options={roles} onChange={onRoleChange} optionLabel="name" placeholder="Choose your role"></Dropdown>
                                </div>
                                <div className="margin-bottom-40 margin-top-55">
                                    <FileUpload className="upload-profile-image" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Your Profile Image" />
                                </div>
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
                                    <InputText id="country" className="input-profile"></InputText>
                                </div>
                                <div>
                                    <label htmlFor="organization">Organization</label>
                                </div>
                                <Dropdown className="input-profile" value={selectedOrganization} options={organizations} onChange={onOrganizationChange} optionLabel="name" placeholder="Select Organization"></Dropdown>
                                <div className="margin-bottom-40 margin-top-55">
                                    <FileUpload className="upload-organization-logo" mode="basic" name="demo[]" url="./upload" accept="image/*" maxFileSize={1000000} auto chooseLabel="Upload Organization Logo" />
                                </div>
                            </div>
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
