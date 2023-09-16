import { useEffect } from "react";

import { MusicProviderType } from "../../config/enums";
import { useAuthRequest } from "expo-auth-session";
import { useAuthStore } from "../../state/auth/auth.store";
import { MusicProviderManager } from "../../managers/music-provider/music-provider.manager";
import { useSecureStore } from "../secure-store/secure-store.service";
import { getSecureStoreKeyForProvider } from "../../helpers/helpers";

export const useMusicAppAuth = (provider: MusicProviderType) => {
  const { setItemAsync, getItemAsync } = useSecureStore();
  const setProviderLoginCode = useAuthStore(
    (state: any) => state.setProviderLoginCode,
  );

  // TODO: Put this in state or instantiate it somewhere else, once.
  const musicProviderManger = new MusicProviderManager();

  const [request, response, promptAsync] = useAuthRequest(
    musicProviderManger.getOauthRequestConfig(provider),
    musicProviderManger.getOauthRequestDiscovery(provider),
  );

  useEffect(() => {
    const setStateForProvider = async (
      code: string,
      provider: MusicProviderType,
    ) => {
      const providerKey = getSecureStoreKeyForProvider(provider);
      const value = await getItemAsync(providerKey);
      console.info("providerKey:", providerKey);
      console.info("providerKey value (in store):", value);
      await setItemAsync(providerKey, code);
      setProviderLoginCode(code, provider);
    };

    if (!!response && response?.type === "success") {
      if (response.type === "success") {
        const { code, state } = response.params;
        console.info("code", code);
        console.info("state", state);

        setStateForProvider(code, provider);
      } else {
        console.error("Error", response, provider);
      }
    }
  }, [response, provider]);

  return { promptAsync };
};
