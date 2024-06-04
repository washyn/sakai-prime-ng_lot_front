import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudAbpComponent } from './crud-abp.component';

describe('CrudAbpComponent', () => {
  let component: CrudAbpComponent;
  let fixture: ComponentFixture<CrudAbpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudAbpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudAbpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
