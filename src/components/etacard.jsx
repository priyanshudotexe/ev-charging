import React from "react";
import {
  planTravelState,
  chargeNowState,
  etaState,
  stationDataState,
} from "@/recoil/recoilState";
import { useRecoilState } from "recoil";
export default function EtaCard() {

  const [ptState, setPtState] = useRecoilState(planTravelState);
  const [cnState, setCnState] = useRecoilState(chargeNowState);
  const [eta, setEta] = useRecoilState(etaState);
  const [stationData, setStationData] = useRecoilState(stationDataState);
  return (
    <dialog
      id="chargeNowDialog"
      open={ptState || cnState }
      style={{ backgroundColor: "black" }}
      className="rounded-lg w-80 h-auto p-4 absolute  text-white"
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-muted-foreground">ETA</div>
          <div className="text-2xl font-medium">{eta.eta}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-muted-foreground">Distance</div>
          <div className="text-2xl font-medium">{eta.distance}</div>
        </div>
        
      </div>
    </dialog>
  );
}
