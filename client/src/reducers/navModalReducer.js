const initialState = {
  isOpen:false
};


export default function(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
}
