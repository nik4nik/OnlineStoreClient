import {useContext, useEffect, useState} from 'react'
import {useMapEvents, MapContainer, TileLayer} from "react-leaflet"
import {observer} from 'mobx-react-lite'
import L from "leaflet"
import {Context} from '..'

const Marker = observer(() => {
	const {leaflet, product} = useContext(Context),
		[mark, setMark] = useState(),
		path = 'https://unpkg.com/leaflet@1.7/dist/images/',
		icon = L.icon({
			iconSize: [25, 41],
			iconAnchor: [10, 41],
			popupAnchor: [2, -40],
			iconUrl: path + "marker-icon.png",
			shadowUrl: path + "marker-shadow.png"
		}),

	moveMarker = arr => {
		if (mark)
			map.removeLayer(mark)
		let marker = L.marker(arr, {icon}, {
			draggable: true,
			title: "Resource location",
			alt: "Resource Location",
			riseOnHover: true
		})
		marker.addTo(map)
		setMark(marker)
	},

	map = useMapEvents({
		click: event => {
			const {lat, lng} = event.latlng
			leaflet.setLatlng(event.latlng.toString())
			moveMarker([lat, lng])
		}
	})
	
	//console.log(product.latlong[product.types.indexOf(product.selectedType)])

	useEffect(() => {
		if (!leaflet.latlng)
			return
		const arr = leaflet.latlng.substring(7, leaflet.latlng.indexOf(')')).split(',').map(Number)
		if (arr.length)
			moveMarker(arr)
	// eslint-disable-next-line
	},[leaflet.latlng])

	return <>{leaflet.latlng}</>
})

const LeafletMap = () => {
	return <MapContainer center={[50.46, 30.62]} style={{ height: "200px" }} zoom={14}>
		<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
		<Marker/>
	</MapContainer>
}

export default LeafletMap