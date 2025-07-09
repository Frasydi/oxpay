// AuthService.ts - Service for handling authentication

interface User {
  id: number;
  email: string;
  password?: string;
}

interface AuthResponse {
  success: boolean;
  user?: { id: number; email: string };
  token?: string;
  message?: string;
}

interface StoredUser {
  id: number;
  email: string;
  password: string;
}

class AuthService {
  private users: StoredUser[];

  constructor() {
    this.users = [
      { id: 1, email: 'user@example.com', password: 'password123' }
    ];
  }

  // Login method
  async login(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find((u: StoredUser) => u.email === email && u.password === password);
        if (user) {
          const token = this.generateToken(user);
          const userData = { id: user.id, email: user.email };
          localStorage.setItem('authToken', token);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve({
            success: true,
            user: userData,
            token
          });
        } else {
          reject({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }, 1000);
    });
  }

  // Sign up method
  async signUp(email: string, password: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = this.users.find((u: StoredUser) => u.email === email);
        if (existingUser) {
          reject({
            success: false,
            message: 'User already exists'
          });
        } else {
          const newUser: StoredUser = {
            id: this.users.length + 1,
            email,
            password
          };
          this.users.push(newUser);
          // Don't auto-login on signup, user needs to verify email first
          resolve({
            success: true,
            user: { id: newUser.id, email: newUser.email },
            message: 'Account created successfully. Please verify your email.'
          });
        }
      }, 1000);
    });
  }

  // Social login methods
  async loginWithGoogle(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: 999, email: 'google@example.com' };
        const token = this.generateToken(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({
          success: true,
          user,
          token
        });
      }, 1000);
    });
  }

  async loginWithGitHub(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: 998, email: 'github@example.com' };
        const token = this.generateToken(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({
          success: true,
          user,
          token
        });
      }, 1000);
    });
  }

  async loginWithOXPay(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: 997, email: 'oxpay@example.com' };
        const token = this.generateToken(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({
          success: true,
          user,
          token
        });
      }, 1000);
    });
  }

  async loginWithSingPass(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: 996, email: 'singpass@example.com' };
        const token = this.generateToken(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({
          success: true,
          user,
          token
        });
      }, 1000);
    });
  }

  async loginWithCorPass(): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { id: 995, email: 'corpass@example.com' };
        const token = this.generateToken(user);
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        resolve({
          success: true,
          user,
          token
        });
      }, 1000);
    });
  }

  // Logout method
  logout(): { success: boolean } {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    return { success: true };
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token !== null;
  }

  // Get current user
  getCurrentUser(): { id: number; email: string } | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.id, email: payload.email };
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Verify email with OTP
  async verifyEmail(email: string, otpCode: string): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate OTP verification (for demo purposes, accept any 4-digit code)
        if (otpCode.length === 4 && /^\d{4}$/.test(otpCode)) {
          // Find the user and log them in after successful verification
          const user = this.users.find((u: StoredUser) => u.email === email);
          if (user) {
            const token = this.generateToken(user);
            localStorage.setItem('authToken', token);
            resolve({
              success: true,
              user: { id: user.id, email: user.email },
              token,
              message: 'Email verified successfully'
            });
          } else {
            reject({
              success: false,
              message: 'User not found'
            });
          }
        } else {
          reject({
            success: false,
            message: 'Invalid verification code'
          });
        }
      }, 1000);
    });
  }

  // Resend verification code
  async resendVerificationCode(email: string): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Verification code sent successfully'
        });
      }, 1000);
    });
  }

  // Validate token
  async validateToken(token: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const isExpired = Date.now() > payload.exp;
          resolve(!isExpired);
        } catch (error) {
          resolve(false);
        }
      }, 100);
    });
  }

  // Generate dummy JWT token
  private generateToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: user.id,
      email: user.email,
      exp: Date.now() + 3600000 // 1 hour
    }));
    const signature = btoa('dummy-signature');
    return `${header}.${payload}.${signature}`;
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
