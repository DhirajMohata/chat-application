const API_URL = 'https://chat-app-backend-11ku.onrender.com';
import { toast } from 'react-toastify';

interface GetFriendsResponse {
  friendships: Array<{
    id: number;
    userId: number;
    friendId: number;
    lastSeenAt: Date;
    lastMessage: string;
    friendName: string;
    status: string;
  }>;
}

interface GetPotentialFriendsResponse {
  users: Array<{
    id: number;
    username: string;
    email: string;
  }>;
}

export const getFriends = async (): Promise<GetFriendsResponse> => {
  try {
    const response = await fetch(`${API_URL}/friendships/get`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    
    if (!response.ok) {
      toast.error('Failed to get friends');
      throw new Error('Failed to get friends');
    }
    
    const data: GetFriendsResponse = await response.json();
    return data;
  } catch (error) {
    toast.error('Error occurred while fetching friends');
    throw new Error('Error occurred while fetching friends');
  }
};

export const getPotentialFriends = async () => {
  try {
    const response = await fetch(`${API_URL}/friendships/potential-friends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      toast.error('Failed to fetch potential friends');
      throw new Error('Failed to fetch potential friends');
    }

    const data: GetPotentialFriendsResponse = await response.json();
    toast.success('Make New Friends!');
    return data;
  } catch (error) {
    toast.error('Error occurred while fetching potential friends');
    throw new Error('Error occurred while fetching potential friends');
  }
};

export const addFriendship = async (friendId: number) => {
  try {
    const response = await fetch(`${API_URL}/friendships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        friendId,
      }),
    });

    if (!response.ok) {
      toast.error('Failed to add friendship');
      throw new Error('Failed to add friendship');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error('Error occurred while adding friendship');
    throw new Error('Error occurred while adding friendship');
  }
};
