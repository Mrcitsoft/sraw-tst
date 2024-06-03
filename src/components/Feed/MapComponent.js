import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { toLonLat } from 'ol/proj';
import { click } from 'ol/events/condition';
import { Select } from 'ol/interaction';

const MapComponent = ({ onLocationSelect }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const selectClick = new Select({
      condition: click,
    });

    map.addInteraction(selectClick);
    selectClick.on('select', function (e) {
      const coord = toLonLat(e.mapBrowserEvent.coordinate);
      onLocationSelect({ lat: coord[1], lng: coord[0] });
    });

    return () => map.setTarget(undefined);
  }, [onLocationSelect]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default MapComponent;
