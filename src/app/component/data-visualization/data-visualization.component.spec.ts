import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DataVisualizationComponent } from './data-visualization.component';
import { WebSocketServiceVotes } from '../../services/web-socket-votes.service';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';

const mockWebSocketServiceVotes = {
  getMessages: jasmine.createSpy('getMessages').and.returnValue(
    of({ color: 'Red', votes: 1 }) // Simulated WebSocket message
  ),
};

describe('DataVisualizationComponent', () => {
  let fixture: ComponentFixture<DataVisualizationComponent>;
  let component: DataVisualizationComponent;
  let websocketServiceVotes: WebSocketServiceVotes;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataVisualizationComponent],
      providers: [{ provide: WebSocketServiceVotes, useValue: mockWebSocketServiceVotes }],
    }).compileComponents();

    fixture = TestBed.createComponent(DataVisualizationComponent);
    component = fixture.componentInstance;
    websocketServiceVotes = TestBed.inject(WebSocketServiceVotes);
  });

  beforeEach(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'myChartCanvas';
    document.body.appendChild(canvas);
    component.chartRef = new ElementRef(canvas);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the chart on ngOnInit', () => {
    component.ngOnInit();
    expect(component.myChart).not.toBeUndefined();
  });

  xit('should update chart with incoming WebSocket data', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.websocketService.getMessages().subscribe((msg) => component.data.push(msg));
    component.subscribeToRealTimeData();

    expect(component.myChart?.data.datasets[0].data[0]).toBe(1);
  });

  afterEach(() => {
    // Clean up canvas and destroy the Chart instance to avoid reusing
    if (component.myChart) {
      component.myChart.destroy();
    }
    const canvas = document.getElementById('myChartCanvas');
    if (canvas) {
      document.body.removeChild(canvas);
    }
  });
});