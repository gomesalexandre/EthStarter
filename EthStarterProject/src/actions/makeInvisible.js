import { actionTypes } from ".";

export function makeInvisible(elem) {
  return {
    type: actionTypes.MAKE_INVISIBLE,
    isVisible: false,
    elem,
  };
}
