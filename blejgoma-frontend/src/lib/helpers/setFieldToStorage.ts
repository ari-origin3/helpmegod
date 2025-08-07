import { LOCAL_STORAGE_KEY } from "../context/AuthContext/AuthContextProvider";

export const setFieldToStorage = (key: string, value: any) => {
  const values = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (values) {
    const parsedValues = JSON.parse(values);
    const newValues = { ...parsedValues, [key]: value };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValues));
  }
};
