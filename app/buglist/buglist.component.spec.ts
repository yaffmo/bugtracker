import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuglistComponent } from './buglist.component';

describe('BuglistComponent', () => {
  let component: BuglistComponent;
  let fixture: ComponentFixture<BuglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
