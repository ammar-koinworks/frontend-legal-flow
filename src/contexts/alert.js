import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  SET_ALERT: 'SET_ALERT',
};

const initialState = {
  alert: null,
  message: "",
};

const handlers = {
  [HANDLERS.SET_ALERT]: (state, action) => {
    return action.payload;
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AlertContext = createContext({ undefined });

export const AlertProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAlert = (alert, message) => {
    if (['error', 'warning', 'info', 'success', null].includes(alert)) {
      dispatch({
        type: HANDLERS.SET_ALERT,
        payload: { alert, message }
      });
    }
  };

  return (
    <AlertContext.Provider
      value={{
        ...state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node
};

export const AlertConsumer = AlertContext.Consumer;

export const useAlertContext = () => useContext(AlertContext);
