import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProduzentenComponent} from './produzenten.component';

describe('ProduzentenComponent', () => {
    let component: ProduzentenComponent;
    let fixture: ComponentFixture<ProduzentenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProduzentenComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProduzentenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
