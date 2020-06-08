import React from 'react';
import styles from '../styles/contactsStyle.module.css';
import PropTypes from 'prop-types';

const ConactList = ( { value, contactsFilter } ) => (
    <div
        className={styles.contacts}
    >
        <h2>Find contacts</h2>
        <input
            className={styles.input}
            name="search" value={value}
            type="text"
            onChange={contactsFilter} />
    </div>
)

ConactList.propTypes = {
    value: PropTypes.string.isRequired,
    contactsFilter: PropTypes.func.isRequired
}

export default ConactList;
