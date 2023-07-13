import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trAIder';

  downloadForm = this.formBuilder.group({
    symbol: '',
    date1: '',
    date2: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    // Process download data here
    console.warn('Downloading to the local machine.', this.downloadForm.value);
    window.alert('Downloading to the local machine.');
    this.downloadForm.reset();
  }
}
