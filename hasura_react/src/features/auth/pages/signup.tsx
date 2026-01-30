import { SignupForm } from '../components/signup-form';

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <SignupForm onSwitchToLogin={() => window.history.back()} />
      </div>
    </div>
  );
};

export default SignupPage;