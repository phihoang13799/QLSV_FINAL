import React from 'react';
import MyAppBar from './MyAppBar';
// import MyContent from './MyContent';
import MyClass from './MyClass';
import moment from 'moment';

//login 
// import Login from './Login';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedClass: '',
			addStudent: false,
			totalStudents: 0,
		};
	}

	handleClassChange = (selectedClass) => {
		// console.log('App chọn: ', selectedClass);
		this.setState({
			selectedClass: selectedClass,
			newStudent: null,
			className: this.state.selectedClass,
		});
	};

	handleAddStudent = () => {
		// console.log('App thêm sinh viên vào lớp: ', this.state.selectedClass);
		this.addNewStudent();
	};

	handleTotalStudents = (totalStudents) => {
		// console.log('handleTotalStudents: ', totalStudents);
		this.setState({ totalStudents: totalStudents, newStudent: null });
	};

	addNewStudent = () => {
		// console.log('addNewStudent');
		fetch('https://randomuser.me/api/?results=1')
			.then((res) => res.json())
			.then(
				(data) => {
					// console.log('data', data.results);
					let id = 1;
					const dataWithId = data.results.map((record) => {
						return {
							id: id++,
							firstName: record.name.first,
							lastName: record.name.last,
							country: record.location.country,
							phone: record.phone,
							dob: moment(record.dob.date).format('DD/MM/YYYY'),
							picture: record.picture.thumbnail,
						};
					});
					// console.log('dataWithId', dataWithId);
					this.setState({
						newStudent: dataWithId[0],
						className: this.state.selectedClass,
					});
				},
				(error) => {
					console.log('error', error);
				}
			);
	};

    handleLogout1 = () => {
		this.props.handleLogout();
		// console.log('aa')
	}
	render() {
		return (
			<div>
				<MyAppBar
					handleSelectClassChange={this.handleClassChange}
					handleAddStudent={this.handleAddStudent}
					totalStudents={this.state.totalStudents}
                    handleclickLogout={this.handleLogout1}
				/>
				
				<MyClass
					newStudent={this.state.newStudent}
					className={this.state.selectedClass}
					handleTotalStudents={this.handleTotalStudents}
				/>
			</div>
		);
	}
}

export default Main;
