import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import NoPassword from '../NoPassword'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    search: '',
    passwordList: [],
    hidePassword: true,
  }

  onChangeWebsite = event => this.setState({website: event.target.value})

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  onInputSearchElement = event => {
    this.setState({search: event.target.value})
  }

  onChangeSearch = event => this.setState({search: event.target.value})

  onToggleCheckbox = () =>
    this.setState(prevState => ({
      hidePassword: !prevState.hidePassword,
    }))

  onAddPassword = event => {
    event.preventDefault()
    const {website, password, username} = this.state

    const userData = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    if (website === '' || username === '' || password === '') {
      return
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, userData],
      website: '',
      username: '',
      password: '',
    }))
  }

  onDeletePassword = id => {
    const {passwordList} = this.state
    const filteredData = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: filteredData})
  }

  render() {
    const {website, username, password, search, passwordList} = this.state
    const {hidePassword} = this.state
    console.log(hidePassword)

    const filteredData = passwordList.filter(each =>
      each.website.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <div className="bgContainer">
        <img
          className="imageLogo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="upperSectionContainer">
          <form className="formContainer " onSubmit={this.onAddPassword}>
            <h1>Add New Password</h1>
            <div className="inputElementContainer">
              <div>
                <img
                  className="websiteImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
              </div>
              <input
                type="text"
                className="inputElement"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="inputElementContainer">
              <div>
                <img
                  className="websiteImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
              </div>
              <input
                type="text"
                className="inputElement"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="inputElementContainer">
              <div>
                <img
                  className="websiteImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
              </div>
              <input
                type="password"
                className="inputElement"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            className="heroImage"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
        </div>
        <div className="lowerSectionContainer">
          <div className="bottomSectionHeader">
            <div className="passwordCount">
              <h1>Your Passwords </h1>
              <p className="count">{passwordList.length}</p>
            </div>
            <div className="inputElementContainer">
              <div>
                <img
                  className="websiteImage"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                type="search"
                className="inputElement"
                placeholder="Search"
                value={search}
                onChange={this.onInputSearchElement}
              />
            </div>
          </div>
          <hr />
          <div className="passwordCheckboxContainer">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.onToggleCheckbox}
            />
            <label htmlFor="showPassword">Show passwords</label>
          </div>
          {filteredData.length === 0 ? (
            <NoPassword />
          ) : (
            <ul className="passwordListContainer">
              {filteredData.map(each => (
                <PasswordItem
                  key={each.id}
                  data={each}
                  onRemove={this.onDeletePassword}
                  passwordIsHidden={hidePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
