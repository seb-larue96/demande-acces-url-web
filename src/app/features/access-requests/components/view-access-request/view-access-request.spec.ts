import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAccessRequest } from './view-access-request';

describe('ViewAccessRequest', () => {
  let component: ViewAccessRequest;
  let fixture: ComponentFixture<ViewAccessRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAccessRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAccessRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
