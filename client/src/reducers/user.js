const user = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        isLogin: true,
        id: action.payload.id,
        accessToken: action.payload.accessToken,
        name: action.payload.name,
        data: action.payload.signedRequest,
      };
    case 'LOGOUT':
      return {
        id: null,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default user;
