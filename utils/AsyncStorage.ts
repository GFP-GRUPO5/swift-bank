import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItemAsyncStorage<T>(key: string, data: T) {
  try {
    const stringifiedData = JSON.stringify(data)
    await AsyncStorage.setItem(key, stringifiedData)
  } catch(error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function getItemAsyncStorage<T>(key: string): Promise<T | null | undefined> {
  try {
    const result = await AsyncStorage.getItem(key)

    if (!result) return null

    return JSON.parse(result) as T
  } catch(error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

export async function clearAsyncStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key)
  } catch(error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}
