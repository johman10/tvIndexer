const CURRENT_USER_ID_KEY = 'currentUserId';

export function setUser (userId) {
  if (!userId)
    return localStorage.removeItem(CURRENT_USER_ID_KEY);

  return localStorage.setItem(CURRENT_USER_ID_KEY, userId);
}

export function getUser () {
  return localStorage.getItem(CURRENT_USER_ID_KEY);
}
