import { useRegisterSW } from "virtual:pwa-register/react";

// needRefresh
// offlineReady
export const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW() {},
    onRegisterError() {},
  });

  function close() {
    setNeedRefresh(false);
    setOfflineReady(false);
  }

  return (
    <div className="rounded-md border-4 border-red-500 p-2">
      BADGE
      {offlineReady && (
        <div>
          <span>App ready to work offline</span>
        </div>
      )}
      {needRefresh && (
        <div>
          <div>
            <span>New content available, click on reload button to update</span>
          </div>

          <div>
            <button onClick={() => updateServiceWorker(true)}>Reload</button>
            <button onClick={() => close()}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
