import { HOME_ADMIN_SHOW, RESET_ADMIN_SHOW } from "../actions/homeadmin";

const initialState = {
  homeShow: "Home",
};

const homeAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_ADMIN_SHOW:
      return {
        ...state,
        homeShow: action.payload,
      };
    case RESET_ADMIN_SHOW:
      return {
        ...state,
        homeShow: homeShow,
      };

    default:
      return { ...state };
  }
};

export default homeAdminReducer;
