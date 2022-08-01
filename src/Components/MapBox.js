import { useState, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const MapBox = () => {
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-123.1939441, 49.2578263], // starting position [lng, lat]
      zoom: 5, // starting zoom
      attributionControl: false,
    })

    markers.map((feature) =>
      new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML('<h3>Test</h3>'))
        .addTo(map),
    )

    map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken }))
    return () => map.remove()
  }, [markers])

  const getData = async () => {
    const res = await axios.get('http://localhost:4000/features')
    setMarkers(res.data.data)
  }

  return (
    <div>
      <div id="mapContainer" style={{ height: '100vh' }}></div>
    </div>
  )
}

export default MapBox
