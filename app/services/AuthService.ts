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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = this.users.find((u: StoredUser) => u.email === email && u.password === password);
    if (user) {
      const token = this.generateToken(user);
      const userData = { id: user.id, email: user.email };
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      return {
        success: true,
        user: userData,
        token
      };
    } else {
      throw {
        success: false,
        message: 'Invalid email or password'
      };
    }
  }

  // Sign up method
  async signUp(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = this.users.find((u: StoredUser) => u.email === email);
    if (existingUser) {
      throw {
        success: false,
        message: 'User already exists'
      };
    } else {
      const newUser: StoredUser = {
        id: this.users.length + 1,
        email,
        password
      };
      this.users.push(newUser);
      // Don't auto-login on signup, user needs to verify email first
      return {
        success: true,
        user: { id: newUser.id, email: newUser.email },
        message: 'Account created successfully. Please verify your email.'
      };
    }
  }

  // Social login methods
  loginWithGoogle = async (): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { id: 999, email: 'google@example.com' };
    const token = this.generateToken(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      success: true,
      user,
      token
    };
  }

  loginWithGitHub = async (): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { id: 998, email: 'github@example.com' };
    const token = this.generateToken(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      success: true,
      user,
      token
    };
  }

  loginWithOXPay = async (): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { id: 997, email: 'oxpay@example.com' };
    const token = this.generateToken(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      success: true,
      user,
      token
    };
  }

  loginWithSingPass = async (): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { id: 996, email: 'singpass@example.com' };
    const token = this.generateToken(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      success: true,
      user,
      token
    };
  }

  loginWithCorPass = async (): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = { id: 995, email: 'corpass@example.com' };
    const token = this.generateToken(user);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      success: true,
      user,
      token
    };
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate OTP verification (for demo purposes, accept any 4-digit code)
    if (otpCode.length === 4 && /^\d{4}$/.test(otpCode)) {
      // Find the user and log them in after successful verification
      const user = this.users.find((u: StoredUser) => u.email === email);
      if (user) {
        const token = this.generateToken(user);
        localStorage.setItem('authToken', token);
        return {
          success: true,
          user: { id: user.id, email: user.email },
          token,
          message: 'Email verified successfully'
        };
      } else {
        throw {
          success: false,
          message: 'User not found'
        };
      }
    } else {
      throw {
        success: false,
        message: 'Invalid verification code'
      };
    }
  }

  // Resend verification code
  async resendVerificationCode(email: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Verification code sent successfully'
    };
  }

  // Forgot password
  async forgotPassword(email: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    const user = this.users.find((u: StoredUser) => u.email === email);
    if (user) {
      return {
        success: true,
        message: 'Password reset email sent successfully'
      };
    } else {
      // For security reasons, we still return success even if user doesn't exist
      // This prevents email enumeration attacks
      return {
        success: true,
        message: 'Password reset email sent successfully'
      };
    }
  }

  // Validate token
  async validateToken(token: string): Promise<boolean> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() > payload.exp;
      return !isExpired;
    } catch (error) {
      return false;
    }
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
