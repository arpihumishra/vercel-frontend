// Mock authentication service for development
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    tenant: 'Pro'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    name: 'Free User',
    tenant: 'Free'
  },
  {
    id: 3,
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User',
    tenant: 'Free'
  }
];

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAuthService = {
  async login(email, password) {
    await delay(500); // Simulate network delay
    
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw {
        response: {
          data: {
            message: 'Invalid email or password'
          }
        }
      };
    }
    
    // Create mock token
    const token = btoa(JSON.stringify({ userId: user.id, email: user.email }));
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tenant: user.tenant
      }
    };
  },

  async register(userData) {
    await delay(500);
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw {
        response: {
          data: {
            message: 'User already exists'
          }
        }
      };
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      tenant: 'Free' // New users start as Free
    };
    
    const token = btoa(JSON.stringify({ userId: newUser.id, email: newUser.email }));
    
    return {
      token,
      user: newUser
    };
  },

  async getProfile() {
    await delay(300);
    
    // This would normally decode the token to get user info
    // For mock, we'll return a default user
    return {
      user: {
        id: 1,
        email: 'mock@example.com',
        name: 'Mock User',
        tenant: 'Free'
      }
    };
  },

  logout() {
    // Clear localStorage items like the real auth service
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
};