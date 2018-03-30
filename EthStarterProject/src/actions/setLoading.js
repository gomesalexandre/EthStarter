import { actionTypes } from '../actions';
export function setLoading(isLoading) {
  return {
    type: actionTypes.SET_LOADING,
    payload: isLoading,
  };
}
