import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HistoricalDataService } from './data-download/historical-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  downloadForm: FormGroup;
  title = 'trAIder';

  constructor(
    private formBuilder: FormBuilder,
    private HistoricalDataService: HistoricalDataService,
  ) {
    this.downloadForm = this.formBuilder.group({
    symbol: '',
    date1: '',
    date2: ''
  });
  }

  onSubmit(): void {
    // Process download data here
    const symbol = this.downloadForm.value.symbol;
    const date1 = this.downloadForm.value.date1;
    const date2 = this.downloadForm.value.date2;
    this.HistoricalDataService.downloadHistoricalData(symbol, date1, date2);
    console.warn('Downloading to the local machine.', this.downloadForm.value);
    window.alert('Downloading to the local machine.');
    this.downloadForm.reset();
  }
}
