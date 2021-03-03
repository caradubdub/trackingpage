const handleLoc = (loc) => {
  let arr = loc.split(",");
  let lat = Number(arr[0]);
  let long = Number(arr[1]);
  return [typeof lat, typeof long];
};

console.log(handleLoc("40.749419041103586,-74.00170823565635"));
