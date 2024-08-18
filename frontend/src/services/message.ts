const API_URL = 'https://chat-app-backend-11ku.onrender.com';
import { toast } from 'react-toastify';

interface SendMessageResponse {
  success: boolean;
  message: string;
}

interface GetMessageResponse {
  messages: Array<{
    id: number;
    content: string;
    senderId: Number;
    receiverId: Number;
    type: 'recived' | 'sent';
    sentAt: Date;
  }>;
}

export const getMessage = async (friendId: Number): Promise<GetMessageResponse> => {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ friendId }),
  });

  if (!response.ok) {
    toast.error('Failed to get messages');
    throw new Error('Failed to get messages');
  }

  const data: GetMessageResponse = await response.json();
  return data;
};

export const sendMessage = async (receiverId: Number, content: string): Promise<SendMessageResponse> => {
  const response = await fetch(`${API_URL}/messages/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ receiverId, content }),
  });

  if (!response.ok) {
    toast.error('Failed to send message');
    throw new Error('Failed to send message');
  }

  const data: SendMessageResponse = await response.json();
  return data;
};
