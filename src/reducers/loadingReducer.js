const initialState = {
    isLoading: false,
  };
  
  const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOADING':
        return {
          ...state,
          isLoading: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const setLoading = (isLoading) => ({
    type: 'SET_LOADING',
    payload: isLoading,
  });
  
  export default loadingReducer;
  