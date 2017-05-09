export function login(id) {
  return {
    type: 'LOGIN',
    id,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function fetchUser(payload) {
  return {
    type: 'FETCH_USER',
    payload,
  };
}

export function fetchAlbums(payload) {
  return {
    type: 'FETCH_ALBUMS',
    payload,
  };
}

export function fetchPhotos(payload) {
  return {
    type: 'FETCH_PHOTOS',
    payload,
  };
}
