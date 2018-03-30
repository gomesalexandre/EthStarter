import { actionTypes } from ".";

export function makeVisible(elem) {
  return {
    type: actionTypes.MAKE_VISIBLE,
    isVisible: true,
    elem,
  };
}
