import { cn } from "@/lib/utils";
import { useRegisterSW } from "virtual:pwa-register/react";
import { buttonVariants } from "./ui/button";

// needRefresh
// offlineReady
export const UpdatePrompt = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(r) {
      console.log("SW registered: ", r);
    },
    onRegisterError(error) {
      console.error("SW registration error: ", error);
    },
    onNeedRefresh() {
      console.log("need refresh");
    },
    onOfflineReady() {
      console.log("offline ready");
    },
  });

  function close() {
    setNeedRefresh(false);
    setOfflineReady(false);
  }

  const showBadge = needRefresh || offlineReady;
  if (!showBadge) return null;

  return (
    <div className="fixed bottom-20 right-2 flex flex-col gap-4 rounded-md border border-primary bg-muted p-2 text-primary">
      {offlineReady && (
        <div>
          <span>어플이 오프라인에서 동작가능합니다</span>
        </div>
      )}

      {needRefresh && (
        <div className="flex flex-col gap-4">
          <span>새로운 업데이트가 있습니다</span>

          <div className="flex gap-4">
            <button
              onClick={() => updateServiceWorker(true)}
              className={cn(buttonVariants())}
            >
              업데이트
            </button>
            <button onClick={() => close()} className={cn(buttonVariants())}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
