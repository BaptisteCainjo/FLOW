export const selectUsers = (state) => state.user.users;

export const selectTotalUsers = (state) => state.user.users.length;

export const selectLoading = (state) => state.user.loading;