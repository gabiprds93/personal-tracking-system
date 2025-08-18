'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoginForm, RegisterForm } from './components';
import { useAuthForm } from './hooks/use-auth-form';
import { AuthProps } from './auth.types';
import { cn } from '@/lib/utils';

const Auth = ({ className, ...props }: AuthProps) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { handleLogin, handleRegister, isLoading, error, setError } = useAuthForm();

  const handleModeChange = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setError(null);
  };

  return (
    <div className={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </CardTitle>
          <CardDescription className="text-center">
            {mode === 'login' 
              ? 'Ingresa tus credenciales para acceder a tu cuenta'
              : 'Crea una nueva cuenta para comenzar'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mode === 'login' ? (
            <LoginForm 
              onSubmit={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <RegisterForm 
              onSubmit={handleRegister}
              isLoading={isLoading}
              error={error}
            />
          )}
          
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => handleModeChange(mode === 'login' ? 'register' : 'login')}
              disabled={isLoading}
              className="p-0 h-auto font-normal"
            >
              {mode === 'login' 
                ? '¿No tienes cuenta? Regístrate'
                : '¿Ya tienes cuenta? Inicia sesión'
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Auth.displayName = 'Auth';

export default Auth;