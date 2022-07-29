import React from 'react'
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Chips} from "primereact/chips";
import noImage from "../../../../../../assets/noImage.jpg";

const SelectedUserProfile = (props) => {

	const {user} = props

	return (
		<div>
			<div className="p-grid p-justify-center">
					<div className="p-grid p-justify-center vertical-container">
						<div className="-p-col-6 p-col-align-start margin-right">
							<div className="margin-bottom-40 margin-top-20">
								<div>
									<label htmlFor="firstName">Name</label>
								</div>
								<InputText disabled value={user.fullName} id="firstName" className="input-profile"></InputText>
							</div>
							<div className="margin-bottom-40">
								<div>
									<label htmlFor="email">Email</label>
								</div>
								<InputText id="email" disabled value={user.email} className="input-profile"></InputText>
							</div>
							<div className="margin-bottom-40">
								<div>
									<label htmlFor="email">Privileges</label>
								</div>
								<Chips id="privileges" disabled value={user.permissions} className="input-profile"></Chips>
							</div>
							<div className="margin-bottom-40">
								<div>
									<label htmlFor="organization">Role</label>
								</div>
								<InputText id="role" disabled value={user.role} className="input-profile"></InputText>
							</div>
						</div>
						<div className="-p-col-6 p-col-align-start" style={{maxWidth: '50%'}}>

							<div className="margin-bottom-40 margin-top-20">
								<div>
									<label htmlFor="website">Website</label>
								</div>
								<InputText id="website" disabled value={user.website} className="input-profile"></InputText>
							</div>
							<div className="margin-bottom-40">
								<div>
									<label htmlFor="country">Country</label>
								</div>
								<InputText id="country" className="input-profile" placeholder={user.country} disabled/>
							</div>
							<div>
								<label htmlFor="organization">Organization</label>
							</div>
							<InputText id="website" className="input-profile" placeholder={user.organization} disabled/>
							<div className="margin-bottom-40">
								<div style={{marginBottom: '10px'}}>
									<label htmlFor="country">Organization Logo</label>
								</div>
								{user.organizationLogo ?
									<img className='organization-logo'
									     src={`${process.env.REACT_APP_RELAY_URL}/static/${user.organizationLogo}`}
									     alt={'logo'}/> :
									<img className='organization-logo'
									     src={noImage}
									     alt={'logo'}/>
								}
							</div>
						</div>
					</div>
			</div>
		</div>
	)
}

export default SelectedUserProfile
