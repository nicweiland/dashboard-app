import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';
import { WebSocketService } from '../../services/web-socket.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;
  let websocketService: WebSocketService;

  const mockWebSocketService = {
    getMessages: jasmine.createSpy('getMessages').and.returnValue(
      of({ timestamp: '2023-01-01', value: 100 })
    ),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, AnalyticsComponent],
      providers: [{ provide: WebSocketService, useValue: mockWebSocketService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    websocketService = TestBed.inject(WebSocketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to WebSocketService on init', () => {
    expect(websocketService.getMessages).toHaveBeenCalled();
  });

  it('should update metrics when new message is received', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.totalItems).toBe(2);
    expect(component.averageValue).toBe(100);
    expect(component.latestValue).toEqual({ timestamp: '2023-01-01', value: 100 });
  });

  it('should update chart when new message is received', () => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'analytics-chart');
    document.body.appendChild(canvas);

    component.ngOnInit();
    fixture.detectChanges();

    component.updateChart();
    expect(component.chart).not.toBeNull();
    expect(component.chart?.data.labels).toContain('2023-01-01');
    expect(component.chart?.data.datasets[0].data).toContain(100);

    document.body.removeChild(canvas);
  });

  afterEach(() => {
    if (component.chart) {
      component.chart.destroy();
    }
  });
});