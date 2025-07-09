# OXPay Authentication Components

Komponen autentikasi yang lengkap untuk aplikasi OXPay dengan desain modern menggunakan Material-UI v5.

## Fitur

- ✨ **Design Modern**: UI yang clean dan responsif dengan Material-UI
- 🔐 **Form Validation**: Validasi input dan error handling
- 🌐 **Social Login**: Support untuk Google, GitHub, dan OXPay login
- 📱 **Responsive**: Optimal untuk desktop dan mobile
- 🎨 **Visual Branding**: Section branding dengan fitur OXPay
- 🔄 **Loading States**: Indikator loading untuk semua operasi
- ⚡ **TypeScript**: Full type safety

## Struktur Komponen

```
app/
├── components/
│   └── auth/
│       ├── AuthLayout.tsx     # Layout wrapper dengan branding
│       ├── Login.tsx          # Halaman login
│       └── SignUp.tsx         # Halaman signup
├── services/
│   └── AuthService.ts         # Service untuk autentikasi
└── routes/
    ├── login.tsx              # Route untuk login
    └── signup.tsx             # Route untuk signup
```

## Tech Stack

- **React 19** dengan TypeScript
- **Material-UI v5** untuk komponen UI
- **React Router v7** untuk routing
- **Emotion** untuk styling

## Cara Penggunaan

### 1. Menjalankan Development Server

```bash
npm run dev
```

### 2. Mengakses Halaman

- Login: `http://localhost:5173/login`
- Sign Up: `http://localhost:5173/signup`

### 3. Test Credentials

Untuk testing, gunakan kredensial berikut:
- **Email**: `user@example.com`
- **Password**: `password123`

## API AuthService

### Login
```typescript
const response = await authService.login(email, password);
```

### Sign Up
```typescript
const response = await authService.signUp(email, password);
```

### Social Login
```typescript
// Google
const response = await authService.loginWithGoogle();

// GitHub
const response = await authService.loginWithGitHub();

// OXPay
const response = await authService.loginWithOXPay();
```

### Utility Methods
```typescript
// Check authentication status
const isAuth = authService.isAuthenticated();

// Get current user
const user = authService.getCurrentUser();

// Logout
authService.logout();
```

## Kustomisasi

### Mengubah Warna Brand
Edit file `AuthLayout.tsx` dan ubah `bgcolor: '#1976d2'` sesuai brand colors.

### Menambah Provider Login
1. Tambahkan method baru di `AuthService.ts`
2. Tambahkan button di komponen Login/SignUp
3. Import icon yang sesuai dari `@mui/icons-material`

### Styling Custom
Gunakan prop `sx={{}}` dari Material-UI untuk styling:

```tsx
<Button
  sx={{
    bgcolor: 'custom.main',
    '&:hover': {
      bgcolor: 'custom.dark'
    }
  }}
>
  Custom Button
</Button>
```

## Fitur Visual Branding

Setiap halaman menampilkan:
- **Logo OXPay** dengan tagline
- **Payment Efficiency**: Fast and secure payment processing
- **Global Networks**: Connect with partners worldwide  
- **One Powerful System**: All-in-one payment management

## Form Validation

- Email format validation
- Password confirmation matching
- Required field validation
- Error display dengan Material-UI Alert

## Responsive Design

- Mobile-first approach
- Grid system Material-UI
- Typography yang scalable
- Touch-friendly button sizes

## Security Features

- Password visibility toggle
- JWT token simulation
- LocalStorage management
- Input sanitization

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers

## Deployment

Build untuk production:

```bash
npm run build
```

## Kontribusi

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## License

MIT License - bebas digunakan untuk proyek komersial dan non-komersial.
