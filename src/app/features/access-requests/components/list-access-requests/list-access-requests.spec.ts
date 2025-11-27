import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccessRequests } from './list-access-requests';

describe('ListAccessRequests', () => {
  let component: ListAccessRequests;
  let fixture: ComponentFixture<ListAccessRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAccessRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAccessRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
