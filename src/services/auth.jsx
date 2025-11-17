const mockLocalClient = {
  auth: {
    currentUser: null,
    isAuthenticated: async () => !!mockLocalClient.auth.currentUser,
    login: async (email, fullName) => {
      mockLocalClient.auth.currentUser = { email, fullName };
      return true;
    },
    me: async () => mockLocalClient.auth.currentUser,
    logout: () => {
      mockLocalClient.auth.currentUser = null;
    }
  }
};

export default mockLocalClient;