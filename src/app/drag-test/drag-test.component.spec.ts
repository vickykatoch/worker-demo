import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragTestComponent } from './drag-test.component';

describe('DragTestComponent', () => {
  let component: DragTestComponent;
  let fixture: ComponentFixture<DragTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
