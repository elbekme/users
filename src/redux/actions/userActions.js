// import request from "../../server";

// export const getUsers = (page = 1) => {
//   return async (dispatch) => {
//     try {
//       dispatch({
//         type: "usersLoading",
//         payload: true,
//       });
//       let {
//         data: { data, pagination },
//       } = await request.get(`user?page=${page}`);
//       dispatch({
//         type: "getUsers",
//         payload: { users: data, total: pagination.total },
//       });
//     } catch (err) {
//       dispatch({
//         type: "usersError",
//         payload: err,
//       });
//     } finally {
//       dispatch({
//         type: "usersLoading",
//         payload: false,
//       });
//     }
//   };
// };

// export const changeActivePage = (page) => {
//   return (dispatch) => {
//     dispatch({
//       type: "userPgntn",
//       payload: page,
//     });
//     dispatch(getUsers(page));
//   };
// };

// export const controlModal = () => {
//   return {
//     type: "userModal",
//   };
// };

// export const addUser = (form) => {
//   return async (dispatch) => {
//     try {
//       let values = await form.validateFields();
//       await request.post("user", values);
//       dispatch(controlModal());
//       dispatch(getUsers());
//     } catch (err) {
//       dispatch({
//         type: "usersError",
//         payload: err,
//       });
//     }
//   };
// };

import request from "../../server";

const updateState = (data) => ({ type: "userStateChange", payload: data });

export const getUsers = (page = 1) => {
  return async (dispatch) => {
    try {
      dispatch(updateState({ loading: true }));
      let {
        data: { data, pagination },
      } = await request.get(`user?page=${page}`);
      dispatch(updateState({ users: data, total: pagination.total }));
    } catch (err) {
      dispatch(updateState({ error: err }));
    } finally {
      dispatch(updateState({ loading: false }));
    }
  };
};

export const changeActivePage = (page) => {
  return (dispatch) => {
    dispatch(updateState({ activePage: page }));
    dispatch(getUsers(page));
  };
};

export const controlModal = () => {
  return {
    type: "userModal",
  };
};

export const addUser = (form) => {
  return async (dispatch) => {
    try {
      let values = await form.validateFields();
      await request.post("user", values);
      dispatch(controlModal());
      dispatch(getUsers());
    } catch (err) {
      dispatch(updateState({ error: err }));
    }
  };
};
