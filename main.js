const API_KEY='ep%2BfIVXZ9GYT30dFeY8736dUL1I1yEkoYQrywzubUrkpcOlzBfxDo988aGsA9PffxfDXG4yTi3zCbOvUnK%2BNGg%3D%3D'

async function getData() {
    const url= `http://apis.data.go.kr/B552061/frequentzoneBicycle/getRestFrequentzoneBicycle?ServiceKey=${API_KEY}&searchYearCd=2020&siDo=27&guGun=260&type=json&numOfRows=10&pageNo=1`
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    const locations = data.items.item.map(spot=> [
        spot.spot_nm, 
        spot.la_crd,
        spot.lo_crd
    ]);
    
    console.log("locations", locations);
    
    drawMap(locations);
}

function drawMap(locations) {
    //매개변수의 형태
    //locations = [ ["지역이름", 위도, 경도],
    //               ["지역이름",위도,경도] 
    //            ]

    //맵을 생성
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: new google.maps.LatLng(locations[0][1], locations[0][2]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    const infowindow = new google.maps.InfoWindow();
    
    let marker, i;

    //로케이션별로 마크 생성
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(locations[i][1], locations[i][2]),
          map: map,
    });
        
    //마크를 클릭했을 때 보여주는 정보
    google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infowindow.setContent(locations[i][0]);
            infowindow.open(map, marker);
          };
        })(marker, i)
      );
    }
  }

getData();