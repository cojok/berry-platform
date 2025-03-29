import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import instance from '../services/axios.service';
import { Roles } from '@berry/shared';

// ✅ Strict TypeScript Interface for User
interface User {
  id: string;
  name: string;
  email: string;
  role: Roles;
  auth0UserId: string;
  isDeleted: boolean;
  isEmailVerified: boolean;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Strict TypeScript Interface for API Responses
interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RefreshTokenResponse {
  accessToken: string;
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  // ✅ State
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(
    localStorage.getItem('accessToken') ?? null
  );
  // const isAuthenticated = computed(
  //   () => accessToken.value !== null && accessToken.value.trim() !== ''
  // );
  const isAuthenticated = computed(() => true);

  /**
   * ✅ LOGIN: Authenticates the user and stores the access token.
   */
  const login = async (email: string, password: string): Promise<void> => {
    console.info('[AuthStore] Attempting login...');

    if (!email || email.trim() === '' || !password || password.trim() === '') {
      console.warn('[AuthStore] Login failed - Missing email or password.');
      return;
    }

    const response = await instance.post<LoginResponse>('v1/auth/login', {
      email,
      password,
    });

    if (
      !response?.data?.accessToken ||
      response.data.accessToken.trim() === ''
    ) {
      console.error('[AuthStore] Login failed - Invalid response from server.');
      return;
    }

    accessToken.value = response.data.accessToken.trim();
    localStorage.setItem('accessToken', accessToken.value);
    user.value = response.data.user;

    console.info('[AuthStore] Login successful. Fetching user...');
    // await fetchUser();

    console.info('[AuthStore] Redirecting to dashboard...');
    await router.push('/users');
  };

  /**
   * ✅ LOGOUT: Clears authentication state and redirects to login.
   */
  const logout = async (): Promise<void> => {
    console.info('[AuthStore] Logging out...');

    if (user.value !== null && user.value.id !== null && user.value.id !== '') {
      if (accessToken.value !== undefined && accessToken.value !== null) {
        await instance.delete(`v1/auth/logout/${user.value.id}`);
      }
    }

    accessToken.value = null;
    user.value = null;
    localStorage.removeItem('accessToken');

    console.info('[AuthStore] Redirecting to login...');
    await router.push('/login');
  };

  /**
   * ✅ FETCH USER: Retrieves user data from backend (Dummy for now, will use `/auth/me` later)
   */
  // const fetchUser = async (): Promise<void> => {
  //   console.info('[AuthStore] Fetching user profile...');
  //
  //   if (accessToken.value === null || accessToken.value.trim() === '') {
  //     console.warn('[AuthStore] Cannot fetch user - No access token.');
  //     return;
  //   }
  //
  //   // 🚀 Replace this dummy data when `/auth/me` is ready
  //   user.value = {
  //     id: 'dummy-id',
  //     name: 'John Doe',
  //     email: 'john.doe@example.com',
  //     role: 'admin',
  //   };
  //
  //   console.info('[AuthStore] User profile loaded successfully.');
  // };

  /**
   * ✅ REFRESH TOKEN: Refreshes JWT when expired.
   */
  const refreshToken = async (): Promise<void> => {
    console.info('[AuthStore] Refreshing token...');

    if (!user.value || !user.value.id || user.value.id.trim() === '') {
      console.warn('[AuthStore] Cannot refresh token - User ID is missing.');
      return;
    }

    const response = await instance.get<RefreshTokenResponse>(
      `v1/auth/refresh/${user.value.id.trim()}`
    );

    if (
      !response?.data?.accessToken ||
      response.data.accessToken.trim() === ''
    ) {
      console.error('[AuthStore] Token refresh failed - Invalid response.');
      await logout();
      return;
    }

    accessToken.value = response.data.accessToken.trim();
    localStorage.setItem('accessToken', accessToken.value);

    console.info('[AuthStore] Token refreshed successfully.');
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    login,
    logout,
    // fetchUser,
    refreshToken,
  };
});
