import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesVisualizationComponent } from './sales-visualization.component';

describe('SalesVisualizationComponent', () => {
  let component: SalesVisualizationComponent;
  let fixture: ComponentFixture<SalesVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesVisualizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
