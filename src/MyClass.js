import React from 'react';
// import './Countries.css';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Avatar from '@material-ui/core/Avatar';
import MuiAlert from '@material-ui/lab/Alert';
// import Moment from 'react-moment';
// import moment from 'moment';

class MyClass extends React.Component {
	constructor(props) {
		super(props);
		const columns = [
			{
				field: 'actions',
				headerName: 'Actions',
				width: 150,
				renderCell: (params) => (
					<div style={{ marginTop: 10, cursor: 'pointer', color:'#3f51b5' }}>
						<EditIcon onClick={() => this.editRow(params.value)} />
						<DeleteForIcon
							onClick={() => this.deleteRow(params.value)}
							style={{color:'red' }}
						/>
					</div>
				),
			},
			{
				field: 'picture',
				headerName: 'Avatar',
				width: 150,
				
				renderCell: (params) => (
					<div>
						<Avatar alt='' src={params.value} />
					</div>
				),
			},
			{
				field: 'firstName',
				headerName: 'Tên',
				width: 150,
			},
			{
				field: 'lastName',
				headerName: 'Họ',
				width: 150,
			},
			{
				field: 'country',
				headerName: 'Quốc gia',
				width: 150,
			},
			{
				field: 'phone',
				headerName: 'Điện thoại',
				width: 150,
			},
			{
				field: 'dob',
				headerName: 'Ngày sinh',
				width: 150,
			},
		];
		this.state = {
			columns: columns,
			students: [],
			selectedClass: props.selectedClass,
			openConfirmation: false,
			openEditor: false,
			editStudent: null,
			editedStudent: null,
			totalStudents: 0,
			maxID: 1,
			openSnackbar: false,
			snackbarInfo: '',
			severity: 'success',
		};
	}

	static getDerivedStateFromProps(props, state) {
		// console.log(
		// 	'MyClass getDerivedStateFromProps',
		// 	props.className,
		// 	props.newStudent
		// );
		let totalStudents = 0;
		if (!props.className || props.className === '') {
			totalStudents = state.students.length;
		} else {
			let displayStudents = [...state.students];
			displayStudents = displayStudents.filter(
				(data) => data.className === props.className
			);
			totalStudents = displayStudents.length;
		}
		if (props.className && props.newStudent) {
			const students = state.students;
			const newStudent = props.newStudent;

			let currentID = state.maxID;
			newStudent.id = currentID;
			newStudent.className = props.className;
			newStudent.actions = newStudent.id;

			// console.log('MyClass newStudent', newStudent, state.maxID);

			students.push(newStudent);
			++totalStudents;
			// console.log('MyClass newStudent after', newStudent, students);
			// console.log('MyClass handleTotalStudents', totalStudents);
			props.handleTotalStudents(totalStudents);
			return {
				selectedClass: props.className,
				students: students,
				totalStudents: totalStudents,
				maxID: ++currentID,
				openSnackbar: true,
				snackbarInfo: 'Thêm sinh viên thành công !',
				severity: 'success',
			};
		} else {
			if (props.className !== state.selectedClass) {
				props.handleTotalStudents(totalStudents);
			}
			return {
				selectedClass: props.className,
				totalStudents: totalStudents,
			};
		}
	}

	editRow = (id) => {
		// console.log('editRow', id);
		const editStudent = this.state.students.find(
			(student) => student.id === id
		);
		// console.log('editRow', id, editStudent);
		// console.log('editRow', id, { ...editStudent });
		if (editStudent) {
			this.setState({
				openEditor: true,
				editStudent: editStudent,
				editedStudent: { ...editStudent },
			});
		}
	};

	deleteRow = (id) => {
		const editStudent = this.state.students.find(
			(student) => student.id === id
		);
		// console.log('deleteRow', id, editStudent);
		// alert('xoá');
		if (editStudent) {
			this.setState({
				openConfirmation: true,
				editStudent: editStudent,
			});
		}
	};

	handleCloseConfirmation = (yes) => {
		// console.log('handleCloseConfirmation', yes);
		this.setState({ openConfirmation: false });
		if (yes) {
			let students = this.state.students;
			students = students.filter(
				(data) => data.id !== this.state.editStudent.id
			);
			const totalStudents = this.state.totalStudents - 1;
			// console.log('handleCloseConfirmation', students);
			this.setState({ students: students, totalStudents: totalStudents });
			this.props.handleTotalStudents(totalStudents);
			this.setState({
				openSnackbar: true,
				snackbarInfo: 'Xóa thành công !',
				severity: 'success',
			});
		}
	};

