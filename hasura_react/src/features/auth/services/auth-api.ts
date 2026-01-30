import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
  isOnboarded: boolean;
}

interface AuthResponse {
  user: UserResponse;
  token: string;
}

// Define error response interface
interface ErrorResponse {
  message?: string;
  error?: string;
}

// API functions
export const loginApi = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    let errorData: ErrorResponse = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.error('Error parsing error response:', e);
    }

    console.error('Login error:', errorData);
    throw new Error(errorData.message || errorData.error || 'Login failed');
  }

  return response.json();
};

export const signupApi = async (data: SignupData): Promise<AuthResponse> => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorData: ErrorResponse = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.error('Error parsing error response:', e);
    }

    throw new Error(errorData.message || errorData.error || 'Signup failed');
  }

  return response.json();
};

export const logoutApi = async (): Promise<void> => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    let errorData: ErrorResponse = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.error('Error parsing error response:', e);
    }

    throw new Error(errorData.message || errorData.error || 'Logout failed');
  }
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await fetch('/api/auth/me');

  if (!response.ok) {
    let errorData: ErrorResponse = {};
    try {
      errorData = await response.json();
    } catch (e) {
      console.error('Error parsing error response:', e);
    }

    throw new Error(errorData.message || errorData.error || 'Failed to fetch user data');
  }

  return response.json();
};

// React Query hooks
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data: AuthResponse) => {
      // Store the token and user data in the auth store
      // This would typically be handled by the calling component
      console.log('Login successful', data);
    },
    onError: (error: Error) => {
      console.error('Login error:', error);
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignupData) => signupApi(data),
    onSuccess: (data: AuthResponse) => {
      console.log('Signup successful', data);
    },
    onError: (error: Error) => {
      console.error('Signup error:', error);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      // Clear user data from cache
      queryClient.clear();
      console.log('Logout successful');
    },
    onError: (error: Error) => {
      console.error('Logout error:', error);
    },
  });
};

// Hook to get current user
export const useCurrentUser = () => {
  return useQuery<UserResponse, Error>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};
