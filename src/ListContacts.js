import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    // onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  updateQuery = query => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    // const { contacts, onDeleteContact } = this.props
    const { contacts } = this.props
    const { query } = this.state

    let showingContacts
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter(contact => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    showingContacts.sort(sortBy('name'))

    return(
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Pesquisar Contatos'
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Em exibição {showingContacts.length} de {contacts.length} contatos</span><br/>
            <button onClick={this.clearQuery}>Mostrar Todos</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map(contact => (
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}>
              </div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListContacts