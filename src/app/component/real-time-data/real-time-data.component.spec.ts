import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RealTimeDataComponent } from './real-time-data.component';
import { WebSocketService } from '../../services/web-socket.service';
import { of } from 'rxjs';

const mockWebSocketService = {
  getMessages: jasmine.createSpy('getMessages').and.returnValue(
    of(
      { id: 1, value: 'Data 1' },
      { id: 2, value: 'Data 2' },
      { id: 3, value: 'Data 3' }
    )
  ),
};

describe('RealTimeDataComponent', () => {
  let fixture: ComponentFixture<RealTimeDataComponent>;
  let component: RealTimeDataComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimeDataComponent],
      providers: [{ provide: WebSocketService, useValue: mockWebSocketService }],
    }).compileComponents();

    fixture = TestBed.createComponent(RealTimeDataComponent);
    component = fixture.componentInstance;
  });

  it('should initialize and subscribe to WebSocket data', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.data.length).toBe(6);
    expect(component.totalPages).toBe(1);

    const start = component.currentPage * component.itemsPerPage;
    const end = start + component.itemsPerPage;
    expect(component.paginatedData).toEqual(component.data.slice(start, end));
  });

  it('should update pagination correctly when new data is received', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const newMessage = { id: 4, value: 'Data 4' };
    component.websocketService.getMessages().subscribe(() => {
      component.data.push(newMessage);
      component.updatePagination();
    });

    expect(component.data.length).toBe(9);
    expect(component.totalPages).toBe(1);
    expect(component.paginatedData[component.paginatedData.length - 1]).toEqual(newMessage);
  });

  it('should navigate to the next and previous page', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.currentPage = 0;

    component.nextPage();
    expect(component.currentPage).toBe(0);

    component.prevPage();
    expect(component.currentPage).toBe(0);
  });
});
