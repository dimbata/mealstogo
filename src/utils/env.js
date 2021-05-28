const liveHost = "https://us-central1-mealstogo-3aa0d.cloudfunctions.net/";
const localHost = "http://localhost:5001/mealstogo-3aa0d/us-central1";

export const isDevelopment = process.env.NODE_ENV === "development";

//commented this out due to being unable to test in emulator on Android
//export const host = isDevelopment ? localHost : liveHost;
export const host = liveHost;

export const isMock = false;
