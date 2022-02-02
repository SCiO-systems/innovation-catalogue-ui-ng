import React, {useEffect,useState} from "react";
import {Button} from "primereact/components/button/Button";
import user from "../../assets/roles/OF166L0.png";
import investor from "../../assets/roles/OF166L01.png";
import evaluator from "../../assets/roles/OF166L02.png";
import monitoring from "../../assets/roles/OF166L03.png";
import impact from "../../assets/roles/OF166L04.png";
import km from "../../assets/roles/OF166L05.png";
import manager from "../../assets/roles/OF166L06.png";
import {Card} from "primereact/card";
import {useDispatch, useSelector} from "react-redux";
import {Actions} from "../../reducer/actions";
import {useNavigate} from "react-router-dom";

const ChooseRole = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentPage = useSelector((state) => state.currentPage)
    const setCurrentPage = (payload) => dispatch({ type: Actions.SetCurrentPage, payload });

    const [role,setRole] = useState('')

    useEffect(
        () => {
            if (role !== '') {
                localStorage.setItem("selectedRole", role)
                navigate(`/${currentPage}`)
            }
        }, [role]
    )

    return(
        <div>
            <div className="peach-background-container">
                <h3>Please choose your role</h3>
            </div>
            <div className="p-grid role-cards">
                <div className="p-col-12 margin-right">
                    <Card>
                        <h4 className="heading-roles-h4">Why do you need to select a role?</h4>
                        <p>The RTB Innovation Catalog offers a single-entry point for innovations via a dashboard and simple search tool that are customized for each type of user. By selecting a type of user that best match your profile, we will be able to offer you the best user experience. </p>
                    </Card>
                </div>
                <div className="p-col-12">
                    <Card>
                        <div className="p-grid p-justify-center role-buttons ">
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("user")}> <img src={user} width={90} className="role-image"/></Button>
                                    <p>Innovation User</p>
                                </div>
                            </div>
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("donor")}><img src={investor} width={90} className="role-image"/></Button>
                                    <p>Investor/Donor</p>
                                </div>
                            </div>
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("evaluator")}><img src={evaluator} width={90} className="role-image"/></Button>
                                    <p>Evaluator</p>
                                </div>
                            </div>
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("monitoring_officer")}><img src={monitoring} width={90} className="role-image"/></Button>
                                    <p>Monitoring Officer</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-grid p-justify-center role-buttons ">
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("impact_officer")}><img src={impact} width={90} className="role-image"/></Button>
                                    <p>Impact Assessment <br/>Officer</p>
                                </div>
                            </div>
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("km_officer")}><img src={km} width={90} className="role-image"/></Button>
                                    <p>Knowledge Sharing  <br/>and Communication Officer</p>
                                </div>
                            </div>
                            <div className="p-col display-layout-role-buttons">
                                <div className="buttons-roles-hover">
                                    <Button className="p-col" onClick={() => setRole("project_manager")}><img src={manager} width={90} className="role-image"/></Button>
                                    <p>Project/Program  <br/>Manager</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

}
export default ChooseRole
