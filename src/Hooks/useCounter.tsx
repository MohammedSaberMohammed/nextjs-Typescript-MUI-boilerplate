import { otpConfigs } from '@/configs/otp';
import { OTPCounterTypes } from '@/services/staticLookups';
import { useEffect, useState } from 'react';

interface OTPHooksConfigs {
  counterType?: string;
  loadOnMount?: boolean;
  initialPeriod?: number;
}

function generateTwoDigits(val: string) {
  const isTwoDigits = val.length === 2;

  return isTwoDigits ? val : `0${val}`;
}

const useOTPCounter = (configs?: OTPHooksConfigs) =>  {

  let counterInterval: any = null;
  const [minutes, setMinutes] = useState('00');
  const [seconds, setseconds] = useState('00');
  const [isCounting, setIsCounting] = useState(false);
  const { loadOnMount, counterType, initialPeriod } = {
    loadOnMount: true, 
    counterType: otpConfigs.counterType, 
    initialPeriod: otpConfigs.defaultInterval, 
    ...configs
  } as OTPHooksConfigs;
  
  const startCounter = () => {
    setIsCounting(true);

    let minutes = 0;
    let seconds = 0;

    if(initialPeriod) {
      if (counterType === OTPCounterTypes.minutes) {
        minutes = initialPeriod ? initialPeriod - 1 : 0;
        seconds = minutes || initialPeriod >= 1 ? 59 : 0;
      } else {
        minutes = Math.trunc(initialPeriod / 60);
        seconds = initialPeriod % 60;
      }
    }

    counterInterval = setInterval(() => {
      setMinutes(generateTwoDigits(`${minutes}`));
      setseconds(generateTwoDigits(`${seconds}`));

      if (!seconds && !minutes) {
        setIsCounting(false);
        clearInterval(counterInterval);
        return;
      }

      if (!seconds) {
        // reduce minutes
        minutes -= 1;
        // reset seconds
        seconds = 59;
      }

      seconds -= 1;
    }, 1000);
  };
  
  useEffect(() => {
    if(loadOnMount) {
      startCounter();
    }

    return () => clearInterval(counterInterval);
  }, []);

  return { seconds, minutes, isCounting, startCounter };
};

export { useOTPCounter };
