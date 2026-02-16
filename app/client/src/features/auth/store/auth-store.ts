import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    isOnboarded: boolean;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<AuthState['user']>) => void;
  setIsOnboarded: () => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // In a real app, this would be an API call
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await response.json();
          
          if (response.ok) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                isOnboarded: data.user.isOnboarded,
              },
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error(data.message || 'Login failed');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        try {
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
          });
          
          const data = await response.json();
          
          if (response.ok) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.name,
                isOnboarded: false, // New users need to complete onboarding
              },
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error(data.message || 'Signup failed');
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },
      
      setIsOnboarded: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, isOnboarded: true },
          });
        }
      },
      
      initializeAuth: async () => {
        // Check if we have a stored token and validate it
        const storedToken = localStorage.getItem('token');
        
        if (storedToken) {
          try {
            // Validate token with API
            const response = await fetch('/api/auth/me', {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
            
            if (response.ok) {
              const userData = await response.json();
              set({
                user: {
                  id: userData.id,
                  email: userData.email,
                  name: userData.name,
                  isOnboarded: userData.isOnboarded,
                },
                token: storedToken,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              // Token is invalid, clear auth state
              set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
              });
            }
          } catch (error) {
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } else {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    }
  )
);