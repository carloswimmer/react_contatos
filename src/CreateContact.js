import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

class CreateContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onCreateContact) {
      this.props.onCreateContact(values)
    }
  }

  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Fechar</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Nome' />
            <input type='text' name='email' placeholder='E-mail' />
            <button>Adicionar Contato</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact