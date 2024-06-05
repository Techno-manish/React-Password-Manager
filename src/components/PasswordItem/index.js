import './index.css'

const PasswordItem = props => {
  const {data, onRemove, passwordIsHidden} = props
  const {id, website, username, password} = data

  const onClickDelete = () => {
    onRemove(id)
  }
  console.log(props)
  const displayPassword = passwordIsHidden ? (
    <img
      className="starImage"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  ) : (
    password
  )
  return (
    <li className="passwordItemContainer">
      <div className="userLogo">{website[0]}</div>
      <div>
        <p className="userDetails">{website}</p>
        <p className="userDetails">{username}</p>
        <p className="userDetails">{displayPassword}</p>
      </div>
      <button
        className="deleteButton"
        type="button"
        onClick={onClickDelete}
        data-testid="dalete"
      >
        <img
          className="deleteIcon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
