import React, { useState } from 'react';
import { ArrowRight, Home, Target, PlusCircle, User, Sparkles } from 'lucide-react';
import CompanyLogo from '../components/common/CompanyLogo';

const TOUR_STEPS = [
  {
    title: 'Feed',
    description: 'See posts from the community. Like and engage with others on their journey.',
    icon: Home,
    page: 'feed'
  },
  {
    title: 'Challenges',
    description: 'Browse and join challenges. Track your progress and earn badges when you complete them.',
    icon: Target,
    page: 'challenges'
  },
  {
    title: 'Create',
    description: 'Share your progress with the community. Post updates, photos, and celebrate wins.',
    icon: PlusCircle,
    page: 'create'
  },
  {
    title: 'Profile',
    description: 'View your badges, active challenges, and posts. Edit your profile anytime.',
    icon: User,
    page: 'profile'
  }
];

export default function OnboardingPage({ onComplete, onNavigate }) {
  const [step, setStep] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const handleSkip = async () => {
    setSkipped(true);
    await onComplete();
    onNavigate('feed');
  };

  const handleNext = async () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      await onComplete();
      onNavigate('feed');
    }
  };

  const handleGetStarted = async () => {
    await onComplete();
    onNavigate('feed');
  };

  const currentStep = TOUR_STEPS[step];
  const Icon = currentStep?.icon;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-6 py-12 text-white">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
            <CompanyLogo size="lg" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2">Welcome to MetaCoreLife</h1>
        <p className="text-slate-400 mb-12 text-lg">
          {step === 0 && !skipped
            ? "Let's give you a quick tour of the app"
            : skipped
            ? "You're all set. Start exploring!"
            : `Step ${step + 1} of ${TOUR_STEPS.length}`}
        </p>

        {!skipped && currentStep && (
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {Icon && <Icon className="w-8 h-8 text-white" />}
            </div>
            <h2 className="text-xl font-bold mb-3">{currentStep.title}</h2>
            <p className="text-slate-400 leading-relaxed">{currentStep.description}</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {!skipped && currentStep ? (
            <>
              <button
                onClick={handleNext}
                className="w-full h-14 bg-white text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                {step < TOUR_STEPS.length - 1 ? (
                  <>
                    Next <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Get Started <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
              <button
                onClick={handleSkip}
                className="w-full h-12 text-slate-400 hover:text-white transition-colors text-sm font-medium"
              >
                Skip tour
              </button>
            </>
          ) : (
            <button
              onClick={handleGetStarted}
              className="w-full h-14 bg-white text-slate-900 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <p className="mt-8 text-slate-500 text-sm">
          A social network that actually improves your life
        </p>
      </div>
    </div>
  );
}
