import { initializeApp } from "firebase/app";
import { fetchAndActivate, getRemoteConfig, getValue } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyDxDyRtD_HVsG2ZjxhYR9d_d0XoqJxDxh4",
  authDomain: "stellar-memories.firebaseapp.com",
  projectId: "stellar-memories",
  storageBucket: "stellar-memories.firebasestorage.app",
  messagingSenderId: "968189081659",
  appId: "1:968189081659:web:be637c878df4449b90041e",
  measurementId: "G-S4142YJ7VF"
};

const firebase = initializeApp(firebaseConfig);

const remoteConfig = getRemoteConfig(firebase);
remoteConfig.settings.minimumFetchIntervalMillis = 1000;
remoteConfig.defaultConfig = {
  'code': '123456',
};


export const getStringFromRemoteConfig = async (key: string): Promise<string> => {
  await fetchAndActivate(remoteConfig);
  return await getValue(remoteConfig, key).asString();
};