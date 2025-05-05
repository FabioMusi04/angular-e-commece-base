import {
  Component,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements AfterViewInit {
  @Output() searchSubmitted = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchTerm = '';

  ngAfterViewInit(): void {
    // Focus the input when component loads (optional)
    this.searchInput.nativeElement.focus();
  }

  onSearch(): void {
    this.searchSubmitted.emit(this.searchTerm.trim());
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubmitted.emit('');
  }
}
