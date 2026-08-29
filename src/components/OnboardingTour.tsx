import { useState, useEffect } from 'react';
import * as JoyrideModule from 'react-joyride';
import type { Step, CallBackProps } from 'react-joyride';

// Vite SSR bypass for missing default export
// Safely extract the component regardless of how Vite bundles it
const Joyride = (JoyrideModule as any).default?.default || (JoyrideModule as any).default || (JoyrideModule as any).Joyride || Object.values(JoyrideModule).find(val => typeof val === 'function');
const STATUS = (JoyrideModule as any).STATUS || {};

const OnboardingTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  // TypeScript ko bataya ki yeh 'Step' array hai
  const steps: Step[] = [
    {
      target: '.tour-feed',
      content: 'This is the Feed. Here you can view updates and track the latest activity.',
      disableBeacon: true,
    },
    {
      target: '.tour-report',
      content: 'Use this section to report a new issue and trigger the AI submission flow.',
    },
    {
      target: '.tour-workspace',
      content: 'Manage your tasks here using the functional project management Kanban board.',
    },
  ];

  // 'data' ko 'CallBackProps' type diya
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      localStorage.setItem('hasSeenTour', 'true');
      setRun(false);
    }
  };

  if (!run) return null;

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#4F46E5', 
          zIndex: 1000,
        },
      }}
    />
  );
};

export default OnboardingTour;