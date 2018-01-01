import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketDemoComponent } from './socket-demo.component';

describe('SocketDemoComponent', () => {
  let component: SocketDemoComponent;
  let fixture: ComponentFixture<SocketDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
