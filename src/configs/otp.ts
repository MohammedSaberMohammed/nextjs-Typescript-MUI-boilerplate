import { OTPCounterTypes } from '@/services/staticLookups';

const otpConfigs = {
  length: 4,
  defaultInterval: 1,
  counterType: OTPCounterTypes.minutes,
};

export {
  otpConfigs,
};
