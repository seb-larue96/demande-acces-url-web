import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccessRequest } from './add-access-request';

describe('AddAccessRequest', () => {
  let component: AddAccessRequest;
  let fixture: ComponentFixture<AddAccessRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAccessRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccessRequest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
