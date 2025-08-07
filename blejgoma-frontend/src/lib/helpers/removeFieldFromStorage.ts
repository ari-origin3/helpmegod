import { LOCAL_STORAGE_KEY } from "../context/AuthContext/AuthContextProvider";

export const removeFieldFromStorage = (key: string) => {
  const values = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (values) {
    const newValues = JSON.parse(values);
    delete newValues[key];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValues));
  }
};
