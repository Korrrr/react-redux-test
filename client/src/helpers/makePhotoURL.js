export default function makePhotoURL(id, accessToken) {
  return `https://graph.facebook.com/${id}/picture?access_token=${accessToken}`;
}
