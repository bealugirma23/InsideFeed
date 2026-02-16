import { useAuthStore } from '../store/auth-store';

export const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    setIsOnboarded,
    initializeAuth
  } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isOnboarded: user?.isOnboarded || false,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    setIsOnboarded,
    initializeAuth
  };
};