import React, { useEffect } from 'react';
import { ListItem } from '../ListItem/ListItem.jsx';
import s from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContasctsThunk } from 'store/contacts/operations.js';
import { selectContacts, selectError, selectFilter, selectLoading } from 'store/contacts/selector.js';

export const ContactList = ({ children }) => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const filteredContacts = contacts?.filter(contact =>
    contact.name.toLowerCase().includes(filter?.toLowerCase() || '')
  );
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(123);
    dispatch(fetchContasctsThunk());
  }, [dispatch]);

  return (
    <>
      {children}
      {filteredContacts?.length === 0 ? (
        <p className={s.errorMessage}>No contacts match your search</p>
      ) : (
        <ul className={s.listOfContacts}>
          {filteredContacts?.map(({ id, name, number }) => (
            <ListItem key={id} id={id} name={name} number={number} />
          ))}
        </ul>
      )}
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
    </>
  );
};
