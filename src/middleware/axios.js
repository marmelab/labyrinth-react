import axios from 'axios';

export default store => next => action => {
    next(action);
    if (action.meta && action.meta.axios) {
        axios({ ...action.meta.axios, data: action.payload }).then(response => {
            store.dispatch({
                type: action.meta.afterAction,
                payload: response.data,
            });
        });
    }
};
