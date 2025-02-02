// Write your code here

import {Component} from 'react'

import './index.css'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

const initialappointmentsList = []

class Appointments extends Component {
  state = {
    appointmentInputValue: '',
    appointmentDateInputValue: '',
    appointmentsList: initialappointmentsList,
    showStarredOnly: false,
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {appointmentInputValue, appointmentDateInputValue} = this.state

    const newAppointment = {
      id: uuidv4(),
      appointmentInputValue,
      appointmentDateInputValue,
      isFavorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      appointmentInputValue: '',
      appointmentDateInputValue: '',
    }))
  }

  userValueAddingAppointment = event => {
    this.setState({appointmentInputValue: event.target.value})
  }

  userValueAddingDate = event => {
    this.setState({appointmentDateInputValue: event.target.value})
  }

  getFavoriteAppointments = () => {
    this.setState(prevState => ({
      showStarredOnly: !prevState.showStarredOnly,
    }))
  }

  render() {
    const {
      appointmentInputValue,
      appointmentDateInputValue,
      appointmentsList,
      showStarredOnly,
    } = this.state
    // const formattedDate = appointmentDateInputValue
    //   ? format(new Date(appointmentDateInputValue), 'dd MMMM yyyy, EEEE')
    //   : ''

    const filteredAppointmentsList = showStarredOnly
      ? appointmentsList.filter(appointment => appointment.isFavorite)
      : appointmentsList

    return (
      <div className="bg-container">
        <div className="appointments-bg-container">
          <h1 className="appointment-heading">Add Appointment</h1>
          <form onSubmit={this.onAddAppointment}>
            <div className="top-section-container">
              <div className="appointments-container">
                <div className="input-container">
                  <label htmlFor="title" className="input-heading">
                    Title
                  </label>
                  <input
                    type="text"
                    onChange={this.userValueAddingAppointment}
                    value={appointmentInputValue}
                    id="title"
                    placeholder="Title"
                    className="title-input form-control"
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="date" className="input-heading">
                    Date
                  </label>
                  <input
                    type="date"
                    onChange={this.userValueAddingDate}
                    value={appointmentDateInputValue}
                    id="date"
                    className="date-input form-control"
                  />
                </div>

                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
              <div className="img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  className="appointments-img"
                />
              </div>
            </div>
            <hr />
          </form>

          <div className="appointments-title-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              className="starred-btn"
              onClick={this.getFavoriteAppointments}
              type="button"
            >
              Starred
            </button>
          </div>
          <ul className="each-appointment-item">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
