import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdDetailComponent } from './my-ad-detail.component';

describe('MyAdDetailComponent', () => {
  let component: MyAdDetailComponent;
  let fixture: ComponentFixture<MyAdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAdDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
