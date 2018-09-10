import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndorserComponentComponent } from './endorser-component.component';

describe('EndorserComponentComponent', () => {
  let component: EndorserComponentComponent;
  let fixture: ComponentFixture<EndorserComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndorserComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndorserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
