import { v4 as uuidv4 } from 'uuid';

export const generateRandom6DigitNumber = () => {
   const uuid = uuidv4();
   const random6Digit = parseInt(uuid.replace(/[^0-9]/g, '').slice(0, 5));
   return random6Digit;
};
