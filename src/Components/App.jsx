import React, { Component } from 'react';
import Form from './FormAddContact/ContactList/Form';
import ContactList from './FormAddContact/ContactList/ContactList';
import Phonebook from './FormAddContact/ContactList/Phonebook';
import { Notification } from '../Components/Notification/Notification'
import shortId from 'shortid';
import slideTransition from '../transitions/slide.module.css';
import styles from './FormAddContact/styles/phonebookStyles.module.css';
import { CSSTransition } from 'react-transition-group';

const filterContacts = ( contacts, filter ) => {
    return contacts.filter( contact => contact.name.toLowerCase().includes( filter.toLowerCase() ) )
}

export default class App extends Component {

    state = {
        contacts: [],
        filter: '',
        isOpen: false
    }

    handleAddContact = ( contact ) => {
        const contactToAdd = {
            ...contact,
            id: shortId.generate()
        }
        const { contacts } = this.state
        if( contacts.some( cont => cont.number === contact.number ) ) {
            this.toggleNotification();
            setTimeout( this.toggleNotification, 3000 );
            return
        }
        this.setState( state => ( {
            contacts: [...state.contacts, contactToAdd]
        } ) )
    }

    deleteContact = ( id ) => {
        this.setState( prevState => ( {
            contacts: prevState.contacts.filter( contact => contact.id !== id )
        } ) )
    }

    toggleNotification = () => {
        this.setState( prevState => ( { isOpen: !prevState.isOpen } ) )
    }

    contactsFilter = ( e ) => {
        this.setState( {
            filter: e.target.value
        } )
    }

    componentDidUpdate ( prevState ) {
        if( prevState.contacts !== this.state.contacts ) {
            localStorage.setItem( 'contacts', JSON.stringify( this.state.contacts ) );
        }
    }

    componentDidMount () {
        const savedContacts = localStorage.getItem( 'contacts' );

        if( savedContacts ) {
            this.setState( { contacts: JSON.parse( savedContacts ) } );
        }
    }

    render () {

        const { contacts, filter, isOpen } = this.state;

        const filteredContacts = filterContacts( contacts, filter )

        return (
            <div className={styles.main}>
                <CSSTransition in timeout={500} classNames={slideTransition} appear>
                    <h1 className={styles.title}>Phonebook</h1>
                </CSSTransition>
                <CSSTransition in={isOpen}
                    classNames={slideTransition}
                    timeout={500}
                    unmountOnExit>
                    < Notification />
                </CSSTransition>
                <Form
                    onAddContact={this.handleAddContact} />
                {
                    this.state.contacts.length > 0 &&
                    <div>
                        <ContactList
                            value={filter}
                            contactsFilter={this.contactsFilter} />
                        <Phonebook
                            contactsArr={filteredContacts}
                            onDelete={this.deleteContact} />
                    </div>
                }
            </div>
        )
    }
}