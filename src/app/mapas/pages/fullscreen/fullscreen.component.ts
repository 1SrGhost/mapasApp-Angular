import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css'],
})
export class FullscreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.21187326837463,3.2155945571183864 ],
      zoom: 17
    });
  }
}
