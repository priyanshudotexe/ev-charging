import React from "react";
import { planTravelState,chargeNowState } from "@/recoil/recoilState";
import { useRecoilState } from "recoil";
export default function EtaCard() {

  const [ptState, setPtState] = useRecoilState(planTravelState);
  const [cnState, setCnState] = useRecoilState(chargeNowState);
  return (
    <dialog
      id="chargeNowDialog"
      open={ptState || cnState }
      style={{ backgroundColor: "black" }}
      className="rounded-lg w-80 h-60 p-4 absolute  text-white"
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-muted-foreground">ETA</div>
          <div className="text-2xl font-medium">4:15 PM</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-muted-foreground">Distance</div>
          <div className="text-2xl font-medium">245 mi</div>
        </div>
        <div className="grid gap-1">
          <div className="text-muted-foreground">Destination</div>
          <div>
            San Francisco, CA - The Golden Gate City, known for its iconic
            bridge, cable cars, and vibrant culture.
          </div>
        </div>
      </div>
    </dialog>
  );
}
