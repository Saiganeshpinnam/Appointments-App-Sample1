// Write your code here
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsFavorite} = props
  const {
    appointmentInputValue,
    appointmentDateInputValue,
    isFavorite,
    id,
  } = eachAppointment

  const formattedDate = appointmentDateInputValue
    ? format(new Date(appointmentDateInputValue), 'dd MMMM yyyy, EEEE')
    : ''

  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }

  return (
    <div className="appointment-items-container">
      <li className="individual-appointment-item">
        <div className="appointment-container">
          <p className="appointment-title">{appointmentInputValue}</p>
          <button type="button" onClick={onClickFavoriteIcon}>
            <img src={starImgUrl} alt="star" className="star-image" />
          </button>
        </div>

        <p className="appointment-date">{formattedDate}</p>
      </li>
    </div>
  )
}

export default AppointmentItem
