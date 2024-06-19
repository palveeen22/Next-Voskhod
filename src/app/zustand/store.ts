// import { create } from "zustand";
// // import { ApiRequest } from "../libs/apiRequest";
// // import { User } from "../schemas";

// // Define the initial state type
// interface State {
//   loading: boolean;
//   success: boolean;
//   error: boolean;
//   data: User | null; 
//   errorData: string | null;
// }

// // Define the actions type
// interface Actions {
//   execute: () => Promise<void>;
// }

// // Combine state and actions for the store type
// type UseGetProfileStore = State & Actions;

// // Initial state
// const initialState = {
//   loading: false,
//   success: false,
//   error: false,
//   data: null,
//   errorData: null,
// };

// // Type guard to check if an unknown error is an instance of Error
// function isError(err: unknown): err is Error {
//   return err instanceof Error;
// }

// // Create the store
// export const useGetProfile = create<UseGetProfileStore>((set) => ({
//   ...initialState,

//   // Execute function to fetch profile data
//   execute: async () => {
//     set({ ...initialState, loading: true });

//     // Retrieve the token (adjust the method of obtaining the token as needed)
//     const token = localStorage.getItem("access_token"); // Example: storing token in localStorage

//     try {
//       // Make the API request with the Authorization header
//       const res = await ApiRequest.identity["v1.0"].get("/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Update the state with the fetched data
//       set({ ...initialState, success: true, data: res.data });
//     } catch (err: unknown) {
//       // Handle errors and update the state accordingly
//       console.error("Error in data fetch:", err);

//       // Use type guard to check if err is an instance of Error
//       if (isError(err)) {
//         set({ ...initialState, error: true, errorData: err.message });
//       } else {
//         set({ ...initialState, error: true, errorData: 'Unknown error' });
//       }
//     }
//   },
// }));
