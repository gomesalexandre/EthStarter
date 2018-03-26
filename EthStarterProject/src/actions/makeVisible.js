export function makeVisible(elem) {
  return {
    type: "MAKE_VISIBLE",
    isVisible: true,
    elem,
  };
}
