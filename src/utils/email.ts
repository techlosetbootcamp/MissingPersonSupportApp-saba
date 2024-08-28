// utils/emailUtils.ts
import { Linking } from 'react-native';
import auth from '@react-native-firebase/auth';

export const sendEmail = (subject: string, body: string) => {
  const currentUser = auth().currentUser;
  
  if (currentUser && currentUser.email) {
    const recipientEmail = currentUser.email;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    Linking.openURL(mailtoUrl)
      .catch((err) => console.error('Error opening email client: ', err));
  } else {
    console.error('No email found for the current user');
  }
};
