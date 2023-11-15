window.addEventListener('DOMContentLoaded', (event) => {

	function getMapIcon(map) {
		map.mapIcon = window.location.origin + map.dataset.mapIcon
		return window.location.origin + map.dataset.mapIcon
	}

	if (typeof ymaps == 'undefined') return;

	ymaps.ready(() => {

		const maps = document.querySelectorAll('.b_ymap');

		maps.forEach(map => {
			let myMap = new ymaps.Map(map.id, {
		    center: [55.76, 37.64], // Координаты центра карты
		    zoom: 11 // Масштаб карты
			});

			ymaps.geocode(map.dataset.address, {
	      results: 1
			}).then(result => {
		    const position = result.geoObjects.get(0).geometry.getCoordinates();
		    let coords = [position[0], position[1]];
		    myMap.setCenter(coords);


		    let MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		    );
		    let placemark = new ymaps.Placemark(coords,
	        {
			      hintContent: '',
			      balloonContent: '',
			      iconContent: ''
          },
	        {
	      	  iconLayout: "default#imageWithContent",
		        iconImageHref: getMapIcon(map),
			      iconImageSize: [167, 131],
			      iconImageOffset: [-80, -131],
			      iconContentOffset: [15, 15],
            iconContentLayout: MyIconContentLayout
	        }
		    );

				myMap.geoObjects.add(placemark);
			});

			map.myMap = myMap;
		})


	})

});
