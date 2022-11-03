import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs';

interface iMarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-75.21187326837463, 3.2155945571183864];

  // Arreglo de marcadores
  marcadores: iMarcadorColor[] = [];

  constructor() {}
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
    this.leerLocalStorage();
    /* Creación de un marcador en el mapa. */
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';
    // new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa);
  }
  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const nuevoMarcador = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.mapa);
    console.log('nuevo Marcador', nuevoMarcador);
    this.marcadores.push({ color, marker: nuevoMarcador });
    this.guardarMarcadoresLS();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLS();
    });
  }
  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marker.getLngLat(),
    });
  }

  guardarMarcadoresLS() {
    const lngLatArr: iMarcadorColor[] = [];
    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat],
      });
    });

    /* Guardar los marcadores en el almacenamiento local. tener en cuenta que solo se almacenan datos de tipo string  */
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: iMarcadorColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );
    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color,
      });
    });
  }
}
