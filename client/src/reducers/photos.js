const photos = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PHOTOS':
      return [
        ...state,
        {
          isLoading: true,
          id: action.payload.id,
          name: action.payload.name,
          albumName: action.payload.album.name,
        },
      ];
    default:
      return state;
  }
};

export default photos;
