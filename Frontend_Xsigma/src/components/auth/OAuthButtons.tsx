import React from 'react';
import { authService } from '../../services/authService-simple';

interface OAuthButtonsProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ 
  onSuccess, 
  onError, 
  disabled = false,
  className = ''
}) => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await authService.signInWithGoogle();
      if (result.success) {
        onSuccess?.();
      } else {
        onError?.(result.message);
      }
    } catch (error: any) {
      onError?.(error.message || 'Google sign-in failed');
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await authService.signInWithGitHub();
      if (result.success) {
        onSuccess?.();
      } else {
        onError?.(result.message);
      }
    } catch (error: any) {
      onError?.(error.message || 'GitHub sign-in failed');
    }
  };

  return (
    <div className={`oauth-buttons-container ${className}`}>
      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={disabled}
        className="oauth-button oauth-button-google"
        type="button"
      >
        <svg className="oauth-icon" viewBox="0 0 24 24" width="20" height="20">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      {/* GitHub OAuth Button */}
      <button
        onClick={handleGitHubSignIn}
        disabled={disabled}
        className="oauth-button oauth-button-github"
        type="button"
      >
        <svg className="oauth-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Continue with GitHub
      </button>

      <style jsx>{`
        .oauth-buttons-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .oauth-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 14px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-family: 'Inter', 'Roboto', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }

        .oauth-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 191, 196, 0.1), transparent);
          transition: left 0.5s;
        }

        .oauth-button:hover::before {
          left: 100%;
        }

        .oauth-button:hover:not(:disabled) {
          border-color: #00BFC4;
          background: #f8fafc;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 191, 196, 0.15);
        }

        .oauth-button:active:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 191, 196, 0.2);
        }

        .oauth-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f3f4f6;
          transform: none !important;
          box-shadow: none !important;
        }

        .oauth-button-google {
          border-color: #dadce0;
        }

        .oauth-button-google:hover:not(:disabled) {
          border-color: #4285f4;
          box-shadow: 0 8px 25px rgba(66, 133, 244, 0.15);
        }

        .oauth-button-github {
          border-color: #d1d5db;
          color: #1f2937;
        }

        .oauth-button-github:hover:not(:disabled) {
          border-color: #374151;
          box-shadow: 0 8px 25px rgba(55, 65, 81, 0.15);
        }

        .oauth-icon {
          flex-shrink: 0;
          z-index: 1;
          position: relative;
        }

        /* XSigma Professional Styling */
        @media (max-width: 768px) {
          .oauth-button {
            padding: 16px 20px;
            font-size: 16px;
          }
        }

        /* Focus states for accessibility */
        .oauth-button:focus {
          outline: none;
          border-color: #00BFC4;
          box-shadow: 0 0 0 3px rgba(0, 191, 196, 0.1);
        }

        .oauth-button-google:focus {
          border-color: #4285f4;
          box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
        }

        .oauth-button-github:focus {
          border-color: #374151;
          box-shadow: 0 0 0 3px rgba(55, 65, 81, 0.1);
        }

        /* Professional quantitative finance styling */
        .oauth-button {
          font-weight: 600;
          letter-spacing: 0.025em;
        }

        .oauth-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        }
      `}</style>
    </div>
  );
};

export default OAuthButtons;
