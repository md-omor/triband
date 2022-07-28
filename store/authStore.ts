import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";

const tore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`http://localhost:3000/api/users`);
    set({ allUsers: response.data });
  },
});

const usetore = create(
  persist(tore, {
    name: "user",
  })
);

export default usetore;
