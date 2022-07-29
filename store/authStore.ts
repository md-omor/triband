import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";
import { BASE_URL } from "./../utils/index";

const tore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: response.data });
  },
});

const usetore = create(
  persist(tore, {
    name: "user",
  })
);

export default usetore;