	handleCloseEditor = (yes) => {
		// console.log('handleCloseEditor', yes);
		this.setState({ openEditor: false });
		if (yes) {
			// console.log(
			// 	'handleCloseEditor: editStudent',
			// 	this.state.editStudent
			// );
			// console.log(
			// 	'handleCloseEditor: editedStudent',
			// 	this.state.editedStudent
			// );
			let students = this.state.students;
			students = students.filter(
				(data) => data.id !== this.state.editedStudent.id
			);
			students.push(this.state.editedStudent);
			this.setState({
				students: students,
				editStudent: null,
				editedStudent: null,
				openSnackbar: true,
				snackbarInfo: 'Chỉnh sửa thông tin thành công !',
				severity: 'success',
			});
		} else {
			this.setState({
				editStudent: null,
				editedStudent: null,
			});
		}
	};

	setFirstName = (event) => {
		// console.log('setFirstName', event.target.value);
		const editedStudent = this.state.editedStudent;
		editedStudent.firstName = event.target.value;
		this.setState(editedStudent);
	};

	setLastName = (event) => {
		// console.log('setLastName', event.target.value);
		const editedStudent = this.state.editedStudent;
		editedStudent.lastName = event.target.value;
		this.setState(editedStudent);
	};

	setCountry = (event) => {
		// console.log('setCountry', event.target.value);
		const editedStudent = this.state.editedStudent;
		editedStudent.country = event.target.value;
		this.setState(editedStudent);
	};

	handleSnackbarClose = () => {
		this.setState({
			openSnackbar: false,
		});
	};

	// Alert = (props) => {
	// 	return <MuiAlert elevation={6} variant='filled' {...props} />;
	// };

	// componentDidUpdate() {
	// 	console.log('componentDidUpdate');
	// 	let totalStudents = MyClass.calculateTotalStudents(
	// 		this.state.selectedClass,
	// 		this.state.students
	// 	);
	// 	this.props.handleTotalStudents(totalStudents);
	// }

	render() {
		// console.log('MyClass render', this.state.selectedClass);
		let displayStudents = [...this.state.students];
		displayStudents = displayStudents.filter(
			(data) => data.className === this.state.selectedClass
		);

		return (
			<div style={{ height: 590, width: '100%' }}>
				<DataGrid rows={displayStudents} columns={this.state.columns} />
				<Dialog
					open={this.state.openConfirmation}
					onClose={() => this.handleCloseConfirmation(false)}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<DialogTitle id='alert-dialog-title'>
						Bạn có chắc là muốn xóa sinh viên{' '}
						{this.state.editStudent?.firstName}{' '}
						{this.state.editStudent?.lastName} ?{' '}
						<Avatar alt='' src={this.state.editStudent?.picture} />
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'></DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handleCloseConfirmation(false)}
							color='primary'
						>
							Hủy
						</Button>
						<Button
							onClick={() => this.handleCloseConfirmation(true)}
							color='primary'
							autoFocus
						>
							Đồng ý
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					open={this.state.openEditor}
					onClose={this.state.handleCloseEditor}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>
						Chỉnh sửa thông tin sinh viên
					</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							margin='dense'
							id='firstName'
							onChange={this.setFirstName}
							label='Tên'
							type='text'
							defaultValue={this.state.editStudent?.firstName}
							fullWidth
						/>
						<TextField
							margin='dense'
							id='lastName'
							onChange={this.setLastName}
							label='Họ'
							type='text'
							defaultValue={this.state.editStudent?.lastName}
							fullWidth
						/>
						<TextField
							margin='dense'
							id='country'
							onChange={this.setCountry}
							label='Đất nước'
							type='text'
							defaultValue={this.state.editStudent?.country}
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => this.handleCloseEditor(false)}
							color='primary'
						>
							Hủy
						</Button>
						<Button
							onClick={() => this.handleCloseEditor(true)}
							color='primary'
						>
							Lưu
						</Button>
					</DialogActions>
				</Dialog>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
					open={this.state.openSnackbar}
					onClose={this.handleSnackbarClose}
					key={{ vertical: 'bottom', horizontal: 'right' }}
				>
					<MuiAlert
						onClose={this.handleSnackbarClose}
						severity={this.state.severity}
						variant='filled'
					>
						{this.state.snackbarInfo}
					</MuiAlert>
				</Snackbar>
			</div>
		);
	}
}

export default MyClass;
