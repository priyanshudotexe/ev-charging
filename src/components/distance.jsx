export default function Distance({ leg }) {
  //console.log(leg);
  const dist = leg?.distance?.text ?? "";
  const dura = leg?.duration?.text ?? "";
  const coordinates=[]
  //console.log(leg);

  for(var i=0; i<leg?.steps?.length; i++){
    coordinates.push([leg?.steps[i]?.end_location?.lng() ?? "", leg?.steps[i]?.end_location?.lat() ?? ""]);
  }
 
  
  return <></>;
}
