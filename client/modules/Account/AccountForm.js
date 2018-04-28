import React from 'react';
import { Form, Icon, Container, Header, Message, Button } from 'semantic-ui-react';
import InputField from './InputField';
import './Account.css';

class AccountForm extends React.Component{
	state = {
		inputFields: {
			username: this.props.userInput.username,
			password: this.props.userInput.password
		},
		errors: {
			username: '',
			password: ''
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			inputFields: { 
				username: nextProps.userInput.username,
				password: nextProps.userInput.password 
			},
			errors: { username: '', password: '' }
		});
		if(nextProps.actionType !== this.props.actionType){
			this.props.switchActionType();
		}
	}
	onInputChange = ({ name, value, error }) => {
		let { inputFields, errors } = this.state;
		inputFields[name] = value;
		errors[name] = error;
		this.setState({ inputFields, errors });
	}
	validateForm = () => {
		let { inputFields, errors } = this.state;
		let isNotValid = false;
		if(inputFields.username === '') {
			errors.username = 'Username is a required field'
			this.setState({ errors });
			isNotValid = true;
		}
		if(inputFields.password === '') {
			errors.password = 'Password is a required field'
			this.setState({ errors });
			isNotValid = true;
		}
		if(errors.username || errors.password) {
			isNotValid = true;
		}
		return isNotValid;
	}
	validateField = (value, name) => {
		if(value.length < 6) {
			return name + ' needs to have at least 6 characters'
		} else {
			return false
		}
	}
 	handleFormSubmit = () => {
 		if(this.validateForm()) return;
 		let {username, password} = this.state.inputFields;
 		let {actionType} = this.props;
 		this.props.submitAccountInfo({username, password, actionType});
	}
	render(){
		let { actionType, isLogin, userInfo, loading, submitionStatus, errorMsg } = this.props;
		let displayType = actionType[0].toUpperCase() + actionType.slice(1);
		return (
			<Form as={Container} inverted
				className="account-root" 
				warning={loading}
				success={submitionStatus === 'success'} 
				error={submitionStatus === 'error'}
			>
				<Form.Field>
					<Header as="h1" inverted color='teal'>{displayType}</Header>
					<Message warning
				      className="account-msg-loading"
				      color="orange" icon={<Icon loading name='spinner' />}
				      content={`Submitting ${actionType} information`}
				    />
					<Message success
					  className="account-msg-success"
				      color="green" icon="check circle"
				      content={`You have successfully logged in as ${userInfo && userInfo.username}!`}
				    />
				    <Message error
				      className="account-msg-error"
				      color="red" icon="warning circle"
				      content={errorMsg || "Some problem with the username or password entered"}
				    />
				</Form.Field>
				{
					!isLogin &&
					<div>
						<Form.Field>
					      <InputField name="username" 
					      	value={this.state.inputFields.username} error={this.state.errors.username} 
					      	validateField={this.validateField} 
					      	onInputChange={this.onInputChange} />
					    </Form.Field>
					    <Form.Field>
					      <InputField name="password" 
					      	value={this.state.inputFields.password} error={this.state.errors.password} 
					      	validateField={this.validateField} 
					      	onInputChange={this.onInputChange} />
					    </Form.Field>
					    <Button color="teal" inverted fluid
					    	type='submit' onClick={this.handleFormSubmit}
					    > {displayType} </Button>
					</div>
				}
			</Form>
		)
	}
} 

export default AccountForm;