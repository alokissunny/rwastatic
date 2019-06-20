import React, {Component} from 'react'
import { navigate } from 'gatsby-link'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import {register } from '../../service/register';
import axios from 'axios';
const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class CreateRwaPageTemplate extends Component {
  constructor (props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    let data = {};
    data.name = this.state.name;
    data.email = this.state.email;
    data.rwa = this.state.rwa;
    data.password = this.state.password;
    data.password2 = this.state.password2;
    axios
    .post("/api/subdomain/create", data)
    .then(()=> {
      navigate('/')
    })
    .catch( 
      ()=> {
      navigate('/')
      }
    )
    // register(data);

    // eslint-disable-next-line
    // fetch('/?no-cache=1', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: encode({
    //     'form-name': form.getAttribute('name'),
    //     ...this.state,
    //   }),
    // })
    //   .then(() => navigate(form.getAttribute('action')))
    //   // eslint-disable-next-line
    //   .catch(error => alert(error))
  }

  render () {
    const {title, subtitle, meta_title, meta_description} = this.props
    return (
      <div>
        <Helmet>
          <title>{meta_title}</title>
          <meta name='description' content={meta_description} />
        </Helmet>
        <section className='hero is-primary is-bold is-medium'>
          <div className='hero-body'>
            <div className='container'>
              <div className='columns'>
                <div className='column is-10 is-offset-1'>
                  <div className='section'>
                    <h1 className='title'>
                      {title}
                    </h1>
                    <h2 className='subtitle'>
                      {subtitle}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='section'>
          <div className='container'>
            <form
              name='contact'
              method='post'
              action='/contact/success'
              encType='application/x-www-form-urlencoded'
              data-netlify='true'
              data-netlify-honeypot='bot-field'
              onSubmit={this.handleSubmit}
            >
              <input type='hidden' name='form-name' value='contact' />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name='bot-field' onChange={this.handleChange} />
                </label>
              </div>
              <div className='field'>
                <label className='label'>Name</label>
                <div className='control'>
                  <input className='input' type='text' placeholder='Full Name' name='name' id='name' onChange={this.handleChange} />
                </div>
              </div>
              <div className='field'>
                <label className='label'>RWA Id</label>
                <div className='control'>
                  <input className='input' type='text' placeholder='Enter unique RWA  name' name='rwa' id='rwa' onChange={this.handleChange} />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                  <input className='input' type='email' placeholder='Email' name='email' id='email' onChange={this.handleChange} />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                  <input className='input' type='password' placeholder='Password' name='password' id='password' onChange={this.handleChange} />
                </div>
              </div>
              <div className='field'>
                <label className='label'>Confirm Password</label>
                <div className='control'>
                  <input className='input' type='password' placeholder='Confirm Password' name='password2' id='password2' onChange={this.handleChange} />
                </div>
              </div>


              <div className='field'>
                <label className='label'>Address</label>
                <div className='control'>
                  <textarea className='textarea' placeholder='Address' name='address' id='address' rows='6' onChange={this.handleChange} />
                </div>
              </div>

              <div className='field is-grouped is-pulled-right'>
                <div className='control'>
                  <button className='button is-text' type='reset'>Cancel</button>
                </div>
                <div className='control'>
                  <button className='button is-primary' type='submit' disabled={(!this.state.name) || (!this.state.email) || (!this.state.address) || (!this.state.rwa) ||
                   (!this.state.password)|| (!this.state.password2)}>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    )
  }
};

CreateRwaPageTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  meta_title: PropTypes.string,
  meta_description: PropTypes.string,
}

export default CreateRwaPageTemplate
