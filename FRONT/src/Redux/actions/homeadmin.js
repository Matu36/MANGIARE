export const HOME_ADMIN_SHOW = "HOME_ADMIN_SHOW";
export const RESET_ADMIN_SHOW = "RESET_ADMIN_SHOW";

export const changeHomeAdminShow = (payload) => async (dispatch) => {
  return dispatch({ type: HOME_ADMIN_SHOW, payload: payload });
};
export const resetHomeAdminShow = () => async (dispatch) => {
  return dispatch({ type: RESET_ADMIN_SHOW });
};
