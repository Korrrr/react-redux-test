const albums = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS':
      return [
        ...state,
        {
          isLoading: true,
          id: action.payload.id,
          name: action.payload.name,
          count: action.payload.count,
          imageURL: action.payload.imageURL,
        },
      ];
    default:
      return state;
  }
};

export default albums;
