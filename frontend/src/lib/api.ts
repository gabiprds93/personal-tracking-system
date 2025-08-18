// API client configuration for connecting to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API client class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create and export API client instance
export const api = new ApiClient(API_BASE_URL);

// Auth API methods
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (userData: { 
    email: string; 
    password: string; 
    username: string;
    firstName?: string;
    lastName?: string;
  }) => api.post('/auth/register', userData),
  
  getProfile: () => api.get('/auth/profile'),
};

// Habits API methods
export const habitsApi = {
  getAll: () => api.get('/habits'),
  getToday: () => api.get('/habits/today'),
  getById: (id: string) => api.get(`/habits/${id}`),
  create: (habit: any) => api.post('/habits', habit),
  update: (id: string, habit: any) => api.put(`/habits/${id}`, habit),
  delete: (id: string) => api.delete(`/habits/${id}`),
  complete: (id: string) => api.post(`/habits/${id}/complete`),
};

// Goals API methods
export const goalsApi = {
  getAll: () => api.get('/goals'),
  getById: (id: string) => api.get(`/goals/${id}`),
  create: (goal: any) => api.post('/goals', goal),
  update: (id: string, goal: any) => api.put(`/goals/${id}`, goal),
  delete: (id: string) => api.delete(`/goals/${id}`),
  createMilestone: (goalId: string, milestone: any) => 
    api.post(`/goals/${goalId}/milestones`, milestone),
  toggleMilestone: (goalId: string, milestoneId: string) => 
    api.put(`/goals/${goalId}/milestones/${milestoneId}/toggle`),
  addNote: (goalId: string, note: any) => 
    api.post(`/goals/${goalId}/notes`, note),
};

// Analytics API methods
export const analyticsApi = {
  getStats: () => api.get('/analytics/stats'),
  getTrends: () => api.get('/analytics/trends'),
  getCategories: () => api.get('/analytics/categories'),
  getMetrics: () => api.get('/analytics/metrics'),
};