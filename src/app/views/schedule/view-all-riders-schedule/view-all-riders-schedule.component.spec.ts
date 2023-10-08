import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRidersScheduleComponent } from './view-all-riders-schedule.component';

describe('ViewAllRidersScheduleComponent', () => {
  let component: ViewAllRidersScheduleComponent;
  let fixture: ComponentFixture<ViewAllRidersScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllRidersScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllRidersScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
