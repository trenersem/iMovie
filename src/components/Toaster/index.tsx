import { toast } from 'react-toastify';

const showToast = (type: keyof typeof toast, text: string) => {
  (toast[type] as any)(<span>{text}</span>);
};

export const showSuccessToast = (text: string) => {
  showToast('success', text);
};

export const showErrorToast = (text: string) => {
  showToast('error', text);
};