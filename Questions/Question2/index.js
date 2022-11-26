let cafes = [];
let places = [];
let resData = [];
const search = document.querySelector("input");
const tBody = document.querySelector("tbody");
fetcher = () => {
  fetch(
    "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json"
  )
    .then(res => res.json())
    .then(i => {
      cafes = i.cafes;
      fetch("https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json").then(
        res => res.json()
      ).then(i => {
        places = i.places;
        setResData();
        add(resData);
      }).catch(error => 
        console.log(error))
    })
    .catch(error => console.log(error));
};
function setResData(){
  let tmp = [];
  let results = cafes;
  results.forEach(cafe => {
    var place = places.find(item => item.id === cafe.location_id);
    let tempobj = {
      "id": place.id,
      "street_no": place.street_no,
      "locality": place.locality,
      "postal_code": place.postal_code,
      "lat": place.lat,
      "long": place.long
    }
    let resData = {
      "name": cafe.name,
      "street_no": tempobj.street_no,
      "locality": tempobj.locality,
      "postal_code": tempobj.postal_code,
      "lat": tempobj.lat,
      "long": tempobj.long
    }
    tmp.push(resData);
  });
  resData = tmp;
}
searchCafes = string => {
  let results = resData.filter(item =>
    item.name.toLowerCase().includes(string.toLowerCase())
  );
  return results;
};
add = results => {
  results.forEach((item, i) => {
    newElement = document.createElement("tr");
    newElement.innerHTML = `<td class="column1">${i + 1}</td>
                            <td class="column2">${item.name}</td>
                            <td class="column3">${item.street_no} ${item.locality}</td>
                            <td class="column4">${item.postal_code}</td>
                            <td class="column5">${item.lat}</td>
                            <td class="column6">${item.long}</td>`;
    tBody.appendChild(newElement);
  });
};
update = e => {
  tBody.innerHTML = "";
  const results = searchCafes(e.target.value);
  add(results);
};
fetcher();
search.addEventListener("input", update);