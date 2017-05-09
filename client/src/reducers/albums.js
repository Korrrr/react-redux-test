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
          // coverPhoto: {
          //   id: action.payload.cover_photo.id,
          //   createdTime: action.payload.cover_photo.created_time,
          // },
        },
      ];
    default:
      return state;
  }
};

export default albums;
