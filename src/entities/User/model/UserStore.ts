import { create } from 'zustand/react';
import { UserAction, UserActions, UserState } from './UserTypes';
import { getCurrentUser } from 'app/storage/currentUserStore';
import { updateUser } from 'app/storage/userStorage';

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'create': {
      return {
        user: action.payload,
        isAuth: true,
      };
    }
    case 'login': {
      return {
        user: action.payload,
        isAuth: true,
      };
    }
    case 'logout': {
      return {
        user: null,
        isAuth: false,
      };
    }
    case 'update': {
      if (!state.user) return state;

      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    }
    case 'delete': {
      return {
        user: null,
        isAuth: false,
      };
    }
    case 'createOrder': {
      if (!state.user) return state;
      const newOrder = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          orders: [...(state.user?.orders || []), newOrder],
        },
      };
    }
    default: {
      return state;
    }
  }
}

const initialUser = getCurrentUser();

export const useUserStore = create<UserState & UserActions>((set) => ({
  user: initialUser || null,
  isAuth: Boolean(initialUser),
  dispatch: (action: UserAction) =>
    set((state) => {
      const newState = userReducer(state, action);

      if (newState.user) {
        updateUser(newState.user);
      }

      return newState;
    }),
}));
