import React from 'react';
import styles from '../styles/contactsStyle.module.css';
import PropTypes from 'prop-types';
import slideTransition from '../../../transitions/slide.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Phonebook = ( { contactsArr, onDelete } ) => (
    <TransitionGroup component="ul" className={styles.contactsList}>
        {
            contactsArr.map( contact => (
                <CSSTransition
                    key={contact.id}
                    timeout={250}
                    unmountOnExit
                    classNames={slideTransition}
                >
                    <li
                        key={contact.id}
                        className={styles.li}
                    >
                        <p>{contact.name}</p>
                        <p>Number: {contact.number}</p>
                        <button
                            className={styles.button}
                            onClick={() => onDelete( contact.id )}>
                            delete
                        </button>
                    </li>
                </CSSTransition>
            )
            )
        }
    </TransitionGroup>
)

Phonebook.propTypes = {
    contactsArr: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Phonebook;
