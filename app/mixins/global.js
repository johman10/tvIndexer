import { setUser, getUser } from 'helpers/user-helper';

export default {
  computed: {
    $currentUserId: {
      set: setUser,
      get: getUser
    },

    $isLoggedIn () {
      return !!this.$currentUser;
    }
  }
};
